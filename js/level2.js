// Canvas
var canvas = document.getElementById('renderCanvas');
// 3D Engine
var engine = new BABYLON.Engine(canvas, true);

var camera;

//Time to try to implement gravity and run
var timeWalk = 0;
var timeJump = 0;
var timeSlide = 0;

// Set gravity
var gravity = -0.1;



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
    var ice = new BABYLON.StandardMaterial("ice", scene);
    ice.diffuseColor = new BABYLON.Color3(0, 1, 1);
    ice.diffuseTexture = new BABYLON.Texture("../Textures/ice.png", scene)

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

    // Platform 1
    var platform1 = BABYLON.MeshBuilder.CreateBox('platform1', {width:50, height:platformHeight, depth:10}, scene);
    platform1.checkCollisions = true;
    platform1.material = ground;
    groundObjects.push(platform1);

    // Platform 2
    var platform2 = BABYLON.MeshBuilder.CreateBox('platform2', {width:20, height:platformHeight, depth:10}, scene);
    platform2.position = new BABYLON.Vector3(23, -10, 0)
    platform2.checkCollisions = true;
    platform2.material = ice;
    groundObjects.push(platform2);

    // Platform 3
    var platform3 = BABYLON.MeshBuilder.CreateBox('platform3', {width:200, height:platformHeight, depth:10}, scene);
    platform3.position = new BABYLON.Vector3(-80, -20, 0)
    platform3.material = ice;
    platform3.checkCollisions = true;
    groundObjects.push(platform3);

    // Snowman
    BABYLON.SceneLoader.ImportMesh("", "../models/", "snowman.gltf", scene, function(newMeshes) {
        var snowman = newMeshes[0];
        snowman.position = new BABYLON.Vector3(0,0.9,3);
        snowman.scaling = new BABYLON.Vector3(2,2,2)
    });

    //Particles system
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
	// ps1.manualEmitCount = 100;

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

	// ps1.updateSpeed = 0.009;

	// Start the particle system
	particles.start();
    

    /*
    BABYLON.ParticleHelper.CreateAsync("rain", scene, true).then((set) => {
        set.start();
    });
    */
    /*
    var hdrTexture = new BABYLON.HDRCubeTexture("../Textures/ice.png", scene);
    scene.createDefaultSkybox(hdrTexture, true, 10000);
    */

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