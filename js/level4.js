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
        var sandS1 = new BABYLON.StandardMaterial("sandS1", scene);
        sandS1.diffuseTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles.jpg", scene)
        sandS1.diffuseTexture.uScale = 1;
        sandS1.diffuseTexture.vScale = 0.33;
        sandS1.bumpTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles_normal.jpg", scene)
        sandS1.bumpTexture.uScale = 1;
        sandS1.bumpTexture.vScale = 0.33;
        
        var sandS2 = new BABYLON.StandardMaterial("sandS2", scene);
        sandS2.diffuseTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles.jpg", scene)
        sandS2.diffuseTexture.uScale = 0.33;
        sandS2.diffuseTexture.vScale = 0.13;
        sandS2.bumpTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles_normal.jpg", scene)
        sandS2.bumpTexture.uScale = 0.33;
        sandS2.bumpTexture.vScale = 0.13;
    
        var sandS3 = new BABYLON.StandardMaterial("sandS3", scene);
        sandS3.diffuseTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles.jpg", scene)
        sandS3.diffuseTexture.uScale = 0.13;
        sandS3.diffuseTexture.vScale = 1;
        sandS3.bumpTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles_normal.jpg", scene)
        sandS3.bumpTexture.uScale = 0.13;
        sandS3.bumpTexture.vScale = 1;
    
        // Ground Wet Pebbles Medium Platform
        var sandM1 = new BABYLON.StandardMaterial("sandM1", scene);
        sandM1.diffuseTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles.jpg", scene)
        sandM1.diffuseTexture.uScale = 1;
        sandM1.diffuseTexture.vScale = 1.33;
        sandM1.bumpTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles_normal.jpg", scene)
        sandM1.bumpTexture.uScale = 1;
        sandM1.bumpTexture.vScale = 1.33;
        
        var sandM2 = new BABYLON.StandardMaterial("sandM2", scene);
        sandM2.diffuseTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles.jpg", scene)
        sandM2.diffuseTexture.uScale = 0.133;
        sandM2.diffuseTexture.vScale = 0.06;
        sandM2.bumpTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles_normal.jpg", scene)
        sandM2.bumpTexture.uScale = 0.133;
        sandM2.bumpTexture.vScale = 0.06;
    
        var sandM3 = new BABYLON.StandardMaterial("sandM3", scene);
        sandM3.diffuseTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles.jpg", scene)
        sandM3.diffuseTexture.uScale = 0.06;
        sandM3.diffuseTexture.vScale = 0.133;
        sandM3.bumpTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles_normal.jpg", scene)
        sandM3.bumpTexture.uScale = 0.06;
        sandM3.bumpTexture.vScale = 0.133;
    
        // Ground Wet Pebbles Big Platform
        var sandB1 = new BABYLON.StandardMaterial("sandB1", scene);
        sandB1.diffuseTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles.jpg", scene)
        sandB1.diffuseTexture.uScale = 0.3;
        sandB1.diffuseTexture.vScale = 3;
        sandB1.bumpTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles_normal.jpg", scene)
        sandB1.bumpTexture.uScale = 0.3;
        sandB1.bumpTexture.vScale = 3;
        
        var sandB2 = new BABYLON.StandardMaterial("sandB2", scene);
        sandB2.diffuseTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles.jpg", scene)
        sandB2.diffuseTexture.uScale = 3;
        sandB2.diffuseTexture.vScale = 0.08;
        sandB2.bumpTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles_normal.jpg", scene)
        sandB2.bumpTexture.uScale = 3;
        sandB2.bumpTexture.vScale = 0.08;
    
        var sandB3 = new BABYLON.StandardMaterial("sandB3", scene);
        sandB3.diffuseTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles.jpg", scene)
        sandB3.diffuseTexture.uScale = 0.08;
        sandB3.diffuseTexture.vScale = 0.3;
        sandB3.bumpTexture = new BABYLON.Texture("../textures/AutumnTextures/ground_wet_pebbles_normal.jpg", scene)
        sandB3.bumpTexture.uScale = 0.08;
        sandB3.bumpTexture.vScale = 0.3;
        
    
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
        var multimatSandS = new BABYLON.MultiMaterial("multiGround", scene);
        multimatSandS.subMaterials.push(sandS1);
        multimatSandS.subMaterials.push(sandS2);
        multimatSandS.subMaterials.push(sandS3);
    
        var multimatSandM = new BABYLON.MultiMaterial("multiGround", scene);
        multimatSandM.subMaterials.push(sandM1);
        multimatSandM.subMaterials.push(sandM2);
        multimatSandM.subMaterials.push(sandM3);
    
        var multimatSandB = new BABYLON.MultiMaterial("multiGround", scene);
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
    groundObjects.push(platform1);

    // Platform 1 Tutorial
    var platform1 = BABYLON.MeshBuilder.CreateBox('tutorial1', {width:50, height:platformHeight, depth:15}, scene);
    platform1.checkCollisions = false;
    //platform1.visibility = 0;
    platform1.position.x = 5;
    platform1.rotate(new BABYLON.Vector3(0,0,1), Math.PI/2);
    platform1.material = tutorialM;
    groundObjects.push(platform1);

    // Platform 2
    var platform2 = BABYLON.MeshBuilder.CreateBox('platform2', {width:20, height:platformHeight, depth:15}, scene);
    platform2.position = new BABYLON.Vector3(30, 5, 0)
    platform2.checkCollisions = true;
    platform2.material = multimatGroundM;
    groundObjects.push(platform2);

    // Platform 2
    var platform2 = BABYLON.MeshBuilder.CreateBox('platform2', {width:20, height:platformHeight, depth:15}, scene);
    platform2.position = new BABYLON.Vector3(60, 5, 0)
    platform2.checkCollisions = true;
    platform2.material = multimatGroundM;
    groundObjects.push(platform2);

    // Platform 3
    var platform3 = BABYLON.MeshBuilder.CreateBox('platform3', {width:5, height:platformHeight, depth:15}, scene);
    platform3.position = new BABYLON.Vector3(77.5, 0, 0)
    platform3.material = multimatGroundS;
    platform3.checkCollisions = true;
    groundObjects.push(platform3);

    // Platform 3
    var platform3 = BABYLON.MeshBuilder.CreateBox('platform3', {width:5, height:platformHeight, depth:15}, scene);
    platform3.position = new BABYLON.Vector3(85.5, 0, 0)
    platform3.material = multimatGroundS;
    platform3.checkCollisions = true;
    groundObjects.push(platform3);

    // Platform 1
    var platform1 = BABYLON.MeshBuilder.CreateBox('platform1', {width:50, height:platformHeight, depth:15}, scene);
    platform3.position = new BABYLON.Vector3(92.5, 0, 0)
    platform1.checkCollisions = true;
    platform1.material = multimatGroundB;
    groundObjects.push(platform1);

    // Platform 3
    var platform3 = BABYLON.MeshBuilder.CreateBox('platform3', {width:5, height:platformHeight, depth:15}, scene);
    platform3.position = new BABYLON.Vector3(-80, -20, 0)
    platform3.material = multimatGroundS;
    platform3.checkCollisions = true;
    groundObjects.push(platform3);

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
    });

    return scene;
}

var scene = createScene();