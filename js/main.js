/// <reference path="../reference/babylon.d.ts" />

// Canvas
var canvas = document.getElementById('renderCanvas');
// 3D Engine
var engine = new BABYLON.Engine(canvas, true);

var gravity = -0.1;

var createScene = function() {
    // Scene
    var scene = new BABYLON.Scene(engine);
    scene.gravity = new BABYLON.Vector3(0, -0.98, 0);

    // Camera
    var camera = new BABYLON.FollowCamera('camera', new BABYLON.Vector3(0, 0, 0), scene);
    camera.radius = 20;
    camera.heightOffset = 10;
    camera.rotationOffset = 180;
    camera.attachControl(canvas, true);

    // Sphere
    // TODO: make the collision work without hardcode in renderloop
    player.mesh = BABYLON.MeshBuilder.CreateSphere('sphere', {segments:16, diameter:2}, scene);
    player.mesh.position.y = 1;
    player.mesh.checkCollisions = true;
    camera.lockedTarget = player.mesh;

    // Light
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

    // Ground
    var ground = BABYLON.MeshBuilder.CreateGround('ground1', {height:10, width:20, subdivisions: 2}, scene);
    ground.checkCollisions = true;

    return scene;
}

var scene = createScene();

// Render loop
engine.runRenderLoop(function() {
    delta = engine.getDeltaTime()
    // Render jump / fall
    // if(player.mesh.position.y < 1.01 && player.mesh.position.y >= 1.0){
    //     player.canJump = true;
    // } 
    // else if(sphere.position.y >= 1.01) {
    //     player.verticalSpeed -= 0.1;
    // }
    // else {
    //     player.mesh.position.y = 1;
    //     player.verticalSpeed = 0;
    // }
    // player.mesh.position.y += 0.01 * player.verticalSpeed * delta;
    player.mesh.moveWithCollisions(new BABYLON.Vector3(0,gravity,0));
    console.log(player.mesh.position.y);

    scene.render();
});

// Canvas/Window resize event handler
window.addEventListener('resize', function() {
    engine.resize();
});