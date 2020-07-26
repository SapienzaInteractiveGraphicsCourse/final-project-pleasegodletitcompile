// Canvas
var canvas = document.getElementById('renderCanvas');
// 3D Engine
var engine = new BABYLON.Engine(canvas, true);

var camera;

var timeWalk = 0;
var timeJump = 0;
var timeSlide = 0;

var timeAnimation = 0;

var timeCoin = 0;
var timeCoin2 = 0;
var timeCoin3 = 0;

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

var spikes;
var spikes2;
var spikes3;
var spikes4;
var spikes5;
var spikes6;

var dmg = false;

var snowAnim = false;

var isReady = false;

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

var nextLevel = null;

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
    grassS.bumpTexture = new BABYLON.Texture("textures/grass_bump.jpg", scene);
    grassS.bumpTexture.uScale = 0.3; //0.8;
    grassS.bumpTexture.vScale = 2; //5;
    grassS.diffuseColor = new BABYLON.Color3(0.25, 1, 0.25);

    var grassS1 = new BABYLON.StandardMaterial("grass1", scene);
    grassS1.bumpTexture = new BABYLON.Texture("textures/grass_bump.jpg", scene);
    grassS1.bumpTexture.uScale = 2; //5;
    grassS1.bumpTexture.vScale =0.08; //0.5;
    grassS1.diffuseColor = new BABYLON.Color3(0.25, 1, 0.25);

    var grassS2 = new BABYLON.StandardMaterial("grass2", scene);
    grassS2.bumpTexture = new BABYLON.Texture("textures/grass_bump.jpg", scene);
    grassS2.bumpTexture.uScale = 0.08; //0.5;
    grassS2.bumpTexture.vScale =0.3; //0.8;
    grassS2.diffuseColor = new BABYLON.Color3(0.25, 1, 0.25);

    //Ground Medium Platform
    var grassM = new BABYLON.StandardMaterial("grass", scene);
    grassM.bumpTexture = new BABYLON.Texture("textures/grass_bump.jpg", scene);
    grassM.bumpTexture.uScale = 0.3;
    grassM.bumpTexture.vScale =2;
    grassM.diffuseColor = new BABYLON.Color3(0.25, 1, 0.25);

    var grassM1 = new BABYLON.StandardMaterial("grass1", scene);
    grassM1.bumpTexture = new BABYLON.Texture("textures/grass_bump.jpg", scene);
    grassM1.bumpTexture.uScale = 2;
    grassM1.bumpTexture.vScale =0.08;
    grassM1.diffuseColor = new BABYLON.Color3(0.25, 1, 0.25);

    var grassM2 = new BABYLON.StandardMaterial("grass2", scene);
    grassM2.bumpTexture = new BABYLON.Texture("textures/grass_bump.jpg", scene);
    grassM2.bumpTexture.uScale = 0.08;
    grassM2.bumpTexture.vScale = 0.3;
    grassM2.diffuseColor = new BABYLON.Color3(0.25, 1, 0.25);


    //Ground Big Platform
    var grassB = new BABYLON.StandardMaterial("grass", scene);
    grassB.bumpTexture = new BABYLON.Texture("textures/grass_bump.jpg", scene);
    grassB.bumpTexture.uScale = 0.3;
    grassB.bumpTexture.vScale =2;
    grassB.diffuseColor = new BABYLON.Color3(0.25, 1, 0.25);

    var grassB1 = new BABYLON.StandardMaterial("grass1", scene);
    grassB1.bumpTexture = new BABYLON.Texture("textures/grass_bump.jpg", scene);
    grassB1.bumpTexture.uScale = 2;
    grassB1.bumpTexture.vScale =0.08;
    grassB1.diffuseColor = new BABYLON.Color3(0.25, 1, 0.25);

    var grassB2 = new BABYLON.StandardMaterial("grass2", scene);
    grassB2.bumpTexture = new BABYLON.Texture("textures/grass_bump.jpg", scene);
    grassB2.bumpTexture.uScale = 0.08;
    grassB2.bumpTexture.vScale =0.3;
    grassB2.diffuseColor = new BABYLON.Color3(0.25, 1, 0.25);
    

    // Camera
    camera = new BABYLON.FollowCamera('camera', new BABYLON.Vector3(0, 0, 0), scene);
    camera.radius = 40;
    camera.heightOffset = 10;
    camera.rotationOffset = 180;
    // camera.attachControl(canvas, true);

 
    // Skybox
    var skybox = BABYLON.MeshBuilder.CreateBox("springbox2", {size:2000.0}, scene);
    skybox.addRotation(-deg2rad(20), deg2rad(180), 0.0);
    var skyboxMaterial = new BABYLON.StandardMaterial("springbox2", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox_spring/springbox2", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.infiniteDistance = true;
    skybox.material = skyboxMaterial;


    // Light
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1,1,0), scene);

    //Ground multimaterial
    //Small Platform MultiMaterial
    var multimatGrassS = new BABYLON.MultiMaterial("multiGround", scene);
    multimatGrassS.subMaterials.push(grassS);
    multimatGrassS.subMaterials.push(grassS1);
    multimatGrassS.subMaterials.push(grassS2);

    //Medium Platform MultiMaterial
    var multimatGrassM = new BABYLON.MultiMaterial("multiGround", scene);
    multimatGrassM.subMaterials.push(grassM);
    multimatGrassM.subMaterials.push(grassM1);
    multimatGrassM.subMaterials.push(grassM2);

    //Big Platform MultiMaterial
    var multimatGrassB = new BABYLON.MultiMaterial("multiGround", scene);
    multimatGrassB.subMaterials.push(grassB);
    multimatGrassB.subMaterials.push(grassB1);
    multimatGrassB.subMaterials.push(grassB2);

    //Set fire material
    var fireM = new BABYLON.StandardMaterial("fireM", scene);
    fireM.diffuseColor = new BABYLON.Color3(0, 0, 0);

    //Set coin material
    var coinM = new BABYLON.StandardMaterial("coinM", scene);
    coinM.diffuseColor = new BABYLON.Color3(0, 0, 0);

    //Set spikes material
    var spikesM = new BABYLON.StandardMaterial("spikesM", scene);
    spikesM.diffuseColor = new BABYLON.Color3(0, 0, 0);

    //Set portal material
    var portalM = new BABYLON.StandardMaterial("portalM", scene);
    portalM.diffuseColor = new BABYLON.Color3(0, 0, 0);

    //Set green apple material
    var green_appleM = new BABYLON.StandardMaterial("multiGround", scene);
    green_appleM.diffuseColor = new BABYLON.Color3(0, 1, 0);

    //Set yellow apple material
    var yellow_appleM = new BABYLON.StandardMaterial("multiGround", scene);
    yellow_appleM.diffuseColor = new BABYLON.Color3(1, 1, 0);

    //Set red apple material
    var red_appleM = new BABYLON.StandardMaterial("multiGround", scene);
    red_appleM.diffuseColor = new BABYLON.Color3(1, 0, 0);



    // Platform 1 ground
    var platform1 = BABYLON.MeshBuilder.CreateBox('platform1', {width:widthB, height:height, depth:depth}, scene);     //{width:65, height:2, depth:10}, scene);
    platform1.position = new BABYLON.Vector3(0, 0, 5);
    platform1.checkCollisions = true;
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
    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "alberocolorato.gltf", scene, function(newMeshes) {
        var treeBall = newMeshes[0];
        treeBall.position = new BABYLON.Vector3(10,1.5,9);
        treeBall.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "alberocolorato.gltf", scene, function(newMeshes) {
        var treeBall2 = newMeshes[0];
        treeBall2.rotate( BABYLON.Axis.Y, -Math.PI/2 , BABYLON.Space.WORLD);
        treeBall2.position = new BABYLON.Vector3(-20,1.5,9);
        treeBall2.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "longTree.gltf", scene, function(newMeshes) {
        var longTree = newMeshes[0];
        longTree.position = new BABYLON.Vector3(0,1.5,9);
        longTree.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "longTree.gltf", scene, function(newMeshes) {
        var longTree = newMeshes[0];
        longTree.position = new BABYLON.Vector3(18,1.5,9);
        longTree.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/", "woodColored.gltf", scene, function(newMeshes) {
        var wood = newMeshes[0];
        wood.rotate( BABYLON.Axis.Y, -Math.PI/4 , BABYLON.Space.WORLD);
        wood.position = new BABYLON.Vector3(-7,1.5,9);
        wood.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/", "woodColored.gltf", scene, function(newMeshes) {
        var wood = newMeshes[0];
        wood.rotate( BABYLON.Axis.Y, -Math.PI/4 , BABYLON.Space.WORLD);
        wood.position = new BABYLON.Vector3(-12,1.5,9);
        wood.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Animals/", "butterfly.gltf", scene, function(newMeshes) {
        var butterfly = newMeshes[0];
        butterfly.rotate( BABYLON.Axis.Y, -Math.PI/2 , BABYLON.Space.WORLD);
        butterfly.rotate( BABYLON.Axis.Z, Math.PI/4 , BABYLON.Space.WORLD);
        butterfly.position = new BABYLON.Vector3(-6,3.5,8);
        butterfly.scaling = new BABYLON.Vector3(25, 25, 25);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Animals/", "butterfly.gltf", scene, function(newMeshes) {
        var butterfly = newMeshes[1];
        butterfly.rotate( BABYLON.Axis.Y, Math.PI/2 , BABYLON.Space.WORLD);
        butterfly.rotate( BABYLON.Axis.Z, Math.PI/4 , BABYLON.Space.WORLD);
        butterfly.position = new BABYLON.Vector3(10,3.5,8);
        butterfly.scaling = new BABYLON.Vector3(25, 25, 25);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Animals/", "Deer.gltf", scene, function(newMeshes) {
        var deer = newMeshes[0];
        deer.rotate( BABYLON.Axis.Y, Math.PI/3 , BABYLON.Space.WORLD);
        deer.position = new BABYLON.Vector3(16, 0.99, 8);
        deer.scaling = new BABYLON.Vector3(1, 1, 1);
        
    });

    



    //Platform2 
    var platform2 = BABYLON.MeshBuilder.CreateBox('platform2', {width:widthM, height:height, depth:depth}, scene);
    platform2.position = new BABYLON.Vector3(45, -15, 5);
    platform2.checkCollisions = true;
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
    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "pohon.gltf", scene, function(newMeshes) {
        var treeSet = newMeshes[0];
        treeSet.position = new BABYLON.Vector3(47, -14, 9);
        treeSet.scaling = new BABYLON.Vector3(2, 2, 2);
    });


    //Platform3 
    var platform3 = BABYLON.MeshBuilder.CreateBox('platform3', {width:widthS, height:height, depth:depth}, scene);
    platform3.position = new BABYLON.Vector3(35, 10, 5);
    platform3.checkCollisions = true;
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

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "fleur.gltf", scene, function(newMeshes) {
        var fleur = newMeshes[0];
        fleur.position = new BABYLON.Vector3(35, 10, 9);
        fleur.scaling = new BABYLON.Vector3(2, 2, 2);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "fleur.gltf", scene, function(newMeshes) {
        var fleur = newMeshes[0];
        fleur.position = new BABYLON.Vector3(34, 10, 10);
        fleur.scaling = new BABYLON.Vector3(2, 2, 2);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "fleur.gltf", scene, function(newMeshes) {
        var fleur = newMeshes[0];
        fleur.position = new BABYLON.Vector3(36, 10, 10);
        fleur.scaling = new BABYLON.Vector3(2, 2, 2);
    });



    //Platform4 
    var platform4 = BABYLON.MeshBuilder.CreateBox('platform4', {width:widthM, height:height, depth:depth}, scene);
    platform4.position = new BABYLON.Vector3(50, 20, 5);
    platform4.checkCollisions = true;
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
    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "LowTree.gltf", scene, function(newMeshes) {
        var lowTree = newMeshes[0];
        lowTree.position = new BABYLON.Vector3(52, 21, 9);
        lowTree.scaling = new BABYLON.Vector3(10, 10, 10);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/", "staccionata.gltf", scene, function(newMeshes) {
        var staccionata = newMeshes[0];
        staccionata.rotate( BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
        staccionata.position = new BABYLON.Vector3(45, 20.5, 8);
        staccionata.scaling = new BABYLON.Vector3(1, 1, 1);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/", "staccionata.gltf", scene, function(newMeshes) {
        var staccionata = newMeshes[0];
        staccionata.rotate( BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
        staccionata.position = new BABYLON.Vector3(50, 20.5, 8);
        staccionata.scaling = new BABYLON.Vector3(1, 1, 1);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/", "staccionata.gltf", scene, function(newMeshes) {
        var staccionata = newMeshes[0];
        staccionata.rotate( BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
        staccionata.position = new BABYLON.Vector3(55, 20.5, 8);
        staccionata.scaling = new BABYLON.Vector3(1, 1, 1);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "plant.gltf", scene, function(newMeshes) {
        var plant = newMeshes[0];
        plant.position = new BABYLON.Vector3(45, 21, 9);
        plant.scaling = new BABYLON.Vector3(0.005, 0.005, 0.005);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "plant.gltf", scene, function(newMeshes) {
        var plant = newMeshes[0];
        plant.position = new BABYLON.Vector3(48, 21, 9);
        plant.scaling = new BABYLON.Vector3(0.005, 0.005, 0.005);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "plant.gltf", scene, function(newMeshes) {
        var plant = newMeshes[0];
        plant.position = new BABYLON.Vector3(55, 21, 9);
        plant.scaling = new BABYLON.Vector3(0.005, 0.005, 0.005);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "plant.gltf", scene, function(newMeshes) {
        var plant = newMeshes[0];
        plant.position = new BABYLON.Vector3(58, 21, 9);
        plant.scaling = new BABYLON.Vector3(0.005, 0.005, 0.005);
    });


    //Platform5 
    var platform5 = BABYLON.MeshBuilder.CreateBox('platform5', {width:widthS, height:height, depth:depth}, scene);
    platform5.position = new BABYLON.Vector3(72, 10, 5);
    platform5.checkCollisions = true;
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
    platform6.position = new BABYLON.Vector3(72, 10, 5);
    platform6.checkCollisions = true;
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
    platform7.position = new BABYLON.Vector3(90, -5, 5);
    platform7.checkCollisions = true;
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
    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/", "stone.gltf", scene, function(newMeshes) {
        var stone = newMeshes[0];
        stone.position = new BABYLON.Vector3(68, -3.8, 0);
        stone.scaling = new BABYLON.Vector3(2, 2, 2);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/", "stone_moss.gltf", scene, function(newMeshes) {
        var stone = newMeshes[0];
        stone.position = new BABYLON.Vector3(72, -3.8, 9);
        stone.scaling = new BABYLON.Vector3(3, 3, 3);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "LowPolyTree01.gltf", scene, function(newMeshes) {
        var lowPolyTree = newMeshes[0];
        lowPolyTree.position = new BABYLON.Vector3(70, -4.5, 14);
        lowPolyTree.scaling = new BABYLON.Vector3(5, 5, 5);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "flowers.gltf", scene, function(newMeshes) {
        var flowers = newMeshes[0];
        flowers.rotate( BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(76, -4, 9);
        flowers.scaling = new BABYLON.Vector3(7, 7, 7);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "LowPolyTree01.gltf", scene, function(newMeshes) {
        var lowPolyTree2 = newMeshes[0];
        lowPolyTree2.position = new BABYLON.Vector3(80, -4.5, 15);
        lowPolyTree2.scaling = new BABYLON.Vector3(5, 5, 5);
    }); 

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/", "stone_moss.gltf", scene, function(newMeshes) {
        var stone = newMeshes[0];
        stone.rotate( BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
        stone.position = new BABYLON.Vector3(92, -3.8, 9);
        stone.scaling = new BABYLON.Vector3(3, 3, 3);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Animals/", "butterfly.gltf", scene, function(newMeshes) {
        var butterfly = newMeshes[0];
        butterfly.rotate( BABYLON.Axis.Y, -Math.PI/2 , BABYLON.Space.WORLD);
        butterfly.rotate( BABYLON.Axis.Z, Math.PI/4 , BABYLON.Space.WORLD);
        butterfly.position = new BABYLON.Vector3(90, -0.5, 8);
        butterfly.scaling = new BABYLON.Vector3(26, 26, 26);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "LowPolyTree01.gltf", scene, function(newMeshes) {
        var lowPolyTree3 = newMeshes[0];
        lowPolyTree3.position = new BABYLON.Vector3(90, -4.5, 15);
        lowPolyTree3.scaling = new BABYLON.Vector3(5, 5, 5);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "flowers.gltf", scene, function(newMeshes) {
        var flowers = newMeshes[0];
        flowers.rotate( BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(96, -4, 9);
        flowers.scaling = new BABYLON.Vector3(7, 7, 7);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "LowPolyTree01.gltf", scene, function(newMeshes) {
        var lowPolyTree4 = newMeshes[0];
        lowPolyTree4.position = new BABYLON.Vector3(100, -4.5, 15);
        lowPolyTree4.scaling = new BABYLON.Vector3(5, 5, 5);
    });

    //Platform 8
    var platform8 = BABYLON.MeshBuilder.CreateBox('platform8', {width:widthS, height:height, depth:depth}, scene);
    platform8.position = new BABYLON.Vector3(120, 5, 5);
    platform8.checkCollisions = true;
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

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/", "woodColored.gltf", scene, function(newMeshes) {
        var wood = newMeshes[0];
        wood.rotate( BABYLON.Axis.Y, -Math.PI/4 , BABYLON.Space.WORLD);
        wood.position = new BABYLON.Vector3(120, 6.5, 9);
        wood.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Animals/", "butterfly.gltf", scene, function(newMeshes) {
        var butterfly = newMeshes[0];
        butterfly.rotate( BABYLON.Axis.Y, -Math.PI/2 , BABYLON.Space.WORLD);
        butterfly.rotate( BABYLON.Axis.Z, Math.PI/4 , BABYLON.Space.WORLD);
        butterfly.position = new BABYLON.Vector3(120, 8.5, 8);
        butterfly.scaling = new BABYLON.Vector3(25, 25, 25);
    });

    //Platform 9
    var platform9 = BABYLON.MeshBuilder.CreateBox('platform9', {width:widthS, height:height, depth:depth}, scene);
    platform9.position = new BABYLON.Vector3(130, 15, 5);
    platform9.checkCollisions = true;
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

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "fleur.gltf", scene, function(newMeshes) {
        var fleur = newMeshes[0];
        fleur.position = new BABYLON.Vector3(130, 15, 9);
        fleur.scaling = new BABYLON.Vector3(2, 2, 2);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "fleur.gltf", scene, function(newMeshes) {
        var fleur = newMeshes[0];
        fleur.position = new BABYLON.Vector3(129, 15, 10);
        fleur.scaling = new BABYLON.Vector3(2, 2, 2);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "fleur.gltf", scene, function(newMeshes) {
        var fleur = newMeshes[0];
        fleur.position = new BABYLON.Vector3(131, 15, 10);
        fleur.scaling = new BABYLON.Vector3(2, 2, 2);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Animals/", "bee.gltf", scene, function(newMeshes) {
        var bee = newMeshes[0];
        bee.rotate( BABYLON.Axis.Y, -Math.PI/4 , BABYLON.Space.WORLD);
        bee.position = new BABYLON.Vector3(129, 20, 10);
        bee.scaling = new BABYLON.Vector3(60, 60, 60);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Animals/", "bee.gltf", scene, function(newMeshes) {
        var bee = newMeshes[0];
        bee.rotate( BABYLON.Axis.Y, Math.PI/4 , BABYLON.Space.WORLD);
        bee.position = new BABYLON.Vector3(130, 20, 9);
        bee.scaling = new BABYLON.Vector3(60, 60, 60);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Animals/", "bee.gltf", scene, function(newMeshes) {
        var bee = newMeshes[0];
        bee.rotate( BABYLON.Axis.Y, -Math.PI/4 , BABYLON.Space.WORLD);
        bee.position = new BABYLON.Vector3(131, 22, 9);
        bee.scaling = new BABYLON.Vector3(60, 60, 60);
    });


    //Platform 10
    var platform10 = BABYLON.MeshBuilder.CreateBox('platform10', {width:widthS, height:height, depth:depth}, scene);
    platform10.position = new BABYLON.Vector3(140, 25, 5);
    platform10.checkCollisions = true;
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


    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "alberocolorato.gltf", scene, function(newMeshes) {
        var treeBall = newMeshes[0];
        treeBall.position = new BABYLON.Vector3(140, 25, 9);
        treeBall.scaling = new BABYLON.Vector3(0.4, 0.4, 0.4);
    })

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Animals/", "bird.gltf", scene, function(newMeshes) {
        var bird = newMeshes[0];
        bird.position = new BABYLON.Vector3(143, 40, 9);
        bird.scaling = new BABYLON.Vector3(20, 20, 20);
    })

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Animals/", "bird.gltf", scene, function(newMeshes) {
        var bird = newMeshes[0];
        bird.rotate( BABYLON.Axis.Y, -Math.PI/2 , BABYLON.Space.WORLD);
        bird.position = new BABYLON.Vector3(139, 35, 9);
        bird.scaling = new BABYLON.Vector3(20, 20, 20);
    })




    //Platform 11
    var platform11 = BABYLON.MeshBuilder.CreateBox('platform11', {width:widthM, height:height, depth:depth}, scene);
    platform11.position = new BABYLON.Vector3(160, 35, 5);
    platform11.checkCollisions = true;
    platform11.material = multimatGrassM;
    platform11.subMeshes = [];
    var verticesCount = platform11.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform11);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform11);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform11);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform11);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform11);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform11);

    groundObjects.push(platform11);

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "longTree.gltf", scene, function(newMeshes) {
        var longTree = newMeshes[0];
        longTree.position = new BABYLON.Vector3(155, 35, 9);
        longTree.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "longTree.gltf", scene, function(newMeshes) {
        var longTree = newMeshes[0];
        longTree.position = new BABYLON.Vector3(165, 35, 9);
        longTree.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/", "stone_moss.gltf", scene, function(newMeshes) {
        var stone = newMeshes[0];
        stone.position = new BABYLON.Vector3(160, 36.5, 9);
        stone.scaling = new BABYLON.Vector3(3, 3, 3);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Animals/", "bird.gltf", scene, function(newMeshes) {
        var bird = newMeshes[0];
        bird.rotate( BABYLON.Axis.X, Math.PI/6 , BABYLON.Space.WORLD);
        bird.position = new BABYLON.Vector3(160, 38.75, 9);
        bird.scaling = new BABYLON.Vector3(20, 20, 20);
    })

    // Fire Log
    BABYLON.SceneLoader.ImportMesh("", "models/WinterModels/", "FireLog.gltf", scene, function(newMeshes) {
        var FireLog = newMeshes[0];
        FireLog.position = new BABYLON.Vector3(155, 36, 0.5);
        FireLog.scaling = new BABYLON.Vector3(2,2,2);
        FireLog.checkCollisions = true;
    });

    // Fire collision box
    var fireBox = BABYLON.MeshBuilder.CreateBox('fireBox', {width:2.5, height:2, depth:2}, scene);
    fireBox.checkCollisions = true;
    fireBox.visibility = 0;
    fireBox.material = fireM;
    fireBox.position = new BABYLON.Vector3(155, 36, 0.5);
    groundObjects.push(fireBox);

    // COIN 1
    BABYLON.SceneLoader.ImportMesh("", "models/", "coin.gltf", scene, function(newMeshes) {
        coin1 = newMeshes[0];
        coin1.position = new BABYLON.Vector3(165, 38, 0);
        coin1.scaling = new BABYLON.Vector3(10,10,10);
        coin1.rotation = new BABYLON.Vector3(deg2rad(-90),0,0);
        Coin(coin1); // start animation
    });


    // Coin collision box
    var coinBox = BABYLON.MeshBuilder.CreateCylinder('coinBox', {height: 2, diameterTop: 2.3, diameterBottom: 2.3, tessellation: 100, subdivisons: 10}, scene);
    coinBox.visibility = 0;
    coinBox.material = coinM;
    coinBox.position = new BABYLON.Vector3(165, 38, 0);
    coinBox.rotate(new BABYLON.Vector3(1,0,0), 1.6);
    groundObjects.push(coinBox);  

    //Platform 12
    var platform12 = BABYLON.MeshBuilder.CreateBox('platform12', {width:widthS, height:height, depth:depth}, scene);
    platform12.position = new BABYLON.Vector3(155, -5, 5);
    platform12.checkCollisions = true;
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
    platform13.position = new BABYLON.Vector3(165, 5, 5);
    platform13.checkCollisions = true;

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
    platform14.position = new BABYLON.Vector3(185, 5, 5);
    platform14.checkCollisions = true;
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

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "pohon.gltf", scene, function(newMeshes) {
        var treeSet = newMeshes[0];
        treeSet.position = new BABYLON.Vector3(187, 6, 9);
        treeSet.scaling = new BABYLON.Vector3(2, 2, 2);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Animals/", "bird.gltf", scene, function(newMeshes) {
        var bird = newMeshes[0];
        bird.rotate( BABYLON.Axis.X, Math.PI/6 , BABYLON.Space.WORLD);
        bird.position = new BABYLON.Vector3(183, 8.75, 9);
        bird.scaling = new BABYLON.Vector3(20, 20, 20);
    })

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Animals/", "butterfly.gltf", scene, function(newMeshes) {
        var butterfly = newMeshes[0];
        butterfly.rotate( BABYLON.Axis.Y, -Math.PI/2 , BABYLON.Space.WORLD);
        butterfly.rotate( BABYLON.Axis.Z, Math.PI/4 , BABYLON.Space.WORLD);
        butterfly.position = new BABYLON.Vector3(182, 10, 8);
        butterfly.scaling = new BABYLON.Vector3(25, 25, 25);
    });


    //Platform 15
    var platform15 = BABYLON.MeshBuilder.CreateBox('platform15', {width:widthS, height:height, depth:depth}, scene);
    platform15.position = new BABYLON.Vector3(212, 5, 0);
    platform15.checkCollisions = true;
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
    platform16.position = new BABYLON.Vector3(235, -5, 0);
    platform16.checkCollisions = true;
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
    platform17.position = new BABYLON.Vector3(257, -5, 0);
    platform17.checkCollisions = true;
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
    platform18.position = new BABYLON.Vector3(280, -5, 0);
    platform18.checkCollisions = true;
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
    platform19.position = new BABYLON.Vector3(320, 5, 5);
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

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "alberocolorato.gltf", scene, function(newMeshes) {
        var treeBall3 = newMeshes[0];
        treeBall3.position = new BABYLON.Vector3(305,6.5,9);
        treeBall3.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "red_apple.gltf", scene, function(newMeshes) {
        var redApple = newMeshes[0];
        redApple.position = new BABYLON.Vector3(306,6,7);
        redApple.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "red_apple.gltf", scene, function(newMeshes) {
        var redApple = newMeshes[0];
        redApple.position = new BABYLON.Vector3(303,6,9);
        redApple.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "red_apple.gltf", scene, function(newMeshes) {
        var redApple = newMeshes[0];
        redApple.position = new BABYLON.Vector3(300,6,5);
        redApple.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "pohon.gltf", scene, function(newMeshes) {
        var treeSet = newMeshes[0];
        treeSet.position = new BABYLON.Vector3(335, 6, 9);
        treeSet.scaling = new BABYLON.Vector3(2, 2, 2);
    });


    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Animals/", "Deer.gltf", scene, function(newMeshes) {
        var deer = newMeshes[0];
        deer.rotate( BABYLON.Axis.Y, Math.PI/3 , BABYLON.Space.WORLD);
        deer.position = new BABYLON.Vector3(319, 5.55, 8);
        deer.scaling = new BABYLON.Vector3(1, 1, 1);
        
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Animals/", "Deer.gltf", scene, function(newMeshes) {
        var deer = newMeshes[0];
        deer.rotate( BABYLON.Axis.Y, 5*Math.PI/3 , BABYLON.Space.WORLD);
        deer.position = new BABYLON.Vector3(312, 5.55, 8);
        deer.scaling = new BABYLON.Vector3(1, 1, 1);
        
    });


    //Platform 20
    var platform20= BABYLON.MeshBuilder.CreateBox('platform20', {width:widthM, height:height, depth:depth}, scene);
    
    platform20.position = new BABYLON.Vector3(365, 5, 5);
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

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "longTree.gltf", scene, function(newMeshes) {
        var longTree = newMeshes[0];
        longTree.position = new BABYLON.Vector3(360, 5, 9);
        longTree.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
        longTree.checkCollisions=true;
        
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "LowPolyTree01.gltf", scene, function(newMeshes) {
        var lowPolyTree4 = newMeshes[0];
        lowPolyTree4.position = new BABYLON.Vector3(357, 5, 17);
        lowPolyTree4.scaling = new BABYLON.Vector3(6, 6, 6);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "longTree.gltf", scene, function(newMeshes) {
        var longTree = newMeshes[0];
        longTree.position = new BABYLON.Vector3(370, 5, 9);
        longTree.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
        longTree.checkCollisions=true;
        
    });


    //Platform 21
    var platform21= BABYLON.MeshBuilder.CreateBox('platform21', {width:widthS, height:height, depth:depth}, scene);
    
    platform21.position = new BABYLON.Vector3(385, 15, 5);
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


    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "LowPolyTree01.gltf", scene, function(newMeshes) {
        var lowPolyTree4 = newMeshes[0];
        lowPolyTree4.position = new BABYLON.Vector3(388, 25, 17);
        lowPolyTree4.scaling = new BABYLON.Vector3(6, 6, 6);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "LowPolyTree01.gltf", scene, function(newMeshes) {
        var lowPolyTree4 = newMeshes[0];
        lowPolyTree4.position = new BABYLON.Vector3(393, 25, 17);
        lowPolyTree4.scaling = new BABYLON.Vector3(6, 6, 6);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "LowPolyTree01.gltf", scene, function(newMeshes) {
        var lowPolyTree4 = newMeshes[0];
        lowPolyTree4.position = new BABYLON.Vector3(398, 25, 17);
        lowPolyTree4.scaling = new BABYLON.Vector3(6, 6, 6);
    });



    //Platform 23
    var platform23= BABYLON.MeshBuilder.CreateBox('platform23', {width:widthB, height:height, depth:depth}, scene);
    
    platform23.position = new BABYLON.Vector3(360, 35, 5);
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


    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "longTree.gltf", scene, function(newMeshes) {
        var longTree = newMeshes[0];
        longTree.position = new BABYLON.Vector3(340, 35, 9);
        longTree.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
        longTree.checkCollisions=true;
        
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "pohon.gltf", scene, function(newMeshes) {
        var pohonTree = newMeshes[0];
        pohonTree.rotate( BABYLON.Axis.Y, Math.PI , BABYLON.Space.WORLD);
        pohonTree.position = new BABYLON.Vector3(355, 36, 9);
        pohonTree.scaling = new BABYLON.Vector3(2, 2, 2);
        pohonTree.checkCollisions=true;
        
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "longTree.gltf", scene, function(newMeshes) {
        var longTree = newMeshes[0];
        longTree.position = new BABYLON.Vector3(375, 35, 9);
        longTree.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
        longTree.checkCollisions=true;
        
    });



    //Platform 24
    var platform24= BABYLON.MeshBuilder.CreateBox('platform24', {width:widthB, height:height, depth:depth}, scene);   
    platform24.position = new BABYLON.Vector3(428, 45, 5); 
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

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "green_apple.gltf", scene, function(newMeshes) {
        var greenApple = newMeshes[0];
        greenApple.rotate( BABYLON.Axis.Y, 5*Math.PI/3 , BABYLON.Space.WORLD);
        greenApple.position = new BABYLON.Vector3(419, 46, 1);
        greenApple.scaling = new BABYLON.Vector3(4, 4, 4);
        greenApple.checkCollisions=true;
        
    });

    // apple collision box
    var appleBox = BABYLON.MeshBuilder.CreateBox('appleBox', {width: 9, height:9, depth:9}, scene);
    appleBox.checkCollisions = true;
    appleBox.visibility = 0;
    appleBox.material = green_appleM;
    appleBox.position = new BABYLON.Vector3(419, 50, 1);
    groundObjects.push(appleBox);


    // Spikes
    BABYLON.SceneLoader.ImportMesh("", "models/", "spikeTrap.gltf", scene, function(newMeshes) {
        var spikeTrap = newMeshes[0];
        spikeTrap.position = new BABYLON.Vector3(425.25, 46, 0.5);
        spikeTrap.scaling = new BABYLON.Vector3(1.8,0.8,1.8);
        spikeTrap.checkCollisions = true;
        spikes = spikeTrap._children[0];
        //spikes.position.y = -1;
    });

    // Spikes collision box 
    var spikeBox = BABYLON.MeshBuilder.CreateBox('spikes', {width:5, height:1, depth:5}, scene);
    spikeBox.checkCollisions = true;
    spikeBox.visibility = 0;
    spikeBox.material = spikesM;
    spikeBox.position = new BABYLON.Vector3(425.25, 46, 0.5);
    groundObjects.push(spikeBox);

    // Spikes
    BABYLON.SceneLoader.ImportMesh("", "models/", "spikeTrap.gltf", scene, function(newMeshes) {
        var spikeTrap = newMeshes[0];
        spikeTrap.position = new BABYLON.Vector3(431.75, 46, 0.5);
        spikeTrap.scaling = new BABYLON.Vector3(1.8,0.8,1.8);
        spikeTrap.checkCollisions = true;
        spikes2 = spikeTrap._children[0];
        //spikes.position.y = -1;
    });

    // Spikes collision box 
    var spikeBox = BABYLON.MeshBuilder.CreateBox('spikes2', {width:5, height:1, depth:5}, scene);
    spikeBox.checkCollisions = true;
    spikeBox.visibility = 0;
    spikeBox.material = spikesM;
    spikeBox.position = new BABYLON.Vector3(431.75, 46, 0.5);
    groundObjects.push(spikeBox);

    // Spikes
    BABYLON.SceneLoader.ImportMesh("", "models/", "spikeTrap.gltf", scene, function(newMeshes) {
        var spikeTrap = newMeshes[0];
        spikeTrap.position = new BABYLON.Vector3(438.5, 46, 0.5);
        spikeTrap.scaling = new BABYLON.Vector3(1.8,0.8,1.8);
        spikeTrap.checkCollisions = true;
        spikes3 = spikeTrap._children[0];
        //spikes.position.y = -1;
    });

    // Spikes collision box 
    var spikeBox = BABYLON.MeshBuilder.CreateBox('spikes3', {width:5, height:1, depth:5}, scene);
    spikeBox.checkCollisions = true;
    spikeBox.visibility = 0;
    spikeBox.material = spikesM;
    spikeBox.position = new BABYLON.Vector3(438.5, 46, 0.5);
    groundObjects.push(spikeBox);



    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "yellow_apple.gltf", scene, function(newMeshes) {
        var yellowApple = newMeshes[0];
        yellowApple.rotate( BABYLON.Axis.Y, 5*Math.PI/3 , BABYLON.Space.WORLD);
        yellowApple.position = new BABYLON.Vector3(444.5, 46, 1);
        yellowApple.scaling = new BABYLON.Vector3(4, 4, 4);
        yellowApple.checkCollisions=true;
        
    });

    // apple collision box
    var appleBox = BABYLON.MeshBuilder.CreateBox('appleBox', {width: 9, height:9, depth:9}, scene);
    appleBox.checkCollisions = true;
    appleBox.visibility = 0;
    appleBox.material = yellow_appleM;
    appleBox.position = new BABYLON.Vector3(444.5, 50, 1);
    groundObjects.push(appleBox);


    // Spikes
    BABYLON.SceneLoader.ImportMesh("", "models/", "spikeTrap.gltf", scene, function(newMeshes) {
        var spikeTrap = newMeshes[0];
        spikeTrap.position = new BABYLON.Vector3(450.25, 46, 0.5);
        spikeTrap.scaling = new BABYLON.Vector3(1.8,0.8,1.8);
        spikeTrap.checkCollisions = true;
        spikes4 = spikeTrap._children[0];
        //spikes.position.y = -1;
    });

    // Spikes collision box 
    var spikeBox = BABYLON.MeshBuilder.CreateBox('spikes4', {width:5, height:1, depth:5}, scene);
    spikeBox.checkCollisions = true;
    spikeBox.visibility = 0;
    spikeBox.material = spikesM;
    spikeBox.position = new BABYLON.Vector3(450.25, 46, 0.5);
    groundObjects.push(spikeBox);

    // Spikes
    BABYLON.SceneLoader.ImportMesh("", "models/", "spikeTrap.gltf", scene, function(newMeshes) {
        var spikeTrap = newMeshes[0];
        spikeTrap.position = new BABYLON.Vector3(456.75, 46, 0.5);
        spikeTrap.scaling = new BABYLON.Vector3(1.8,0.8,1.8);
        spikeTrap.checkCollisions = true;
        spikes5 = spikeTrap._children[0];
        //spikes.position.y = -1;
    });

    // Spikes collision box 
    var spikeBox = BABYLON.MeshBuilder.CreateBox('spikes5', {width:5, height:1, depth:5}, scene);
    spikeBox.checkCollisions = true;
    spikeBox.visibility = 0;
    spikeBox.material = spikesM;
    spikeBox.position = new BABYLON.Vector3(456.75, 46, 0.5);
    groundObjects.push(spikeBox);

    // Spikes
    BABYLON.SceneLoader.ImportMesh("", "models/", "spikeTrap.gltf", scene, function(newMeshes) {
        var spikeTrap = newMeshes[0];
        spikeTrap.position = new BABYLON.Vector3(463.5, 46, 0.5);
        spikeTrap.scaling = new BABYLON.Vector3(1.8,0.8,1.8);
        spikeTrap.checkCollisions = true;
        spikes6 = spikeTrap._children[0];
        //spikes.position.y = -1;
    });

    // Spikes collision box 
    var spikeBox = BABYLON.MeshBuilder.CreateBox('spikes6', {width:5, height:1, depth:5}, scene);
    spikeBox.checkCollisions = true;
    spikeBox.visibility = 0;
    spikeBox.material = spikesM;
    spikeBox.position = new BABYLON.Vector3(463.5, 46, 0.5);
    groundObjects.push(spikeBox);


    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "red_apple.gltf", scene, function(newMeshes) {
        var yellowApple = newMeshes[0];
        yellowApple.rotate( BABYLON.Axis.Y, 5*Math.PI/3 , BABYLON.Space.WORLD);
        yellowApple.position = new BABYLON.Vector3(470, 46, 1);
        yellowApple.scaling = new BABYLON.Vector3(4, 4, 4);
        yellowApple.checkCollisions=true;
        
    });

    // apple collision box
    var appleBox = BABYLON.MeshBuilder.CreateBox('appleBox', {width: 9, height:9, depth:9}, scene);
    appleBox.checkCollisions = true;
    appleBox.visibility = 0;
    appleBox.material = red_appleM;
    appleBox.position = new BABYLON.Vector3(470, 50, 1);
    groundObjects.push(appleBox);


    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "LowPolyTree01.gltf", scene, function(newMeshes) {
        var lowPolyTree = newMeshes[0];
        lowPolyTree.position = new BABYLON.Vector3(410, 46, 17);
        lowPolyTree.scaling = new BABYLON.Vector3(6, 6, 6);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "LowTree.gltf", scene, function(newMeshes) {
        var lowPolyTree2 = newMeshes[0];
        lowPolyTree2.position = new BABYLON.Vector3(427, 46, 10);
        lowPolyTree2.scaling = new BABYLON.Vector3(10, 10, 10);
    }); 

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "LowPolyTree01.gltf", scene, function(newMeshes) {
        var lowPolyTree3 = newMeshes[0];
        lowPolyTree3.position = new BABYLON.Vector3(430, 46, 17);
        lowPolyTree3.scaling = new BABYLON.Vector3(6, 6, 6);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "LowTree.gltf", scene, function(newMeshes) {
        var lowPolyTree4 = newMeshes[0];
        lowPolyTree4.position = new BABYLON.Vector3(447, 46, 10);
        lowPolyTree4.scaling = new BABYLON.Vector3(10, 10, 10);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "LowPolyTree01.gltf", scene, function(newMeshes) {
        var lowPolyTree3 = newMeshes[0];
        lowPolyTree3.position = new BABYLON.Vector3(450, 46, 17);
        lowPolyTree3.scaling = new BABYLON.Vector3(6, 6, 6);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "LowTree.gltf", scene, function(newMeshes) {
        var lowPolyTree4 = newMeshes[0];
        lowPolyTree4.position = new BABYLON.Vector3(467, 46, 10);
        lowPolyTree4.scaling = new BABYLON.Vector3(10, 10, 10);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "LowPolyTree01.gltf", scene, function(newMeshes) {
        var lowPolyTree3 = newMeshes[0];
        lowPolyTree3.position = new BABYLON.Vector3(470, 46, 17);
        lowPolyTree3.scaling = new BABYLON.Vector3(6, 6, 6);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "LowTree.gltf", scene, function(newMeshes) {
        var lowPolyTree4 = newMeshes[0];
        lowPolyTree4.position = new BABYLON.Vector3(487, 46, 10);
        lowPolyTree4.scaling = new BABYLON.Vector3(10, 10, 10);
    });
    
    


    //Platform 25
    var platform25= BABYLON.MeshBuilder.CreateBox('platform25', {width:widthB, height:height, depth:depth}, scene);
    
    platform25.position = new BABYLON.Vector3(478, 45, 5);     
    platform25.checkCollisions = true;
    platform25.material = multimatGrassB;
    platform25.subMeshes = [];
    var verticesCount = platform25.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform25);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform25);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform25);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform25);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform25);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform25);


    groundObjects.push(platform25);


    //Platform 26
    var platform26= BABYLON.MeshBuilder.CreateBox('platform26', {width:widthS, height:height, depth:depth}, scene);
    
    platform26.position = new BABYLON.Vector3(466, 68, 0);     
    platform26.checkCollisions = true;
    platform26.material = multimatGrassS;
    platform26.subMeshes = [];
    var verticesCount = platform26.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform26);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform26);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform26);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform26);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform26);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform26);


    groundObjects.push(platform26);

    scene.registerBeforeRender(function () {
        platform26.rotation.y += 0.01;
    });

    // COIN 3
    BABYLON.SceneLoader.ImportMesh("", "models/", "coin.gltf", scene, function(newMeshes) {
        coin3 = newMeshes[0];
        coin3.position = new BABYLON.Vector3(480, 80, 0);
        coin3.scaling = new BABYLON.Vector3(10,10,10);
        coin3.rotation = new BABYLON.Vector3(deg2rad(-90),0,0);
        Coin(coin3); // start animation
    });


    // Coin collision box
    var coinBox = BABYLON.MeshBuilder.CreateCylinder('coinBox3', {height: 2, diameterTop: 2.3, diameterBottom: 2.3, tessellation: 100, subdivisons: 10}, scene);
    coinBox.visibility = 0;
    coinBox.material = coinM;
    coinBox.position = new BABYLON.Vector3(480, 80, 0);
    coinBox.rotate(new BABYLON.Vector3(1,0,0), 1.6);
    groundObjects.push(coinBox);    


    //Platform 27
    var platform27= BABYLON.MeshBuilder.CreateBox('platform27', {width:widthM, height:height, depth:depth}, scene);
    
    platform27.position = new BABYLON.Vector3(315, 45, 5);     
    platform27.checkCollisions = true;
    platform27.material = multimatGrassM;
    platform27.subMeshes = [];
    var verticesCount = platform27.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform27);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform27);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform27);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform27);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform27);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform27);


    groundObjects.push(platform27);


    // Fire Log
    BABYLON.SceneLoader.ImportMesh("", "models/WinterModels/", "FireLog.gltf", scene, function(newMeshes) {
        var FireLog = newMeshes[0];
        FireLog.position = new BABYLON.Vector3(315, 46, 0.5);
        FireLog.scaling = new BABYLON.Vector3(2,2,2);
        FireLog.checkCollisions = true;
    });

    // Fire collision box 2
    var fireBox = BABYLON.MeshBuilder.CreateBox('fireBox2', {width:2.5, height:2, depth:2}, scene);
    fireBox.checkCollisions = true;
    fireBox.visibility = 0;
    fireBox.material = fireM;
    fireBox.position = new BABYLON.Vector3(315, 46, 0.5);
    groundObjects.push(fireBox);

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "alberocolorato.gltf", scene, function(newMeshes) {
        var treeBall3 = newMeshes[0];
        treeBall3.position = new BABYLON.Vector3(309, 46, 9);
        treeBall3.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "alberocolorato.gltf", scene, function(newMeshes) {
        var treeBall3 = newMeshes[0];
        treeBall3.position = new BABYLON.Vector3(321, 46, 9);
        treeBall3.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "flowers.gltf", scene, function(newMeshes) {
        var flowers = newMeshes[0];
        flowers.rotate( BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
        flowers.position = new BABYLON.Vector3(310, 46, 9);
        flowers.scaling = new BABYLON.Vector3(7, 7, 7);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Animals/", "bee.gltf", scene, function(newMeshes) {
        var bee = newMeshes[0];
        bee.rotate( BABYLON.Axis.Y, -Math.PI/4 , BABYLON.Space.WORLD);
        bee.rotate( BABYLON.Axis.X, Math.PI/6, BABYLON.Space.WORLD);
        bee.position = new BABYLON.Vector3(313, 48, 9);
        bee.scaling = new BABYLON.Vector3(55, 55, 55);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Animals/", "bee.gltf", scene, function(newMeshes) {
        var bee = newMeshes[0];
        bee.rotate( BABYLON.Axis.Y, -Math.PI/4 , BABYLON.Space.WORLD);
        bee.rotate( BABYLON.Axis.X, -Math.PI/6, BABYLON.Space.WORLD);
        bee.position = new BABYLON.Vector3(315, 49, 9);
        bee.scaling = new BABYLON.Vector3(55, 55, 55);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Animals/", "bee.gltf", scene, function(newMeshes) {
        var bee = newMeshes[0];
        bee.rotate( BABYLON.Axis.Y, Math.PI/4 , BABYLON.Space.WORLD);
        bee.rotate( BABYLON.Axis.X, Math.PI/3, BABYLON.Space.WORLD);
        bee.position = new BABYLON.Vector3(317, 48, 9);
        bee.scaling = new BABYLON.Vector3(55, 55, 55);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/", "staccionata.gltf", scene, function(newMeshes) {
        var staccionata = newMeshes[0];
        staccionata.rotate( BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
        staccionata.position = new BABYLON.Vector3(310, 45.5, 8);
        staccionata.scaling = new BABYLON.Vector3(1, 1, 1);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/", "staccionata.gltf", scene, function(newMeshes) {
        var staccionata = newMeshes[0];
        staccionata.rotate( BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
        staccionata.position = new BABYLON.Vector3(315, 45.5, 8);
        staccionata.scaling = new BABYLON.Vector3(1, 1, 1);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/", "staccionata.gltf", scene, function(newMeshes) {
        var staccionata = newMeshes[0];
        staccionata.rotate( BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
        staccionata.position = new BABYLON.Vector3(320, 45.5, 8);
        staccionata.scaling = new BABYLON.Vector3(1, 1, 1);
    });



    //Platform 28
    var platform28= BABYLON.MeshBuilder.CreateBox('platform28', {width:widthS, height:height, depth:depth}, scene);
    
    platform28.position = new BABYLON.Vector3(293, 35, 5);     
    platform28.checkCollisions = true;
    platform28.material = multimatGrassS;
    platform28.subMeshes = [];
    var verticesCount = platform28.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform28);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform28);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform28);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform28);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform28);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform28);


    groundObjects.push(platform28);

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "fleur.gltf", scene, function(newMeshes) {
        var fleur = newMeshes[0];
        fleur.position = new BABYLON.Vector3(293, 35, 9);
        fleur.scaling = new BABYLON.Vector3(2, 2, 2);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "fleur.gltf", scene, function(newMeshes) {
        var fleur = newMeshes[0];
        fleur.position = new BABYLON.Vector3(292, 35, 10);
        fleur.scaling = new BABYLON.Vector3(2, 2, 2);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "fleur.gltf", scene, function(newMeshes) {
        var fleur = newMeshes[0];
        fleur.position = new BABYLON.Vector3(294, 35, 10);
        fleur.scaling = new BABYLON.Vector3(2, 2, 2);
    });

    //Platform 29
    var platform29= BABYLON.MeshBuilder.CreateBox('platform29', {width:widthS, height:height, depth:depth}, scene);
    
    platform29.position = new BABYLON.Vector3(279, 45, 5);     
    platform29.checkCollisions = true;
    platform29.material = multimatGrassS;
    platform29.subMeshes = [];
    var verticesCount = platform29.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform29);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform29);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform29);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform29);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform29);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform29);


    groundObjects.push(platform29);

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/", "staccionata.gltf", scene, function(newMeshes) {
        var staccionata = newMeshes[0];
        staccionata.rotate( BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
        staccionata.position = new BABYLON.Vector3(278.5, 45.5, 8);
        staccionata.scaling = new BABYLON.Vector3(0.9, 0.9, 0.9);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/", "stone_moss.gltf", scene, function(newMeshes) {
        var stone = newMeshes[0];
        stone.position = new BABYLON.Vector3(279, 46, 7.5);
        stone.scaling = new BABYLON.Vector3(3, 3, 3);
    });



    //Platform 30
    var platform30= BABYLON.MeshBuilder.CreateBox('platform30', {width:widthS, height:height, depth:depth}, scene);
    
    platform30.position = new BABYLON.Vector3(267, 55, 0);     
    platform30.checkCollisions = true;
    platform30.material = multimatGrassS;
    platform30.subMeshes = [];
    var verticesCount = platform30.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform30);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform30);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform30);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform30);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform30);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform30);

    groundObjects.push(platform30);

    scene.registerBeforeRender(function () {
        platform30.rotation.y += 0.01;
    });

    // COIN 2
    BABYLON.SceneLoader.ImportMesh("", "models/", "coin.gltf", scene, function(newMeshes) {
        coin2 = newMeshes[0];
        coin2.position = new BABYLON.Vector3(257, 65, 0);
        coin2.scaling = new BABYLON.Vector3(10,10,10);
        coin2.rotation = new BABYLON.Vector3(deg2rad(-90),0,0);
        Coin(coin2); // start animation
    });


    // Coin collision box
    var coinBox = BABYLON.MeshBuilder.CreateCylinder('coinBox2', {height: 2, diameterTop: 2.3, diameterBottom: 2.3, tessellation: 100, subdivisons: 10}, scene);
    coinBox.visibility = 0;
    coinBox.material = coinM;
    coinBox.position = new BABYLON.Vector3(257, 65, 0);
    coinBox.rotate(new BABYLON.Vector3(1,0,0), 1.6);
    groundObjects.push(coinBox);  

    //Platform 31
    var platform31= BABYLON.MeshBuilder.CreateBox('platform31', {width:widthS, height:height, depth:depth}, scene);
    
    platform31.position = new BABYLON.Vector3(250, 55, 5);     
    platform31.checkCollisions = true;
    platform31.material = multimatGrassS;
    platform31.subMeshes = [];
    var verticesCount = platform31.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform31);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform31);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform31);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform31);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform31);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform31);

    groundObjects.push(platform31);

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/", "staccionata.gltf", scene, function(newMeshes) {
        var staccionata = newMeshes[0];
        staccionata.rotate( BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
        staccionata.position = new BABYLON.Vector3(249.5, 55.5, 8);
        staccionata.scaling = new BABYLON.Vector3(0.9, 0.9, 0.9);
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "plant.gltf", scene, function(newMeshes) {
        var plant = newMeshes[0];
        plant.position = new BABYLON.Vector3(250, 56, 7.5);
        plant.scaling = new BABYLON.Vector3(0.005, 0.005, 0.005);
    });

    //Platform 32
    var platform32= BABYLON.MeshBuilder.CreateBox('platform32', {width:widthS, height:height, depth:depth}, scene);
    
    platform32.position = new BABYLON.Vector3(510, 55, 5);     
    platform32.checkCollisions = true;
    platform32.material = multimatGrassS;
    platform32.subMeshes = [];
    var verticesCount = platform32.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform32);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform32);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform32);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform32);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform32);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform32);

    groundObjects.push(platform32);

    //Platform 33
    var platform33= BABYLON.MeshBuilder.CreateBox('platform33', {width:widthS, height:height, depth:depth}, scene);
    
    platform33.position = new BABYLON.Vector3(524, 45, 5);     
    platform33.checkCollisions = true;
    platform33.material = multimatGrassS;
    platform33.subMeshes = [];
    var verticesCount = platform33.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform33);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform33);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform33);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform33);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform33);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform33);

    groundObjects.push(platform33);

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/", "staccionata.gltf", scene, function(newMeshes) {
        var staccionata = newMeshes[0];
        staccionata.rotate( BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
        staccionata.position = new BABYLON.Vector3(523.5, 45.5, 8);
        staccionata.scaling = new BABYLON.Vector3(1, 1, 1);
    });

    //Platform 34
    var platform34= BABYLON.MeshBuilder.CreateBox('platform34', {width:widthS, height:height, depth:depth}, scene);
    
    platform34.position = new BABYLON.Vector3(538, 35, 5);     
    platform34.checkCollisions = true;
    platform34.material = multimatGrassS;
    platform34.subMeshes = [];
    var verticesCount = platform34.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform34);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform34);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform34);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform34);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform34);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform34);

    groundObjects.push(platform34);

    //Platform 35
    var platform35= BABYLON.MeshBuilder.CreateBox('platform35', {width:widthS, height:height, depth:depth}, scene);
    
    platform35.position = new BABYLON.Vector3(552, 45, 5);     
    platform35.checkCollisions = true;
    platform35.material = multimatGrassS;
    platform35.subMeshes = [];
    var verticesCount = platform35.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform35);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform35);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform35);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform35);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform35);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform35);

    groundObjects.push(platform35);

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/", "staccionata.gltf", scene, function(newMeshes) {
        var staccionata = newMeshes[0];
        staccionata.rotate( BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
        staccionata.position = new BABYLON.Vector3(551.5, 45.5, 8);
        staccionata.scaling = new BABYLON.Vector3(1, 1, 1);
    });

    //Platform 36
    var platform36= BABYLON.MeshBuilder.CreateBox('platform36', {width:widthS, height:height, depth:depth}, scene);
    
    platform36.position = new BABYLON.Vector3(552, 25, 5);     
    platform36.checkCollisions = true;
    platform36.material = multimatGrassS;
    platform36.subMeshes = [];
    var verticesCount = platform36.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform36);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform36);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform36);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform36);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform36);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform36);

    groundObjects.push(platform36);

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/", "staccionata.gltf", scene, function(newMeshes) {
        var staccionata = newMeshes[0];
        staccionata.rotate( BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
        staccionata.position = new BABYLON.Vector3(551.5, 25.5, 8);
        staccionata.scaling = new BABYLON.Vector3(1, 1, 1);
    });

    //Platform 37
    var platform37= BABYLON.MeshBuilder.CreateBox('platform37', {width:widthS, height:height, depth:depth}, scene);
    
    platform37.position = new BABYLON.Vector3(566, 35, 5);     
    platform37.checkCollisions = true;
    platform37.material = multimatGrassS;
    platform37.subMeshes = [];
    var verticesCount = platform37.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform37);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform37);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform37);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform37);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform37);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform37);

    groundObjects.push(platform37);

    //Platform 38
    var platform38= BABYLON.MeshBuilder.CreateBox('platform38', {width:widthS, height:height, depth:depth}, scene);
    
    platform38.position = new BABYLON.Vector3(566, 15, 5);     
    platform38.checkCollisions = true;
    platform38.material = multimatGrassS;
    platform38.subMeshes = [];
    var verticesCount = platform38.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform38);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform38);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform38);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform38);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform38);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform38);

    groundObjects.push(platform38);

    //Platform 39
    var platform39= BABYLON.MeshBuilder.CreateBox('platform39', {width:widthS, height:height, depth:depth}, scene);
    
    platform39.position = new BABYLON.Vector3(566, 55, 5);     
    platform39.checkCollisions = true;
    platform39.material = multimatGrassS;
    platform39.subMeshes = [];
    var verticesCount = platform39.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform39);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform39);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform39);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform39);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform39);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform39);

    groundObjects.push(platform39);

    //Platform 40
    var platform40= BABYLON.MeshBuilder.CreateBox('platform40', {width:widthS, height:height, depth:depth}, scene);
    
    platform40.position = new BABYLON.Vector3(538, 55, 5);     
    platform40.checkCollisions = true;
    platform40.material = multimatGrassS;
    platform40.subMeshes = [];
    var verticesCount = platform40.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform40);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform40);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform40);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform40);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform40);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform40);

    groundObjects.push(platform40);

    //Platform 41
    var platform41= BABYLON.MeshBuilder.CreateBox('platform41', {width:widthS, height:height, depth:depth}, scene);
    
    platform41.position = new BABYLON.Vector3(580, 45, 5);     
    platform41.checkCollisions = true;
    platform41.material = multimatGrassS;
    platform41.subMeshes = [];
    var verticesCount = platform41.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform41);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform41);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform41);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform41);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform41);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform41);

    groundObjects.push(platform41);

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/", "staccionata.gltf", scene, function(newMeshes) {
        var staccionata = newMeshes[0];
        staccionata.rotate( BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
        staccionata.position = new BABYLON.Vector3(579.5, 45.5, 8);
        staccionata.scaling = new BABYLON.Vector3(1, 1, 1);
    });

    //Platform 42
    var platform42= BABYLON.MeshBuilder.CreateBox('platform42', {width:widthS, height:height, depth:depth}, scene);
    
    platform42.position = new BABYLON.Vector3(580, 25, 5);     
    platform42.checkCollisions = true;
    platform42.material = multimatGrassS;
    platform42.subMeshes = [];
    var verticesCount = platform42.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform42);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform42);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform42);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform42);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform42);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform42);

    groundObjects.push(platform42);

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/", "staccionata.gltf", scene, function(newMeshes) {
        var staccionata = newMeshes[0];
        staccionata.rotate( BABYLON.Axis.Y, Math.PI/2, BABYLON.Space.WORLD);
        staccionata.position = new BABYLON.Vector3(579.5, 25.5, 8);
        staccionata.scaling = new BABYLON.Vector3(1, 1, 1);
    });

    //Platform 43
    var platform43= BABYLON.MeshBuilder.CreateBox('platform43', {width:widthB, height:height, depth:depth}, scene);
    
    platform43.position = new BABYLON.Vector3(620, 35, 5);     
    platform43.checkCollisions = true;
    platform43.material = multimatGrassB;
    platform43.subMeshes = [];
    var verticesCount = platform43.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform43);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform43);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform43);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform43);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform43);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform43);

    groundObjects.push(platform43);

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "longTree.gltf", scene, function(newMeshes) {
        var longTree = newMeshes[0];
        longTree.position = new BABYLON.Vector3(600, 35, 9);
        longTree.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
        longTree.checkCollisions=true;
        
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "longTree.gltf", scene, function(newMeshes) {
        var longTree = newMeshes[0];
        longTree.position = new BABYLON.Vector3(610, 35, 9);
        longTree.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
        longTree.checkCollisions=true;
        
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "longTree.gltf", scene, function(newMeshes) {
        var longTree = newMeshes[0];
        longTree.position = new BABYLON.Vector3(620, 35, 9);
        longTree.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
        longTree.checkCollisions=true;
        
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "longTree.gltf", scene, function(newMeshes) {
        var longTree = newMeshes[0];
        longTree.position = new BABYLON.Vector3(630, 35, 9);
        longTree.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
        longTree.checkCollisions=true;
        
    });

    BABYLON.SceneLoader.ImportMesh("", "models/SpringModels/Vegetables/", "longTree.gltf", scene, function(newMeshes) {
        var longTree = newMeshes[0];
        longTree.position = new BABYLON.Vector3(640, 35, 9);
        longTree.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
        longTree.checkCollisions=true;
        
    });

    var portalSound = new BABYLON.Sound("portalSound", "sounds/portal/unexpected.wav", scene, null, {volume:0.8, loop:true, autoplay:true });


    // Ending Portal
    BABYLON.SceneLoader.ImportMesh("", "models/", "portal.gltf", scene, function(newMeshes) {
        var portal = newMeshes[0];
        portal.position = new BABYLON.Vector3(630, 35, 0);
        portal.scaling = new BABYLON.Vector3(2, 2, 2);
        portal.rotate(new BABYLON.Vector3(0, 1, 0), 3.6);
        portal.checkCollisions = true;
        portalSound.attachToMesh(portal);
    });
    
    

    // Ending Portal collision box
    var portalBox = BABYLON.MeshBuilder.CreateBox('portalBox', {width:3, height:5, depth:5}, scene);
    portalBox.checkCollisions = true;
    portalBox.visibility = 0;
    portalBox.material = portalM;
    portalBox.position = new BABYLON.Vector3(630, 37, 0);
    groundObjects.push(portalBox);



    //music
    var musicl3 = new BABYLON.Sound("musicl2", "sounds/levels/level3/POL-unbeatable-guild-short.wav", scene, soundReady, {loop:true, volume:0.2, autoplay:true, useCustomAttenuation:true});

    function soundReady(){
        musicl3.play();
    }

    // bird sound
    birdSound = new BABYLON.Sound("rainSound", "sounds/level3/meadowlark_daniel-simion.wav", scene, function() {
        birdSound.play();
    }, {loop:true, volume:0.1});




    // Player
    player.mesh = new BABYLON.MeshBuilder.CreateSphere("player", {diameterX: player.width, diameterY:player.height, diameterZ:player.depth}, scene);
    player.mesh.visibility = 0;
    player.mesh.position.y = (player.height + platformHeight)/2.0;
    player.mesh.ellipsoid = new BABYLON.Vector3(player.width/2, player.height/2, player.depth/2);
    player.mesh.checkCollisions = true;
    camera.lockedTarget = player.mesh;
    
    BABYLON.SceneLoader.ImportMesh("", "models/", "knight.gltf", scene, function(newMeshes) {
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
    checkpoint = new BABYLON.Vector3(155, 41, 0);
    //Particles system Fire
    var particlesFire = new BABYLON.GPUParticleSystem("particlesFire", 5000, scene);
    //Texture of each particle
    particlesFire.particleTexture = new BABYLON.Texture("textures/fireParticle.png", scene);
    //particles2.translationPivot = new BABYLON.Vector3(0, 0,0);
    //Where the particles come from
    
    particlesFire.emitter = new BABYLON.Vector3(155, 36, 0);
    
    
    particlesFire.minEmitBox = new BABYLON.Vector3(-0.5, 0, 0); // Starting all from
    particlesFire.maxEmitBox = new BABYLON.Vector3(0.5, 0, 0); // To...

    // Colors of all particles
    particlesFire.color1 = new BABYLON.Color4(1, 0, 0, 1.0);
    particlesFire.color2 = new BABYLON.Color4(1, 1, 0, 1.0);
    particlesFire.colorDead = new BABYLON.Color4(1, 0, 0, 0.0);

    // Size of each particle (random between...
    particlesFire.minSize = 0.1;
    particlesFire.maxSize = 0.5;

    // Life time of each particle (random between...
    particlesFire.minLifeTime = 0.05;
    particlesFire.maxLifeTime = 0.1;

    // Emission rate
    particlesFire.emitRate = 600;

    window.ps = particlesFire;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particlesFire.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particlesFire.gravity = new BABYLON.Vector3(0, 0, -2);

    // Direction of each particle after it has been emitted
    particlesFire.direction1 = new BABYLON.Vector3(0.2, 1, 0.2);
    particlesFire.direction2 = new BABYLON.Vector3(-0.2, 1, -0.2);
    
    // Angular speed, in radians
    particlesFire.minAngularSpeed = 0;
    particlesFire.maxAngularSpeed = Math.PI;

    // Speed
    particlesFire.minEmitPower = .01;
    particlesFire.maxEmitPower = 30;

    // Start the particle system
    particlesFire.start();
}

function fireON2(){
    fireIsOn2 = true;
    checkpoint = new BABYLON.Vector3(315,51,0);
    //Particles system Fire
    var particlesFire2 = new BABYLON.GPUParticleSystem("particlesFire2", 5000, scene);
    //Texture of each particle
    particlesFire2.particleTexture = new BABYLON.Texture("textures/fireParticle.png", scene);
    //particles2.translationPivot = new BABYLON.Vector3(0, 0,0);
    //Where the particles come from
    
    particlesFire2.emitter = new BABYLON.Vector3(315,46,0);
    
    
    particlesFire2.minEmitBox = new BABYLON.Vector3(-0.5, 0, 0); // Starting all from
    particlesFire2.maxEmitBox = new BABYLON.Vector3(0.5, 0, 0); // To...

    // Colors of all particles
    particlesFire2.color1 = new BABYLON.Color4(1, 0, 0, 1.0);
    particlesFire2.color2 = new BABYLON.Color4(1, 1, 0, 1.0);
    particlesFire2.colorDead = new BABYLON.Color4(1, 0, 0, 0.0);

    // Size of each particle (random between...
    particlesFire2.minSize = 0.1;
    particlesFire2.maxSize = 0.5;

    // Life time of each particle (random between...
    particlesFire2.minLifeTime = 0.05;
    particlesFire2.maxLifeTime = 0.1;

    // Emission rate
    particlesFire2.emitRate = 600;

    window.ps = particlesFire2;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particlesFire2.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particlesFire2.gravity = new BABYLON.Vector3(0, 0, -2);

    // Direction of each particle after it has been emitted
    particlesFire2.direction1 = new BABYLON.Vector3(0.2, 1, 0.2);
    particlesFire2.direction2 = new BABYLON.Vector3(-0.2, 1, -0.2);
    
    // Angular speed, in radians
    particlesFire2.minAngularSpeed = 0;
    particlesFire2.maxAngularSpeed = Math.PI;

    // Speed
    particlesFire2.minEmitPower = .01;
    particlesFire2.maxEmitPower = 30;

    // Start the particle system
    particlesFire2.start();
}

function coinON(){
    CoinDisappear(coin1);
    
    coinIsOn = true;
    //Particles system Fire
    particlesCoin = new BABYLON.GPUParticleSystem("particlesCoin", 100, scene);
    //Texture of each particle
    particlesCoin.particleTexture = new BABYLON.Texture("textures/goldparticle.png", scene);
    //particles2.translationPivot = new BABYLON.Vector3(0, 0,0);
    //Where the particles come from
    
    particlesCoin.emitter = new BABYLON.Vector3(165, 36, 0);
    
    particlesCoin.minEmitBox = new BABYLON.Vector3(-0.5, 0, 0); // Starting all from
    particlesCoin.maxEmitBox = new BABYLON.Vector3(0.5, 0, 0); // To...

    // Colors of all particles
    particlesCoin.color1 = new BABYLON.Color4(1, 0.84, 0, 1.0);
    particlesCoin.color2 = new BABYLON.Color4(1, 0.84, 0, 1.0);
    particlesCoin.colorDead = new BABYLON.Color4(1, 0.84, 0, 0.0);

    // Size of each particle (random between...
    particlesCoin.minSize = 0.1;
    particlesCoin.maxSize = 0.5;

    // Life time of each particle (random between...
    particlesCoin.minLifeTime = 0.01;
    particlesCoin.maxLifeTime = 0.01;

    // Emission rate
    particlesCoin.emitRate = 100;

    window.ps = particlesCoin;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particlesCoin.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particlesCoin.gravity = new BABYLON.Vector3(0, 0, 0);

    // Direction of each particle after it has been emitted
    particlesCoin.direction1 = new BABYLON.Vector3(1, 1, 0.2);
    particlesCoin.direction2 = new BABYLON.Vector3(-1, 1, -0.2);

    // Angular speed, in radians
    particlesCoin.minAngularSpeed = 0;
    particlesCoin.maxAngularSpeed = Math.PI;

    // Speed
    particlesCoin.minEmitPower = 10;
    particlesCoin.maxEmitPower = 10;

    // Start the particle system
    particlesCoin.start();
}

function coinON2(){
    CoinDisappear(coin2);
    
    coinIsOn2 = true;
    //Particles system Fire
    particlesCoin2 = new BABYLON.GPUParticleSystem("particlesCoin2", 100, scene);
    //Texture of each particle
    particlesCoin2.particleTexture = new BABYLON.Texture("textures/goldparticle.png", scene);
    //particles2.translationPivot = new BABYLON.Vector3(0, 0,0);
    //Where the particles come from
    
    particlesCoin2.emitter = new BABYLON.Vector3(257, 65, 0);
    
    particlesCoin2.minEmitBox = new BABYLON.Vector3(-0.5, 0, 0); // Starting all from
    particlesCoin2.maxEmitBox = new BABYLON.Vector3(0.5, 0, 0); // To...

    // Colors of all particles
    particlesCoin2.color1 = new BABYLON.Color4(1, 0.84, 0, 1.0);
    particlesCoin2.color2 = new BABYLON.Color4(1, 0.84, 0, 1.0);
    particlesCoin2.colorDead = new BABYLON.Color4(1, 0.84, 0, 0.0);

    // Size of each particle (random between...
    particlesCoin2.minSize = 0.1;
    particlesCoin2.maxSize = 0.5;

    // Life time of each particle (random between...
    particlesCoin2.minLifeTime = 0.01;
    particlesCoin2.maxLifeTime = 0.01;

    // Emission rate
    particlesCoin2.emitRate = 100;

    window.ps = particlesCoin2;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particlesCoin2.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particlesCoin2.gravity = new BABYLON.Vector3(0, 0, 0);

    // Direction of each particle after it has been emitted
    particlesCoin2.direction1 = new BABYLON.Vector3(1, 1, 0.2);
    particlesCoin2.direction2 = new BABYLON.Vector3(-1, 1, -0.2);

    // Angular speed, in radians
    particlesCoin2.minAngularSpeed = 0;
    particlesCoin2.maxAngularSpeed = Math.PI;

    // Speed
    particlesCoin2.minEmitPower = 10;
    particlesCoin2.maxEmitPower = 10;

    // Start the particle system
    particlesCoin2.start();
}

function coinON3(){
    CoinDisappear(coin3);
    
    coinIsOn3 = true;
    //Particles system Fire
    particlesCoin3 = new BABYLON.GPUParticleSystem("particlesCoin3", 1000, scene);
    //Texture of each particle
    particlesCoin3.particleTexture = new BABYLON.Texture("textures/goldparticle.png", scene);
    //particles2.translationPivot = new BABYLON.Vector3(0, 0,0);
    //Where the particles come from
    
    particlesCoin3.emitter = new BABYLON.Vector3(480, 80, 0);
    
    particlesCoin3.minEmitBox = new BABYLON.Vector3(-0.5, 0, 0); // Starting all from
    particlesCoin3.maxEmitBox = new BABYLON.Vector3(0.5, 0, 0); // To...

    // Colors of all particles
    particlesCoin3.color1 = new BABYLON.Color4(1, 0.84, 0, 1.0);
    particlesCoin3.color2 = new BABYLON.Color4(1, 0.84, 0, 1.0);
    particlesCoin3.colorDead = new BABYLON.Color4(1, 0.84, 0, 0.0);

    // Size of each particle (random between...
    particlesCoin3.minSize = 0.1;
    particlesCoin3.maxSize = 0.5;

    // Life time of each particle (random between...
    particlesCoin3.minLifeTime = 0.01;
    particlesCoin3.maxLifeTime = 0.01;

    // Emission rate
    particlesCoin3.emitRate = 250;

    window.ps = particlesCoin3;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particlesCoin3.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particlesCoin3.gravity = new BABYLON.Vector3(0, 0, 0);

    // Direction of each particle after it has been emitted
    particlesCoin3.direction1 = new BABYLON.Vector3(1, 1, 0.2);
    particlesCoin3.direction2 = new BABYLON.Vector3(-1, 1, -0.2);

    // Angular speed, in radians
    particlesCoin3.minAngularSpeed = 0;
    particlesCoin3.maxAngularSpeed = Math.PI;

    // Speed
    particlesCoin3.minEmitPower = 10;
    particlesCoin3.maxEmitPower = 10;

    // Start the particle system
    particlesCoin3.start();
}

function trapActive(name){
    if(name == "spikes") trapON(spikes);
    if(name == "spikes2") trapON(spikes2);
    if(name == "spikes3") trapON(spikes3);
    if(name == "spikes4") trapON(spikes4);
    if(name == "spikes5") trapON(spikes5);
    if(name == "spikes6") trapON(spikes6);
}


function portalON(){

    //Particles system Portal
    var particlesPortal = new BABYLON.ParticleSystem("particlesPortal", 5, scene);

    //Texture of each particle
    particlesPortal.particleTexture = new BABYLON.Texture("textures/portalParticles.png", scene);
    

    //Where the particles come from
    particlesPortal.emitter = new BABYLON.Vector3(629, 40, 0);
    particlesPortal.minEmitBox = new BABYLON.Vector3(0.1, 2.5 , 2.5); // Starting all from
    particlesPortal.maxEmitBox = new BABYLON.Vector3(-0.1, -0.5, -2.5); // To...

    // Colors of all particles
    particlesPortal.color1 = new BABYLON.Color4(0.5, 0, 0.5, 1.0);
    particlesPortal.color2 = new BABYLON.Color4(0.5, 0, 0.5, 1.0);
    particlesPortal.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

    // Size of each particle (random between...
    particlesPortal.minSize = 0.1;
    particlesPortal.maxSize = 0.5;

    // Life time of each particle (random between...
    particlesPortal.minLifeTime = 0.1;
    particlesPortal.maxLifeTime = 0.1;

    // Emission rate
    particlesPortal.emitRate = 250;

    window.ps = particlesPortal;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particlesPortal.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particlesPortal.gravity = new BABYLON.Vector3(0, 9.81, 0);

    // Direction of each particle after it has been emitted
    particlesPortal.direction1 = new BABYLON.Vector3(-1, 2, 1);
    particlesPortal.direction2 = new BABYLON.Vector3(-1,-2, 1);

    // Angular speed, in radians
    particlesPortal.minAngularSpeed = 0;
    particlesPortal.maxAngularSpeed = Math.PI;

    // Speed
    particlesPortal.minEmitPower = .01;
    particlesPortal.maxEmitPower = 30;

    // Start the particle system
    particlesPortal.start();
}