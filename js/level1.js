// Canvas
var canvas = document.getElementById('renderCanvas');
// 3D Engine
var engine = new BABYLON.Engine(canvas, true);


var music;

var camera;

//Time to try to implement gravity and run
var timeWalk = 0;
var timeJump = 0;
var timeSlide = 0;

// Set gravity
var gravity = -0.1;

var checkpoint = new BABYLON.Vector3(0, 10, 0);

var knight;
var helmet;

// List of objects that are considered ground
var groundObjects = [];

var createScene = function() {
    // Scene
    var scene = new BABYLON.Scene(engine);

    scene.collisionsEnabled = true;

    //Set platforms materials
    // var ice = new BABYLON.StandardMaterial("ice", scene);
    // ice.diffuseColor = new BABYLON.Color3(0, 1, 1);
    // ice.diffuseTexture = new BABYLON.Texture("../Textures/ice.png", scene)

    var ground = new BABYLON.StandardMaterial("ground", scene);
    ground.diffuseColor = new BABYLON.Color3(1, 1, 1);


    // Camera
    camera = new BABYLON.FollowCamera('camera', new BABYLON.Vector3(0, 0, 0), scene);
    camera.radius = 40;
    camera.heightOffset = 10;
    camera.rotationOffset = 180;
    // camera.attachControl(canvas, true);

    // Light
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

    // Left wall
    var leftWall = BABYLON.MeshBuilder.CreateBox('platform1', {width:20, height:300, depth:10}, scene);
    leftWall.checkCollisions = true;
    leftWall.position = new BABYLON.Vector3(-35, 0, 0);
    leftWall.material = ground;

    // Platform 1
    var platform1 = BABYLON.MeshBuilder.CreateBox('platform1', {width:50, height:2, depth:10}, scene);
    platform1.checkCollisions = true;
    groundObjects.push(platform1);
    platform1.material = ground;

    // Platform 2
    var platform2 = BABYLON.MeshBuilder.CreateBox('platform2', {width:20, height:10, depth:10}, scene);
    platform2.position = new BABYLON.Vector3(35, 4, 0);
    platform2.checkCollisions = true;
    groundObjects.push(platform2);
    platform2.material = ground;

    // Platform 3
    var platform3 = BABYLON.MeshBuilder.CreateBox('platform3', {width:20, height:2, depth:10}, scene);
    platform3.position = new BABYLON.Vector3(60, 0, 0);
    platform3.checkCollisions = true;
    groundObjects.push(platform3);
    platform3.material = ground;

    // Platform 4
    var platform4 = BABYLON.MeshBuilder.CreateBox('platform4', {width:4, height:2, depth:10}, scene);
    platform4.position = new BABYLON.Vector3(72, 10, 0);
    platform4.checkCollisions = true;
    groundObjects.push(platform4);
    platform4.material = ground;

    // Stairs 1
    for (var i=0; i<4; i++) {
        var step = BABYLON.MeshBuilder.CreateBox(`step1_${i}`, {width:2, height:2, depth:10}, scene);
        step.position = new BABYLON.Vector3(78+5*i, 8-2*i, 0);
        step.checkCollisions = true;
        groundObjects.push(step);
        step.material = ground;
    }

    // Platform 5
    var platform9 = BABYLON.MeshBuilder.CreateBox('platform3', {width:20, height:2, depth:10}, scene);
    platform9.position = new BABYLON.Vector3(107, 0, 0);
    platform9.checkCollisions = true;
    groundObjects.push(platform9);
    platform9.material = ground;

    // Stairs 2
    for (var i=0; i<5; i++) {
        var step = BABYLON.MeshBuilder.CreateBox(`step2_${i}`, {width:2, height:3+2*i, depth:10}, scene);
        step.position = new BABYLON.Vector3(119+3*i, 0.5+i, 0);
        step.checkCollisions = true;
        groundObjects.push(step);
        step.material = ground;
    }

    var musicl1 = new BABYLON.Sound("musicl2", "../sounds/songs/Celtic Music - Callirus .mp3", scene, soundReady, {loop:true, volume:0.5, useCustomAttenuation:false});

    function soundReady(){
        musicl1.play();
    }
    

    // Player
    player.mesh = new BABYLON.MeshBuilder.CreateSphere("player", {diameterX: player.width, diameterY:player.height, diameterZ:player.depth}, scene);
    player.mesh.visibility =  0;
    player.mesh.position.copyFrom(checkpoint);
    player.mesh.ellipsoid = new BABYLON.Vector3(player.width/2, player.height/2, player.depth/2);
    player.mesh.checkCollisions = true;
    camera.lockedTarget = player.mesh;
    
    BABYLON.SceneLoader.ImportMesh("", "../models/", "knight.gltf", scene, function(newMeshes) {
        player.initializeRoot(newMeshes[0]);
        player.initializeBody();
        player.initializeAnimations();
        player.loadingComplete = true;
    });

    return scene;
}

var scene = createScene();

//music
//music = new BABYLON.Sound("music", "./sounds/music2.mp3", {volume:1, loop:true, autoplay:true}, scene, function(){
//    music.play();
//});