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
var timeCoin2 = 0;

// Set gravity
var gravity = -0.1;

var snowCyl;
var snowRA;
var snowLA;

var snowCyl2;
var snowRA2;
var snowLA2;

var coin1;
var coin2;
var coin3;

var dmg = false;

var snowAnim = false;




var widthS = 5;
var widthM = 20;
var widthB = 50;

var height = 2;

var depth = 15;





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
    //Ground Small Platform
    var grassS = new BABYLON.StandardMaterial("grass", scene);
    grassS.bumpTexture = new BABYLON.Texture("../Textures/erba_bump.jpg", scene);
    grassS.bumpTexture.uScale = 0.3; //0.8;
    grassS.bumpTexture.vScale = 2; //5;
    grassS.diffuseColor = new BABYLON.Color3(0.25, 1, 0.25);

    var grassS1 = new BABYLON.StandardMaterial("grass1", scene);
    grassS1.bumpTexture = new BABYLON.Texture("../Textures/erba_bump.jpg", scene);
    grassS1.bumpTexture.uScale = 2; //5;
    grassS1.bumpTexture.vScale =0.08; //0.5;
    grassS1.diffuseColor = new BABYLON.Color3(0.25, 1, 0.25);

    var grassS2 = new BABYLON.StandardMaterial("grass2", scene);
    grassS2.bumpTexture = new BABYLON.Texture("../Textures/erba_bump.jpg", scene);
    grassS2.bumpTexture.uScale = 0.08; //0.5;
    grassS2.bumpTexture.vScale =0.3; //0.8;
    grassS2.diffuseColor = new BABYLON.Color3(0.25, 1, 0.25);

    //Ground Medium Platform
    var grassM = new BABYLON.StandardMaterial("grass", scene);
    grassM.bumpTexture = new BABYLON.Texture("../Textures/erba_bump.jpg", scene);
    grassM.bumpTexture.uScale = 0.3;
    grassM.bumpTexture.vScale =2;
    grassM.diffuseColor = new BABYLON.Color3(0.25, 1, 0.25);

    var grassM1 = new BABYLON.StandardMaterial("grass1", scene);
    grassM1.bumpTexture = new BABYLON.Texture("../Textures/erba_bump.jpg", scene);
    grassM1.bumpTexture.uScale = 2;
    grassM1.bumpTexture.vScale =0.08;
    grassM1.diffuseColor = new BABYLON.Color3(0.25, 1, 0.25);

    var grassM2 = new BABYLON.StandardMaterial("grass2", scene);
    grassM2.bumpTexture = new BABYLON.Texture("../Textures/erba_bump.jpg", scene);
    grassM2.bumpTexture.uScale = 0.08;
    grassM2.bumpTexture.vScale = 0.3;
    grassM2.diffuseColor = new BABYLON.Color3(0.25, 1, 0.25);


    //Ground Big Platform
    var grassB = new BABYLON.StandardMaterial("grass", scene);
    grassB.bumpTexture = new BABYLON.Texture("../Textures/grass_bump.jpg", scene);
    grassB.bumpTexture.uScale = 0.3;
    grassB.bumpTexture.vScale =2;
    grassB.diffuseColor = new BABYLON.Color3(0.25, 1, 0.25);

    var grassB1 = new BABYLON.StandardMaterial("grass1", scene);
    grassB1.bumpTexture = new BABYLON.Texture("../Textures/grass_bump.jpg", scene);
    grassB1.bumpTexture.uScale = 2;
    grassB1.bumpTexture.vScale =0.08;
    grassB1.diffuseColor = new BABYLON.Color3(0.25, 1, 0.25);

    var grassB2 = new BABYLON.StandardMaterial("grass2", scene);
    grassB2.bumpTexture = new BABYLON.Texture("../Textures/grass_bump.jpg", scene);
    grassB2.bumpTexture.uScale = 0.08;
    grassB2.bumpTexture.vScale =0.3;
    grassB2.diffuseColor = new BABYLON.Color3(0.25, 1, 0.25);
    


    //var ground2 = new BABYLON.StandardMaterial("ground2", scene);
    //ground2.diffuseColor = new BABYLON.Color3(76, 47, 39);
    //ground2.diffuseTexture = new BABYLON.Texture("./img/terra2.jpg", scene);
/*
    var woodTex = new BABYLON.StandardMaterial("woodTex", scene);
    woodTex.diffuseColor = new BABYLON.Color3(78, 59, 49);
    woodTex.diffuseTexture = new BABYLON.Texture("./img/pexels-photo-326311.jpeg", scene);

    var ground = new BABYLON.StandardMaterial("ground", scene);
    ground.diffuseColor = new BABYLON.Color3(1, 1, 1);
*/

    // Camera
    camera = new BABYLON.FollowCamera('camera', new BABYLON.Vector3(0, 0, 0), scene);
    camera.radius = 40;
    camera.heightOffset = 10;
    camera.rotationOffset = 180;
    camera.attachControl(canvas, true);

    // Light
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1,1,0), scene);

    //Ground multimaterial
    //Small Platform MultiMaterial
    var multimatGrassS = new BABYLON.MultiMaterial("multiGrass", scene);
    multimatGrassS.subMaterials.push(grassS);
    multimatGrassS.subMaterials.push(grassS1);
    multimatGrassS.subMaterials.push(grassS2);

    //Medium Platform MultiMaterial
    var multimatGrassM = new BABYLON.MultiMaterial("multiGrass", scene);
    multimatGrassM.subMaterials.push(grassM);
    multimatGrassM.subMaterials.push(grassM1);
    multimatGrassM.subMaterials.push(grassM2);

    //Big Platform MultiMaterial
    var multimatGrassB = new BABYLON.MultiMaterial("multiGrass", scene);
    multimatGrassB.subMaterials.push(grassB);
    multimatGrassB.subMaterials.push(grassB1);
    multimatGrassB.subMaterials.push(grassB2);

    // Platform 0 ground
    var platform0 = BABYLON.MeshBuilder.CreateBox('platform0', {width:widthM, height:height, depth:depth}, scene);     //{width:65, height:2, depth:10}, scene);
    platform0.position = new BABYLON.Vector3(-40, 0, 5);     //(7.5, 0, 0);
    platform0.checkCollisions = true;
    //groundObjects.push(platform1);
    platform0.material = multimatGrassB;
    platform0.subMeshes = [];
    var verticesCount = platform0.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform0);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform0);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform0);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform0);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform0);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform0);

    groundObjects.push(platform0);

    //object First Platform
    BABYLON.SceneLoader.ImportMesh("", "../models/SpringModels/", "waterfall.gltf", scene, function(newMeshes) {
        var waterfall = newMeshes[0];
        waterfall.rotate( BABYLON.Axis.Y, -Math.PI , BABYLON.Space.WORLD);
        waterfall.checkCollisions=true;
        waterfall.position = new BABYLON.Vector3(-45, 2, 5);
        waterfall.scaling = new BABYLON.Vector3(1, 1, 1);
    });


    // Platform 1 ground
    var platform1 = BABYLON.MeshBuilder.CreateBox('platform1', {width:widthB, height:height, depth:depth}, scene);     //{width:65, height:2, depth:10}, scene);
    platform1.position = new BABYLON.Vector3(0, 0, 5);     //(7.5, 0, 0);
    platform1.checkCollisions = true;
    //groundObjects.push(platform1);
    platform1.material = multimatGrassB;
    platform1.subMeshes = [];
    var verticesCount = platform1.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform1);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform1);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform1);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform1);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform1);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform1);

    groundObjects.push(platform1);

//object First Platform
    BABYLON.SceneLoader.ImportMesh("", "../models/SpringModels/", "alberocolorato.gltf", scene, function(newMeshes) {
        var treeBall = newMeshes[0];
        treeBall.position = new BABYLON.Vector3(10,1.5,9);
        treeBall.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/SpringModels/", "alberocolorato.gltf", scene, function(newMeshes) {
        var treeBall2 = newMeshes[0];
        treeBall2.rotate( BABYLON.Axis.Y, -Math.PI/2 , BABYLON.Space.WORLD);
        treeBall2.position = new BABYLON.Vector3(-20,1.5,9);
        treeBall2.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/SpringModels/", "red_apple.gltf", scene, function(newMeshes) {
        var redApple = newMeshes[0];
        //flowers.rotate( BABYLON.Axis.Y, -Math.PI/2 , BABYLON.Space.WORLD);
        redApple.position = new BABYLON.Vector3(9,5.5,4);
        redApple.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/SpringModels/", "green_apple.gltf", scene, function(newMeshes) {
        var greenApple = newMeshes[0];
        //flowers.rotate( BABYLON.Axis.Y, -Math.PI/2 , BABYLON.Space.WORLD);
        greenApple.position = new BABYLON.Vector3(-20,5.5,4);
        greenApple.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/SpringModels/", "yellow_apple.gltf", scene, function(newMeshes) {
        var yellowApple = newMeshes[0];
        //flowers.rotate( BABYLON.Axis.Y, -Math.PI/2 , BABYLON.Space.WORLD);
        yellowApple.position = new BABYLON.Vector3(11,6.5,4);
        yellowApple.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/SpringModels/", "woodColored.gltf", scene, function(newMeshes) {
        var wood = newMeshes[0];
        wood.rotate( BABYLON.Axis.Y, -Math.PI/4 , BABYLON.Space.WORLD);
        wood.position = new BABYLON.Vector3(0,1.5,9);
        wood.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/SpringModels/", "woodColored.gltf", scene, function(newMeshes) {
        var wood = newMeshes[0];
        wood.rotate( BABYLON.Axis.Y, -Math.PI/4 , BABYLON.Space.WORLD);
        wood.position = new BABYLON.Vector3(-10,1.5,9);
        wood.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/SpringModels/Animals/", "butterfly.gltf", scene, function(newMeshes) {
        var butterfly = newMeshes[0];
        butterfly.rotate( BABYLON.Axis.Y, -Math.PI/2 , BABYLON.Space.WORLD);
        butterfly.rotate( BABYLON.Axis.Z, Math.PI/4 , BABYLON.Space.WORLD);
        butterfly.position = new BABYLON.Vector3(-0.5,3.5,8);
        butterfly.scaling = new BABYLON.Vector3(25, 25, 25);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/SpringModels/Animals/", "butterfly.gltf", scene, function(newMeshes) {
        var butterfly = newMeshes[1];
        butterfly.rotate( BABYLON.Axis.Y, Math.PI/2 , BABYLON.Space.WORLD);
        butterfly.rotate( BABYLON.Axis.Z, Math.PI/4 , BABYLON.Space.WORLD);
        butterfly.position = new BABYLON.Vector3(10,3.5,8);
        butterfly.scaling = new BABYLON.Vector3(25, 25, 25);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/SpringModels/Animals/", "Deer.gltf", scene, function(newMeshes) {
        var deer = newMeshes[0];
        deer.rotate( BABYLON.Axis.Y, Math.PI/3 , BABYLON.Space.WORLD);
        //butterfly.rotate( BABYLON.Axis.Z, Math.PI/4 , BABYLON.Space.WORLD);
        deer.position = new BABYLON.Vector3(16, 0.99, 8);
        deer.scaling = new BABYLON.Vector3(1, 1, 1);
        
    });

    



    //Platform2 
    var platform2 = BABYLON.MeshBuilder.CreateBox('platform2', {width:widthM, height:height, depth:depth}, scene);
    platform2.position = new BABYLON.Vector3(45, -15, 5);     //(7.5, 0, 0);
    platform2.checkCollisions = true;
    //groundObjects.push(platform1);
    platform2.material = multimatGrassM;
    platform2.subMeshes = [];
    var verticesCount = platform2.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform2);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform2);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform2);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform2);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform2);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform2);

    groundObjects.push(platform2);

    //object Second Platform
    BABYLON.SceneLoader.ImportMesh("", "../models/SpringModels/", "pohon.gltf", scene, function(newMeshes) {
        var treeSet = newMeshes[0];
        treeSet.position = new BABYLON.Vector3(47, -14, 9);
        treeSet.scaling = new BABYLON.Vector3(2, 2, 2);
    });


    //Platform3 
    var platform3 = BABYLON.MeshBuilder.CreateBox('platform3', {width:widthS, height:height, depth:depth}, scene);
    platform3.position = new BABYLON.Vector3(35, 10, 5);     //(7.5, 0, 0);
    platform3.checkCollisions = true;
    //groundObjects.push(platform1);
    platform3.material = multimatGrassS;
    platform3.subMeshes = [];
    var verticesCount = platform3.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform3);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform3);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform3);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform3);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform3);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform3);

    groundObjects.push(platform3);

    BABYLON.SceneLoader.ImportMesh("", "../models/SpringModels/", "fleur.gltf", scene, function(newMeshes) {
        var butterfly = newMeshes[0];
        //butterfly.rotate( BABYLON.Axis.Y, Math.PI/2 , BABYLON.Space.WORLD);
        //butterfly.rotate( BABYLON.Axis.Z, Math.PI/4 , BABYLON.Space.WORLD);
        butterfly.position = new BABYLON.Vector3(35, 10, 9);
        butterfly.scaling = new BABYLON.Vector3(2, 2, 2);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/SpringModels/", "fleur.gltf", scene, function(newMeshes) {
        var butterfly = newMeshes[0];
        //butterfly.rotate( BABYLON.Axis.Y, Math.PI/2 , BABYLON.Space.WORLD);
        //butterfly.rotate( BABYLON.Axis.Z, Math.PI/4 , BABYLON.Space.WORLD);
        butterfly.position = new BABYLON.Vector3(34, 10, 10);
        butterfly.scaling = new BABYLON.Vector3(2, 2, 2);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/SpringModels/", "fleur.gltf", scene, function(newMeshes) {
        var butterfly = newMeshes[0];
        //butterfly.rotate( BABYLON.Axis.Y, Math.PI/2 , BABYLON.Space.WORLD);
        //butterfly.rotate( BABYLON.Axis.Z, Math.PI/4 , BABYLON.Space.WORLD);
        butterfly.position = new BABYLON.Vector3(36, 10, 10);
        butterfly.scaling = new BABYLON.Vector3(2, 2, 2);
    });



    //Platform4 
    var platform4 = BABYLON.MeshBuilder.CreateBox('platform4', {width:widthM, height:height, depth:depth}, scene);
    platform4.position = new BABYLON.Vector3(50, 20, 5);     //(7.5, 0, 0);
    platform4.checkCollisions = true;
    //groundObjects.push(platform1);
    platform4.material = multimatGrassM;
    platform4.subMeshes = [];
    var verticesCount = platform4.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform4);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform4);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform4);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform4);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform4);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform4);

    groundObjects.push(platform4);

    //object Platform 4
    BABYLON.SceneLoader.ImportMesh("", "../models/SpringModels/", "LowTree.gltf", scene, function(newMeshes) {
        var lowTree = newMeshes[0];
        lowTree.position = new BABYLON.Vector3(52, 21, 9);
        lowTree.scaling = new BABYLON.Vector3(10, 10, 10);
    });

    //Platform5 
    var platform5 = BABYLON.MeshBuilder.CreateBox('platform5', {width:widthS, height:height, depth:depth}, scene);
    platform5.position = new BABYLON.Vector3(72, 10, 5);     //(7.5, 0, 0);
    platform5.checkCollisions = true;
    //groundObjects.push(platform1);
    platform5.material = multimatGrassS;
    platform5.subMeshes = [];
    var verticesCount = platform5.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform5);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform5);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform5);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform5);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform5);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform5);

    groundObjects.push(platform5);    


    //Platform6 
    var platform6 = BABYLON.MeshBuilder.CreateBox('platform6', {width:widthS, height:height, depth:depth}, scene);
    platform6.position = new BABYLON.Vector3(72, 10, 5);     //(7.5, 0, 0);
    platform6.checkCollisions = true;
    //groundObjects.push(platform1);
    platform6.material = multimatGrassS;
    platform6.subMeshes = [];
    var verticesCount = platform6.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform6);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform6);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform6);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform6);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform6);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform6);

    groundObjects.push(platform6);

    //Platform7 
    var platform7 = BABYLON.MeshBuilder.CreateBox('platform7', {width:widthB, height:height, depth:depth}, scene);
    platform7.position = new BABYLON.Vector3(90, -5, 5);     //(7.5, 0, 0);
    platform7.checkCollisions = true;
    //groundObjects.push(platform1);
    platform7.material = multimatGrassB;
    platform7.subMeshes = [];
    var verticesCount = platform7.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform7);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform7);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform7);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform7);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform7);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform7);

    groundObjects.push(platform7);
 

    //object Platform 7
    BABYLON.SceneLoader.ImportMesh("", "../models/SpringModels/", "LowPolyTree01.gltf", scene, function(newMeshes) {
        var lowPolyTree = newMeshes[0];
        lowPolyTree.position = new BABYLON.Vector3(70, -4, 14);
        lowPolyTree.scaling = new BABYLON.Vector3(5, 5, 5);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/SpringModels/", "LowPolyTree01.gltf", scene, function(newMeshes) {
        var lowPolyTree2 = newMeshes[0];
        lowPolyTree2.position = new BABYLON.Vector3(80, -4, 14);
        lowPolyTree2.scaling = new BABYLON.Vector3(5, 5, 5);
    }); 

    BABYLON.SceneLoader.ImportMesh("", "../models/SpringModels/", "LowPolyTree01.gltf", scene, function(newMeshes) {
        var lowPolyTree3 = newMeshes[0];
        lowPolyTree3.position = new BABYLON.Vector3(90, -4, 14);
        lowPolyTree3.scaling = new BABYLON.Vector3(5, 5, 5);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/SpringModels/", "LowPolyTree01.gltf", scene, function(newMeshes) {
        var lowPolyTree4 = newMeshes[0];
        lowPolyTree4.position = new BABYLON.Vector3(100, -4, 14);
        lowPolyTree4.scaling = new BABYLON.Vector3(5, 5, 5);
    });

    //Platform 8
    var platform8 = BABYLON.MeshBuilder.CreateBox('platform8', {width:widthS, height:height, depth:depth}, scene);
    platform8.position = new BABYLON.Vector3(120, 5, 5);     //(7.5, 0, 0);
    platform8.checkCollisions = true;
    //groundObjects.push(platform1);
    platform8.material = multimatGrassB;
    platform8.subMeshes = [];
    var verticesCount = platform8.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform8);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform8);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform8);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform8);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform8);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform8);

    groundObjects.push(platform8);

    //Platform 9
    var platform9 = BABYLON.MeshBuilder.CreateBox('platform9', {width:widthS, height:height, depth:depth}, scene);
    platform9.position = new BABYLON.Vector3(130, 15, 5);     //(7.5, 0, 0);
    platform9.checkCollisions = true;
    //groundObjects.push(platform1);
    platform9.material = multimatGrassB;
    platform9.subMeshes = [];
    var verticesCount = platform9.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform9);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform9);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform9);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform9);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform9);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform9);

    groundObjects.push(platform9);

    //Platform 10
    var platform10 = BABYLON.MeshBuilder.CreateBox('platform10', {width:widthS, height:height, depth:depth}, scene);
    platform10.position = new BABYLON.Vector3(140, 25, 5);     //(7.5, 0, 0);
    platform10.checkCollisions = true;
    //groundObjects.push(platform1);
    platform10.material = multimatGrassB;
    platform10.subMeshes = [];
    var verticesCount = platform10.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform10);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform10);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform10);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform10);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform10);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform10);

    groundObjects.push(platform10);

    //Platform 11
    var platform11 = BABYLON.MeshBuilder.CreateBox('platform11', {width:widthS, height:height, depth:depth}, scene);
    platform11.position = new BABYLON.Vector3(160, 25, 5);     //(7.5, 0, 0);
    platform11.checkCollisions = true;
    //groundObjects.push(platform1);
    platform11.material = multimatGrassB;
    platform11.subMeshes = [];
    var verticesCount = platform11.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform11);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform11);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform11);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform11);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform11);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform11);

    groundObjects.push(platform11);

    //Platform 12
    var platform12 = BABYLON.MeshBuilder.CreateBox('platform12', {width:widthS, height:height, depth:depth}, scene);
    platform12.position = new BABYLON.Vector3(155, -5, 5);     //(7.5, 0, 0);
    platform12.checkCollisions = true;
    //groundObjects.push(platform1);
    platform12.material = multimatGrassB;
    platform12.subMeshes = [];
    var verticesCount = platform12.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform12);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform12);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform12);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform12);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform12);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform12);

    groundObjects.push(platform12);
    
    //Platform 13
    var platform13 = BABYLON.MeshBuilder.CreateBox('platform13', {width:widthS, height:height, depth:depth}, scene);
    platform13.position = new BABYLON.Vector3(165, 5, 5);     //(7.5, 0, 0);
    platform13.checkCollisions = true;
    //groundObjects.push(platform1);
    platform13.material = multimatGrassB;
    platform13.subMeshes = [];
    var verticesCount = platform13.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform13);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform13);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform13);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform13);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform13);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform13);

    groundObjects.push(platform13);

    //Platform 14
    var platform14 = BABYLON.MeshBuilder.CreateBox('platform14', {width:widthM, height:height, depth:depth}, scene);
    platform14.position = new BABYLON.Vector3(185, 5, 5);     //(7.5, 0, 0);
    platform14.checkCollisions = true;
    //groundObjects.push(platform1);
    platform14.material = multimatGrassB;
    platform14.subMeshes = [];
    var verticesCount = platform14.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform14);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform14);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform14);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform14);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform14);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform14);

    groundObjects.push(platform14);




    /*
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
/*
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