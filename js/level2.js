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

// Set gravity
var gravity = -0.1;

var snowCyl;
var snowRA;
var snowLA;

var snowCyl2;
var snowRA2;
var snowLA2;

var snowAnim = true;



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
    
    // Camera
    camera = new BABYLON.FollowCamera('camera', new BABYLON.Vector3(0, 0, 0), scene);
    camera.radius = 40;
    camera.heightOffset = 10;
    camera.rotationOffset = 180;
    camera.attachControl(canvas, true);

    // Light
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(1,1,0), scene);


    var multimatSnowB = new BABYLON.MultiMaterial("multiSnow", scene);
    multimatSnowB.subMaterials.push(snowB);
    multimatSnowB.subMaterials.push(snowB1);
    multimatSnowB.subMaterials.push(snowB2);

    // Ice multimaterial
    var multimatIceM = new BABYLON.MultiMaterial("multiIce", scene);
    multimatIceM.subMaterials.push(iceM);
    multimatIceM.subMaterials.push(iceM1);
    multimatIceM.subMaterials.push(iceM2);

    var multimatIceB = new BABYLON.MultiMaterial("multiIce", scene);
    multimatIceB.subMaterials.push(iceB);
    multimatIceB.subMaterials.push(iceB1);
    multimatIceB.subMaterials.push(iceB1);
    
    // Platform 1
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

    // Platform 1
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

    // Platform 2
    var platform2 = BABYLON.MeshBuilder.CreateBox('platform2', {width:20, height:platformHeight, depth:15}, scene);
    platform2.position = new BABYLON.Vector3(30, -10, 5)
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

    // Platform 2
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

    // Platform 3
    var platform3 = BABYLON.MeshBuilder.CreateBox('platform3', {width:50, height:platformHeight, depth:15}, scene);
    platform3.position = new BABYLON.Vector3(0, -20, 5)
    platform3.material = multimatIceB;
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
        WinterTree1.checkCollisions = true;
    });

    // Winter tree 1
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterTree1.gltf", scene, function(newMeshes) {
        var WinterTree1 = newMeshes[0];
        WinterTree1.position = new BABYLON.Vector3(83,15, -20);
        WinterTree1.scaling = new BABYLON.Vector3(1,1,1);
        WinterTree1.checkCollisions = true;
    });

    // Winter tree 1
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterTree1.gltf", scene, function(newMeshes) {
        var WinterTree1 = newMeshes[0];
        WinterTree1.position = new BABYLON.Vector3(108,15, -20);
        WinterTree1.scaling = new BABYLON.Vector3(1,1,1);
        WinterTree1.checkCollisions = true;
    });

    // Winter tree 2
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterTree2.gltf", scene, function(newMeshes) {
        var WinterTree2 = newMeshes[0];
        WinterTree2.position = new BABYLON.Vector3(23,5, 7);
        WinterTree2.scaling = new BABYLON.Vector3(1,1,1);
        WinterTree2.checkCollisions = true;
    });

    // Winter tree 2
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterTree2.gltf", scene, function(newMeshes) {
        var WinterTree2 = newMeshes[0];
        WinterTree2.position = new BABYLON.Vector3(98,15, 7);
        WinterTree2.scaling = new BABYLON.Vector3(1,1,1);
        WinterTree2.checkCollisions = true;
    });

    // Winter tree 2
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterTree2.gltf", scene, function(newMeshes) {
        var WinterTree2 = newMeshes[0];
        WinterTree2.position = new BABYLON.Vector3(123,15, 7);
        WinterTree2.scaling = new BABYLON.Vector3(1,1,1);
        WinterTree2.checkCollisions = true;
    });

    // Winter tree 3
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterTree3.gltf", scene, function(newMeshes) {
        var WinterTree2 = newMeshes[0];
        WinterTree2.position = new BABYLON.Vector3(90,15, 29);
        WinterTree2.scaling = new BABYLON.Vector3(1,1,1);
        WinterTree2.checkCollisions = true;
    });

    // Winter tree 3
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterTree3.gltf", scene, function(newMeshes) {
        var WinterTree2 = newMeshes[0];
        WinterTree2.position = new BABYLON.Vector3(115,15, 29);
        WinterTree2.scaling = new BABYLON.Vector3(1,1,1);
        WinterTree2.checkCollisions = true;
    });

    //Small Rock
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterRockSmall.gltf", scene, function(newMeshes) {
        var WinterRockSmall = newMeshes[0];
        WinterRockSmall.position = new BABYLON.Vector3(36,-9.5, 6);
        WinterRockSmall.scaling = new BABYLON.Vector3(3,3,3);
        WinterRockSmall.checkCollisions = true;
    });

    //Medium Rock
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterRockMedium.gltf", scene, function(newMeshes) {
        var WinterRockSmall = newMeshes[0];
        WinterRockSmall.position = new BABYLON.Vector3(30,-9.5, 5);
        WinterRockSmall.scaling = new BABYLON.Vector3(3,3,3);
        WinterRockSmall.checkCollisions = true;
    });

    //Big Rock
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterRockBig.gltf", scene, function(newMeshes) {
        var WinterRockSmall = newMeshes[0];
        WinterRockSmall.position = new BABYLON.Vector3(10,2, 5);
        WinterRockSmall.scaling = new BABYLON.Vector3(3,3,3);
        WinterRockSmall.checkCollisions = true;
    });

    //Big Rock
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterRockBig.gltf", scene, function(newMeshes) {
        var WinterRockSmall = newMeshes[0];
        WinterRockSmall.position = new BABYLON.Vector3(26,-8, 5);
        WinterRockSmall.scaling = new BABYLON.Vector3(3,3,3);
        WinterRockSmall.checkCollisions = true;
    });

    //Big Rock
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterRockBig.gltf", scene, function(newMeshes) {
        var WinterRockSmall = newMeshes[0];
        WinterRockSmall.position = new BABYLON.Vector3(18,-8, 4);
        WinterRockSmall.scaling = new BABYLON.Vector3(3,3,3);
        WinterRockSmall.checkCollisions = true;
    });


    // Winter bridge
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterBridge.gltf", scene, function(newMeshes) {
        var WinterBridge = newMeshes[0];
        WinterBridge.position = new BABYLON.Vector3(-12,1.1,10.5);
        WinterBridge.scaling = new BABYLON.Vector3(5,5,5);
        WinterBridge.checkCollisions = true;
    });


    // Winter wolf
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "Wolf.gltf", scene, function(newMeshes) {
        var Wolf = newMeshes[0];
        Wolf.position = new BABYLON.Vector3(-12,1.1,10.5);
        Wolf.scaling = new BABYLON.Vector3(1,1,1);
        Wolf.rotate(new BABYLON.Vector3(0,2,0), -45);
        Wolf.checkCollisions = true;
    });

    // Winter bridge Platform3
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "WinterBridge.gltf", scene, function(newMeshes) {
        var WinterBridge = newMeshes[0];
        WinterBridge.position = new BABYLON.Vector3(16,-19,10.5);
        WinterBridge.scaling = new BABYLON.Vector3(5,5,5);
        WinterBridge.checkCollisions = true;
    });


    // Winter wolf Platform3
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "Wolf.gltf", scene, function(newMeshes) {
        var Wolf = newMeshes[0];
        Wolf.position = new BABYLON.Vector3(16,-19,10.5);
        Wolf.scaling = new BABYLON.Vector3(1,1,1);
        Wolf.rotate(new BABYLON.Vector3(0,2,0), 45);
        Wolf.checkCollisions = true;
    });

    // Fire Log
    BABYLON.SceneLoader.ImportMesh("", "../models/WinterModels/", "FireLog.gltf", scene, function(newMeshes) {
        var FireLog = newMeshes[0];
        FireLog.position = new BABYLON.Vector3(-12,-19.1,0);
        FireLog.scaling = new BABYLON.Vector3(2,2,2);
        FireLog.checkCollisions = true;
    });

    // Fire collision box
    var fireBox = BABYLON.MeshBuilder.CreateBox('fireBox', {width:0.5, height:1.5, depth:0.5}, scene);
    fireBox.checkCollisions = true;
    fireBox.visibility = 0;
    fireBox.material = fireM;
    fireBox.position = new BABYLON.Vector3(-12,-19.1,0);
    groundObjects.push(fireBox);








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

    



    //music
    var musicl2 = new BABYLON.Sound("musicl2", "../sounds/songs/dance with the trees.mp3", scene, soundReady, {loop:true, volume:0.5, useCustomAttenuation:false});

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

    return scene;
}

var scene = createScene();