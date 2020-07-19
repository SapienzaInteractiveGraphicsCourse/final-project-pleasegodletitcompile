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

var spikes;

var dmg = false;

var snowAnim = true;

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
    

    // Skybox
    var skybox = BABYLON.MeshBuilder.CreateBox("snowbox", {size:1000.0}, scene);
    skybox.addRotation(0.0, deg2rad(180), 0.0);
    var skyboxMaterial = new BABYLON.StandardMaterial("snowbox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../Textures/skybox_winter/snowbox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.material = skyboxMaterial;

    // Fog
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
    scene.fogDensity = 0.0015;

    //Set platforms materials
    //Ice Small Platform
    var iceS = new BABYLON.StandardMaterial("ice", scene);
    iceS.bumpTexture = new BABYLON.Texture("../Textures/IceBump.jpg", scene)
    iceS.bumpTexture.uScale = 1;
    iceS.bumpTexture.vScale = 0.33;
    iceS.diffuseColor = new BABYLON.Color3(0, 1, 1);
    
    var iceS1 = new BABYLON.StandardMaterial("ice1", scene);
    iceS1.bumpTexture = new BABYLON.Texture("../Textures/IceBump.jpg", scene);
    iceS1.bumpTexture.uScale = 0.33;
    iceS1.bumpTexture.vScale = 0.13;
    iceS1.diffuseColor = new BABYLON.Color3(0, 1, 1);

    var iceS2 = new BABYLON.StandardMaterial("ice2", scene);
    iceS2.bumpTexture = new BABYLON.Texture("../Textures/IceBump.jpg", scene);
    iceS2.bumpTexture.uScale = 0.13;
    iceS2.bumpTexture.vScale = 1;
    iceS2.diffuseColor = new BABYLON.Color3(0, 1, 1);

    //Ice Medium Platform
    var iceM = new BABYLON.StandardMaterial("ice", scene);
    iceM.bumpTexture = new BABYLON.Texture("../Textures/IceBump.jpg", scene)
    iceM.bumpTexture.uScale = 1;
    iceM.bumpTexture.vScale = 1.33;
    iceM.diffuseColor = new BABYLON.Color3(0, 1, 1);
    
    var iceM1 = new BABYLON.StandardMaterial("ice1", scene);
    iceM1.bumpTexture = new BABYLON.Texture("../Textures/IceBump.jpg", scene);
    iceM1.bumpTexture.uScale = 0.133;
    iceM1.bumpTexture.vScale = 0.06;
    iceM1.diffuseColor = new BABYLON.Color3(0, 1, 1);

    var iceM2 = new BABYLON.StandardMaterial("ice2", scene);
    iceM2.bumpTexture = new BABYLON.Texture("../Textures/IceBump.jpg", scene);
    iceM2.bumpTexture.uScale = 0.06;
    iceM2.bumpTexture.vScale = 0.133;
    iceM2.diffuseColor = new BABYLON.Color3(0, 1, 1);

    //Ice Big Platform
    var iceB = new BABYLON.StandardMaterial("ice", scene);
    iceB.bumpTexture = new BABYLON.Texture("../Textures/IceBump.jpg", scene)
    iceB.bumpTexture.uScale = 0.3;
    iceB.bumpTexture.vScale = 3;
    iceB.diffuseColor = new BABYLON.Color3(0, 1, 1);
    
    var iceB1 = new BABYLON.StandardMaterial("ice1", scene);
    iceB1.bumpTexture = new BABYLON.Texture("../Textures/IceBump.jpg", scene);
    iceB1.bumpTexture.uScale = 3;
    iceB1.bumpTexture.vScale = 0.08;
    iceB1.diffuseColor = new BABYLON.Color3(0, 1, 1);

    var iceB2 = new BABYLON.StandardMaterial("ice2", scene);
    iceB2.bumpTexture = new BABYLON.Texture("../Textures/IceBump.jpg", scene);
    iceB2.bumpTexture.uScale = 0.08;
    iceB2.bumpTexture.vScale = 0.3;
    iceB2.diffuseColor = new BABYLON.Color3(0, 1, 1);
    
    //Snow Small Platform
    var snowS = new BABYLON.StandardMaterial("snow", scene);
    snowS.bumpTexture = new BABYLON.Texture("../Textures/SnowBump.jpg", scene);
    snowS.bumpTexture.uScale = 0.3;
    snowS.bumpTexture.vScale = 2;
    snowS.diffuseColor = new BABYLON.Color3(1, 1, 1);

    var snowS1 = new BABYLON.StandardMaterial("snow1", scene);
    snowS1.bumpTexture = new BABYLON.Texture("../Textures/SnowBump.jpg", scene);
    snowS1.bumpTexture.uScale = 2;
    snowS1.bumpTexture.vScale = 0.08;
    snowS1.diffuseColor = new BABYLON.Color3(1, 1, 1);

    var snowS2 = new BABYLON.StandardMaterial("snow2", scene);
    snowS2.bumpTexture = new BABYLON.Texture("../Textures/SnowBump.jpg", scene);
    snowS2.bumpTexture.uScale = 0.08;
    snowS2.bumpTexture.vScale = 0.3;
    snowS2.diffuseColor = new BABYLON.Color3(1, 1, 1);

    //Snow Medium Platform
    var snowM = new BABYLON.StandardMaterial("snow", scene);
    snowM.bumpTexture = new BABYLON.Texture("../Textures/SnowBump.jpg", scene);
    snowM.bumpTexture.uScale = 0.3;
    snowM.bumpTexture.vScale = 2;
    snowM.diffuseColor = new BABYLON.Color3(1, 1, 1);

    var snowM1 = new BABYLON.StandardMaterial("snow1", scene);
    snowM1.bumpTexture = new BABYLON.Texture("../Textures/SnowBump.jpg", scene);
    snowM1.bumpTexture.uScale = 2;
    snowM1.bumpTexture.vScale = 0.08;
    snowM1.diffuseColor = new BABYLON.Color3(1, 1, 1);

    var snowM2 = new BABYLON.StandardMaterial("snow2", scene);
    snowM2.bumpTexture = new BABYLON.Texture("../Textures/SnowBump.jpg", scene);
    snowM2.bumpTexture.uScale = 0.08;
    snowM2.bumpTexture.vScale = 0.3;
    snowM2.diffuseColor = new BABYLON.Color3(1, 1, 1);

    //Snow Big Platform
    var snowB = new BABYLON.StandardMaterial("snow", scene);
    snowB.bumpTexture = new BABYLON.Texture("../Textures/SnowBump.jpg", scene);
    snowB.bumpTexture.uScale = 0.3;
    snowB.bumpTexture.vScale = 2;
    snowB.diffuseColor = new BABYLON.Color3(1, 1, 1);

    var snowB1 = new BABYLON.StandardMaterial("snow1", scene);
    snowB1.bumpTexture = new BABYLON.Texture("../Textures/SnowBump.jpg", scene);
    snowB1.bumpTexture.uScale = 2;
    snowB1.bumpTexture.vScale = 0.08;
    snowB1.diffuseColor = new BABYLON.Color3(1, 1, 1);

    var snowB2 = new BABYLON.StandardMaterial("snow2", scene);
    snowB2.bumpTexture = new BABYLON.Texture("../Textures/SnowBump.jpg", scene);
    snowB2.bumpTexture.uScale = 0.08;
    snowB2.bumpTexture.vScale = 0.3;
    snowB2.diffuseColor = new BABYLON.Color3(1, 1, 1);

    //Set fire material
    var fireM = new BABYLON.StandardMaterial("fireM", scene);
    fireM.diffuseColor = new BABYLON.Color3(0, 0, 0);

    //Set coin material
    var coinM = new BABYLON.StandardMaterial("coinM", scene);
    coinM.diffuseColor = new BABYLON.Color3(0, 0, 0);

    //Set spikes material
    var spikesM = new BABYLON.StandardMaterial("spikesM", scene);
    spikesM.diffuseColor = new BABYLON.Color3(0, 0, 0);

    // Camera
    camera = new BABYLON.FollowCamera('camera', new BABYLON.Vector3(0, 0, 0), scene);
    camera.radius = 40;
    camera.heightOffset = 10;
    camera.rotationOffset = 180;
    camera.attachControl(canvas, true);

    // Light
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(-1,1,1), scene);

    // Snow multimaterial
    var multimatSnowS = new BABYLON.MultiMaterial("multiSnow", scene);
    multimatSnowS.subMaterials.push(snowS);
    multimatSnowS.subMaterials.push(snowS1);
    multimatSnowS.subMaterials.push(snowS2);

    var multimatSnowM = new BABYLON.MultiMaterial("multiSnow", scene);
    multimatSnowM.subMaterials.push(snowM);
    multimatSnowM.subMaterials.push(snowM1);
    multimatSnowM.subMaterials.push(snowM2);

    var multimatSnowB = new BABYLON.MultiMaterial("multiSnow", scene);
    multimatSnowB.subMaterials.push(snowB);
    multimatSnowB.subMaterials.push(snowB1);
    multimatSnowB.subMaterials.push(snowB2);

    // Ice multimaterial
    var multimatIceS = new BABYLON.MultiMaterial("multiIce", scene);
    multimatIceS.subMaterials.push(iceS);
    multimatIceS.subMaterials.push(iceS1);
    multimatIceS.subMaterials.push(iceS2);

    var multimatIceM = new BABYLON.MultiMaterial("multiIce", scene);
    multimatIceM.subMaterials.push(iceM);
    multimatIceM.subMaterials.push(iceM1);
    multimatIceM.subMaterials.push(iceM2);

    var multimatIceB = new BABYLON.MultiMaterial("multiIce", scene);
    multimatIceB.subMaterials.push(iceB);
    multimatIceB.subMaterials.push(iceB1);
    multimatIceB.subMaterials.push(iceB2);
    
    // Platform 1 Snow
    var platform1 = BABYLON.MeshBuilder.CreateBox('platform1', {width:50, height:platformHeight, depth:15}, scene);
    platform1.position = new BABYLON.Vector3(0, 0, 5)
    platform1.checkCollisions = true;
    platform1.material = multimatSnowB;
    platform1.subMeshes = [];
    var verticesCount = platform1.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform1);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform1);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform1);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform1);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform1);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform1);
    groundObjects.push(platform1);

    // Platform 1 Snow
    var platform1 = BABYLON.MeshBuilder.CreateBox('platform1', {width:50, height:platformHeight, depth:15}, scene);
    platform1.position = new BABYLON.Vector3(100, 10, 5)
    platform1.checkCollisions = true;
    platform1.material = multimatSnowB;
    platform1.subMeshes = [];
    var verticesCount = platform1.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform1);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform1);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform1);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform1);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform1);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform1);
    groundObjects.push(platform1);

    // Platform 2 Ice
    var platform2 = BABYLON.MeshBuilder.CreateBox('platform2', {width:20, height:platformHeight, depth:15}, scene);
    platform2.position = new BABYLON.Vector3(35, -10, 5)
    platform2.checkCollisions = true;
    platform2.material = multimatIceM;
    platform2.subMeshes = [];
    var verticesCount2 = platform2.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount2, 0, 6, platform2);
    new BABYLON.SubMesh(1, 0, verticesCount2, 6, 6, platform2);
    new BABYLON.SubMesh(2, 0, verticesCount2, 12, 6, platform2);
    new BABYLON.SubMesh(2, 0, verticesCount2, 18, 6, platform2);
    new BABYLON.SubMesh(0, 0, verticesCount2, 24, 6, platform2);
    new BABYLON.SubMesh(0, 0, verticesCount2, 30, 6, platform2);
    
    groundObjects.push(platform2);

    // Platform 2 Ice
    var platform2 = BABYLON.MeshBuilder.CreateBox('platform2', {width:20, height:platformHeight, depth:15}, scene);
    platform2.position = new BABYLON.Vector3(55, 0, 5)
    platform2.checkCollisions = true;
    platform2.material = multimatIceM;
    platform2.subMeshes = [];
    var verticesCount2 = platform2.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount2, 0, 6, platform2);
    new BABYLON.SubMesh(1, 0, verticesCount2, 6, 6, platform2);
    new BABYLON.SubMesh(2, 0, verticesCount2, 12, 6, platform2);
    new BABYLON.SubMesh(2, 0, verticesCount2, 18, 6, platform2);
    new BABYLON.SubMesh(0, 0, verticesCount2, 24, 6, platform2);
    new BABYLON.SubMesh(0, 0, verticesCount2, 30, 6, platform2);
    
    groundObjects.push(platform2);

    // Platform 1 Ice
    var platform1 = BABYLON.MeshBuilder.CreateBox('platform3', {width:50, height:platformHeight, depth:15}, scene);
    platform1.position = new BABYLON.Vector3(0, -20, 5)
    platform1.material = multimatIceB;
    platform1.checkCollisions = true;
    platform1.subMeshes = [];
    var verticesCount3 = platform1.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount3, 0, 6, platform1);
    new BABYLON.SubMesh(1, 0, verticesCount3, 6, 6, platform1);
    new BABYLON.SubMesh(2, 0, verticesCount3, 12, 6, platform1);
    new BABYLON.SubMesh(2, 0, verticesCount3, 18, 6, platform1);
    new BABYLON.SubMesh(0, 0, verticesCount3, 24, 6, platform1);
    new BABYLON.SubMesh(0, 0, verticesCount3, 30, 6, platform1);
    groundObjects.push(platform1);

    // Platform 2 Ice
    var platform2 = BABYLON.MeshBuilder.CreateBox('platform2', {width:20, height:platformHeight, depth:15}, scene);
    platform2.position = new BABYLON.Vector3(140, 20, 5)
    platform2.checkCollisions = true;
    platform2.material = multimatIceM;
    platform2.subMeshes = [];
    var verticesCount2 = platform2.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount2, 0, 6, platform2);
    new BABYLON.SubMesh(1, 0, verticesCount2, 6, 6, platform2);
    new BABYLON.SubMesh(2, 0, verticesCount2, 12, 6, platform2);
    new BABYLON.SubMesh(2, 0, verticesCount2, 18, 6, platform2);
    new BABYLON.SubMesh(0, 0, verticesCount2, 24, 6, platform2);
    new BABYLON.SubMesh(0, 0, verticesCount2, 30, 6, platform2);
    
    groundObjects.push(platform2);

    // Platform 3 Ice
    var platform3 = BABYLON.MeshBuilder.CreateBox('platform3', {width:5, height:platformHeight, depth:15}, scene);
    platform3.position = new BABYLON.Vector3(160, 15, 5)
    platform3.material = multimatIceS;
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

    // Platform 3 Ice
    var platform3 = BABYLON.MeshBuilder.CreateBox('platform3', {width:5, height:platformHeight, depth:15}, scene);
    platform3.position = new BABYLON.Vector3(165, 20, 5)
    platform3.material = multimatIceS;
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

    // Platform 3 Ice
    var platform3 = BABYLON.MeshBuilder.CreateBox('platform3', {width:5, height:platformHeight, depth:15}, scene);
    platform3.position = new BABYLON.Vector3(170, 25, 5)
    platform3.material = multimatIceS;
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

    // Platform 3 Ice
    var platform3 = BABYLON.MeshBuilder.CreateBox('platform3', {width:5, height:platformHeight, depth:15}, scene);
    platform3.position = new BABYLON.Vector3(175, 30, 5)
    platform3.material = multimatIceS;
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

    // Platform 3 Ice
    var platform3 = BABYLON.MeshBuilder.CreateBox('platform3', {width:5, height:platformHeight, depth:15}, scene);
    platform3.position = new BABYLON.Vector3(180, 35, 5)
    platform3.material = multimatIceS;
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

    // Platform 1 Ice
    var platform1 = BABYLON.MeshBuilder.CreateBox('platform3', {width:50, height:platformHeight, depth:15}, scene);
    platform1.position = new BABYLON.Vector3(215, 35, 5)
    platform1.material = multimatIceB;
    platform1.checkCollisions = true;
    platform1.subMeshes = [];
    var verticesCount3 = platform1.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount3, 0, 6, platform1);
    new BABYLON.SubMesh(1, 0, verticesCount3, 6, 6, platform1);
    new BABYLON.SubMesh(2, 0, verticesCount3, 12, 6, platform1);
    new BABYLON.SubMesh(2, 0, verticesCount3, 18, 6, platform1);
    new BABYLON.SubMesh(0, 0, verticesCount3, 24, 6, platform1);
    new BABYLON.SubMesh(0, 0, verticesCount3, 30, 6, platform1);
    groundObjects.push(platform1);

    // Platform 1 Snow
    var platform1 = BABYLON.MeshBuilder.CreateBox('platform1', {width:50, height:platformHeight, depth:15}, scene);
    platform1.position = new BABYLON.Vector3(256, 0, 5)
    platform1.rotate(new BABYLON.Vector3(0,0,1), Math.PI/2)
    platform1.checkCollisions = true;
    platform1.material = multimatSnowB;
    platform1.subMeshes = [];
    var verticesCount = platform1.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform1);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform1);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform1);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform1);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform1);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform1);
    groundObjects.push(platform1);


    // Platform 1 Snow
    var platform1 = BABYLON.MeshBuilder.CreateBox('platform1', {width:50, height:platformHeight, depth:15}, scene);
    platform1.position = new BABYLON.Vector3(256, 50, 5)
    platform1.rotate(new BABYLON.Vector3(0,0,1), Math.PI/2)
    platform1.checkCollisions = true;
    platform1.material = multimatSnowB;
    platform1.subMeshes = [];
    var verticesCount = platform1.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, platform1);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, platform1);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, platform1);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, platform1);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, platform1);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, platform1);
    groundObjects.push(platform1);

    // Platform 3 Snow
    var platform3 = BABYLON.MeshBuilder.CreateBox('platform3', {width:5, height:platformHeight, depth:15}, scene);
    platform3.position = new BABYLON.Vector3(252.5, 45, 5)
    platform3.material = multimatSnowS;
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

    // Platform 3 Snow
    var platform3 = BABYLON.MeshBuilder.CreateBox('platform3', {width:5, height:platformHeight, depth:15}, scene);
    platform3.position = new BABYLON.Vector3(252.5, 30, 5)
    platform3.material = multimatSnowS;
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

    // Platform 3 Snow
    var platform3 = BABYLON.MeshBuilder.CreateBox('platform3', {width:5, height:platformHeight, depth:15}, scene);
    platform3.position = new BABYLON.Vector3(245, 25, 5)
    platform3.material = multimatSnowS;
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


    // Platform 2 Snow
    var platform2 = BABYLON.MeshBuilder.CreateBox('platform2', {width:20, height:platformHeight, depth:15}, scene);
    platform2.position = new BABYLON.Vector3(230, 20, 5)
    platform2.checkCollisions = true;
    platform2.material = multimatSnowM;
    platform2.subMeshes = [];
    var verticesCount2 = platform2.getTotalVertices();

    new BABYLON.SubMesh(1, 0, verticesCount2, 0, 6, platform2);
    new BABYLON.SubMesh(1, 0, verticesCount2, 6, 6, platform2);
    new BABYLON.SubMesh(2, 0, verticesCount2, 12, 6, platform2);
    new BABYLON.SubMesh(2, 0, verticesCount2, 18, 6, platform2);
    new BABYLON.SubMesh(0, 0, verticesCount2, 24, 6, platform2);
    new BABYLON.SubMesh(0, 0, verticesCount2, 30, 6, platform2);
    
    groundObjects.push(platform2);

    // Snowman 
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "snowman.gltf", scene, function(newMeshes) {
        var snowman = newMeshes[0];
        snowman.position = new BABYLON.Vector3(6.5,0.9,10);
        snowman.scaling = new BABYLON.Vector3(2,2,2);
        var root = snowman._children[0];
        snowRA = root._children[1];
        snowLA = root._children[2];
        snowCyl = root._children[6];
        snowRA._position.x = 0.4;
        snowLA._position.x = -0.5;
    });

    // Snowman
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "snowman.gltf", scene, function(newMeshes) {
        var snowman = newMeshes[0];
        snowman.position = new BABYLON.Vector3(102.5,10.9,10);
        snowman.scaling = new BABYLON.Vector3(2,2,2);
        var root = snowman._children[0];
        snowRA2 = root._children[1];
        snowLA2 = root._children[2];
        snowCyl2 = root._children[6];
        snowRA._position.x = 0.4;
        snowLA._position.x = -0.5;
    });

    // Bush
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterBush.gltf", scene, function(newMeshes) {
        var WinterBush = newMeshes[0];
        WinterBush.position = new BABYLON.Vector3(-1,0.3,9);
        WinterBush.scaling = new BABYLON.Vector3(5,5,5);
    });

    // Winter tree
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterTree.gltf", scene, function(newMeshes) {
        var WinterTree = newMeshes[0];
        WinterTree.position = new BABYLON.Vector3(0,2,-7);
        WinterTree.scaling = new BABYLON.Vector3(5,5,5);
    });

    // Winter tree 1
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterTree1.gltf", scene, function(newMeshes) {
        var WinterTree1 = newMeshes[0];
        WinterTree1.position = new BABYLON.Vector3(-20,5,-20);
        WinterTree1.scaling = new BABYLON.Vector3(1,1,1);
    });

    // Winter tree 1
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterTree1.gltf", scene, function(newMeshes) {
        var WinterTree1 = newMeshes[0];
        WinterTree1.position = new BABYLON.Vector3(83,15, -20);
        WinterTree1.scaling = new BABYLON.Vector3(1,1,1);
    });

    // Winter tree 1
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterTree1.gltf", scene, function(newMeshes) {
        var WinterTree1 = newMeshes[0];
        WinterTree1.position = new BABYLON.Vector3(108,15, -20);
        WinterTree1.scaling = new BABYLON.Vector3(1,1,1);
    });

    // Winter tree 2
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterTree2.gltf", scene, function(newMeshes) {
        var WinterTree2 = newMeshes[0];
        WinterTree2.position = new BABYLON.Vector3(23,5, 7);
        WinterTree2.scaling = new BABYLON.Vector3(1,1,1);
    });

    // Winter tree 2
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterTree2.gltf", scene, function(newMeshes) {
        var WinterTree2 = newMeshes[0];
        WinterTree2.position = new BABYLON.Vector3(98,15, 7);
        WinterTree2.scaling = new BABYLON.Vector3(1,1,1);
    });

    // Winter tree 2
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterTree2.gltf", scene, function(newMeshes) {
        var WinterTree2 = newMeshes[0];
        WinterTree2.position = new BABYLON.Vector3(123,15, 7);
        WinterTree2.scaling = new BABYLON.Vector3(1,1,1);
    });

    // Winter tree 3
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterTree3.gltf", scene, function(newMeshes) {
        var WinterTree2 = newMeshes[0];
        WinterTree2.position = new BABYLON.Vector3(90,15, 29);
        WinterTree2.scaling = new BABYLON.Vector3(1,1,1);
    });

    // Winter tree 3
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterTree3.gltf", scene, function(newMeshes) {
        var WinterTree2 = newMeshes[0];
        WinterTree2.position = new BABYLON.Vector3(115,15, 29);
        WinterTree2.scaling = new BABYLON.Vector3(1,1,1);
    });

    //Small Rock
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterRockSmall.gltf", scene, function(newMeshes) {
        var WinterRockSmall = newMeshes[0];
        WinterRockSmall.position = new BABYLON.Vector3(41,-9.5, 6);
        WinterRockSmall.scaling = new BABYLON.Vector3(3,3,3);
    });

    //Medium Rock
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterRockMedium.gltf", scene, function(newMeshes) {
        var WinterRockSmall = newMeshes[0];
        WinterRockSmall.position = new BABYLON.Vector3(35,-9.5, 5);
        WinterRockSmall.scaling = new BABYLON.Vector3(3,3,3);
    });

    //Big Rock
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterRockBig.gltf", scene, function(newMeshes) {
        var WinterRockSmall = newMeshes[0];
        WinterRockSmall.position = new BABYLON.Vector3(10,2, 5);
        WinterRockSmall.scaling = new BABYLON.Vector3(3,3,3);
    });

    //Big Rock
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterRockBig.gltf", scene, function(newMeshes) {
        var WinterRockSmall = newMeshes[0];
        WinterRockSmall.position = new BABYLON.Vector3(31,-8, 5);
        WinterRockSmall.scaling = new BABYLON.Vector3(3,3,3);
    });

    //Big Rock
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterRockBig.gltf", scene, function(newMeshes) {
        var WinterRockSmall = newMeshes[0];
        WinterRockSmall.position = new BABYLON.Vector3(23,-8, 4);
        WinterRockSmall.scaling = new BABYLON.Vector3(3,3,3);
    });


    // Winter bridge
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterBridge.gltf", scene, function(newMeshes) {
        var WinterBridge = newMeshes[0];
        WinterBridge.position = new BABYLON.Vector3(-12,1.1,10.5);
        WinterBridge.scaling = new BABYLON.Vector3(5,5,5);
    });


    // Winter wolf
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "Wolf.gltf", scene, function(newMeshes) {
        var Wolf = newMeshes[0];
        Wolf.position = new BABYLON.Vector3(-12,1.1,10.5);
        Wolf.scaling = new BABYLON.Vector3(1,1,1);
        Wolf.rotate(new BABYLON.Vector3(0,2,0), -45);
    });

    // Winter bridge Platform3
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterBridge.gltf", scene, function(newMeshes) {
        var WinterBridge = newMeshes[0];
        WinterBridge.position = new BABYLON.Vector3(16,-19,10.5);
        WinterBridge.scaling = new BABYLON.Vector3(5,5,5);
    });


    // Winter wolf Platform3
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "Wolf.gltf", scene, function(newMeshes) {
        var Wolf = newMeshes[0];
        Wolf.position = new BABYLON.Vector3(16,-19,10.5);
        Wolf.scaling = new BABYLON.Vector3(1,1,1);
        Wolf.rotate(new BABYLON.Vector3(0,2,0), 45);
    });

    // Eskimo model
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "eskimo.gltf", scene, function(newMeshes) {
        var eskimo = newMeshes[0];
        eskimo.position = new BABYLON.Vector3(5,-15,10.5);
        eskimo.scaling = new BABYLON.Vector3(1,1,1);
        eskimo.rotate(new BABYLON.Vector3(0,2,0), 45);
    });

    // Bear model
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "bear.gltf", scene, function(newMeshes) {
        var bear = newMeshes[0];
        bear.position = new BABYLON.Vector3(-5,-15,14);
        bear.scaling = new BABYLON.Vector3(1,1,1);
        bear.rotate(new BABYLON.Vector3(0,2,0), 45);
    });

    // Tux model 1
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "tux.gltf", scene, function(newMeshes) {
        var tux = newMeshes[0];
        tux.position = new BABYLON.Vector3(-18,-19,10);
        tux.scaling = new BABYLON.Vector3(0.03,0.03,0.03);
        tux.rotate(new BABYLON.Vector3(0,2,0), -5.5);
    });

    // Tux model 2
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "tux.gltf", scene, function(newMeshes) {
        var tux = newMeshes[0];
        tux.position = new BABYLON.Vector3(-20,-19,10);
        tux.scaling = new BABYLON.Vector3(0.03,0.03,0.03);
        tux.rotate(new BABYLON.Vector3(0,2,0), 5.5);
    });

    // Tux model 3
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "tux.gltf", scene, function(newMeshes) {
        var tux = newMeshes[0];
        tux.position = new BABYLON.Vector3(-19,-19,8);
        tux.scaling = new BABYLON.Vector3(0.03,0.03,0.03);
        tux.rotate(new BABYLON.Vector3(0,2,0), 9.5);
    });

    // Penguins community
    // Penguin igloo
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "igloopenguin.gltf", scene, function(newMeshes) {
        var igloopenguin = newMeshes[0];
        igloopenguin.position = new BABYLON.Vector3(54,-8.2,11);
        igloopenguin.scaling = new BABYLON.Vector3(2,2,2);
        igloopenguin.rotate(new BABYLON.Vector3(0,2,0), 1.4);
    });

    // Fish bucket
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "fishbucket.gltf", scene, function(newMeshes) {
        var fishbucket = newMeshes[0];
        fishbucket.position = new BABYLON.Vector3(48,-12.8,13);
        fishbucket.scaling = new BABYLON.Vector3(3,3,3);
        fishbucket.rotate(new BABYLON.Vector3(0,2,0), 0);
    });

    // COIN 1
    BABYLON.SceneLoader.ImportMesh("", "../models/", "coin.gltf", scene, function(newMeshes) {
        coin1 = newMeshes[0];
        coin1.position = new BABYLON.Vector3(-7,-17.5,0.5);
        coin1.scaling = new BABYLON.Vector3(10,10,10);
        coin1.rotation = new BABYLON.Vector3(deg2rad(-90),0,0);
        Coin(coin1); // start animation
    });

    // Coin collision box
    var coinBox = BABYLON.MeshBuilder.CreateCylinder('coinBox', {height: 2, diameterTop: 2.3, diameterBottom: 2.3, tessellation: 100, subdivisons: 10}, scene);
    coinBox.visibility = 0;
    coinBox.material = coinM;
    coinBox.position = new BABYLON.Vector3(-7,-17,0.5);
    coinBox.rotate(new BABYLON.Vector3(1,0,0), 1.6)
    groundObjects.push(coinBox);

    // COIN 2
    BABYLON.SceneLoader.ImportMesh("", "../models/", "coin.gltf", scene, function(newMeshes) {
        coin2 = newMeshes[0];
        coin2.position = new BABYLON.Vector3(220, 23.5, 0.5);
        coin2.scaling = new BABYLON.Vector3(10,10,10);
        coin2.rotate(new BABYLON.Vector3(1,0,0), 1.6)
        coin2.checkCollisions = true;
        Coin(coin2); //start animation
    });

    // Coin collision box 2
    var coinBox = BABYLON.MeshBuilder.CreateCylinder('coinBox2', {height: 2, diameterTop: 2.3, diameterBottom: 2.3, tessellation: 100, subdivisons: 10}, scene);
    coinBox.checkCollisions = false;
    coinBox.visibility = 0;
    coinBox.material = coinM;
    coinBox.position = new BABYLON.Vector3(220, 23, 0.5);
    coinBox.rotate(new BABYLON.Vector3(1,0,0), 1.6)
    groundObjects.push(coinBox);

    // Fire Log
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "FireLog.gltf", scene, function(newMeshes) {
        var FireLog = newMeshes[0];
        FireLog.position = new BABYLON.Vector3(-12,-19.1,0.5);
        FireLog.scaling = new BABYLON.Vector3(2,2,2);
        FireLog.checkCollisions = true;
    });

    // Fire collision box
    var fireBox = BABYLON.MeshBuilder.CreateBox('fireBox', {width:2.5, height:2, depth:2}, scene);
    fireBox.checkCollisions = true;
    fireBox.visibility = 0;
    fireBox.material = fireM;
    fireBox.position = new BABYLON.Vector3(-12,-19.1,0.5);
    groundObjects.push(fireBox);

    // Fire Log 2
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "FireLog.gltf", scene, function(newMeshes) {
        var FireLog = newMeshes[0];
        FireLog.position = new BABYLON.Vector3(220,36.1,0.5);
        FireLog.scaling = new BABYLON.Vector3(2,2,2);
        FireLog.checkCollisions = true;
    });

    // Fire collision box 2
    var fireBox = BABYLON.MeshBuilder.CreateBox('fireBox2', {width:2.5, height:2, depth:2}, scene);
    fireBox.checkCollisions = true;
    fireBox.visibility = 0;
    fireBox.material = fireM;
    fireBox.position = new BABYLON.Vector3(220,36.1,0.5);
    groundObjects.push(fireBox);

    // Spikes
    BABYLON.SceneLoader.ImportMesh("", "../models/", "spikeTrap.gltf", scene, function(newMeshes) {
        var spikeTrap = newMeshes[0];
        spikeTrap.position = new BABYLON.Vector3(5,1,0.5);
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
    spikeBox.position = new BABYLON.Vector3(5,1,0.5);
    groundObjects.push(spikeBox);

    //Particles system Snow
    var particles = new BABYLON.GPUParticleSystem("particles", 20000, scene);

    //Texture of each particle
	particles.particleTexture = new BABYLON.Texture("../textures/snowflake.jpg", scene);
    particles.translationPivot = new BABYLON.Vector3(0, 100,30);

    //Where the particles come from
    particles.emitter = camera;
	particles.minEmitBox = new BABYLON.Vector3(-100, 0, 0); // Starting all from
    particles.maxEmitBox = new BABYLON.Vector3(100, 0, 0); // To...

    // Colors of all particles
	particles.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
	particles.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
	particles.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

	// Size of each particle (random between...
	particles.minSize = 0.1;
	particles.maxSize = 0.5;

	// Life time of each particle (random between...
	particles.minLifeTime = 1;
	particles.maxLifeTime = 25;

	// Emission rate
	particles.emitRate = 600;

    window.ps = particles;

	// Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
	particles.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

	// Set the gravity of all particles
	particles.gravity = new BABYLON.Vector3(0, 0, -2);

	// Direction of each particle after it has been emitted
	particles.direction1 = new BABYLON.Vector3(-.5, -1, 1);
	particles.direction2 = new BABYLON.Vector3(.5, 10, 10);

	// Angular speed, in radians
	particles.minAngularSpeed = 0;
	particles.maxAngularSpeed = Math.PI;

	// Speed
	particles.minEmitPower = .01;
	particles.maxEmitPower = 30;

	// Start the particle system
    particles.start();

    // Music
    var musicl2 = new BABYLON.Sound("musicl2", "../sounds/songs/dance with the trees.mp3", scene, soundReady, {loop:true, volume:0.5});

    function soundReady(){
        musicl2.play();
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
    });

    return scene;
}

var scene = createScene();

scene.registerAfterRender(function () {
    if(timeAnimation > 4){
        snowMan();
        timeAnimation = 0;
    }
});

function coinON(){
    CoinDisappear(coin1);
    
    coinIsOn = true;
    //Particles system Fire
    particles4 = new BABYLON.GPUParticleSystem("particles4", 10000, scene);
    //Texture of each particle
    particles4.particleTexture = new BABYLON.Texture("../textures/goldparticle.png", scene);
    //particles2.translationPivot = new BABYLON.Vector3(0, 0,0);
    //Where the particles come from
    
    particles4.emitter = new BABYLON.Vector3(-7,-17,0.5);
    
    particles4.minEmitBox = new BABYLON.Vector3(-0.5, 0, 0); // Starting all from
    particles4.maxEmitBox = new BABYLON.Vector3(0.5, 0, 0); // To...

    // Colors of all particles
    particles4.color1 = new BABYLON.Color4(1, 0.84, 0, 1.0);
    particles4.color2 = new BABYLON.Color4(1, 0.84, 0, 1.0);
    particles4.colorDead = new BABYLON.Color4(1, 0.84, 0, 0.0);

    // Size of each particle (random between...
    particles4.minSize = 0.1;
    particles4.maxSize = 0.5;

    // Life time of each particle (random between...
    particles4.minLifeTime = 0.01;
    particles4.maxLifeTime = 0.01;

    // Emission rate
    particles4.emitRate = 100;

    window.ps = particles4;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particles4.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particles4.gravity = new BABYLON.Vector3(0, 0, 0);

    // Direction of each particle after it has been emitted
    particles4.direction1 = new BABYLON.Vector3(1, 1, 0.2);
    particles4.direction2 = new BABYLON.Vector3(-1, 1, -0.2);

    // Angular speed, in radians
    particles4.minAngularSpeed = 0;
    particles4.maxAngularSpeed = Math.PI;

    // Speed
    particles4.minEmitPower = 10;
    particles4.maxEmitPower = 10;
    coin1.visibility = 0;

    // Start the particle system
    particles4.start();
}

function coinON2(){
    CoinDisappear(coin2);
    
    coinIsOn2 = true;
    //Particles system Fire
    particles5 = new BABYLON.GPUParticleSystem("particles5", 10000, scene);
    //Texture of each particle
    particles5.particleTexture = new BABYLON.Texture("../textures/goldparticle.png", scene);
    //particles2.translationPivot = new BABYLON.Vector3(0, 0,0);
    //Where the particles come from
    
    particles5.emitter = new BABYLON.Vector3(220, 13, 0.5);
    
    particles5.minEmitBox = new BABYLON.Vector3(-0.5, 0, 0); // Starting all from
    particles5.maxEmitBox = new BABYLON.Vector3(0.5, 0, 0); // To...

    // Colors of all particles
    particles5.color1 = new BABYLON.Color4(1, 0.84, 0, 1.0);
    particles5.color2 = new BABYLON.Color4(1, 0.84, 0, 1.0);
    particles5.colorDead = new BABYLON.Color4(1, 0.84, 0, 0.0);

    // Size of each particle (random between...
    particles5.minSize = 0.1;
    particles5.maxSize = 0.5;

    // Life time of each particle (random between...
    particles5.minLifeTime = 0.01;
    particles5.maxLifeTime = 0.01;

    // Emission rate
    particles5.emitRate = 100;

    window.ps = particles5;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particles5.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particles5.gravity = new BABYLON.Vector3(0, 0, -2);

    // Direction of each particle after it has been emitted
    particles5.direction1 = new BABYLON.Vector3(1, 1, 0.2);
    particles5.direction2 = new BABYLON.Vector3(-1, 1, -0.2);

    // Angular speed, in radians
    particles5.minAngularSpeed = 0;
    particles5.maxAngularSpeed = Math.PI;

    // Speed
    particles5.minEmitPower = 10;
    particles5.maxEmitPower = 10;
    coin2.visibility = 0;

    // Start the particle system
    particles5.start();
}

function fireON(){
    fireIsOn = true;
    checkpoint = new BABYLON.Vector3(-12,-14,0);
    //Particles system Fire
    var particles2 = new BABYLON.GPUParticleSystem("particles2", 10000, scene);
    //Texture of each particle
    particles2.particleTexture = new BABYLON.Texture("../textures/fireParticle.png", scene);
    //particles2.translationPivot = new BABYLON.Vector3(0, 0,0);
    //Where the particles come from
    
    particles2.emitter = new BABYLON.Vector3(-12, -19.1, 0);
    
    
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

function fireON2(){
    fireIsOn2 = true;
    checkpoint = new BABYLON.Vector3(220,41.1,0.5);
    //Particles system Fire
    var particles3 = new BABYLON.GPUParticleSystem("particles3", 10000, scene);
    //Texture of each particle
    particles3.particleTexture = new BABYLON.Texture("../textures/fireParticle.png", scene);
    //particles2.translationPivot = new BABYLON.Vector3(0, 0,0);
    //Where the particles come from
    
    particles3.emitter = new BABYLON.Vector3(220, 36.1, 0.5);
    
    particles3.minEmitBox = new BABYLON.Vector3(-0.5, 0, 0); // Starting all from
    particles3.maxEmitBox = new BABYLON.Vector3(0.5, 0, 0); // To...

    // Colors of all particles
    particles3.color1 = new BABYLON.Color4(1, 0, 0, 1.0);
    particles3.color2 = new BABYLON.Color4(1, 1, 0, 1.0);
    particles3.colorDead = new BABYLON.Color4(1, 0, 0, 0.0);

    // Size of each particle (random between...
    particles3.minSize = 0.1;
    particles3.maxSize = 0.5;

    // Life time of each particle (random between...
    particles3.minLifeTime = 0.05;
    particles3.maxLifeTime = 0.1;

    // Emission rate
    particles3.emitRate = 600;

    window.ps = particles3;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particles3.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particles3.gravity = new BABYLON.Vector3(0, 0, -2);

    // Direction of each particle after it has been emitted
    particles3.direction1 = new BABYLON.Vector3(0.2, 1, 0.2);
    particles3.direction2 = new BABYLON.Vector3(-0.2, 1, -0.2);
    
    // Angular speed, in radians
    particles3.minAngularSpeed = 0;
    particles3.maxAngularSpeed = Math.PI;

    // Speed
    particles3.minEmitPower = .01;
    particles3.maxEmitPower = 30;

    // Start the particle system
    particles3.start();
}

function trapActive(name){
    if(name == "spikes") trapON(spikes);
}