// Canvas
var canvas = document.getElementById('renderCanvas');
// 3D Engine
var engine = new BABYLON.Engine(canvas, true);

var createScene = function() {
    // Scene
    var scene = new BABYLON.Scene(engine);
    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);

    // Camera
    var camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 10,-10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    camera.checkCollisions = true;
    camera.applyGravity = true; 
    camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);

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