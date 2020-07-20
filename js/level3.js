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
    // Loading UI
    engine.displayLoadingUI();
    engine.loadingUIText = "Loading level...";
    
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

/* 
    // Skybox
    var springskybox = BABYLON.MeshBuilder.CreateBox("springbox", {size:2000.0}, scene);
    springskybox.addRotation(0.0, deg2rad(180), 0.0);
    var skyboxMaterial = new BABYLON.StandardMaterial("springbox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../Textures/skybox_spring/springbox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.infiniteDistance = true;
    skybox.material = skyboxMaterial;
*/

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

    //Set fire material
    var fireM = new BABYLON.StandardMaterial("fireM", scene);
    fireM.diffuseColor = new BABYLON.Color3(0, 0, 0);

    // Platform 0 ground
    var platform0 = BABYLON.MeshBuilder.CreateBox('platform0', {width:widthM, height:height, depth:depth}, scene);     //{width:65, height:2, depth:10}, scene);
    platform0.position = new BABYLON.Vector3(-40, 0, 5);     //(7.5, 0, 0);
    platform0.checkCollisions = true;
    //groundObjects.push(platform1);
    platform0.material = multimatGrassM;
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
    platform8.material = multimatGrassS;
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
    platform9.material = multimatGrassS;
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
    platform10.material = multimatGrassS;
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
    platform11.material = multimatGrassS;
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
    platform12.material = multimatGrassS;
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
    platform13.material = multimatGrassS;
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
    platform14.material = multimatGrassM;
    platform14.subMeshes = [];
    var verticesCount = platform14.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform14);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform14);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform14);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform14);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform14);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform14);

    groundObjects.push(platform14);


    //Platform 15
    var platform15 = BABYLON.MeshBuilder.CreateBox('platform15', {width:widthS, height:height, depth:depth}, scene);
    platform15.position = new BABYLON.Vector3(212, 5, 0);     //(7.5, 0, 0);
    platform15.checkCollisions = true;
    //groundObjects.push(platform1);
    platform15.material = multimatGrassS;
    platform15.subMeshes = [];
    var verticesCount = platform15.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform15);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform15);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform15);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform15);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform15);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform15);

    scene.registerBeforeRender(function () {
        platform15.rotation.y += 0.01;
    });

    groundObjects.push(platform15);


    //Platform 16
    var platform16= BABYLON.MeshBuilder.CreateBox('platform16', {width:widthS, height:height, depth:depth}, scene);
    platform16.position = new BABYLON.Vector3(235, -5, 0);     //(7.5, 0, 0);
    platform16.checkCollisions = true;
    //groundObjects.push(platform1);
    platform16.material = multimatGrassS;
    platform16.subMeshes = [];
    var verticesCount = platform16.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform16);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform16);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform16);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform16);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform16);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform16);

    scene.registerBeforeRender(function () {
        platform16.rotation.y -= 0.01;
    });

    groundObjects.push(platform16);


    //Platform 17
    var platform17= BABYLON.MeshBuilder.CreateBox('platform17', {width:widthS, height:height, depth:depth}, scene);
    platform17.position = new BABYLON.Vector3(257, -5, 0);     //(7.5, 0, 0);
    platform17.checkCollisions = true;
    //groundObjects.push(platform1);
    platform17.material = multimatGrassS;
    platform17.subMeshes = [];
    var verticesCount = platform17.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform17);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform17);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform17);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform17);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform17);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform17);

    scene.registerBeforeRender(function () {
        platform17.rotation.y += 0.01;
    });

    groundObjects.push(platform17);

    //Platform 18
    var platform18= BABYLON.MeshBuilder.CreateBox('platform18', {width:widthS, height:height, depth:depth}, scene);
    
    platform18.position = new BABYLON.Vector3(280, -5, 0);     //(7.5, 0, 0);
    platform18.checkCollisions = true;
    //groundObjects.push(platform1);
    platform18.material = multimatGrassS;
    platform18.subMeshes = [];
    var verticesCount = platform18.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform18);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform18);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform18);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform18);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform18);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform18);

    scene.registerBeforeRender(function () {
        platform18.rotation.y -= 0.01;
    });

    groundObjects.push(platform18);


    //Platform 19
    var platform19= BABYLON.MeshBuilder.CreateBox('platform19', {width:widthB, height:height, depth:depth}, scene);
    
    platform19.position = new BABYLON.Vector3(320, 5, 5);     //(7.5, 0, 0);
    platform19.checkCollisions = true;
    platform19.material = multimatGrassB;
    platform19.subMeshes = [];
    var verticesCount = platform19.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform19);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform19);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform19);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform19);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform19);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform19);


    groundObjects.push(platform19);

    BABYLON.SceneLoader.ImportMesh("", "../models/SpringModels/", "alberocolorato.gltf", scene, function(newMeshes) {
        var treeBall3 = newMeshes[0];
        //flowers.rotate( BABYLON.Axis.Y, -Math.PI/2 , BABYLON.Space.WORLD);
        treeBall3.position = new BABYLON.Vector3(305,6.5,9);
        treeBall3.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/SpringModels/", "red_apple.gltf", scene, function(newMeshes) {
        var redApple = newMeshes[0];
        //flowers.rotate( BABYLON.Axis.Y, -Math.PI/2 , BABYLON.Space.WORLD);
        redApple.position = new BABYLON.Vector3(306,6,7);
        redApple.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/SpringModels/", "red_apple.gltf", scene, function(newMeshes) {
        var redApple = newMeshes[0];
        //flowers.rotate( BABYLON.Axis.Y, -Math.PI/2 , BABYLON.Space.WORLD);
        redApple.position = new BABYLON.Vector3(303,6,9);
        redApple.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/SpringModels/", "red_apple.gltf", scene, function(newMeshes) {
        var redApple = newMeshes[0];
        redApple.position = new BABYLON.Vector3(300,6,5);
        redApple.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/SpringModels/", "pohon.gltf", scene, function(newMeshes) {
        var treeSet = newMeshes[0];
        treeSet.position = new BABYLON.Vector3(335, 6, 9);
        treeSet.scaling = new BABYLON.Vector3(2, 2, 2);
    });


    BABYLON.SceneLoader.ImportMesh("", "../models/SpringModels/Animals/", "Deer.gltf", scene, function(newMeshes) {
        var deer = newMeshes[0];
        deer.rotate( BABYLON.Axis.Y, Math.PI/3 , BABYLON.Space.WORLD);
        deer.position = new BABYLON.Vector3(319, 5.55, 8);
        deer.scaling = new BABYLON.Vector3(1, 1, 1);
        
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/SpringModels/Animals/", "Deer.gltf", scene, function(newMeshes) {
        var deer = newMeshes[0];
        deer.rotate( BABYLON.Axis.Y, 5*Math.PI/3 , BABYLON.Space.WORLD);
        deer.position = new BABYLON.Vector3(312, 5.55, 8);
        deer.scaling = new BABYLON.Vector3(1, 1, 1);
        
    });


    //Platform 20
    var platform20= BABYLON.MeshBuilder.CreateBox('platform20', {width:widthM, height:height, depth:depth}, scene);
    
    platform20.position = new BABYLON.Vector3(365, 5, 5);     //(7.5, 0, 0);
    platform20.checkCollisions = true;
    platform20.material = multimatGrassM;
    platform20.subMeshes = [];
    var verticesCount = platform20.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform20);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform20);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform20);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform20);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform20);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform20);


    groundObjects.push(platform20);


    //Platform 21
    var platform21= BABYLON.MeshBuilder.CreateBox('platform21', {width:widthS, height:height, depth:depth}, scene);
    
    platform21.position = new BABYLON.Vector3(385, 15, 5);     //(7.5, 0, 0);
    platform21.checkCollisions = true;
    platform21.material = multimatGrassS;
    platform21.subMeshes = [];
    var verticesCount = platform21.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform21);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform21);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform21);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform21);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform21);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform21);


    groundObjects.push(platform21);    


    //Platform 22
    var platform22= BABYLON.MeshBuilder.CreateBox('platform22', {width:widthM, height:height, depth:depth}, scene);
    
    platform22.position = new BABYLON.Vector3(402, 25, 5);     //(7.5, 0, 0);
    platform22.checkCollisions = true;
    platform22.material = multimatGrassM;
    platform22.subMeshes = [];
    var verticesCount = platform22.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform22);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform22);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform22);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform22);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform22);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform22);


    groundObjects.push(platform22);


    //Platform 23
    var platform23= BABYLON.MeshBuilder.CreateBox('platform23', {width:widthB, height:height, depth:depth}, scene);
    
    platform23.position = new BABYLON.Vector3(360, 35, 5);     //(7.5, 0, 0);
    platform23.checkCollisions = true;
    platform23.material = multimatGrassB;
    platform23.subMeshes = [];
    var verticesCount = platform23.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform23);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform23);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform23);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform23);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform23);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform23);


    groundObjects.push(platform23);


    // Fire Log
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "FireLog.gltf", scene, function(newMeshes) {
        var FireLog = newMeshes[0];
        FireLog.position = new BABYLON.Vector3(340,36,0.5);
        FireLog.scaling = new BABYLON.Vector3(2,2,2);
        FireLog.checkCollisions = true;
    });

    // Fire collision box
    var fireBox = BABYLON.MeshBuilder.CreateBox('fireBox', {width:2.5, height:2, depth:2}, scene);
    fireBox.checkCollisions = true;
    fireBox.visibility = 0;
    fireBox.material = fireM;
    fireBox.position = new BABYLON.Vector3(340,36,0.5);
    groundObjects.push(fireBox);


    //Platform 24
    var platform24= BABYLON.MeshBuilder.CreateBox('platform24', {width:widthB, height:height, depth:depth}, scene);
    
    platform24.position = new BABYLON.Vector3(428, 45, 5);     //(7.5, 0, 0);
    platform24.checkCollisions = true;
    platform24.material = multimatGrassB;
    platform24.subMeshes = [];
    var verticesCount = platform24.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform24);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform24);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform24);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform24);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform24);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform24);


    groundObjects.push(platform24);










/*
    // box1
    var box1 = BABYLON.MeshBuilder.CreateBox('box1', {width:4, height:4, depth:4}, scene);
    box1.rotation.y=6;
    box1.position = new BABYLON.Vector3(160, 9, 2.5);
    box1.checkCollisions = true;
    groundObjects.push(box1);
    box1.material = woodTex;
*/



    /*
    // Stairs 1
    for (var i=0; i<4; i++) {
        var step = BABYLON.MeshBuilder.CreateBox(`step1_${i}`, {width:2, height:2, depth:10}, scene);
        step.position = new BABYLON.Vector3(78+5*i, 8-2*i, 0);
        step.checkCollisions = true;
        groundObjects.push(step);
        step.material = ground;
    }

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
    
    //Per non ricominciare ogni volta
    player.mesh.position.x = 310;
    player.mesh.position.y = 8;

    //player.mesh.position.y = (player.height + platformHeight)/2.0;
    player.mesh.ellipsoid = new BABYLON.Vector3(player.width/2, player.height/2, player.depth/2);
    player.mesh.checkCollisions = true;
    camera.lockedTarget = player.mesh;
    
    BABYLON.SceneLoader.ImportMesh("", "../models/", "knight.gltf", scene, function(newMeshes) {
        player.initializeRoot(newMeshes[0]);
        player.initializeBody();
        player.initializeAnimations();
        player.loadingComplete = true;
    });

    scene.executeWhenReady( function() {
        engine.hideLoadingUI();
    });
    
    return scene;
}

var scene = createScene();

function fireON(){
    fireIsOn = true;
    checkpoint = new BABYLON.Vector3(340,39,0);
    //Particles system Fire
    var particles2 = new BABYLON.GPUParticleSystem("particles2", 5000, scene);
    //Texture of each particle
    particles2.particleTexture = new BABYLON.Texture("../textures/fireParticle.png", scene);
    //particles2.translationPivot = new BABYLON.Vector3(0, 0,0);
    //Where the particles come from
    
    particles2.emitter = new BABYLON.Vector3(340, 36, 0);
    
    
    particles2.minEmitBox = new BABYLON.Vector3(-0.5, 0, 0); // Starting all from
    particles2.maxEmitBox = new BABYLON.Vector3(0.5, 0, 0); // To...

    // Colors of all particles
    particles2.color1 = new BABYLON.Color4(1, 0, 0, 1.0);
    particles2.color2 = new BABYLON.Color4(1, 1, 0, 1.0);
    particles2.colorDead = new BABYLON.Color4(1, 0, 0, 0.0);

    // Size of each particle (random between...
    particles2.minSize = 0.1;
    particles2.maxSize = 0.5;

    // Life time of each particle (random between...
    particles2.minLifeTime = 0.05;
    particles2.maxLifeTime = 0.1;

    // Emission rate
    particles2.emitRate = 600;

    window.ps = particles2;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particles2.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particles2.gravity = new BABYLON.Vector3(0, 0, -2);

    // Direction of each particle after it has been emitted
    particles2.direction1 = new BABYLON.Vector3(0.2, 1, 0.2);
    particles2.direction2 = new BABYLON.Vector3(-0.2, 1, -0.2);
    
    // Angular speed, in radians
    particles2.minAngularSpeed = 0;
    particles2.maxAngularSpeed = Math.PI;

    // Speed
    particles2.minEmitPower = .01;
    particles2.maxEmitPower = 30;

    // Start the particle system
    particles2.start();
}