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

// Set gravity
var gravity = -0.1;

var coin;

// Storm
var flash;
var clouds = [];
var thunder1;
var thunder2;

var checkpoint = new BABYLON.Vector3(0, 10, 0);

var platformHeight = 2;

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
    light.intensity = 0.5;

    // Fog
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP2;
    scene.fogColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    scene.fogDensity = 0.001;

    // Clouds
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

    // Left wall
    var leftWall = BABYLON.MeshBuilder.CreateBox('platform1', {width:20, height:300, depth:10}, scene);
    leftWall.checkCollisions = true;
    leftWall.position = new BABYLON.Vector3(-35, 0, 0);
    leftWall.material = ground;

    // Platform 1
    var platform1 = BABYLON.MeshBuilder.CreateBox('platform1', {width:50, height:2, depth:10}, scene);
    platform1.checkCollisions = true;
    groundObjects.push(platform1);
    platform1.material = ground;

    // Bush
    BABYLON.SceneLoader.ImportMesh("", "../models/AutumnModels/", "bush1.gltf", scene, function(newMeshes) {
        var bush = newMeshes[0];
        bush.position = new BABYLON.Vector3(10,1,3);
        bush.scaling = new BABYLON.Vector3(2,2,2);
    });

    // Platform 2
    var platform2 = BABYLON.MeshBuilder.CreateBox('platform2', {width:20, height:10, depth:10}, scene);
    platform2.position = new BABYLON.Vector3(35, 4, 0);
    platform2.checkCollisions = true;
    groundObjects.push(platform2);
    platform2.material = ground;

    // Bush 2
    BABYLON.SceneLoader.ImportMesh("", "../models/AutumnModels/", "bush2.gltf", scene, function(newMeshes) {
        newMeshes[0].position = new BABYLON.Vector3(20,5,3);
        newMeshes[0].scaling = new BABYLON.Vector3(2,2,2);
    });

    // Platform 3
    var platform3 = BABYLON.MeshBuilder.CreateBox('platform3', {width:20, height:2, depth:10}, scene);
    platform3.position = new BABYLON.Vector3(60, 0, 0);
    platform3.checkCollisions = true;
    groundObjects.push(platform3);
    platform3.material = ground;

    // Platform 4
    var platform4 = BABYLON.MeshBuilder.CreateBox('platform4', {width:4, height:2, depth:10}, scene);
    platform4.position = new BABYLON.Vector3(72, 10, 0);
    platform4.checkCollisions = true;
    groundObjects.push(platform4);
    platform4.material = ground;

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

    clouds.forEach(p => {
        p.rotation.z -= 0.001;
    });
});