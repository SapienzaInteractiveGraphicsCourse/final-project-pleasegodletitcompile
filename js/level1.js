// Canvas
var canvas = document.getElementById('renderCanvas');
// 3D Engine
var engine = new BABYLON.Engine(canvas, true);

var camera;

var timeWalk = 0;
var timeJump = 0;
var timeSlide = 0;

var timeCoin = 0;
var timeCoin2 = 0;
var timeCoin3 = 0;

// Set gravity
var gravity = -0.1;

var coin;
var coin2;
var coin3;

var spikes;
var spikes2;
var spikes3;
var dmg = false;

// Storm
var flash;
var clouds = [];
var thunder1;
var thunder2;

var checkpoint = new BABYLON.Vector3(0, 10, 0);
checkpoint = new BABYLON.Vector3(385, 55, 0);

var platformHeight = 2;
var platformWidthSmall = 5;
var platformWidthMedium = 20;
var platformWidthBig = 50;

// List of objects that are considered ground
var groundObjects = [];

var createScene = function() {
    // Loading UI
    engine.displayLoadingUI();
    engine.loadingUIText = "Loading level...";

    // Scene
    var scene = new BABYLON.Scene(engine);
    scene.collisionsEnabled = true;

    // Ground material
    var ground = new BABYLON.StandardMaterial("ground", scene);
    ground.diffuseColor = new BABYLON.Color3(1, 1, 1);

    // Camera
    camera = new BABYLON.FollowCamera('camera', new BABYLON.Vector3(0, 0, 0), scene);
    camera.radius = 40;
    camera.heightOffset = 10;
    camera.rotationOffset = 180;
    camera.attachControl(canvas, true); // Comment this out to detach controls

    // Light
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);
    // light.intensity = 0.5;


    // Clouds
    {
    cloudMaterial = new BABYLON.StandardMaterial("cloudMaterial", scene);
    cloudMaterial.diffuseTexture = new BABYLON.Texture("../Textures/cloud.png", scene);
    cloudMaterial.diffuseTexture.hasAlpha = true;
    cloudMaterial.useAlphaFromDiffuseTexture = true;
    cloudMaterial.alpha = 0.6;

    for(var i=0; i<10; i++) {
        var cloud = new BABYLON.MeshBuilder.CreatePlane("cloud", {size:500}, scene);
        cloud.material = cloudMaterial;
        cloud.position.set(
            Math.random()*500-200,
            Math.random()*200-100,
            Math.random()*200+100
            );
        cloud.rotation.z = Math.random()*360;
        clouds.push(cloud);
    }
    }


    // Materials
    {
    //Set platforms materials
    // Ground Wet Small Platform
    var groundS1 = new BABYLON.StandardMaterial("groundS1", scene);
    groundS1.diffuseTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet.jpg", scene)
    groundS1.diffuseTexture.uScale = 1;
    groundS1.diffuseTexture.vScale = 0.33;
    groundS1.bumpTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_normal.jpg", scene)
    groundS1.bumpTexture.uScale = 1;
    groundS1.bumpTexture.vScale = 0.33;
    
    var groundS2 = new BABYLON.StandardMaterial("groundS2", scene);
    groundS2.diffuseTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet.jpg", scene)
    groundS2.diffuseTexture.uScale = 0.33;
    groundS2.diffuseTexture.vScale = 0.13;
    groundS2.bumpTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_normal.jpg", scene)
    groundS2.bumpTexture.uScale = 0.33;
    groundS2.bumpTexture.vScale = 0.13;

    var groundS3 = new BABYLON.StandardMaterial("groundS3", scene);
    groundS3.diffuseTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet.jpg", scene)
    groundS3.diffuseTexture.uScale = 0.13;
    groundS3.diffuseTexture.vScale = 1;
    groundS3.bumpTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_normal.jpg", scene)
    groundS3.bumpTexture.uScale = 0.13;
    groundS3.bumpTexture.vScale = 1;

    // Ground Wet Medium Platform
    var groundM1 = new BABYLON.StandardMaterial("groundM1", scene);
    groundM1.diffuseTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet.jpg", scene)
    groundM1.diffuseTexture.uScale = 1;
    groundM1.diffuseTexture.vScale = 1.33;
    groundM1.bumpTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_normal.jpg", scene)
    groundM1.bumpTexture.uScale = 1;
    groundM1.bumpTexture.vScale = 1.33;
    
    var groundM2 = new BABYLON.StandardMaterial("groundM2", scene);
    groundM2.diffuseTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet.jpg", scene)
    groundM2.diffuseTexture.uScale = 0.133;
    groundM2.diffuseTexture.vScale = 0.06;
    groundM2.bumpTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_normal.jpg", scene)
    groundM2.bumpTexture.uScale = 0.133;
    groundM2.bumpTexture.vScale = 0.06;

    var groundM3 = new BABYLON.StandardMaterial("groundM3", scene);
    groundM3.diffuseTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet.jpg", scene)
    groundM3.diffuseTexture.uScale = 0.06;
    groundM3.diffuseTexture.vScale = 0.133;
    groundM3.bumpTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_normal.jpg", scene)
    groundM3.bumpTexture.uScale = 0.06;
    groundM3.bumpTexture.vScale = 0.133;

    // Ground Wet Big Platform
    var groundB1 = new BABYLON.StandardMaterial("groundB1", scene);
    groundB1.diffuseTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet.jpg", scene)
    groundB1.diffuseTexture.uScale = 0.3;
    groundB1.diffuseTexture.vScale = 3;
    groundB1.bumpTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_normal.jpg", scene)
    groundB1.bumpTexture.uScale = 0.3;
    groundB1.bumpTexture.vScale = 3;
    
    var groundB2 = new BABYLON.StandardMaterial("groundB2", scene);
    groundB2.diffuseTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet.jpg", scene)
    groundB2.diffuseTexture.uScale = 3;
    groundB2.diffuseTexture.vScale = 0.08;
    groundB2.bumpTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_normal.jpg", scene)
    groundB2.bumpTexture.uScale = 3;
    groundB2.bumpTexture.vScale = 0.08;

    var groundB3 = new BABYLON.StandardMaterial("groundB3", scene);
    groundB3.diffuseTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet.jpg", scene)
    groundB3.diffuseTexture.uScale = 0.08;
    groundB3.diffuseTexture.vScale = 0.3;
    groundB3.bumpTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_normal.jpg", scene)
    groundB3.bumpTexture.uScale = 0.08;
    groundB3.bumpTexture.vScale = 0.3;

    // Ground Wet Pebbles Small Platform
    var pebblesS1 = new BABYLON.StandardMaterial("ground_wet_pebbles_small_1", scene);
    pebblesS1.diffuseTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles.jpg", scene)
    pebblesS1.diffuseTexture.uScale = 1;
    pebblesS1.diffuseTexture.vScale = 0.33;
    pebblesS1.bumpTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles_normal.jpg", scene)
    pebblesS1.bumpTexture.uScale = 1;
    pebblesS1.bumpTexture.vScale = 0.33;
    
    var pebblesS2 = new BABYLON.StandardMaterial("pebblesS2", scene);
    pebblesS2.diffuseTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles.jpg", scene)
    pebblesS2.diffuseTexture.uScale = 0.33;
    pebblesS2.diffuseTexture.vScale = 0.13;
    pebblesS2.bumpTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles_normal.jpg", scene)
    pebblesS2.bumpTexture.uScale = 0.33;
    pebblesS2.bumpTexture.vScale = 0.13;

    var pebblesS3 = new BABYLON.StandardMaterial("pebblesS3", scene);
    pebblesS3.diffuseTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles.jpg", scene)
    pebblesS3.diffuseTexture.uScale = 0.13;
    pebblesS3.diffuseTexture.vScale = 1;
    pebblesS3.bumpTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles_normal.jpg", scene)
    pebblesS3.bumpTexture.uScale = 0.13;
    pebblesS3.bumpTexture.vScale = 1;

    // Ground Wet Pebbles Medium Platform
    var pebblesM1 = new BABYLON.StandardMaterial("pebblesM1", scene);
    pebblesM1.diffuseTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles.jpg", scene)
    pebblesM1.diffuseTexture.uScale = 1;
    pebblesM1.diffuseTexture.vScale = 1.33;
    pebblesM1.bumpTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles_normal.jpg", scene)
    pebblesM1.bumpTexture.uScale = 1;
    pebblesM1.bumpTexture.vScale = 1.33;
    
    var pebblesM2 = new BABYLON.StandardMaterial("pebblesM2", scene);
    pebblesM2.diffuseTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles.jpg", scene)
    pebblesM2.diffuseTexture.uScale = 0.133;
    pebblesM2.diffuseTexture.vScale = 0.06;
    pebblesM2.bumpTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles_normal.jpg", scene)
    pebblesM2.bumpTexture.uScale = 0.133;
    pebblesM2.bumpTexture.vScale = 0.06;

    var pebblesM3 = new BABYLON.StandardMaterial("pebblesM3", scene);
    pebblesM3.diffuseTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles.jpg", scene)
    pebblesM3.diffuseTexture.uScale = 0.06;
    pebblesM3.diffuseTexture.vScale = 0.133;
    pebblesM3.bumpTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles_normal.jpg", scene)
    pebblesM3.bumpTexture.uScale = 0.06;
    pebblesM3.bumpTexture.vScale = 0.133;

    // Ground Wet Pebbles Big Platform
    var pebblesB1 = new BABYLON.StandardMaterial("pebblesB1", scene);
    pebblesB1.diffuseTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles.jpg", scene)
    pebblesB1.diffuseTexture.uScale = 0.3;
    pebblesB1.diffuseTexture.vScale = 3;
    pebblesB1.bumpTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles_normal.jpg", scene)
    pebblesB1.bumpTexture.uScale = 0.3;
    pebblesB1.bumpTexture.vScale = 3;
    
    var pebblesB2 = new BABYLON.StandardMaterial("pebblesB2", scene);
    pebblesB2.diffuseTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles.jpg", scene)
    pebblesB2.diffuseTexture.uScale = 3;
    pebblesB2.diffuseTexture.vScale = 0.08;
    pebblesB2.bumpTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles_normal.jpg", scene)
    pebblesB2.bumpTexture.uScale = 3;
    pebblesB2.bumpTexture.vScale = 0.08;

    var pebblesB3 = new BABYLON.StandardMaterial("pebblesB3", scene);
    pebblesB3.diffuseTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles.jpg", scene)
    pebblesB3.diffuseTexture.uScale = 0.08;
    pebblesB3.diffuseTexture.vScale = 0.3;
    pebblesB3.bumpTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles_normal.jpg", scene)
    pebblesB3.bumpTexture.uScale = 0.08;
    pebblesB3.bumpTexture.vScale = 0.3;
    

    // Ground wet multimaterial
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

    // Ground wet pebbles multimaterial
    var multimatPebblesS = new BABYLON.MultiMaterial("multiGround", scene);
    multimatPebblesS.subMaterials.push(pebblesS1);
    multimatPebblesS.subMaterials.push(pebblesS2);
    multimatPebblesS.subMaterials.push(pebblesS3);

    var multimatPebblesM = new BABYLON.MultiMaterial("multiGround", scene);
    multimatPebblesM.subMaterials.push(pebblesM1);
    multimatPebblesM.subMaterials.push(pebblesM2);
    multimatPebblesM.subMaterials.push(pebblesM3);

    var multimatPebblesB = new BABYLON.MultiMaterial("multiGround", scene);
    multimatPebblesB.subMaterials.push(pebblesB1);
    multimatPebblesB.subMaterials.push(pebblesB2);
    multimatPebblesB.subMaterials.push(pebblesB3);

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
    }


    // Left wall
    var leftWall = BABYLON.MeshBuilder.CreateBox('platform1', {width:20, height:300, depth:15}, scene);
    leftWall.checkCollisions = true;
    leftWall.position = new BABYLON.Vector3(-35, 0, 5);
    leftWall.material = ground;

    // Platform ground big
    addPlatform(multimatGroundB, platformWidthBig, 0, 0);

    // Platform ground big
    addPlatform(multimatGroundB, platformWidthBig, 55, 10);

    // Platform pebbles small
    addPlatform(multimatPebblesS, platformWidthSmall, 90, 10);
    addPlatform(multimatPebblesS, platformWidthSmall, 100, 15);
    addPlatform(multimatPebblesS, platformWidthSmall, 110, 20);
    addPlatform(multimatPebblesS, platformWidthSmall, 120, 25);
    addPlatform(multimatPebblesS, platformWidthSmall, 130, 30);

    // Coin 1
    BABYLON.SceneLoader.ImportMesh("", "../models/", "coin.gltf", scene, function(newMeshes) {
        coin1 = newMeshes[0];
        coin1.position = new BABYLON.Vector3(136,44.5,0.5);
        coin1.scaling = new BABYLON.Vector3(10,10,10);
        coin1.rotation = new BABYLON.Vector3(deg2rad(-90),0,0);
        Coin(coin1); // start animation
    });

    // Coin 1 collision box
    var coinBox = BABYLON.MeshBuilder.CreateBox('coinBox', {size:2}, scene);
    coinBox.visibility = 0;
    coinBox.material = coinM;
    coinBox.position = new BABYLON.Vector3(136,44,0.5);
    groundObjects.push(coinBox);

    // Platform ground medium
    addPlatform(multimatGroundM, platformWidthMedium, 150, 15);

    // Platform pebbles small
    addPlatform(multimatPebblesS, platformWidthSmall, 165, 20);

    // Spikes
    BABYLON.SceneLoader.ImportMesh("", "../models/", "spikeTrap.gltf", scene, function(newMeshes) {
        var spikeTrap = newMeshes[0];
        spikeTrap.position = new BABYLON.Vector3(165, 21, 5);
        spikeTrap.scaling = new BABYLON.Vector3(1.7,0.8,5);
        spikes = spikeTrap._children[0];
    });

    // Spikes collision box 
    var spikeBox = BABYLON.MeshBuilder.CreateBox('spikes', {width:5, height:1, depth:5}, scene);
    spikeBox.checkCollisions = true;
    spikeBox.visibility = 0;
    spikeBox.material = spikesM;
    spikeBox.position = new BABYLON.Vector3(165, 21, 0.5);
    groundObjects.push(spikeBox);

    // Platform ground medium
    addPlatform(multimatGroundM, platformWidthMedium, 180, 15);

    // Platform pebbles small
    addPlatform(multimatPebblesS, platformWidthSmall, 195, 15);

    // Spikes 2
    BABYLON.SceneLoader.ImportMesh("", "../models/", "spikeTrap.gltf", scene, function(newMeshes) {
        var spikeTrap = newMeshes[0];
        spikeTrap.position = new BABYLON.Vector3(195, 16, 5);
        spikeTrap.scaling = new BABYLON.Vector3(1.7,0.8,5);
        spikes2 = spikeTrap._children[0];
    });

    // Spikes 2 collision box 
    spikeBox = BABYLON.MeshBuilder.CreateBox('spikes2', {width:5, height:1, depth:5}, scene);
    spikeBox.checkCollisions = true;
    spikeBox.visibility = 0;
    spikeBox.material = spikesM;
    spikeBox.position = new BABYLON.Vector3(195, 16, 0.5);
    groundObjects.push(spikeBox);

    // Platform for fireplace
    addFirePlatform(multimatGroundM, 210, 15);

    // Fire Log
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "FireLog.gltf", scene, function(newMeshes) {
        var FireLog = newMeshes[0];
        FireLog.position = new BABYLON.Vector3(210, 15.5, 3);
        FireLog.scaling = new BABYLON.Vector3(2,2,2);
    });

    // Fire collision box
    var fireBox = BABYLON.MeshBuilder.CreateBox('fireBox', {width:2.5, height:2, depth:2}, scene);
    fireBox.visibility = 0;
    fireBox.material = fireM;
    fireBox.position = new BABYLON.Vector3(210, 17, 0.5);
    groundObjects.push(fireBox);    

    // Platform pebbles medium
    addPlatform(multimatPebblesM, platformWidthMedium, 235, 10);
    
    // Platform ground medium
    addPlatform(multimatGroundM, platformWidthMedium, 260, 20);

    // Platform ground small
    addPlatform(multimatGroundS, platformWidthSmall, 280, 30);
    addPlatform(multimatGroundS, platformWidthSmall, 292.5, 40);

    // Platform ground big
    addPlatform(multimatGroundB, platformWidthBig, 260, 50);

    // Spikes 3
    BABYLON.SceneLoader.ImportMesh("", "../models/", "spikeTrap.gltf", scene, function(newMeshes) {
        var spikeTrap = newMeshes[0];
        spikeTrap.position = new BABYLON.Vector3(240, 51, 5);
        spikeTrap.scaling = new BABYLON.Vector3(1.7,0.8,5);
        spikes3 = spikeTrap._children[0];
    });

    // Spikes 3 collision box 
    spikeBox = BABYLON.MeshBuilder.CreateBox('spikes3', {width:5, height:1, depth:5}, scene);
    spikeBox.checkCollisions = true;
    spikeBox.visibility = 0;
    spikeBox.material = spikesM;
    spikeBox.position = new BABYLON.Vector3(240, 51, 0.5);
    groundObjects.push(spikeBox);

    // Coin 2
    BABYLON.SceneLoader.ImportMesh("", "../models/", "coin.gltf", scene, function(newMeshes) {
        coin2 = newMeshes[0];
        coin2.position = new BABYLON.Vector3(236,54.5,0.5);
        coin2.scaling = new BABYLON.Vector3(10,10,10);
        coin2.rotation = new BABYLON.Vector3(deg2rad(-90),0,0);
        Coin(coin2); // start animation
    });

    // Coin 2 collision box
    var coinBox = BABYLON.MeshBuilder.CreateBox('coinBox2', {size:2}, scene);
    coinBox.visibility = 0;
    coinBox.material = coinM;
    coinBox.position = new BABYLON.Vector3(236,54,0.5);
    groundObjects.push(coinBox);

    // Platform pebbles medium
    addPlatform(multimatPebblesM, platformWidthMedium, 260, 0);

    // Platform pebbles small
    addPlatform(multimatPebblesS, platformWidthSmall, 280, 10);
    addPlatform(multimatPebblesS, platformWidthSmall, 290, 0);
    addPlatform(multimatPebblesS, platformWidthSmall, 300, 10);
    addPlatform(multimatPebblesS, platformWidthSmall, 310, 0);
    addPlatform(multimatPebblesS, platformWidthSmall, 320, 10);
    addPlatform(multimatPebblesS, platformWidthSmall, 330, 0);

    // Platform pebbles big
    addPlatform(multimatPebblesM, platformWidthMedium, 345, -4);

    // Platform pebbles big
    addPlatform(multimatPebblesB, platformWidthBig, 369.5, 20, true);
    addPlatform(multimatPebblesB, platformWidthBig, 349.5, 37, true);

    // Platform pebbles small
    addPlatform(multimatPebblesS, platformWidthSmall, 366, 5);
    addPlatform(multimatPebblesS, platformWidthSmall, 353, 13);
    addPlatform(multimatPebblesS, platformWidthSmall, 366, 21);
    addPlatform(multimatPebblesS, platformWidthSmall, 353, 29);
    addPlatform(multimatPebblesS, platformWidthSmall, 366, 37);
    addPlatform(multimatPebblesS, platformWidthSmall, 353, 55);

    // Coin 3
    BABYLON.SceneLoader.ImportMesh("", "../models/", "coin.gltf", scene, function(newMeshes) {
        coin3 = newMeshes[0];
        coin3.position = new BABYLON.Vector3(353,58.5,0.5);
        coin3.scaling = new BABYLON.Vector3(10,10,10);
        coin3.rotation = new BABYLON.Vector3(deg2rad(-90),0,0);
        Coin(coin3); // start animation
    });

    // Coin 3 collision box
    var coinBox = BABYLON.MeshBuilder.CreateBox('coinBox3', {size:2}, scene);
    coinBox.visibility = 0;
    coinBox.material = coinM;
    coinBox.position = new BABYLON.Vector3(353,58,0.5);
    groundObjects.push(coinBox);

    // Platform for fireplace
    addFirePlatform(multimatPebblesM, 378.5, 46);

    // Fire Log 2
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "FireLog.gltf", scene, function(newMeshes) {
        var FireLog = newMeshes[0];
        FireLog.position = new BABYLON.Vector3(378.5, 46.5, 3);
        FireLog.scaling = new BABYLON.Vector3(2,2,2);
    });

    // Fire 2 collision box
    var fireBox = BABYLON.MeshBuilder.CreateBox('fireBox2', {width:2.5, height:2, depth:2}, scene);
    fireBox.visibility = 0;
    fireBox.material = fireM;
    fireBox.position = new BABYLON.Vector3(378.5, 48, 0.5);
    groundObjects.push(fireBox);

    // Platform pebbles small
    addPlatform(multimatPebblesS, platformWidthSmall, 400, 40);
    addPlatform(multimatPebblesS, platformWidthSmall, 415, 25);
    addPlatform(multimatPebblesS, platformWidthSmall, 430, 10);
    addPlatform(multimatPebblesS, platformWidthSmall, 445, 10);
    addPlatform(multimatPebblesS, platformWidthSmall, 460, 20);
    addPlatform(multimatPebblesS, platformWidthSmall, 475, 30);
    addPlatform(multimatPebblesS, platformWidthSmall, 490, 40);
    addPlatform(multimatPebblesS, platformWidthSmall, 475, 50);
    addPlatform(multimatPebblesS, platformWidthSmall, 460, 45);

    // Platform ground medium
    addPlatform(multimatGroundM, platformWidthMedium, 435, 50);

    

    // // Bush
    // BABYLON.SceneLoader.ImportMesh("", "../models/AutumnModels/", "bush1.gltf", scene, function(newMeshes) {
    //     var bush = newMeshes[0];
    //     bush.position = new BABYLON.Vector3(10,1,3);
    //     bush.scaling = new BABYLON.Vector3(2,2,2);
    // });

    // // Bush 2
    // BABYLON.SceneLoader.ImportMesh("", "../models/AutumnModels/", "bush2.gltf", scene, function(newMeshes) {
    //     newMeshes[0].position = new BABYLON.Vector3(20,5,3);
    //     newMeshes[0].scaling = new BABYLON.Vector3(2,2,2);
    // });


    // // Stairs 1
    // for (var i=0; i<4; i++) {
    //     var step = BABYLON.MeshBuilder.CreateBox(`step1_${i}`, {width:2, height:2, depth:10}, scene);
    //     step.position = new BABYLON.Vector3(78+5*i, 8-2*i, 0);
    //     step.checkCollisions = true;
    //     groundObjects.push(step);
    //     step.material = ground;
    // }

    // // Stairs 2
    // for (var i=0; i<5; i++) {
    //     var step = BABYLON.MeshBuilder.CreateBox(`step2_${i}`, {width:2, height:3+2*i, depth:10}, scene);
    //     step.position = new BABYLON.Vector3(119+3*i, 0.5+i, 0);
    //     step.checkCollisions = true;
    //     groundObjects.push(step);
    //     step.material = ground;
    // }


    // Music
    var musicl1 = new BABYLON.Sound("musicl2", "../sounds/songs/Celtic Music - Callirus .mp3", scene, soundReady, {loop:true, volume:0.5, useCustomAttenuation:false});
    function soundReady(){
        musicl1.play();
    }
    

    // Lightning
    flash = new BABYLON.PointLight("flash", new BABYLON.Vector3(0, 0, 0), scene);
    flash.diffuse = new BABYLON.Color3(0.02, 0.18, 0.54);
    flash.specular = new BABYLON.Color3(0.02, 0.18, 0.54);

    // Thunder
    thunder1 = new BABYLON.Sound("thunder1", "../sounds/thunder1.mp3", scene);
    thunder2 = new BABYLON.Sound("thunder2", "../sounds/thunder2.mp3", scene);
    thunder3 = new BABYLON.Sound("thunder3", "../sounds/thunder3.mp3", scene);
    

    // Rain
    {
    //Particles system
    var particles = new BABYLON.GPUParticleSystem("particles", 100000, scene);

    //Texture of each particle
    particles.particleTexture = new BABYLON.Texture("../textures/droplet.png", scene);
    particles.color1 = new BABYLON.Color4(1,1,1,0.9);
    particles.color2 = new BABYLON.Color4(1,1,1,1);
    
    //Where the particles come from
    particles.emitter = camera;
	particles.minEmitBox = new BABYLON.Vector3(-100, 40, 20); // Starting all from
    particles.maxEmitBox = new BABYLON.Vector3(100, 50, 60); // To...

	// Size of each particle
	particles.minSize = .05;
	particles.maxSize = .1;

	// Life time of each particle
	particles.minLifeTime = 1;
	particles.maxLifeTime = 2;

	// Emission rate
	particles.emitRate = 10000;

    window.ps = particles;

	// Blend mode
	particles.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

	// Set the gravity of all particles
	particles.gravity = new BABYLON.Vector3(0, -9.81, 0);

	// Direction of each particle after it has been emitted
	particles.direction1 = new BABYLON.Vector3(-.4, -1, -.1);
    particles.direction2 = new BABYLON.Vector3(-.5, -1, .1);
    
	// Speed
	particles.minEmitPower = 40;
	particles.maxEmitPower = 50;

    // Start the particle system
    particles.preWarmCycles = 100;
    particles.start();
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

    scene.executeWhenReady( function() {
        engine.hideLoadingUI();
    });

    return scene;
}

var scene = createScene();

// Storm animation
var lightningTimer = 5;
scene.registerBeforeRender( function() {
    // Lightnings & thunders
    if(Math.random() > 0.997) {
        flash.intensity = 10 + Math.random() * 100;
        flash.position = new BABYLON.Vector3(
        Math.random()*500 - 200,
        Math.random()*500 - 250,
        100
        );
        if(flash.intensity > 80) {
            thunder1.play();
        }
        else if(flash.intensity > 45) {
            thunder2.play();
        }
        else {
            thunder3.play();
        }
        lightningTimer = 5;
    }
    else if (lightningTimer > 0) {
        lightningTimer--;
    }
    else {
        flash.intensity = 0;
        lightningTimer = 5;
    }

    i = 0;
    clouds.forEach(p => {
        if(i%2 == 0) p.rotation.z += 0.001;
        else p.rotation.z -= 0.001;
        i++;
    });
});


/**
 * Add platform to the scene with specified material, width and position
 * @param {BABYLON.MultiMaterial} material - Material to apply to the platform
 * @param {number} platformWidth - platformWidthSmall, platformWidthMedium or platformWidthBig
 * @param {number} x - x position of the platform
 * @param {number} y - y position of the platform
 * @param {number} z - z position of the platform
 * @param {boolean} [rotate = false] - if true rotate the platform by 90 degrees
 */
function addPlatform(material, platformWidth, x, y, rotate=false) {
    var mesh = BABYLON.MeshBuilder.CreateBox('mesh', {width:platformWidth, height:platformHeight, depth:15}, scene);
    mesh.position = new BABYLON.Vector3(x, y, 5);
    if(rotate) mesh.rotate(new BABYLON.Vector3(0,0,1), Math.PI/2);
    mesh.checkCollisions = true;
    mesh.material = material;
    mesh.subMeshes = [];
    var verticesCount = mesh.getTotalVertices();
    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, mesh);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, mesh);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, mesh);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, mesh);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, mesh);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, mesh);
    groundObjects.push(mesh);
}

function addFirePlatform(mat, x, y) {
    addPlatform(mat, platformWidthMedium, x, y);
    addPlatform(mat, platformWidthMedium, x, y+17);
    var mesh = BABYLON.MeshBuilder.CreateBox('mesh', {width:platformWidthMedium, height:platformHeight, depth:15}, scene);
    mesh.position = new BABYLON.Vector3(x, y+8.5, 11.5);
    mesh.rotate(new BABYLON.Vector3(1,0,0), Math.PI/2);
    mesh.material = mat;
    mesh.subMeshes = [];
    var verticesCount = mesh.getTotalVertices();
    new BABYLON.SubMesh(1, 0, verticesCount, 0, 6, mesh);
    new BABYLON.SubMesh(1, 0, verticesCount, 6, 6, mesh);
    new BABYLON.SubMesh(2, 0, verticesCount, 12, 6, mesh);
    new BABYLON.SubMesh(2, 0, verticesCount, 18, 6, mesh);
    new BABYLON.SubMesh(0, 0, verticesCount, 24, 6, mesh);
    new BABYLON.SubMesh(0, 0, verticesCount, 30, 6, mesh);
    groundObjects.push(mesh);
}


function trapActive(name){
    if(name == "spikes") trapON(spikes);
    else if(name == "spikes2") trapON(spikes2);
    else if(name == "spikes3") trapON(spikes3);
}


// Fireplace animations
function fireON(){
    fireIsOn = true;
    checkpoint = new BABYLON.Vector3(210,18,0.5);
    // Particles system Fire
    var particles2 = new BABYLON.GPUParticleSystem("particles2", 5000, scene);
    // Texture of each particle
    particles2.particleTexture = new BABYLON.Texture("../textures/fireParticle.png", scene);

    // Where the particles come from
    particles2.emitter = new BABYLON.Vector3(210,15.5,3);
    
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
    checkpoint = new BABYLON.Vector3(378.5,49,0.5);
    // Particles system Fire
    var particles3 = new BABYLON.GPUParticleSystem("particles3", 5000, scene);
    // Texture of each particle
    particles3.particleTexture = new BABYLON.Texture("../textures/fireParticle.png", scene);
  
    // Where the particles come from
    particles3.emitter = new BABYLON.Vector3(378.5, 46.5, 3);
    
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

// Coin animations
function coinON(){
    CoinDisappear(coin1);

    coinIsOn = true;
    // Particles system Fire
    particles4 = new BABYLON.GPUParticleSystem("particles4", 100, scene);
    // Texture of each particle
    particles4.particleTexture = new BABYLON.Texture("../textures/goldparticle.png", scene);

    // Where the particles come from
    particles4.emitter = new BABYLON.Vector3(136,44,0.5);
    
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

    // Start the particle system
    particles4.start();
}

function coinON2(){
    CoinDisappear(coin2);
    
    coinIsOn2 = true;
    // Particles system Fire
    particles5 = new BABYLON.GPUParticleSystem("particles5", 100, scene);
    // Texture of each particle
    particles5.particleTexture = new BABYLON.Texture("../textures/goldparticle.png", scene);

    // Where the particles come from
    particles5.emitter = new BABYLON.Vector3(236, 54, 0.5);
    
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
    particles5.gravity = new BABYLON.Vector3(0, 0, 0);

    // Direction of each particle after it has been emitted
    particles5.direction1 = new BABYLON.Vector3(1, 1, 0.2);
    particles5.direction2 = new BABYLON.Vector3(-1, 1, -0.2);

    // Angular speed, in radians
    particles5.minAngularSpeed = 0;
    particles5.maxAngularSpeed = Math.PI;

    // Speed
    particles5.minEmitPower = 10;
    particles5.maxEmitPower = 10;

    // Start the particle system
    particles5.start();
}

function coinON3(){
    CoinDisappear(coin3);
    
    coinIsOn3 = true;
    // Particles system Fire
    particles10 = new BABYLON.GPUParticleSystem("particles5", 100, scene);
    // Texture of each particle
    particles10.particleTexture = new BABYLON.Texture("../textures/goldparticle.png", scene);

    // Where the particles come from    
    particles10.emitter = new BABYLON.Vector3(353, 58, 0.5);
    
    particles10.minEmitBox = new BABYLON.Vector3(-0.5, 0, 0); // Starting all from
    particles10.maxEmitBox = new BABYLON.Vector3(0.5, 0, 0); // To...

    // Colors of all particles
    particles10.color1 = new BABYLON.Color4(1, 0.84, 0, 1.0);
    particles10.color2 = new BABYLON.Color4(1, 0.84, 0, 1.0);
    particles10.colorDead = new BABYLON.Color4(1, 0.84, 0, 0.0);

    // Size of each particle (random between...
    particles10.minSize = 0.1;
    particles10.maxSize = 0.5;

    // Life time of each particle (random between...
    particles10.minLifeTime = 0.01;
    particles10.maxLifeTime = 0.01;

    // Emission rate
    particles10.emitRate = 100;

    window.ps = particles10;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particles10.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particles10.gravity = new BABYLON.Vector3(0, 0, 0);

    // Direction of each particle after it has been emitted
    particles10.direction1 = new BABYLON.Vector3(1, 1, 0.2);
    particles10.direction2 = new BABYLON.Vector3(-1, 1, -0.2);

    // Angular speed, in radians
    particles10.minAngularSpeed = 0;
    particles10.maxAngularSpeed = Math.PI;

    // Speed
    particles10.minEmitPower = 10;
    particles10.maxEmitPower = 10;

    // Start the particle system
    particles10.start();
}

function portalON(){
    //Particles system Portal
    var particles8 = new BABYLON.ParticleSystem("particles", 5, scene);

    //Texture of each particle
    particles8.particleTexture = new BABYLON.Texture("../textures/portalParticles.png", scene);
    
    //Where the particles come from
    particles8.emitter = new BABYLON.Vector3(400,61,0);
    particles8.minEmitBox = new BABYLON.Vector3(0.1, 2.5 , 2.5); // Starting all from
    particles8.maxEmitBox = new BABYLON.Vector3(-0.1, -0.5, -2.5); // To...

    // Colors of all particles
    particles8.color1 = new BABYLON.Color4(0.5, 0, 0.5, 1.0);
    particles8.color2 = new BABYLON.Color4(0.5, 0, 0.5, 1.0);
    particles8.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

    // Size of each particle (random between...
    particles8.minSize = 0.1;
    particles8.maxSize = 0.5;

    // Life time of each particle (random between...
    particles8.minLifeTime = 0.1;
    particles8.maxLifeTime = 0.1;

    // Emission rate
    particles8.emitRate = 1;

    window.ps = particles8;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particles8.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particles8.gravity = new BABYLON.Vector3(0, 9.81, 0);

    // Direction of each particle after it has been emitted
    particles8.direction1 = new BABYLON.Vector3(-1, 2, 1);
    particles8.direction2 = new BABYLON.Vector3(-1,-2, 1);

    // Angular speed, in radians
    particles8.minAngularSpeed = 0;
    particles8.maxAngularSpeed = Math.PI;

    // Speed
    particles8.minEmitPower = .01;
    particles8.maxEmitPower = 30;

    // Start the particle system
    particles8.start();
}