// Canvas
var canvas = document.getElementById('renderCanvas');
// 3D Engine
var engine = new BABYLON.Engine(canvas, true);

var camera;

//Time to try to implement gravity and run
var timeWalk = 0;
var timeJump = 0;
var timeSlide = 0;

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

var Cloud1;
var Cloud2;
var Cloud3;

var isReady = false;



var dmg = false;

var snowAnim = true;

var checkpoint = new BABYLON.Vector3(0, 10, 0);

var platformHeight = 2;
var knight;
var helmet;

// List of objects that are considered ground
var groundObjects = [];

var nextLevel = "../level3.html";

var createScene = function() {
    // Loading UI
    engine.displayLoadingUI();
    engine.loadingUIText = "Loading level...";

    // Scene
    var scene = new BABYLON.Scene(engine);
    scene.collisionsEnabled = true;
    
    // Camera
    camera = new BABYLON.FollowCamera('camera', new BABYLON.Vector3(0, 0, 0), scene);
    camera.radius = 40;
    camera.heightOffset = 10;
    camera.rotationOffset = 180;
    camera.attachControl(canvas, true);

    // Light
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(-1,1,1), scene);
    
    // Skybox
    var skybox = BABYLON.MeshBuilder.CreateBox("snowbox", {size:2000.0}, scene);
    skybox.addRotation(0.0, deg2rad(180), 0.0);
    var skyboxMaterial = new BABYLON.StandardMaterial("snowbox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("../Textures/skybox_winter/snowbox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.disableLighting = true;
    skybox.infiniteDistance = true;
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

    //Set portal material
    var portalM = new BABYLON.StandardMaterial("portalM", scene);
    portalM.diffuseColor = new BABYLON.Color3(0, 0, 0);

    // Snow multimaterial
    var multimatSnowS = new BABYLON.MultiMaterial("multiGround", scene);
    multimatSnowS.subMaterials.push(snowS);
    multimatSnowS.subMaterials.push(snowS1);
    multimatSnowS.subMaterials.push(snowS2);

    var multimatSnowM = new BABYLON.MultiMaterial("multiGround", scene);
    multimatSnowM.subMaterials.push(snowM);
    multimatSnowM.subMaterials.push(snowM1);
    multimatSnowM.subMaterials.push(snowM2);

    var multimatSnowB = new BABYLON.MultiMaterial("multiGround", scene);
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
    platform1.position = new BABYLON.Vector3(95, 10, 5)
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
    platform2.position = new BABYLON.Vector3(135, 20, 5)
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
    platform3.position = new BABYLON.Vector3(155, 15, 5)
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
    platform3.position = new BABYLON.Vector3(162.5, 20, 5)
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
    platform3.position = new BABYLON.Vector3(177.5, 30, 5)
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
    platform3.position = new BABYLON.Vector3(185, 35, 5)
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
    platform1.position = new BABYLON.Vector3(220, 35, 5)
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
    platform2.position = new BABYLON.Vector3(230, 15, 5)
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

    // Platform 3 Snow
    var platform3 = BABYLON.MeshBuilder.CreateBox('platform3', {width:5, height:platformHeight, depth:15}, scene);
    platform3.position = new BABYLON.Vector3(245, 55, 5)
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
    platform3.position = new BABYLON.Vector3(252.5, 65, 5)
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

    // Platform 1 Snow
    var platform1 = BABYLON.MeshBuilder.CreateBox('platform1', {width:50, height:platformHeight, depth:15}, scene);
    platform1.position = new BABYLON.Vector3(280, 76, 5)
    
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

    // Platform 2 Snow
    var platform2 = BABYLON.MeshBuilder.CreateBox('platform2', {width:20, height:platformHeight, depth:15}, scene);
    platform2.position = new BABYLON.Vector3(320, 66, 5)
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

    // Platform 2 Snow
    var platform2 = BABYLON.MeshBuilder.CreateBox('platform2', {width:20, height:platformHeight, depth:15}, scene);
    platform2.position = new BABYLON.Vector3(340, 76, 5)
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

    // Platform 3 Snow
    var platform3 = BABYLON.MeshBuilder.CreateBox('platform3', {width:5, height:platformHeight, depth:15}, scene);
    platform3.position = new BABYLON.Vector3(305, 56, 5)
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
    platform3.position = new BABYLON.Vector3(335, 56, 5)
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
    platform2.position = new BABYLON.Vector3(320, 46, 5)
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

    // Platform 1 Ice
    var platform1 = BABYLON.MeshBuilder.CreateBox('platform3', {width:50, height:platformHeight, depth:15}, scene);
    platform1.position = new BABYLON.Vector3(365, 46, 5)
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

    // Platform 3 Snow
    var platform3 = BABYLON.MeshBuilder.CreateBox('platform3', {width:5, height:platformHeight, depth:15}, scene);
    platform3.position = new BABYLON.Vector3(357.5, 86, 5)
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
    platform3.position = new BABYLON.Vector3(367.5, 76, 5)
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
    platform3.position = new BABYLON.Vector3(377.5, 86, 5)
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
    platform3.position = new BABYLON.Vector3(387.5, 76, 5)
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
    platform3.position = new BABYLON.Vector3(397.5, 86, 5)
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

    // Platform 1 Snow
    var platform1 = BABYLON.MeshBuilder.CreateBox('platform1', {width:50, height:platformHeight, depth:15}, scene);
    platform1.position = new BABYLON.Vector3(430, 96, 5)
    
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
    platform3.position = new BABYLON.Vector3(335, 36, 5)
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

    // Platform 2 Ice
    var platform2 = BABYLON.MeshBuilder.CreateBox('platform2', {width:20, height:platformHeight, depth:15}, scene);
    platform2.position = new BABYLON.Vector3(350, 26, 5)
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
    platform2.position = new BABYLON.Vector3(400, 56, 5)
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
    platform3.position = new BABYLON.Vector3(367.5, 16, 5)
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
    platform3.position = new BABYLON.Vector3(375, 6, 5)
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
    platform3.position = new BABYLON.Vector3(382.5, -4, 5)
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
    platform3.position = new BABYLON.Vector3(390, 6, 5)
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

    // Platform 2 Ice
    var platform2 = BABYLON.MeshBuilder.CreateBox('platform2', {width:20, height:platformHeight, depth:15}, scene);
    platform2.position = new BABYLON.Vector3(410, 6, 5)
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






    //Loading clouds
    //Clouds 1
    BABYLON.SceneLoader.ImportMesh("", "../models/", "cloud1.gltf", scene, function(newMeshes) {
        Cloud1 = newMeshes[0];
        Cloud1.scaling = new BABYLON.Vector3(30,30,30)
        Cloud1.position = new BABYLON.Vector3(0,-100,-350);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "cloud1.gltf", scene, function(newMeshes) {
        Cloud2 = newMeshes[0];
        Cloud2.scaling = new BABYLON.Vector3(30,30,30)
        Cloud2.position = new BABYLON.Vector3(200,-50,-350);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "cloud1.gltf", scene, function(newMeshes) {
        Cloud3 = newMeshes[0];
        Cloud3.scaling = new BABYLON.Vector3(30,30,30)
        Cloud3.position = new BABYLON.Vector3(400,-100,-350);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "cloud1.gltf", scene, function(newMeshes) {
        Cloud4 = newMeshes[0];
        Cloud4.scaling = new BABYLON.Vector3(30,30,30)
        Cloud4.position = new BABYLON.Vector3(600,-50,-350);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "cloud1.gltf", scene, function(newMeshes) {
        Cloud5 = newMeshes[0];
        Cloud5.scaling = new BABYLON.Vector3(30,30,30)
        Cloud5.position = new BABYLON.Vector3(800,-100,-350);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "cloud1.gltf", scene, function(newMeshes) {
        Cloud6 = newMeshes[0];
        Cloud6.scaling = new BABYLON.Vector3(30,30,30)
        Cloud6.position = new BABYLON.Vector3(1000, -50,-350);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "cloud1.gltf", scene, function(newMeshes) {
        Cloud7 = newMeshes[0];
        Cloud7.scaling = new BABYLON.Vector3(30,30,30)
        Cloud7.position = new BABYLON.Vector3(1200,-100,-350);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "cloud1.gltf", scene, function(newMeshes) {
        Cloud8 = newMeshes[0];
        Cloud8.scaling = new BABYLON.Vector3(30,30,30)
        Cloud8.position = new BABYLON.Vector3(1400,-50,-350);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "cloud1.gltf", scene, function(newMeshes) {
        Cloud9 = newMeshes[0];
        Cloud9.scaling = new BABYLON.Vector3(30,30,30)
        Cloud9.position = new BABYLON.Vector3(1600,-100,-350);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "cloud1.gltf", scene, function(newMeshes) {
        Cloud10 = newMeshes[0];
        Cloud10.scaling = new BABYLON.Vector3(30,30,30)
        Cloud10.position = new BABYLON.Vector3(1800,-50,-350);
    });

    //Clouds 2
    BABYLON.SceneLoader.ImportMesh("", "../models/", "cloud2.gltf", scene, function(newMeshes) {
        Cloud11 = newMeshes[0];
        Cloud11.scaling = new BABYLON.Vector3(30,30,30)
        Cloud11.position = new BABYLON.Vector3(100,50,10);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "cloud2.gltf", scene, function(newMeshes) {
        Cloud12 = newMeshes[0];
        Cloud12.scaling = new BABYLON.Vector3(30,30,30)
        Cloud12.position = new BABYLON.Vector3(300,-200,10);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "cloud2.gltf", scene, function(newMeshes) {
        Cloud13 = newMeshes[0];
        Cloud13.scaling = new BABYLON.Vector3(30,30,30)
        Cloud13.position = new BABYLON.Vector3(500,50,10);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "cloud2.gltf", scene, function(newMeshes) {
        Cloud14 = newMeshes[0];
        Cloud14.scaling = new BABYLON.Vector3(30,30,30)
        Cloud14.position = new BABYLON.Vector3(700,-200,10);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "cloud2.gltf", scene, function(newMeshes) {
        Cloud15 = newMeshes[0];
        Cloud15.scaling = new BABYLON.Vector3(30,30,30)
        Cloud15.position = new BABYLON.Vector3(900,50,10);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "cloud2.gltf", scene, function(newMeshes) {
        Cloud16 = newMeshes[0];
        Cloud16.scaling = new BABYLON.Vector3(30,30,30)
        Cloud16.position = new BABYLON.Vector3(1100, -200,10);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "cloud2.gltf", scene, function(newMeshes) {
        Cloud17 = newMeshes[0];
        Cloud17.scaling = new BABYLON.Vector3(30,30,30)
        Cloud17.position = new BABYLON.Vector3(1300,50,10);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "cloud2.gltf", scene, function(newMeshes) {
        Cloud18 = newMeshes[0];
        Cloud18.scaling = new BABYLON.Vector3(30,30,30)
        Cloud18.position = new BABYLON.Vector3(1500,-200,10);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "cloud2.gltf", scene, function(newMeshes) {
        Cloud19 = newMeshes[0];
        Cloud19.scaling = new BABYLON.Vector3(30,30,30)
        Cloud19.position = new BABYLON.Vector3(1700,50,10);
    });

    BABYLON.SceneLoader.ImportMesh("", "../models/", "cloud2.gltf", scene, function(newMeshes) {
        Cloud20 = newMeshes[0];
        Cloud20.scaling = new BABYLON.Vector3(30,30,30)
        Cloud20.position = new BABYLON.Vector3(1900,-200,10);
    });

    


    
    


    // Snowman 1
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
    

    // Snowman 2
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "snowman.gltf", scene, function(newMeshes) {
        var snowman = newMeshes[0];
        snowman.position = new BABYLON.Vector3(95.5,10.9,10);
        snowman.scaling = new BABYLON.Vector3(2,2,2);
        var root = snowman._children[0];
        snowRA2 = root._children[1];
        snowLA2 = root._children[2];
        snowCyl2 = root._children[6];
        snowRA2._position.x = 0.4;
        snowLA2._position.x = -0.5;
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
        WinterTree1.position = new BABYLON.Vector3(76,15, -20);
        WinterTree1.scaling = new BABYLON.Vector3(1,1,1);
    });

    // Winter tree 1
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterTree1.gltf", scene, function(newMeshes) {
        var WinterTree1 = newMeshes[0];
        WinterTree1.position = new BABYLON.Vector3(101,15, -20);
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
        WinterTree2.position = new BABYLON.Vector3(91,15, 7);
        WinterTree2.scaling = new BABYLON.Vector3(1,1,1);
    });

    // Winter tree 2
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterTree2.gltf", scene, function(newMeshes) {
        var WinterTree2 = newMeshes[0];
        WinterTree2.position = new BABYLON.Vector3(116,15, 7);
        WinterTree2.scaling = new BABYLON.Vector3(1,1,1);
    });

    // Winter tree 3
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterTree3.gltf", scene, function(newMeshes) {
        var WinterTree2 = newMeshes[0];
        WinterTree2.position = new BABYLON.Vector3(83,15, 29);
        WinterTree2.scaling = new BABYLON.Vector3(1,1,1);
    });

    // Winter tree 3
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterTree3.gltf", scene, function(newMeshes) {
        var WinterTree2 = newMeshes[0];
        WinterTree2.position = new BABYLON.Vector3(108,15, 29);
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

    // Penguin with children
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "penguinwithchildren.gltf", scene, function(newMeshes) {
        var peng = newMeshes[0];
        peng.position = new BABYLON.Vector3(140,11.5, 17);
        peng.scaling = new BABYLON.Vector3(2,2,2);
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

    // Eskimo model
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "eskimo.gltf", scene, function(newMeshes) {
        var eskimo = newMeshes[0];
        eskimo.position = new BABYLON.Vector3(140,25, 9);
        eskimo.scaling = new BABYLON.Vector3(1,1,1);
        eskimo.rotate(new BABYLON.Vector3(0,2,0), 45);
    });

    // Penguin 1
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "penguin1.gltf", scene, function(newMeshes) {
        var peng = newMeshes[0];
        peng.position = new BABYLON.Vector3(165,4.2, 5.5);
        peng.scaling = new BABYLON.Vector3(2.5,2.5,2.5);
        peng.rotate(new BABYLON.Vector3(0,1,0), 3);
    });

    // Penguin 2
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "penguin2.gltf", scene, function(newMeshes) {
        var peng2 = newMeshes[0];
        peng2.position = new BABYLON.Vector3(164,9, 8.5);
        peng2.scaling = new BABYLON.Vector3(2.5,2.5,2.5);
        peng2.rotate(new BABYLON.Vector3(0,1,0), 3);
    });

    // Penguin 3
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "downpenguin.gltf", scene, function(newMeshes) {
        var peng2 = newMeshes[0];
        peng2.position = new BABYLON.Vector3(172,19.5, 8.5);
        peng2.scaling = new BABYLON.Vector3(2.5,2.5,2.5);
        peng2.rotate(new BABYLON.Vector3(0,1,0), 5.8);
    });

    // Big Rock
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterRockBig.gltf", scene, function(newMeshes) {
        var polarbear2 = newMeshes[0];
        polarbear2.position = new BABYLON.Vector3(181,36.5, 5);
        polarbear2.scaling = new BABYLON.Vector3(2.5,2.5,2.5);
        polarbear2.rotate(new BABYLON.Vector3(0,1,0), 5.8);
    });

    // Polar bear 2
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "polarbear2.gltf", scene, function(newMeshes) {
        var polarbear2 = newMeshes[0];
        polarbear2.position = new BABYLON.Vector3(210,24, 5.5);
        polarbear2.scaling = new BABYLON.Vector3(2.5,2.5,2.5);
        polarbear2.rotate(new BABYLON.Vector3(0,1,0), 5.8);
    });

    // snowman
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "snowman.gltf", scene, function(newMeshes) {
        var snowman = newMeshes[0];
        snowman.position = new BABYLON.Vector3(210,35.5, 8.5);
        snowman.scaling = new BABYLON.Vector3(2.5,2.5,2.5);
        var root = snowman._children[0];
        snowRA3 = root._children[1];
        snowRA3._position.x = 0.4;
    });

    // igloo
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "igloo.gltf", scene, function(newMeshes) {
        var igloo = newMeshes[0];
        igloo.position = new BABYLON.Vector3(230,24.5, 12);
        igloo.scaling = new BABYLON.Vector3(2.5,2.5,2.5);
        igloo.rotate(new BABYLON.Vector3(0,2,0), 1.4);
    });

    // fish bucket
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "fishbucket.gltf", scene, function(newMeshes) {
        var fishbucket = newMeshes[0];
        fishbucket.position = new BABYLON.Vector3(220,24.5, 11.5);
        fishbucket.scaling = new BABYLON.Vector3(2.5,2.5,2.5);
        fishbucket.rotate(new BABYLON.Vector3(0,1,0), 5.8);
    });

    // wolf
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "Wolf.gltf", scene, function(newMeshes) {
        var Wolf = newMeshes[0];
        Wolf.position = new BABYLON.Vector3(215,36, 8.5);
        Wolf.scaling = new BABYLON.Vector3(1,1,1);
    });

    // Bush
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterBush.gltf", scene, function(newMeshes) {
        var WinterBush = newMeshes[0];
        WinterBush.position = new BABYLON.Vector3(250,45,9);
        WinterBush.scaling = new BABYLON.Vector3(5,5,5);
    });

    // Winter tree
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterTree.gltf", scene, function(newMeshes) {
        var WinterTree = newMeshes[0];
        WinterTree.position = new BABYLON.Vector3(232,57,-7);
        WinterTree.scaling = new BABYLON.Vector3(5,5,5);
    });

    // North pole 
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "northpole.gltf", scene, function(newMeshes) {
        var northpole = newMeshes[0];
        northpole.position = new BABYLON.Vector3(252,65,9);
        northpole.scaling = new BABYLON.Vector3(3,3,-3);
        northpole.rotate(new BABYLON.Vector3(0,1,0), -1);
        
    });

    // South pole 
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "southpole.gltf", scene, function(newMeshes) {
        var southpole = newMeshes[0];
        southpole.position = new BABYLON.Vector3(247,17,0);
        southpole.scaling = new BABYLON.Vector3(3,3,-3);
        southpole.rotate(new BABYLON.Vector3(0,1,0), 3.5);
        
    });

    // Winter tree 1
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterTree1.gltf", scene, function(newMeshes) {
        var WinterTree1 = newMeshes[0];
        WinterTree1.position = new BABYLON.Vector3(270, 81, -20);
        WinterTree1.scaling = new BABYLON.Vector3(1,1,1);
    });

    // Winter tree 2
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterTree2.gltf", scene, function(newMeshes) {
        var WinterTree2 = newMeshes[0];
        WinterTree2.position = new BABYLON.Vector3(290, 81, 7);
        WinterTree2.scaling = new BABYLON.Vector3(1,1,1);
    });

    // Winter bridge
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterBridge.gltf", scene, function(newMeshes) {
        var WinterBridge = newMeshes[0];
        WinterBridge.position = new BABYLON.Vector3(280,77.1,10.5);
        WinterBridge.scaling = new BABYLON.Vector3(5,5,5);
    });

    // Tux model 1
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "tux.gltf", scene, function(newMeshes) {
        var tux = newMeshes[0];
        tux.position = new BABYLON.Vector3(297,77,10);
        tux.scaling = new BABYLON.Vector3(0.03,0.03,0.03);
        tux.rotate(new BABYLON.Vector3(0,2,0), -5.5);
    });

    // Tux model 2
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "tux.gltf", scene, function(newMeshes) {
        var tux = newMeshes[0];
        tux.position = new BABYLON.Vector3(295,77,10);
        tux.scaling = new BABYLON.Vector3(0.03,0.03,0.03);
        tux.rotate(new BABYLON.Vector3(0,2,0), 5.5);
    });

    // Tux model 3
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "tux.gltf", scene, function(newMeshes) {
        var tux = newMeshes[0];
        tux.position = new BABYLON.Vector3(296,77,8);
        tux.scaling = new BABYLON.Vector3(0.03,0.03,0.03);
        tux.rotate(new BABYLON.Vector3(0,2,0), 9.5);
    });

    // Bush
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterBush.gltf", scene, function(newMeshes) {
        var WinterBush = newMeshes[0];
        WinterBush.position = new BABYLON.Vector3(260,76,9);
        WinterBush.scaling = new BABYLON.Vector3(5,5,5);
    });

    // Winter tree 2
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterTree2.gltf", scene, function(newMeshes) {
        var WinterTree2 = newMeshes[0];
        WinterTree2.position = new BABYLON.Vector3(315, 71, 7);
        WinterTree2.scaling = new BABYLON.Vector3(1,1,1);
    });

    // Bush
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterBush.gltf", scene, function(newMeshes) {
        var WinterBush = newMeshes[0];
        WinterBush.position = new BABYLON.Vector3(330,76,9);
        WinterBush.scaling = new BABYLON.Vector3(5,5,5);
    });

    // Eskimo model
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "eskimo.gltf", scene, function(newMeshes) {
        var eskimo = newMeshes[0];
        eskimo.position = new BABYLON.Vector3(320,71, 9);
        eskimo.scaling = new BABYLON.Vector3(1,1,1);
        eskimo.rotate(new BABYLON.Vector3(0,2,0), 45);
    });

    // wolf
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "Wolf.gltf", scene, function(newMeshes) {
        var Wolf = newMeshes[0];
        Wolf.position = new BABYLON.Vector3(324,67, 8.5);
        Wolf.scaling = new BABYLON.Vector3(1,1,1);
        Wolf.rotate(new BABYLON.Vector3(0,1,0), -1);
    });


    // Polar bear 2
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "polarbear2.gltf", scene, function(newMeshes) {
        var polarbear2 = newMeshes[0];
        polarbear2.position = new BABYLON.Vector3(355,35, 5.5);
        polarbear2.scaling = new BABYLON.Vector3(2.5,2.5,2.5);
        polarbear2.rotate(new BABYLON.Vector3(0,1,0), 5.8);
    });


    // Penguin 1
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "penguin1.gltf", scene, function(newMeshes) {
        var peng = newMeshes[0];
        peng.position = new BABYLON.Vector3(350,65, 5.5);
        peng.scaling = new BABYLON.Vector3(2.5,2.5,2.5);
        peng.rotate(new BABYLON.Vector3(0,1,0), 3);
    });

    // Penguin 2
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "penguin2.gltf", scene, function(newMeshes) {
        var peng2 = newMeshes[0];
        peng2.position = new BABYLON.Vector3(350,65, 8.5);
        peng2.scaling = new BABYLON.Vector3(2.5,2.5,2.5);
        peng2.rotate(new BABYLON.Vector3(0,1,0), 3);
    });

    // Penguin with children
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "penguinwithchildren.gltf", scene, function(newMeshes) {
        var peng = newMeshes[0];
        peng.position = new BABYLON.Vector3(365,78, 17);
        peng.scaling = new BABYLON.Vector3(2,2,2);
    });

    //Small Rock
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterRockSmall.gltf", scene, function(newMeshes) {
        var WinterRockSmall = newMeshes[0];
        WinterRockSmall.position = new BABYLON.Vector3(368,46, 6);
        WinterRockSmall.scaling = new BABYLON.Vector3(3,3,3);
    });

    //Medium Rock
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterRockMedium.gltf", scene, function(newMeshes) {
        var WinterRockSmall = newMeshes[0];
        WinterRockSmall.position = new BABYLON.Vector3(362,46, 5);
        WinterRockSmall.scaling = new BABYLON.Vector3(3,3,3);
    });


    //Big Rock
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterRockBig.gltf", scene, function(newMeshes) {
        var WinterRockSmall = newMeshes[0];
        WinterRockSmall.position = new BABYLON.Vector3(358,47.5, 5);
        WinterRockSmall.scaling = new BABYLON.Vector3(3,3,3);
    });

    //Big Rock
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterRockBig.gltf", scene, function(newMeshes) {
        var WinterRockSmall = newMeshes[0];
        WinterRockSmall.position = new BABYLON.Vector3(350,47.5, 4);
        WinterRockSmall.scaling = new BABYLON.Vector3(3,3,3);
    });

    // Penguin with children
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "penguinwithchildren.gltf", scene, function(newMeshes) {
        var peng = newMeshes[0];
        peng.position = new BABYLON.Vector3(380,37.5, 17);
        peng.scaling = new BABYLON.Vector3(2,2,2);
    });

    // Eskimo model
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "eskimo.gltf", scene, function(newMeshes) {
        var eskimo = newMeshes[0];
        eskimo.position = new BABYLON.Vector3(380,51, 9);
        eskimo.scaling = new BABYLON.Vector3(1,1,1);
        eskimo.rotate(new BABYLON.Vector3(0,2,0), 45);
    });

    // South pole 
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "southpole.gltf", scene, function(newMeshes) {
        var southpole = newMeshes[0];
        southpole.position = new BABYLON.Vector3(362,63,0);
        southpole.scaling = new BABYLON.Vector3(3,3,-3);
        southpole.rotate(new BABYLON.Vector3(0,1,0), 3.5);
        
    });

    // Bush
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterBush.gltf", scene, function(newMeshes) {
        var WinterBush = newMeshes[0];
        WinterBush.position = new BABYLON.Vector3(376.5,86,9);
        WinterBush.scaling = new BABYLON.Vector3(5,5,5);
    });

    // Winter tree 3
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterTree3.gltf", scene, function(newMeshes) {
        var WinterTree2 = newMeshes[0];
        WinterTree2.position = new BABYLON.Vector3(386.5,81, 29);
        WinterTree2.scaling = new BABYLON.Vector3(1,1,1);
    });

    // snowman
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "snowman.gltf", scene, function(newMeshes) {
        var snowman = newMeshes[0];
        snowman.position = new BABYLON.Vector3(397.5,87, 8.5);
        snowman.scaling = new BABYLON.Vector3(2.5,2.5,2.5);
        var root = snowman._children[0];
        snowRA4 = root._children[1];
        snowRA4._position.x = 0.4;
    });

    // Winter bridge
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterBridge.gltf", scene, function(newMeshes) {
        var WinterBridge = newMeshes[0];
        WinterBridge.position = new BABYLON.Vector3(418,97.1,10.5);
        WinterBridge.scaling = new BABYLON.Vector3(5,5,5);
    });

    // Penguin 1
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "penguin1.gltf", scene, function(newMeshes) {
        var peng = newMeshes[0];
        peng.position = new BABYLON.Vector3(420,85, 5.5);
        peng.scaling = new BABYLON.Vector3(2.5,2.5,2.5);
        peng.rotate(new BABYLON.Vector3(0,1,0), 3);
    });

    // Penguin 2
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "penguin2.gltf", scene, function(newMeshes) {
        var peng2 = newMeshes[0];
        peng2.position = new BABYLON.Vector3(420,85, 8.5);
        peng2.scaling = new BABYLON.Vector3(2.5,2.5,2.5);
        peng2.rotate(new BABYLON.Vector3(0,1,0), 3);
    });

    // Winter tree 2
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterTree2.gltf", scene, function(newMeshes) {
        var WinterTree2 = newMeshes[0];
        WinterTree2.position = new BABYLON.Vector3(427, 101, 7);
        WinterTree2.scaling = new BABYLON.Vector3(1,1,1);
    });

    // Winter tree 1
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterTree1.gltf", scene, function(newMeshes) {
        var WinterTree1 = newMeshes[0];
        WinterTree1.position = new BABYLON.Vector3(437, 101, -20);
        WinterTree1.scaling = new BABYLON.Vector3(1,1,1);
    });

    // snowman
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "snowman.gltf", scene, function(newMeshes) {
        var snowman = newMeshes[0];
        snowman.position = new BABYLON.Vector3(444,96.8, 8.5);
        snowman.scaling = new BABYLON.Vector3(2.5,2.5,2.5);
        var root = snowman._children[0];
        snowRA5 = root._children[1];
        snowRA5._position.x = 0.4;
    });

    //Small Rock
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterRockSmall.gltf", scene, function(newMeshes) {
        var WinterRockSmall = newMeshes[0];
        WinterRockSmall.position = new BABYLON.Vector3(453,96, 6);
        WinterRockSmall.scaling = new BABYLON.Vector3(3,3,3);
    });

    //Medium Rock
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterRockMedium.gltf", scene, function(newMeshes) {
        var WinterRockSmall = newMeshes[0];
        WinterRockSmall.position = new BABYLON.Vector3(447,96, 5);
        WinterRockSmall.scaling = new BABYLON.Vector3(3,3,3);
    });

    //Big Rock
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterRockBig.gltf", scene, function(newMeshes) {
        var WinterRockSmall = newMeshes[0];
        WinterRockSmall.position = new BABYLON.Vector3(443,98, 4);
        WinterRockSmall.scaling = new BABYLON.Vector3(3,3,3);
    });

    // Winter tree
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterTree.gltf", scene, function(newMeshes) {
        var WinterTree = newMeshes[0];
        WinterTree.position = new BABYLON.Vector3(292,59,-7);
        WinterTree.scaling = new BABYLON.Vector3(5,5,5);
    });

    // South pole 
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "southpole.gltf", scene, function(newMeshes) {
        var southpole = newMeshes[0];
        southpole.position = new BABYLON.Vector3(330,42,0);
        southpole.scaling = new BABYLON.Vector3(3,3,-3);
        southpole.rotate(new BABYLON.Vector3(0,1,0), 3.5);
        
    });

    // Tux model 1
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "tux.gltf", scene, function(newMeshes) {
        var tux = newMeshes[0];
        tux.position = new BABYLON.Vector3(315,47,10);
        tux.scaling = new BABYLON.Vector3(0.03,0.03,0.03);
        tux.rotate(new BABYLON.Vector3(0,2,0), -5.5);
    });

    // Tux model 2
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "tux.gltf", scene, function(newMeshes) {
        var tux = newMeshes[0];
        tux.position = new BABYLON.Vector3(313,47,10);
        tux.scaling = new BABYLON.Vector3(0.03,0.03,0.03);
        tux.rotate(new BABYLON.Vector3(0,2,0), 5.5);
    });

    // Tux model 3
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "tux.gltf", scene, function(newMeshes) {
        var tux = newMeshes[0];
        tux.position = new BABYLON.Vector3(314,47,8);
        tux.scaling = new BABYLON.Vector3(0.03,0.03,0.03);
        tux.rotate(new BABYLON.Vector3(0,2,0), 9.5);
    });

    // wolf
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "Wolf.gltf", scene, function(newMeshes) {
        var Wolf = newMeshes[0];
        Wolf.position = new BABYLON.Vector3(320,47, 8.5);
        Wolf.scaling = new BABYLON.Vector3(1,1,1);
        Wolf.rotate(new BABYLON.Vector3(0,1,0), -1);
    });

    // Penguin 3
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "downpenguin.gltf", scene, function(newMeshes) {
        var peng2 = newMeshes[0];
        peng2.position = new BABYLON.Vector3(321.5,35, 8.5);
        peng2.scaling = new BABYLON.Vector3(2.5,2.5,2.5);
        peng2.rotate(new BABYLON.Vector3(0,1,0), 5.8);
    });

    // Bush
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterBush.gltf", scene, function(newMeshes) {
        var WinterBush = newMeshes[0];
        WinterBush.position = new BABYLON.Vector3(334,36,9);
        WinterBush.scaling = new BABYLON.Vector3(5,5,5);
    });

    // snowman
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "snowman.gltf", scene, function(newMeshes) {
        var snowman = newMeshes[0];
        snowman.position = new BABYLON.Vector3(350,26.5, 8.5);
        snowman.scaling = new BABYLON.Vector3(2.5,2.5,2.5);
        var root = snowman._children[0];
        snowRA6 = root._children[1];
        snowRA6._position.x = 0.4;
    });

    // Eskimo model
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "eskimo.gltf", scene, function(newMeshes) {
        var eskimo = newMeshes[0];
        eskimo.position = new BABYLON.Vector3(357,31, 9);
        eskimo.scaling = new BABYLON.Vector3(1,1,1);
        eskimo.rotate(new BABYLON.Vector3(0,2,0), 45);
    });

    // Penguin 2
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "penguin2.gltf", scene, function(newMeshes) {
        var peng2 = newMeshes[0];
        peng2.position = new BABYLON.Vector3(344,15, 8.5);
        peng2.scaling = new BABYLON.Vector3(2.5,2.5,2.5);
        peng2.rotate(new BABYLON.Vector3(0,1,0), 3);
    });

    // North pole 
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "northpole.gltf", scene, function(newMeshes) {
        var northpole = newMeshes[0];
        northpole.position = new BABYLON.Vector3(368,17,9);
        northpole.scaling = new BABYLON.Vector3(3,3,-3);
        northpole.rotate(new BABYLON.Vector3(0,1,0), -1);
        
    });

    // Fish bucket
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "fishbucket.gltf", scene, function(newMeshes) {
        var fishbucket = newMeshes[0];
        fishbucket.position = new BABYLON.Vector3(375,-7,13);
        fishbucket.scaling = new BABYLON.Vector3(3,3,3);
        fishbucket.rotate(new BABYLON.Vector3(0,2,0), 0);
    });

    // wolf
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "Wolf.gltf", scene, function(newMeshes) {
        var Wolf = newMeshes[0];
        Wolf.position = new BABYLON.Vector3(382,-3, 8.5);
        Wolf.scaling = new BABYLON.Vector3(1,1,1);
        //Wolf.rotate(new BABYLON.Vector3(0,1,0), -1);
    });

    // Penguin 3
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "downpenguin.gltf", scene, function(newMeshes) {
        var peng2 = newMeshes[0];
        peng2.position = new BABYLON.Vector3(385,-4.5, 8.5);
        peng2.scaling = new BABYLON.Vector3(2.5,2.5,2.5);
        peng2.rotate(new BABYLON.Vector3(0,1,0), 5.8);
    });

    // Tux model 1
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "tux.gltf", scene, function(newMeshes) {
        var tux = newMeshes[0];
        tux.position = new BABYLON.Vector3(225,16,10);
        tux.scaling = new BABYLON.Vector3(0.03,0.03,0.03);
        tux.rotate(new BABYLON.Vector3(0,2,0), -5.5);
    });

    // Tux model 2
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "tux.gltf", scene, function(newMeshes) {
        var tux = newMeshes[0];
        tux.position = new BABYLON.Vector3(223,16,10);
        tux.scaling = new BABYLON.Vector3(0.03,0.03,0.03);
        tux.rotate(new BABYLON.Vector3(0,2,0), 5.5);
    });

    // Tux model 3
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "tux.gltf", scene, function(newMeshes) {
        var tux = newMeshes[0];
        tux.position = new BABYLON.Vector3(224,16,8);
        tux.scaling = new BABYLON.Vector3(0.03,0.03,0.03);
        tux.rotate(new BABYLON.Vector3(0,2,0), 9.5);
    });

    // Bush
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterBush.gltf", scene, function(newMeshes) {
        var WinterBush = newMeshes[0];
        WinterBush.position = new BABYLON.Vector3(234,15,9);
        WinterBush.scaling = new BABYLON.Vector3(5,5,5);
    });





    





    // COIN 1
    BABYLON.SceneLoader.ImportMesh("", "../models/", "coin.gltf", scene, function(newMeshes) {
        coin1 = newMeshes[0];
        coin1.position = new BABYLON.Vector3(440,99,0.5);
        coin1.scaling = new BABYLON.Vector3(10,10,10);
        coin1.rotation = new BABYLON.Vector3(deg2rad(-90),0,0);
        Coin(coin1); // start animation
    });

    // Coin collision box
    var coinBox = BABYLON.MeshBuilder.CreateCylinder('coinBox', {height: 2, diameterTop: 2.3, diameterBottom: 2.3, tessellation: 100, subdivisons: 10}, scene);
    coinBox.visibility = 0;
    coinBox.material = coinM;
    coinBox.position = new BABYLON.Vector3(440,99,0.5);
    coinBox.rotate(new BABYLON.Vector3(1,0,0), 1.6)
    groundObjects.push(coinBox);

    // COIN 2
    BABYLON.SceneLoader.ImportMesh("", "../models/", "coin.gltf", scene, function(newMeshes) {
        coin2 = newMeshes[0];
        coin2.position = new BABYLON.Vector3(224, 18.5, 0.5);
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
    coinBox.position = new BABYLON.Vector3(224, 18, 0.5);
    coinBox.rotate(new BABYLON.Vector3(1,0,0), 1.6)
    groundObjects.push(coinBox);

    // COIN 3
    BABYLON.SceneLoader.ImportMesh("", "../models/", "coin.gltf", scene, function(newMeshes) {
        coin3 = newMeshes[0];
        coin3.position = new BABYLON.Vector3(415, 9, 0.5);
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
    coinBox.position = new BABYLON.Vector3(415, 9, 0.5);
    coinBox.rotate(new BABYLON.Vector3(1,0,0), 1.6)
    groundObjects.push(coinBox);

    // Fire Log
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "FireLog.gltf", scene, function(newMeshes) {
        var FireLog = newMeshes[0];
        FireLog.position = new BABYLON.Vector3(320,47,0.5);
        FireLog.scaling = new BABYLON.Vector3(2,2,2);
        FireLog.checkCollisions = true;
    });

    // Fire collision box
    var fireBox = BABYLON.MeshBuilder.CreateBox('fireBox', {width:2.5, height:2, depth:2}, scene);
    fireBox.checkCollisions = true;
    fireBox.visibility = 0;
    fireBox.material = fireM;
    fireBox.position = new BABYLON.Vector3(320,47,0.5);
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

    // Spikes 2

    BABYLON.SceneLoader.ImportMesh("", "../models/", "spikeTrap.gltf", scene, function(newMeshes) {
        var spikeTrap = newMeshes[0];
        spikeTrap.position = new BABYLON.Vector3(230, 16, 0.5);
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
    spikeBox.position = new BABYLON.Vector3(230, 16, 0.5);
    groundObjects.push(spikeBox);

    var portalSound = new BABYLON.Sound("portalSound", "../sounds/portal/unexpected.wav", scene, null, {volume:0.8, loop:true, autoplay:true });

    // Ending Portal
    BABYLON.SceneLoader.ImportMesh("", "../models/", "portal.gltf", scene, function(newMeshes) {
        var portal = newMeshes[0];
        portal.position = new BABYLON.Vector3(400,56,0);
        portal.scaling = new BABYLON.Vector3(2,2,2);
        portal.rotate(new BABYLON.Vector3(0,1,0), 3.6);
        portal.checkCollisions = true;
        portalSound.attachToMesh(portal);
    });

    // Ending Portal collision box
    var portalBox = BABYLON.MeshBuilder.CreateBox('portalBox', {width:3, height:5, depth:5}, scene);
    portalBox.checkCollisions = true;
    portalBox.visibility = 0;
    portalBox.material = portalM;
    portalBox.position = new BABYLON.Vector3(400,61,0);
    groundObjects.push(portalBox);


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


    


    // Moving Clouds
    scene.registerAfterRender(function () {
        if(isReady == true){
            Cloud1.position.x += 0.1;
            Cloud2.position.x += 0.1;
            Cloud3.position.x += 0.1;
            Cloud4.position.x += 0.1;
            Cloud5.position.x += 0.1;
            Cloud6.position.x += 0.1;
            Cloud7.position.x += 0.1;
            Cloud8.position.x += 0.1;
            Cloud9.position.x += 0.1;
            Cloud10.position.x += 0.1;
            Cloud11.position.x += 0.1;
            Cloud12.position.x += 0.1;
            Cloud13.position.x += 0.1;
            Cloud14.position.x += 0.1;
            Cloud15.position.x += 0.1;
            Cloud16.position.x += 0.1;
            Cloud17.position.x += 0.1;
            Cloud18.position.x += 0.1;
            Cloud19.position.x += 0.1;
            Cloud20.position.x += 0.1;
            if(Cloud1.position.x > 2000){
                Cloud1.position.x = 0;
            }
            if(Cloud2.position.x > 2000){
                Cloud2.position.x = 0;
            }
            if(Cloud3.position.x > 2000){
                Cloud3.position.x = 0;
            }
            if(Cloud4.position.x > 2000){
                Cloud4.position.x = 0;
            }
            if(Cloud5.position.x > 2000){
                Cloud5.position.x = 0;
            }
            if(Cloud6.position.x > 2000){
                Cloud6.position.x = 0;
            }
            if(Cloud7.position.x > 2000){
                Cloud7.position.x = 0;
            }
            if(Cloud8.position.x > 2000){
                Cloud8.position.x = 0;
            }
            if(Cloud9.position.x > 2000){
                Cloud9.position.x = 0;
            }
            if(Cloud10.position.x > 2000){
                Cloud10.position.x = 0;
            }
            if(Cloud11.position.x > 2000){
                Cloud11.position.x = 0;
            }
            if(Cloud12.position.x > 2000){
                Cloud12.position.x = 0;
            }
            if(Cloud13.position.x > 2000){
                Cloud13.position.x = 0;
            }
            if(Cloud14.position.x > 2000){
                Cloud14.position.x = 0;
            }
            if(Cloud15.position.x > 2000){
                Cloud15.position.x = 0;
            }
            if(Cloud16.position.x > 2000){
                Cloud16.position.x = 0;
            }
            if(Cloud17.position.x > 2000){
                Cloud17.position.x = 0;
            }
            if(Cloud18.position.x > 2000){
                Cloud18.position.x = 0;
            }
            if(Cloud19.position.x > 2000){
                Cloud19.position.x = 0;
            }
            if(Cloud20.position.x > 2000){
                Cloud20.position.x = 0;
            }
        }
        
    });


    // Music
    var musicl2 = new BABYLON.Sound("musicl2", "../sounds/levels/level2/POL-battle-is-coming-short.wav", scene, soundReady, {loop:true, volume:0.2, autoplay:true, useCustomAttenuation:true});

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
        snowMan();
        isReady = true;
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
    
    particlesCoin.emitter = new BABYLON.Vector3(440,99,0.5);
    
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
    
    particlesCoin2.emitter = new BABYLON.Vector3(224, 23, 0.5);
    
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
    
    particlesCoin3.emitter = new BABYLON.Vector3(415, 9, 0.5);
    
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
    checkpoint = new BABYLON.Vector3(320,47,0.5);
    //Particles system Fire
    var particlesFire = new BABYLON.GPUParticleSystem("particlesFire", 5000, scene);
    //Texture of each particle
    particlesFire.particleTexture = new BABYLON.Texture("../textures/fireParticle.png", scene);
    //particles2.translationPivot = new BABYLON.Vector3(0, 0,0);
    //Where the particles come from
    
    particlesFire.emitter = new BABYLON.Vector3(320,46,0.5);
    
    
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
    checkpoint = new BABYLON.Vector3(220,41.1,0.5);
    //Particles system Fire
    var particlesFire2 = new BABYLON.GPUParticleSystem("particlesFire2", 5000, scene);
    //Texture of each particle
    particlesFire2.particleTexture = new BABYLON.Texture("../textures/fireParticle.png", scene);
    //particles2.translationPivot = new BABYLON.Vector3(0, 0,0);
    //Where the particles come from
    
    particlesFire2.emitter = new BABYLON.Vector3(220, 35.1, 0.5);
    
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

function trapActive(name){
    if(name == "spikes") trapON(spikes);
    if(name == "spikes2") trapON(spikes2);
}

function portalON(){

    //Particles system Portal
    var particlesPortal = new BABYLON.ParticleSystem("particlesPortal", 1000, scene);

    //Texture of each particle
    particlesPortal.particleTexture = new BABYLON.Texture("../textures/portalParticles.png", scene);
    

    //Where the particles come from
    particlesPortal.emitter = new BABYLON.Vector3(400,61,0);
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
