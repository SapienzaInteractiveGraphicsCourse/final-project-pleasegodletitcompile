// Canvas
var canvas = document.getElementById('renderCanvas');
// 3D Engine
var engine = new BABYLON.Engine(canvas, true);

var camera;

//Time to try to implement gravity and run
var timeWalk = 0;
var timeJump = 0;
var timeSlide = 0;

var timeAnimation = 0;

var timeCoin = 0;

// Set gravity
var gravity = -0.1;

var snowCyl;

var snowLA;

var snowCyl2;
var snowRA2;
var snowLA2;

var coin;

var snowAnim = false;




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
    var platform1 = BABYLON.MeshBuilder.CreateBox('platform1', {width:65, height:2, depth:10}, scene);
    platform1.position = new BABYLON.Vector3(7.5, 0, 0);
    platform1.checkCollisions = true;
    groundObjects.push(platform1);
    platform1.material = ground2;

    // Plant
    BABYLON.SceneLoader.ImportMesh("", "../models/", "plant.gltf", scene, function(newMeshes) {
        var plant = newMeshes[0];
        plant.rotate(BABYLON.Axis.Y, Math.PI / 2, BABYLON.Space.WORLD);
        plant.position = new BABYLON.Vector3(-10, 3, 2);
        plant.scaling = new BABYLON.Vector3(0.01, 0.01, 0.01);
    });


/// Fiori sulle prime aiuole

    // Purple Flowers
    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {
        var flowers = newMeshes[2];
        flowers.rotate(BABYLON.Axis.X, -Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-28, -6.2, 2);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {
        var flowers = newMeshes[3];
        flowers.rotate(BABYLON.Axis.X, -Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-28, -6.2, 2);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[2];
        flowers.rotate(BABYLON.Axis.X, -Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-27, -6.2, 5);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[3];
        flowers.rotate(BABYLON.Axis.X, -Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-27, -6.2, 5);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);
    });


    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[2];
        flowers.rotate(BABYLON.Axis.X, -Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-30, -6.2, 7);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[3];
        flowers.rotate(BABYLON.Axis.X, -Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-30, -6.2, 7);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[2];
        flowers.rotate(BABYLON.Axis.X, -Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-32, -6.2, 5);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[3];
        flowers.rotate(BABYLON.Axis.X, -Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-32, -6.2, 5);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[2];
        flowers.rotate(BABYLON.Axis.X, -Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-32, -6.2, 0);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[3];
        flowers.rotate(BABYLON.Axis.X, -Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-32, -6.2, 0);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[2];
        flowers.rotate(BABYLON.Axis.X, -Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-32, -6.2, -5);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[3];
        flowers.rotate(BABYLON.Axis.X, -Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-32, -6.2, -5);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[2];
        flowers.rotate(BABYLON.Axis.X, -Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-35, -6.2, 1);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[3];
        flowers.rotate(BABYLON.Axis.X, -Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-35, -6.2, 1);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[2];
        flowers.rotate(BABYLON.Axis.X, -Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-37, -6.2, -10);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[3];
        flowers.rotate(BABYLON.Axis.X, -Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-37, -6.2, -10);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[2];
        flowers.rotate(BABYLON.Axis.X, -Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-37, -6.2, 5);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[3];
        flowers.rotate(BABYLON.Axis.X, -Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-37, -6.2, 5);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[2];
        flowers.rotate(BABYLON.Axis.X, -Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-36.5, -6.2, -15);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[3];
        flowers.rotate(BABYLON.Axis.X, -Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-36.5, -6.2, -15);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[2];
        flowers.rotate(BABYLON.Axis.X, -Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-37.5, -6.2, -6);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[3];
        flowers.rotate(BABYLON.Axis.X, -Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-37.5, -6.2, -6);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[2];
        flowers.rotate(BABYLON.Axis.X, -Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-38.5, -6.2, -2.5);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[3];
        flowers.rotate(BABYLON.Axis.X, -Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-38.5, -6.2, -2.5);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);
    });

//primo blocco dal basso lato sinistro
    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[2];
        flowers.rotate(BABYLON.Axis.Z, Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-23.8, 10, -5);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[3];
        flowers.rotate(BABYLON.Axis.Z, Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-23.8, 10, -5);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[2];
        flowers.rotate(BABYLON.Axis.Z, Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-23.8, 13, -7);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[3];
        flowers.rotate(BABYLON.Axis.Z, Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-23.8, 13, -7);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[2];
        flowers.rotate(BABYLON.Axis.Z, Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-23.8, 6, -8);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[3];
        flowers.rotate(BABYLON.Axis.Z, Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-23.8, 6, -8);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

//secondo blocco lato sinistro
    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[2];
        flowers.rotate(BABYLON.Axis.Z, Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-28.8, 6, -15);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[3];
        flowers.rotate(BABYLON.Axis.Z, Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-28.8, 6, -15);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[2];
        flowers.rotate(BABYLON.Axis.Z, Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-28.8, 10, -11);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[3];
        flowers.rotate(BABYLON.Axis.Z, Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-28.8, 10, -11);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[2];
        flowers.rotate(BABYLON.Axis.Z, Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-28.8, 12, -14);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[3];
        flowers.rotate(BABYLON.Axis.Z, Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-28.8, 12, -14);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[2];
        flowers.rotate(BABYLON.Axis.Z, Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-28.8, 13, -18);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[3];
        flowers.rotate(BABYLON.Axis.Z, Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-28.8, 13, -18);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });


//terzo blocco lato sinistro
    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[2];
        flowers.rotate(BABYLON.Axis.Z, Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-33.8, 13, -25);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[3];
        flowers.rotate(BABYLON.Axis.Z, Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-33.8, 13, -25);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[2];
        flowers.rotate(BABYLON.Axis.Z, Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-33.8, 7, -21);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[3];
        flowers.rotate(BABYLON.Axis.Z, Math.PI / 2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-33.8, 7, -21);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

// Fondo primo blocco dal basso

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[2];
        flowers.rotate(BABYLON.Axis.Z, Math.PI, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-26, 7, -10.2);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[3];
        flowers.rotate(BABYLON.Axis.Z, Math.PI, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-26, 7, -10.2);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[2];
        flowers.rotate(BABYLON.Axis.Z, Math.PI, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-28, 11, -10.2);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[3];
        flowers.rotate(BABYLON.Axis.Z, Math.PI, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-28, 11, -10.2);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

// Fondo secondo blocco dal basso
    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[2];
        flowers.rotate(BABYLON.Axis.Z, Math.PI, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-32, 11, -21.5);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "flowers.gltf", scene, function(newMeshes) {

        var flowers = newMeshes[3];
        flowers.rotate(BABYLON.Axis.Z, Math.PI, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(-32, 11, -21.5);
        flowers.scaling = new BABYLON.Vector3(8, 8, 8);

    });




/// Fine fiori sulle prime aiuole





    

    // Platform 2
    var platform2 = BABYLON.MeshBuilder.CreateBox('platform2', {width:5, height:8, depth:10}, scene);
    platform2.position = new BABYLON.Vector3(27.5, 5, 0);
    platform2.checkCollisions = true;
    groundObjects.push(platform2);
    platform2.material = ground1;

    // Platform 3
    var platform3 = BABYLON.MeshBuilder.CreateBox('platform3', {width:5, height:19, depth:10}, scene);
    platform3.position = new BABYLON.Vector3(32.5, 10.5, 0);
    platform3.checkCollisions = true;
    groundObjects.push(platform3);
    platform3.material = ground1;

    // Platform 4
    var platform4 = BABYLON.MeshBuilder.CreateBox('platform4', {width:5, height:28, depth:10}, scene);
    platform4.position = new BABYLON.Vector3(37.5, 15, 0);
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

    // box1
    var box1 = BABYLON.MeshBuilder.CreateBox('box1', {width:4, height:4, depth:4}, scene);
    box1.rotation.y=6;
    box1.position = new BABYLON.Vector3(160, 9, 2.5);
    box1.checkCollisions = true;
    groundObjects.push(box1);
    box1.material = woodTex;

    //box2
    var box2 = BABYLON.MeshBuilder.CreateBox('box2', {width:4, height:4, depth:4}, scene);
    box2.rotation.y=-10;
    box2.position = new BABYLON.Vector3(161, 9, -2.5);
    box2.checkCollisions = true;
    groundObjects.push(box2);
    box2.material = woodTex;

    //box3
    var box3 = BABYLON.MeshBuilder.CreateBox('box3', {width:4, height:4, depth:4}, scene);
    box3.rotation.y=7;
    box3.position = new BABYLON.Vector3(165, 9, 2.5);
    box3.checkCollisions = true;
    groundObjects.push(box3);
    box3.material = woodTex;

    //box4
    var box4 = BABYLON.MeshBuilder.CreateBox('box4', {width:4, height:4, depth:4}, scene);
    box4.rotation.y=3;
    box4.position = new BABYLON.Vector3(167, 9, -2.5);
    box4.checkCollisions = true;
    groundObjects.push(box4);
    box4.material = woodTex;

    //box5
    var box5 = BABYLON.MeshBuilder.CreateBox('box5', {width:4, height:4, depth:4}, scene);
    box5.rotation.y=5;
    box5.position = new BABYLON.Vector3(163, 13, 2.5);
    box5.checkCollisions = true;
    groundObjects.push(box5);
    box5.material = woodTex;

    //box6
    var box6 = BABYLON.MeshBuilder.CreateBox('box6', {width:4, height:4, depth:4}, scene);
    box6.rotation.y=-3;
    box6.position = new BABYLON.Vector3(165, 13, -2.5);
    box6.checkCollisions = true;
    groundObjects.push(box6);
    box6.material = woodTex;


/*
    // Platform 12
    var platform12 = BABYLON.MeshBuilder.CreateBox('platform12', {width:6, height:6, depth:10}, scene);
    platform12.position = new BABYLON.Vector3(170, 14.5, 0);
    platform12.checkCollisions = true;
    groundObjects.push(platform12);
    platform12.material = woodTex;
*/

    // Platform 11
    var platform11 = BABYLON.MeshBuilder.CreateBox('platform11', {width:30, height:17, depth:10}, scene);
    platform11.position = new BABYLON.Vector3(188, 13.5, 0);
    platform11.checkCollisions = true;
    groundObjects.push(platform11);
    platform11.material = ground;


    //Platform 12
    var platform12 = BABYLON.MeshBuilder.CreateBox('platform12', {width:100, height:3, depth:10}, scene);
    platform12.position = new BABYLON.Vector3(260, 6.5, 0);
    platform12.checkCollisions = true;
    groundObjects.push(platform12);
    platform12.material = ground;



    //Platform 13
    var platform13 = BABYLON.MeshBuilder.CreateBox('platform13', {width:10, height:2, depth:10}, scene);
    platform13.position = new BABYLON.Vector3(290, 20, 0);
    platform13.checkCollisions = true;
    groundObjects.push(platform13);
    platform13.material = ground;

    
    //Platform 14
    var platform13 = BABYLON.MeshBuilder.CreateBox('platform13', {width:30, height:3, depth:10}, scene);
    platform13.position = new BABYLON.Vector3(318, 25, 0);
    platform13.checkCollisions = true;
    groundObjects.push(platform13);
    platform13.material = ground;


    //box7
    var box7 = BABYLON.MeshBuilder.CreateBox('box7', {width:4, height:4, depth:4}, scene);
    //box7.rotation.y=-3;
    box7.position = new BABYLON.Vector3(300, 10, 0);
    box7.checkCollisions = true;
    groundObjects.push(box7);
    box7.material = woodTex; 
    

    //Platform 15
    var platform15 = BABYLON.MeshBuilder.CreateBox('platform15', {width:50, height:10, depth:10}, scene);
    platform15.position = new BABYLON.Vector3(365, 10, 0);
    //platform15.rotate(BABYLON.Axis.Z, Math.PI / 8, BABYLON.Space.WORLD);
    platform15.checkCollisions = true;
    groundObjects.push(platform15);
    platform15.material = ground;






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