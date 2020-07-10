// Canvas
var canvas = document.getElementById('renderCanvas');
// 3D Engine
var engine = new BABYLON.Engine(canvas, true);

var camera;

//Time to try to implement gravity and run
var timeWalk = 0;
var timeJump = 0;
var timeSlide = 0;

// Set gravity
var gravity = -0.1;



var checkpoint = new BABYLON.Vector3(0, 10, 0);

var platformHeight = 2;
var knight;
var helmet;

// List of objects that are considered ground
var groundObjects = [];

var createScene = function() {
    // Scene
    var scene = new BABYLON.Scene(engine);
    scene.collisionsEnabled = true;

    //Set platforms materials
    //var ice = new BABYLON.StandardMaterial("ice", scene);
    //ice.diffuseColor = new BABYLON.Color3(0, 1, 1);
    //ice.diffuseTexture = new BABYLON.Texture("../Textures/ice.png", scene)

    //Set platforms materials
    var ground1 = new BABYLON.StandardMaterial("ground1", scene);
    ground1.diffuseColor = new BABYLON.Color3(78, 59, 49);
    ground1.diffuseTexture = new BABYLON.Texture("./img/erba2.jpg", scene);


    var ground2 = new BABYLON.StandardMaterial("ground2", scene);
    ground2.diffuseColor = new BABYLON.Color3(76, 47, 39);
    ground2.diffuseTexture = new BABYLON.Texture("./img/terra2.jpg", scene);

    var woodTex = new BABYLON.StandardMaterial("woodTex", scene);
    woodTex.diffuseColor = new BABYLON.Color3(78, 59, 49);
    woodTex.diffuseTexture = new BABYLON.Texture("./img/pexels-photo-326311.jpeg", scene);

    var ground = new BABYLON.StandardMaterial("ground", scene);
    ground.diffuseColor = new BABYLON.Color3(1, 1, 1);


    // Camera
    camera = new BABYLON.FollowCamera('camera', new BABYLON.Vector3(0, 0, 0), scene);
    camera.radius = 40;
    camera.heightOffset = 10;
    camera.rotationOffset = 180;
    camera.attachControl(canvas, true);

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
    platform1.material = ground1;

    var albero = BABYLON.SceneLoader.Append("./models/", "flowers.gltf", scene, function (scene) {
        // do something with the scene
        albero.position = new BABYLON.Vector3(0, 0, 0);
        albero.checkCollisions = true;
        groundObjects.push(albero);
    })

    // Platform 2
    var platform2 = BABYLON.MeshBuilder.CreateBox('platform2', {width:5, height:10, depth:10}, scene);
    platform2.position = new BABYLON.Vector3(27.5, 4, 0);
    platform2.checkCollisions = true;
    groundObjects.push(platform2);
    platform2.material = ground1;

    // Platform 3
    var platform3 = BABYLON.MeshBuilder.CreateBox('platform3', {width:5, height:20, depth:10}, scene);
    platform3.position = new BABYLON.Vector3(32.5, 9, 0);
    platform3.checkCollisions = true;
    groundObjects.push(platform3);
    platform3.material = ground1;

    // Platform 4
    var platform4 = BABYLON.MeshBuilder.CreateBox('platform4', {width:5, height:30, depth:10}, scene);
    platform4.position = new BABYLON.Vector3(37.5, 14, 0);
    platform4.checkCollisions = true;
    groundObjects.push(platform4);
    platform4.material = ground1;

    // Platform 5
    var platform5 = BABYLON.MeshBuilder.CreateBox('platform5', {width:6, height:2, depth:10}, scene);
    platform5.position = new BABYLON.Vector3(50, 25, 0);
    platform5.checkCollisions = true;
    groundObjects.push(platform5);
    platform5.material = ground2;

    // Platform 6
    var platform6 = BABYLON.MeshBuilder.CreateBox('platform6', {width:6, height:2, depth:10}, scene);
    platform6.position = new BABYLON.Vector3(65, 25, 0);
    platform6.checkCollisions = true;
    groundObjects.push(platform6);
    platform6.material = ground2;

    // Platform 7
    var platform7 = BABYLON.MeshBuilder.CreateBox('platform7', {width:6, height:2, depth:10}, scene);
    platform7.position = new BABYLON.Vector3(80, 25, 0);
    platform7.checkCollisions = true;
    groundObjects.push(platform7);
    platform7.material = ground2;

    // Platform 8
    var platform8 = BABYLON.MeshBuilder.CreateBox('platform8', {width:6, height:2, depth:10}, scene);
    platform8.position = new BABYLON.Vector3(95, 25, 0);
    platform8.checkCollisions = true;
    groundObjects.push(platform8);
    platform8.material = ground2;

    // Platform 9
    var platform9 = BABYLON.MeshBuilder.CreateBox('platform9', {width:30, height:14, depth:10}, scene);
    platform9.position = new BABYLON.Vector3(120, 12, 0);
    platform9.checkCollisions = true;
    groundObjects.push(platform9);
    platform9.material = ground;

    // Platform 10
    var platform10 = BABYLON.MeshBuilder.CreateBox('platform10', {width:42, height:2, depth:10}, scene);
    platform10.position = new BABYLON.Vector3(150, 6, 0);
    platform10.checkCollisions = true;
    groundObjects.push(platform10);
    platform10.material = ground;

    // Platform 11
    var platform11 = BABYLON.MeshBuilder.CreateBox('platform11', {width:4, height:4, depth:4}, scene);
    platform11.rotation.y=6;
    platform11.position = new BABYLON.Vector3(160, 9, 2.5);
    platform11.checkCollisions = true;
    groundObjects.push(platform11);
    platform11.material = woodTex;

    //Platform 12
    var platform12 = BABYLON.MeshBuilder.CreateBox('platform12', {width:4, height:4, depth:4}, scene);
    platform12.rotation.y=-10;
    platform12.position = new BABYLON.Vector3(161, 9, -2.5);
    platform12.checkCollisions = true;
    groundObjects.push(platform12);
    platform12.material = woodTex;

    //Platform 13
    var platform13 = BABYLON.MeshBuilder.CreateBox('platform13', {width:4, height:4, depth:4}, scene);
    platform13.rotation.y=7;
    platform13.position = new BABYLON.Vector3(165, 9, 2.5);
    platform13.checkCollisions = true;
    groundObjects.push(platform13);
    platform13.material = woodTex;

    //Platform 14
    var platform14 = BABYLON.MeshBuilder.CreateBox('platform14', {width:4, height:4, depth:4}, scene);
    platform14.rotation.y=3;
    platform14.position = new BABYLON.Vector3(167, 9, -2.5);
    platform14.checkCollisions = true;
    groundObjects.push(platform14);
    platform14.material = woodTex;

    //Platform 15
    var platform15 = BABYLON.MeshBuilder.CreateBox('platform15', {width:4, height:4, depth:4}, scene);
    platform15.rotation.y=5;
    platform15.position = new BABYLON.Vector3(163, 13, 2.5);
    platform15.checkCollisions = true;
    groundObjects.push(platform15);
    platform15.material = woodTex;

    //Platform 16
    var platform16 = BABYLON.MeshBuilder.CreateBox('platform16', {width:4, height:4, depth:4}, scene);
    platform16.rotation.y=-3;
    platform16.position = new BABYLON.Vector3(165, 13, -2.5);
    platform16.checkCollisions = true;
    groundObjects.push(platform16);
    platform16.material = woodTex;


/*
    // Platform 12
    var platform12 = BABYLON.MeshBuilder.CreateBox('platform12', {width:6, height:6, depth:10}, scene);
    platform12.position = new BABYLON.Vector3(170, 14.5, 0);
    platform12.checkCollisions = true;
    groundObjects.push(platform12);
    platform12.material = woodTex;
*/

    // Platform 13
    var platform13 = BABYLON.MeshBuilder.CreateBox('platform13', {width:30, height:17, depth:10}, scene);
    platform13.position = new BABYLON.Vector3(188, 13.5, 0);
    platform13.checkCollisions = true;
    groundObjects.push(platform13);
    platform13.material = ground;


    //Platform 14
    var platform14 = BABYLON.MeshBuilder.CreateBox('platform14', {width:70, height:3, depth:10}, scene);
    platform14.position = new BABYLON.Vector3(245, 6.5, 0);
    platform14.checkCollisions = true;
    groundObjects.push(platform14);
    platform14.material = ground;



    /*
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
    */

    //music
    var musicl3 = new BABYLON.Sound("musicl2", "../sounds/songs/dance with the trees.mp3", scene, soundReady, {loop:true, volume:0.5, useCustomAttenuation:false});

    function soundReady(){
        musicl3.play();
    }




    // Player
    player.mesh = new BABYLON.MeshBuilder.CreateSphere("player", {diameterX: player.width, diameterY:player.height, diameterZ:player.depth}, scene);
    player.mesh.visibility = 0;
    player.mesh.position.y = (player.height + platformHeight)/2.0;
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