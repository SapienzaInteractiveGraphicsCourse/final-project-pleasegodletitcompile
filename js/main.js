// Canvas
var canvas = document.getElementById('renderCanvas');
// 3D Engine
var engine = new BABYLON.Engine(canvas, true);

var createScene = function() {
    // Scene
    var scene = new BABYLON.Scene(engine);
    scene.gravity = new BABYLON.Vector3(0, -0.98, 0);

    // Camera
    var camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 2,-10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    camera.checkCollisions = true;
    camera.applyGravity = true; 
    camera._needMoveForGravity = true; // Magic line 17
    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);

    // Camera controls
    camera.inertia = 0;
    camera.keysUp = [87]; // W
    camera.keysDown = [83]; // S
    camera.keysLeft = [65]; // A
    camera.keysRight = [68]; // D
    camera.speed = 5;

    // Light
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

    // Sphere
    var sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {segments:16, diameter:2}, scene);
    sphere.position.y = 1;
    sphere.checkCollisions = true;

    // Ground
    var ground = BABYLON.MeshBuilder.CreateGround('ground1', {height:50, width:50, subdivisions: 2}, scene);
    ground.checkCollisions = true;

    return scene;
}

var scene = createScene();

// Render loop
engine.runRenderLoop(function() {
    scene.render();
});

// Canvas/Window resize event handler
window.addEventListener('resize', function() {
    engine.resize();
});