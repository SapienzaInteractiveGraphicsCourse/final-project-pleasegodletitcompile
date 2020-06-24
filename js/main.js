/// <reference path="../reference/babylon.d.ts" />

// Canvas
var canvas = document.getElementById('renderCanvas');
// 3D Engine
var engine = new BABYLON.Engine(canvas, true);

// Sphere
var sphere;
var velocity = 0;
var canJump = false;

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
    sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {segments:16, diameter:2}, scene);
    sphere.position.y = 1;
    sphere.checkCollisions = true;
    camera.lockedTarget = sphere;

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
    if(sphere.position.y < 1.01 && sphere.position.y >= 1.0){
        canJump = true;
    } 
    else if(sphere.position.y >= 1.01) {
        velocity -= 0.1;
    }
    else {
        sphere.position.y = 1;
        velocity = 0;
    }
    sphere.position.y += 0.01 * velocity * delta;
    console.log(sphere.position.y);

    scene.render();
});

// Canvas/Window resize event handler
window.addEventListener('resize', function() {
    engine.resize();
});