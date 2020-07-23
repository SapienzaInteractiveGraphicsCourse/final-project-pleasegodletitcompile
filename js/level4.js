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
var timeCoin3 = 0;

// Set gravity
var gravity = -0.1;

var snowCyl;
var snowRA;
var snowLA;

var snowCyl2;
var snowRA2;
var snowLA2;

var coin;


var tutorial1 = false;
var tutorial2 = false;
var tutorial3 = false;
var tutorial4 = false;
var tutorial5 = false;
var tutorial6 = false;

var snowAnim = true;

var nextLevel = "../level1.html"

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

    // Materials
    {  
        //Set platforms materials
        // Ground Small Platform
        var groundS1 = new BABYLON.StandardMaterial("groundS1", scene);
        groundS1.diffuseTexture = new BABYLON.Texture("../textures/soil.jpg", scene)
        groundS1.diffuseTexture.uScale = 1;
        groundS1.diffuseTexture.vScale = 0.33;
        groundS1.bumpTexture = new BABYLON.Texture("../textures/soilBump.jpg", scene)
        groundS1.bumpTexture.uScale = 1;
        groundS1.bumpTexture.vScale = 0.33;
        
        var groundS2 = new BABYLON.StandardMaterial("groundS2", scene);
        groundS2.diffuseTexture = new BABYLON.Texture("../textures/soil.jpg", scene)
        groundS2.diffuseTexture.uScale = 0.33;
        groundS2.diffuseTexture.vScale = 0.13;
        groundS2.bumpTexture = new BABYLON.Texture("../textures/soilBump.jpg", scene)
        groundS2.bumpTexture.uScale = 0.33;
        groundS2.bumpTexture.vScale = 0.13;
    
        var groundS3 = new BABYLON.StandardMaterial("groundS3", scene);
        groundS3.diffuseTexture = new BABYLON.Texture("../textures/soil.jpg", scene)
        groundS3.diffuseTexture.uScale = 0.13;
        groundS3.diffuseTexture.vScale = 1;
        groundS3.bumpTexture = new BABYLON.Texture("../textures/soilBump.jpg", scene)
        groundS3.bumpTexture.uScale = 0.13;
        groundS3.bumpTexture.vScale = 1;
    
        // Ground Medium Platform
        var groundM1 = new BABYLON.StandardMaterial("groundM1", scene);
        groundM1.diffuseTexture = new BABYLON.Texture("../textures/soil.jpg", scene)
        groundM1.diffuseTexture.uScale = 1;
        groundM1.diffuseTexture.vScale = 1.33;
        groundM1.bumpTexture = new BABYLON.Texture("../textures/soilBump.jpg", scene)
        groundM1.bumpTexture.uScale = 1;
        groundM1.bumpTexture.vScale = 1.33;
        
        var groundM2 = new BABYLON.StandardMaterial("groundM2", scene);
        groundM2.diffuseTexture = new BABYLON.Texture("../textures/soil.jpg", scene)
        groundM2.diffuseTexture.uScale = 0.133;
        groundM2.diffuseTexture.vScale = 0.06;
        groundM2.bumpTexture = new BABYLON.Texture("../textures/soilBump.jpg", scene)
        groundM2.bumpTexture.uScale = 0.133;
        groundM2.bumpTexture.vScale = 0.06;
    
        var groundM3 = new BABYLON.StandardMaterial("groundM3", scene);
        groundM3.diffuseTexture = new BABYLON.Texture("../textures/soil.jpg", scene)
        groundM3.diffuseTexture.uScale = 0.06;
        groundM3.diffuseTexture.vScale = 0.133;
        groundM3.bumpTexture = new BABYLON.Texture("../textures/soilBump.jpg", scene)
        groundM3.bumpTexture.uScale = 0.06;
        groundM3.bumpTexture.vScale = 0.133;
    
        // Ground Big Platform
        var groundB1 = new BABYLON.StandardMaterial("groundB1", scene);
        groundB1.diffuseTexture = new BABYLON.Texture("../textures/soil.jpg", scene)
        groundB1.diffuseTexture.uScale = 2;
        groundB1.diffuseTexture.vScale = 3;
        groundB1.bumpTexture = new BABYLON.Texture("../textures/soilBump.jpg", scene)
        groundB1.bumpTexture.uScale = 2;
        groundB1.bumpTexture.vScale = 3;
        
        var groundB2 = new BABYLON.StandardMaterial("groundB2", scene);
        groundB2.diffuseTexture = new BABYLON.Texture("../textures/soil.jpg", scene)
        groundB2.diffuseTexture.uScale = 3;
        groundB2.diffuseTexture.vScale = 2;
        groundB2.bumpTexture = new BABYLON.Texture("../textures/soilBump.jpg", scene)
        groundB2.bumpTexture.uScale = 3;
        groundB2.bumpTexture.vScale = 2;
    
        var groundB3 = new BABYLON.StandardMaterial("groundB3", scene);
        groundB3.diffuseTexture = new BABYLON.Texture("../textures/soil.jpg", scene)
        groundB3.diffuseTexture.uScale = 1;
        groundB3.diffuseTexture.vScale = 2;
        groundB3.bumpTexture = new BABYLON.Texture("../textures/soilBump.jpg", scene)
        groundB3.bumpTexture.uScale = 1;
        groundB3.bumpTexture.vScale = 2;
    
        // Sand Small Platform
        var sandS1 = new BABYLON.StandardMaterial("sandS1", scene);
        sandS1.diffuseTexture = new BABYLON.Texture("../textures/sand.jpg", scene)
        sandS1.diffuseTexture.uScale = 1;
        sandS1.diffuseTexture.vScale = 0.33;
        sandS1.bumpTexture = new BABYLON.Texture("../textures/sandBump.jpg", scene)
        sandS1.bumpTexture.uScale = 1;
        sandS1.bumpTexture.vScale = 0.33;
        
        var sandS2 = new BABYLON.StandardMaterial("sandS2", scene);
        sandS2.diffuseTexture = new BABYLON.Texture("../textures/sand.jpg", scene)
        sandS2.diffuseTexture.uScale = 0.33;
        sandS2.diffuseTexture.vScale = 0.13;
        sandS2.bumpTexture = new BABYLON.Texture("../textures/sandBump.jpg", scene)
        sandS2.bumpTexture.uScale = 0.33;
        sandS2.bumpTexture.vScale = 0.13;
    
        var sandS3 = new BABYLON.StandardMaterial("sandS3", scene);
        sandS3.diffuseTexture = new BABYLON.Texture("../textures/sand.jpg", scene)
        sandS3.diffuseTexture.uScale = 0.13;
        sandS3.diffuseTexture.vScale = 1;
        sandS3.bumpTexture = new BABYLON.Texture("../textures/sandBump.jpg", scene)
        sandS3.bumpTexture.uScale = 0.13;
        sandS3.bumpTexture.vScale = 1;
    
        // Sand Medium Platform
        var sandM1 = new BABYLON.StandardMaterial("sandM1", scene);
        sandM1.diffuseTexture = new BABYLON.Texture("../textures/sand.jpg", scene)
        sandM1.diffuseTexture.uScale = 1;
        sandM1.diffuseTexture.vScale = 1.33;
        sandM1.bumpTexture = new BABYLON.Texture("../textures/sandBump.jpg", scene)
        sandM1.bumpTexture.uScale = 1;
        sandM1.bumpTexture.vScale = 1.33;
        
        var sandM2 = new BABYLON.StandardMaterial("sandM2", scene);
        sandM2.diffuseTexture = new BABYLON.Texture("../textures/sand.jpg", scene)
        sandM2.diffuseTexture.uScale = 0.133;
        sandM2.diffuseTexture.vScale = 0.06;
        sandM2.bumpTexture = new BABYLON.Texture("../textures/sandBump.jpg", scene)
        sandM2.bumpTexture.uScale = 0.133;
        sandM2.bumpTexture.vScale = 0.06;
    
        var sandM3 = new BABYLON.StandardMaterial("sandM3", scene);
        sandM3.diffuseTexture = new BABYLON.Texture("../textures/sand.jpg", scene)
        sandM3.diffuseTexture.uScale = 0.06;
        sandM3.diffuseTexture.vScale = 0.133;
        sandM3.bumpTexture = new BABYLON.Texture("../textures/sandBump.jpg", scene)
        sandM3.bumpTexture.uScale = 0.06;
        sandM3.bumpTexture.vScale = 0.133;
    
        // Sand Big Platform
        var sandB1 = new BABYLON.StandardMaterial("sandB1", scene);
        sandB1.diffuseTexture = new BABYLON.Texture("../textures/sand.jpg", scene)
        sandB1.diffuseTexture.uScale = 1;
        sandB1.diffuseTexture.vScale = 3;
        sandB1.bumpTexture = new BABYLON.Texture("../textures/sandBump.jpg", scene)
        sandB1.bumpTexture.uScale = 1;
        sandB1.bumpTexture.vScale = 3;
        
        var sandB2 = new BABYLON.StandardMaterial("sandB2", scene);
        sandB2.diffuseTexture = new BABYLON.Texture("../textures/sand.jpg", scene)
        sandB2.diffuseTexture.uScale = 5;
        sandB2.diffuseTexture.vScale = 0.3;
        sandB2.bumpTexture = new BABYLON.Texture("../textures/sandBump.jpg", scene)
        sandB2.bumpTexture.uScale = 5;
        sandB2.bumpTexture.vScale = 0.3;
    
        var sandB3 = new BABYLON.StandardMaterial("sandB3", scene);
        sandB3.diffuseTexture = new BABYLON.Texture("../textures/sand.jpg", scene)
        sandB3.diffuseTexture.uScale = 0.1;
        sandB3.diffuseTexture.vScale = 0.8;
        sandB3.bumpTexture = new BABYLON.Texture("../textures/sandBump.jpg", scene)
        sandB3.bumpTexture.uScale = 0.1;
        sandB3.bumpTexture.vScale = 0.8;
        
    
        // Ground multimaterial
        var multimatGroundS = new BABYLON.MultiMaterial("multiGround", scene);
        multimatGroundS.subMaterials.push(groundS1);
        multimatGroundS.subMaterials.push(groundS2);
        multimatGroundS.subMaterials.push(groundS3);
    
        var multimatGroundM = new BABYLON.MultiMaterial("multiGround", scene);
        multimatGroundM.subMaterials.push(groundM1);
        multimatGroundM.subMaterials.push(groundM2);
        multimatGroundM.subMaterials.push(groundM3);
    
        var multimatGroundB = new BABYLON.MultiMaterial("multiGround", scene);
        multimatGroundB.subMaterials.push(groundB1);
        multimatGroundB.subMaterials.push(groundB2);
        multimatGroundB.subMaterials.push(groundB3);
    
        // Sand multimaterial
        var multimatSandS = new BABYLON.MultiMaterial("multiSand", scene);
        multimatSandS.subMaterials.push(sandS1);
        multimatSandS.subMaterials.push(sandS2);
        multimatSandS.subMaterials.push(sandS3);
    
        var multimatSandM = new BABYLON.MultiMaterial("multiSand", scene);
        multimatSandM.subMaterials.push(sandM1);
        multimatSandM.subMaterials.push(sandM2);
        multimatSandM.subMaterials.push(sandM3);
    
        var multimatSandB = new BABYLON.MultiMaterial("multiSand", scene);
        multimatSandB.subMaterials.push(sandB1);
        multimatSandB.subMaterials.push(sandB2);
        multimatSandB.subMaterials.push(sandB3);
    
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

        // Skybox
        var skybox = BABYLON.MeshBuilder.CreateBox("waves", {size:2000.0}, scene);
        skybox.addRotation(0.0, deg2rad(180), 0.0);
        var skyboxMaterial = new BABYLON.StandardMaterial("waves", scene);
        skyboxMaterial.backFaceCulling = false;
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../Textures/waves/waves", scene);
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        skyboxMaterial.disableLighting = true;
        skybox.infiniteDistance = true;
        skybox.material = skyboxMaterial;

        var rot = 0;
        scene.registerBeforeRender(function () {
            skybox.rotation.y = rot;
            rot += 0.001;
        });

        

        //Set tutorial material
        var tutorialM = new BABYLON.StandardMaterial("tutorialM", scene);
        tutorialM.diffuseColor = new BABYLON.Color3(0, 0, 0);
        }
    


    // Camera
    camera = new BABYLON.FollowCamera('camera', new BABYLON.Vector3(0, 0, 0), scene);
    camera.radius = 40;
    camera.heightOffset = 10;
    camera.rotationOffset = 180;
    camera.attachControl(canvas, true);

    // Light
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

    // Platform 1
    var platform1 = BABYLON.MeshBuilder.CreateBox('platform1', {width:50, height:platformHeight, depth:15}, scene);
    platform1.checkCollisions = true;
    platform1.material = multimatGroundB;

    platform1.subMeshes = [];
    var verticesCount = platform1.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform1);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform1);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform1);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform1);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform1);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform1);

    groundObjects.push(platform1);
    platform1.position.z = 5;

    // Platform 2
    var platform2 = BABYLON.MeshBuilder.CreateBox('platform2', {width:20, height:platformHeight, depth:15}, scene);
    platform2.position = new BABYLON.Vector3(30, 5, 5)
    platform2.checkCollisions = true;
    platform2.material = multimatGroundM;

    platform2.subMeshes = [];
    var verticesCount2 = platform2.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount2, 0, 6, platform2);
    new BABYLON.SubMesh(1, 0, verticesCount2, 6, 6, platform2);
    new BABYLON.SubMesh(2, 0, verticesCount2, 12, 6, platform2);
    new BABYLON.SubMesh(2, 0, verticesCount2, 18, 6, platform2);
    new BABYLON.SubMesh(0, 0, verticesCount2, 24, 6, platform2);
    new BABYLON.SubMesh(0, 0, verticesCount2, 30, 6, platform2);
    groundObjects.push(platform2);


    // Platform 2
    var platform2 = BABYLON.MeshBuilder.CreateBox('platform2', {width:20, height:platformHeight, depth:15}, scene);
    platform2.position = new BABYLON.Vector3(55, 5, 5)
    platform2.checkCollisions = true;
    platform2.material = multimatGroundM;

    platform2.subMeshes = [];
    var verticesCount2 = platform2.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount2, 0, 6, platform2);
    new BABYLON.SubMesh(1, 0, verticesCount2, 6, 6, platform2);
    new BABYLON.SubMesh(2, 0, verticesCount2, 12, 6, platform2);
    new BABYLON.SubMesh(2, 0, verticesCount2, 18, 6, platform2);
    new BABYLON.SubMesh(0, 0, verticesCount2, 24, 6, platform2);
    new BABYLON.SubMesh(0, 0, verticesCount2, 30, 6, platform2);
    groundObjects.push(platform2);

    // Platform 3
    var platform3 = BABYLON.MeshBuilder.CreateBox('platform3', {width:5, height:platformHeight, depth:15}, scene);
    platform3.position = new BABYLON.Vector3(72.5, 0, 5)
    platform3.material = multimatGroundS;
    platform3.checkCollisions = true;

    platform3.subMeshes = [];
    var verticesCount3 = platform3.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount3, 0, 6, platform3);
    new BABYLON.SubMesh(1, 0, verticesCount3, 6, 6, platform3);
    new BABYLON.SubMesh(2, 0, verticesCount3, 12, 6, platform3);
    new BABYLON.SubMesh(2, 0, verticesCount3, 18, 6, platform3);
    new BABYLON.SubMesh(0, 0, verticesCount3, 24, 6, platform3);
    new BABYLON.SubMesh(0, 0, verticesCount3, 30, 6, platform3);
    groundObjects.push(platform3);

    // Platform 3
    var platform3 = BABYLON.MeshBuilder.CreateBox('platform3', {width:5, height:platformHeight, depth:15}, scene);
    platform3.position = new BABYLON.Vector3(82.5, 0, 5)
    platform3.material = multimatGroundS;
    platform3.checkCollisions = true;

    platform3.subMeshes = [];
    var verticesCount3 = platform3.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount3, 0, 6, platform3);
    new BABYLON.SubMesh(1, 0, verticesCount3, 6, 6, platform3);
    new BABYLON.SubMesh(2, 0, verticesCount3, 12, 6, platform3);
    new BABYLON.SubMesh(2, 0, verticesCount3, 18, 6, platform3);
    new BABYLON.SubMesh(0, 0, verticesCount3, 24, 6, platform3);
    new BABYLON.SubMesh(0, 0, verticesCount3, 30, 6, platform3);
    groundObjects.push(platform3);

    // Platform 2
    var platform2 = BABYLON.MeshBuilder.CreateBox('platform2', {width:20, height:platformHeight, depth:15}, scene);
    platform2.position = new BABYLON.Vector3(100, -5, 5)
    platform2.checkCollisions = true;
    platform2.material = multimatSandM;

    platform2.subMeshes = [];
    var verticesCount2 = platform2.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount2, 0, 6, platform2);
    new BABYLON.SubMesh(1, 0, verticesCount2, 6, 6, platform2);
    new BABYLON.SubMesh(2, 0, verticesCount2, 12, 6, platform2);
    new BABYLON.SubMesh(2, 0, verticesCount2, 18, 6, platform2);
    new BABYLON.SubMesh(0, 0, verticesCount2, 24, 6, platform2);
    new BABYLON.SubMesh(0, 0, verticesCount2, 30, 6, platform2);
    groundObjects.push(platform2);

    // Platform 1
    var platform1 = BABYLON.MeshBuilder.CreateBox('platform1', {width:50, height:platformHeight, depth:15}, scene);
    platform1.position = new BABYLON.Vector3(140, -5, 5)
    platform1.checkCollisions = true;
    platform1.material = multimatGroundB;

    platform1.subMeshes = [];
    var verticesCount = platform1.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform1);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform1);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform1);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform1);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform1);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform1);
    groundObjects.push(platform1);

    // Platform 1
    var platform1 = BABYLON.MeshBuilder.CreateBox('platform1', {width:50, height:platformHeight, depth:15}, scene);
    platform1.position = new BABYLON.Vector3(205, 0, 5)
    platform1.checkCollisions = true;
    platform1.material = multimatSandB;

    platform1.subMeshes = [];
    var verticesCount = platform1.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform1);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform1);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform1);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform1);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform1);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform1);
    groundObjects.push(platform1);
    



    // Tutorial platforms
    // Platform 1 Tutorial Intro
    var platform1 = BABYLON.MeshBuilder.CreateBox('tutorial1', {width:50, height:platformHeight, depth:15}, scene);
    platform1.checkCollisions = false;
    platform1.visibility = 0;
    platform1.position.x = 5;
    platform1.position.z = 5;
    platform1.rotate(new BABYLON.Vector3(0,0,1), Math.PI/2);
    platform1.material = tutorialM;
    groundObjects.push(platform1);

    // Platform 1 Tutorial checkpoints
    var platform1 = BABYLON.MeshBuilder.CreateBox('tutorial2', {width:50, height:platformHeight, depth:15}, scene);
    platform1.checkCollisions = false;
    platform1.visibility = 0;
    platform1.position.x = 22;
    platform1.position.z = 5;
    platform1.rotate(new BABYLON.Vector3(0,0,1), Math.PI/2);
    platform1.material = tutorialM;
    groundObjects.push(platform1);

    // Platform 1 Tutorial traps
    var platform1 = BABYLON.MeshBuilder.CreateBox('tutorial3', {width:50, height:platformHeight, depth:15}, scene);
    platform1.checkCollisions = false;
    platform1.visibility = 0;
    platform1.position.x = 47;
    platform1.position.z = 5;
    platform1.rotate(new BABYLON.Vector3(0,0,1), Math.PI/2);
    platform1.material = tutorialM;
    groundObjects.push(platform1);

    // Platform 1 Tutorial materials
    var platform1 = BABYLON.MeshBuilder.CreateBox('tutorial6', {width:50, height:platformHeight, depth:15}, scene);
    platform1.checkCollisions = false;
    platform1.visibility = 0;
    platform1.position.x = 92.5;
    platform1.position.z = 5;
    platform1.rotate(new BABYLON.Vector3(0,0,1), Math.PI/2);
    platform1.material = tutorialM;
    groundObjects.push(platform1);


    // Platform 1 Tutorial jumps
    var platform1 = BABYLON.MeshBuilder.CreateBox('tutorial4', {width:50, height:platformHeight, depth:15}, scene);
    platform1.checkCollisions = false;
    platform1.visibility = 0;
    platform1.position.x = 150;
    platform1.position.z = 5;
    platform1.rotate(new BABYLON.Vector3(0,0,1), Math.PI/2);
    platform1.material = tutorialM;
    groundObjects.push(platform1);

    // Platform 1 Tutorial coins 
    var platform1 = BABYLON.MeshBuilder.CreateBox('tutorial5', {width:50, height:platformHeight, depth:15}, scene);
    platform1.checkCollisions = false;
    platform1.visibility = 0;
    platform1.position.x = 175;
    platform1.position.z = 5;
    platform1.rotate(new BABYLON.Vector3(0,0,1), Math.PI/2);
    platform1.material = tutorialM;
    groundObjects.push(platform1);
    

    //Sun
    BABYLON.SceneLoader.ImportMesh("", "../models/SummerModels/", "sun.gltf", scene, function(newMeshes) {
        sun = newMeshes[0];
        sun.scaling = new BABYLON.Vector3(5,5,5);
        sun.position = new BABYLON.Vector3(10, 20, 75);
    });

    // Palm 1
    BABYLON.SceneLoader.ImportMesh("", "../models/SummerModels/", "palma1.gltf", scene, function(newMeshes) {
        var palma1 = newMeshes[0];
        palma1.position = new BABYLON.Vector3(0,0,35);
        palma1.scaling = new BABYLON.Vector3(5,5,5);
        palma1.rotate(new BABYLON.Vector3(0,1,0), Math.PI/2);
    });

    // Palm 2
    BABYLON.SceneLoader.ImportMesh("", "../models/SummerModels/", "palma2.gltf", scene, function(newMeshes) {
        var palma2 = newMeshes[0];
        palma2.position = new BABYLON.Vector3(-15,-1.4,-16);
        palma2.scaling = new BABYLON.Vector3(5,5,5);
        palma2.rotate(new BABYLON.Vector3(0,1,0), 0);
    });

    // Palm 2
    BABYLON.SceneLoader.ImportMesh("", "../models/SummerModels/", "Sdraio.gltf", scene, function(newMeshes) {
        var sdraio = newMeshes[0];
        sdraio.position = new BABYLON.Vector3(-5,1,9);
        sdraio.scaling = new BABYLON.Vector3(2,2,2);
        sdraio.rotate(new BABYLON.Vector3(0,1,0), 0);
    });

    // Umbrella
    BABYLON.SceneLoader.ImportMesh("", "../models/SummerModels/", "Umbrella.gltf", scene, function(newMeshes) {
        var Umbrella = newMeshes[0];
        Umbrella.position = new BABYLON.Vector3(-7,0,8);
        Umbrella.scaling = new BABYLON.Vector3(2,2,2);
        Umbrella.rotate(new BABYLON.Vector3(0,1,0), 0);
    });

    // Beach ball
    BABYLON.SceneLoader.ImportMesh("", "../models/SummerModels/", "ball.gltf", scene, function(newMeshes) {
        var ball = newMeshes[0];
        ball.position = new BABYLON.Vector3(-2,1,9);
        ball.scaling = new BABYLON.Vector3(3,3,3);
        ball.rotate(new BABYLON.Vector3(0,1,0), 0);
    });

    // Beach ball
    BABYLON.SceneLoader.ImportMesh("", "../models/SummerModels/", "ball.gltf", scene, function(newMeshes) {
        var ball = newMeshes[0];
        ball.position = new BABYLON.Vector3(-2,1,9);
        ball.scaling = new BABYLON.Vector3(3,3,3);
        ball.rotate(new BABYLON.Vector3(0,1,0), 0);
    });

    // Umbrella sdraio table
    BABYLON.SceneLoader.ImportMesh("", "../models/SummerModels/", "umbrellaSdraioTable.gltf", scene, function(newMeshes) {
        var umbrellaSdraioTable = newMeshes[0];
        umbrellaSdraioTable.position = new BABYLON.Vector3(195,0,8);
        umbrellaSdraioTable.scaling = new BABYLON.Vector3(2.8,2.8,2.8);
        umbrellaSdraioTable.rotate(new BABYLON.Vector3(0,1,0), 0);
    });






    // COIN 1
    BABYLON.SceneLoader.ImportMesh("", "../models/", "coin.gltf", scene, function(newMeshes) {
        coin1 = newMeshes[0];
        coin1.position = new BABYLON.Vector3(190,3,0.5);
        coin1.scaling = new BABYLON.Vector3(10,10,10);
        coin1.rotation = new BABYLON.Vector3(deg2rad(-90),0,0);
        Coin(coin1); // start animation
    });

    // Coin collision box
    var coinBox = BABYLON.MeshBuilder.CreateCylinder('coinBox', {height: 2, diameterTop: 2.3, diameterBottom: 2.3, tessellation: 100, subdivisons: 10}, scene);
    coinBox.visibility = 0;
    coinBox.material = coinM;
    coinBox.position = new BABYLON.Vector3(190,3,0.5);
    coinBox.rotate(new BABYLON.Vector3(1,0,0), 1.6)
    groundObjects.push(coinBox);

    // COIN 2
    BABYLON.SceneLoader.ImportMesh("", "../models/", "coin.gltf", scene, function(newMeshes) {
        coin2 = newMeshes[0];
        coin2.position = new BABYLON.Vector3(195, 3, 0.5);
        coin2.scaling = new BABYLON.Vector3(10,10,10);
        coin2.rotate(new BABYLON.Vector3(1,0,0), 1.6)
        coin2.checkCollisions = false;
        Coin(coin2); //start animation
    });

    // Coin collision box 2
    var coinBox = BABYLON.MeshBuilder.CreateCylinder('coinBox2', {height: 2, diameterTop: 2.3, diameterBottom: 2.3, tessellation: 100, subdivisons: 10}, scene);
    coinBox.checkCollisions = false;
    coinBox.visibility = 0;
    coinBox.material = coinM;
    coinBox.position = new BABYLON.Vector3(195, 3, 0.5);
    coinBox.rotate(new BABYLON.Vector3(1,0,0), 1.6)
    groundObjects.push(coinBox);

    // COIN 3
    BABYLON.SceneLoader.ImportMesh("", "../models/", "coin.gltf", scene, function(newMeshes) {
        coin3 = newMeshes[0];
        coin3.position = new BABYLON.Vector3(210, 3, 0.5);
        coin3.scaling = new BABYLON.Vector3(10,10,10);
        coin3.rotate(new BABYLON.Vector3(1,0,0), 1.6)
        coin3.checkCollisions = false;
        Coin(coin3); //start animation
    });

    // Coin collision box 3
    var coinBox = BABYLON.MeshBuilder.CreateCylinder('coinBox3', {height: 2, diameterTop: 2.3, diameterBottom: 2.3, tessellation: 100, subdivisons: 10}, scene);
    coinBox.checkCollisions = false;
    coinBox.visibility = 0;
    coinBox.material = coinM;
    coinBox.position = new BABYLON.Vector3(210, 3, 0.5);
    coinBox.rotate(new BABYLON.Vector3(1,0,0), 1.6)
    groundObjects.push(coinBox);

    // Ending Portal
    BABYLON.SceneLoader.ImportMesh("", "../models/", "portal.gltf", scene, function(newMeshes) {
        var portal = newMeshes[0];
        portal.position = new BABYLON.Vector3(225,1,0);
        portal.scaling = new BABYLON.Vector3(2,2,2);
        portal.rotate(new BABYLON.Vector3(0,1,0), 3.6);
        portal.checkCollisions = true;
    });

    // Ending Portal collision box
    var portalBox = BABYLON.MeshBuilder.CreateBox('portalBox', {width:3, height:5, depth:5}, scene);
    portalBox.checkCollisions = true;
    portalBox.visibility = 0;
    portalBox.material = portalM;
    portalBox.position = new BABYLON.Vector3(225,1,0);
    groundObjects.push(portalBox);

    // Fire Log
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "FireLog.gltf", scene, function(newMeshes) {
        var FireLog = newMeshes[0];
        FireLog.position = new BABYLON.Vector3(30,6,0.5);
        FireLog.scaling = new BABYLON.Vector3(2,2,2);
        FireLog.checkCollisions = true;
    });

    // Fire collision box
    var fireBox = BABYLON.MeshBuilder.CreateBox('fireBox', {width:2.5, height:2, depth:2}, scene);
    fireBox.checkCollisions = true;
    fireBox.visibility = 0;
    fireBox.material = fireM;
    fireBox.position = new BABYLON.Vector3(30,6,0.5);
    groundObjects.push(fireBox);

    // Fire Log 2
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "FireLog.gltf", scene, function(newMeshes) {
        var FireLog = newMeshes[0];
        FireLog.position = new BABYLON.Vector3(140,-4,0.5);
        FireLog.scaling = new BABYLON.Vector3(2,2,2);
        FireLog.checkCollisions = true;
    });

    // Fire collision box 2
    var fireBox = BABYLON.MeshBuilder.CreateBox('fireBox2', {width:2.5, height:2, depth:2}, scene);
    fireBox.checkCollisions = true;
    fireBox.visibility = 0;
    fireBox.material = fireM;
    fireBox.position = new BABYLON.Vector3(140,-4,0.5);
    groundObjects.push(fireBox);

    // Spikes
    BABYLON.SceneLoader.ImportMesh("", "../models/", "spikeTrap.gltf", scene, function(newMeshes) {
        var spikeTrap = newMeshes[0];
        spikeTrap.position = new BABYLON.Vector3(55,6,0.5);
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
    spikeBox.position = new BABYLON.Vector3(55,6,0.5);
    groundObjects.push(spikeBox);

    // Spikes 2
    BABYLON.SceneLoader.ImportMesh("", "../models/", "spikeTrap.gltf", scene, function(newMeshes) {
        var spikeTrap = newMeshes[0];
        spikeTrap.position = new BABYLON.Vector3(100,-4,0.5);
        spikeTrap.scaling = new BABYLON.Vector3(1.8,0.8,1.8);
        spikeTrap.checkCollisions = true;
        spikes2 = spikeTrap._children[0];
        //spikes.position.y = -1;
    });

    // Spikes collision box 2
    var spikeBox = BABYLON.MeshBuilder.CreateBox('spikes2', {width:5, height:1, depth:5}, scene);
    spikeBox.checkCollisions = true;
    spikeBox.visibility = 0;
    spikeBox.material = spikesM;
    spikeBox.position = new BABYLON.Vector3(100,-4,0.5);
    groundObjects.push(spikeBox);

    // Spikes 3
    BABYLON.SceneLoader.ImportMesh("", "../models/", "spikeTrap.gltf", scene, function(newMeshes) {
        var spikeTrap = newMeshes[0];
        spikeTrap.position = new BABYLON.Vector3(202.5,1,0.5);
        spikeTrap.scaling = new BABYLON.Vector3(1.8,0.8,1.8);
        spikeTrap.checkCollisions = true;
        spikes3 = spikeTrap._children[0];
        //spikes.position.y = -1;
    });

    // Spikes collision box 3
    var spikeBox = BABYLON.MeshBuilder.CreateBox('spikes3', {width:5, height:1, depth:5}, scene);
    spikeBox.checkCollisions = true;
    spikeBox.visibility = 0;
    spikeBox.material = spikesM;
    spikeBox.position = new BABYLON.Vector3(202.5,1,0.5);
    groundObjects.push(spikeBox);




    //music
    var musicl4 = new BABYLON.Sound("musicl2", "../sounds/levels/level4/POL-battle-march-short.wav", scene, soundReady, {loop:true, volume:0.2, useCustomAttenuation:false});

    function soundReady(){
        musicl4.play();
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

    scene.executeWhenReady( function() {
        engine.hideLoadingUI();
        scene.registerAfterRender(function () {
            sun.position.x = player.mesh.position.x;
        });
    });
    
    
    return scene;
}


var scene = createScene();


function coinON(){
    CoinDisappear(coin1);
    
    coinIsOn = true;
    //Particles system Fire
    particlesCoin = new BABYLON.GPUParticleSystem("particlesCoin", 100, scene);
    //Texture of each particle
    particlesCoin.particleTexture = new BABYLON.Texture("../textures/goldparticle.png", scene);
    //particles2.translationPivot = new BABYLON.Vector3(0, 0,0);
    //Where the particles come from
    
    particlesCoin.emitter = new BABYLON.Vector3(190,3,0.5);
    
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
    particlesCoin2.particleTexture = new BABYLON.Texture("../textures/goldparticle.png", scene);
    //particles2.translationPivot = new BABYLON.Vector3(0, 0,0);
    //Where the particles come from
    
    particlesCoin2.emitter = new BABYLON.Vector3(195, 3, 0.5);
    
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
    particlesCoin3 = new BABYLON.GPUParticleSystem("particlesCoin3", 100, scene);
    //Texture of each particle
    particlesCoin3.particleTexture = new BABYLON.Texture("../textures/goldparticle.png", scene);
    //particles2.translationPivot = new BABYLON.Vector3(0, 0,0);
    //Where the particles come from
    
    particlesCoin3.emitter = new BABYLON.Vector3(210, 3, 0.5);
    
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
    particlesCoin3.emitRate = 100;

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

function fireON(){
    fireIsOn = true;
    checkpoint = new BABYLON.Vector3(30,9,0.5);
    //Particles system Fire
    var particlesFire = new BABYLON.GPUParticleSystem("particlesFire", 5000, scene);
    //Texture of each particle
    particlesFire.particleTexture = new BABYLON.Texture("../textures/fireParticle.png", scene);
    //particles2.translationPivot = new BABYLON.Vector3(0, 0,0);
    //Where the particles come from
    
    particlesFire.emitter = new BABYLON.Vector3(30,5,0.5);
    
    
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
    checkpoint = new BABYLON.Vector3(120,-1,0.5);
    //Particles system Fire
    var particlesFire2 = new BABYLON.GPUParticleSystem("particlesFire2", 5000, scene);
    //Texture of each particle
    particlesFire2.particleTexture = new BABYLON.Texture("../textures/fireParticle.png", scene);
    //particles2.translationPivot = new BABYLON.Vector3(0, 0,0);
    //Where the particles come from
    
    particlesFire2.emitter = new BABYLON.Vector3(140,-5,0.5);
    
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

function portalON(){

    //Particles system Portal
    var particlesPortal = new BABYLON.ParticleSystem("particlesPortal", 1000, scene);

    //Texture of each particle
    particlesPortal.particleTexture = new BABYLON.Texture("../textures/portalParticles.png", scene);
    

    //Where the particles come from
    particlesPortal.emitter = new BABYLON.Vector3(225,5,0);
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

function trapActive(name){
    if(name == "spikes") trapON(spikes);
    if(name == "spikes2") trapON(spikes2);
    if(name == "spikes3") trapON(spikes3);
}
