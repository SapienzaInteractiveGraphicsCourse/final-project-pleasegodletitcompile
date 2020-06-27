// Canvas
var canvas = document.getElementById('renderCanvas');
// 3D Engine
var engine = new BABYLON.Engine(canvas, true);

//Time to try to implement gravity and run
var timeWalk = 0;
var timeJump = 0;
var timeFall = 0;

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
    var camera = new BABYLON.FollowCamera('camera', new BABYLON.Vector3(0, 0, 0), scene);
    camera.radius = 20;
    camera.heightOffset = 10;
    camera.rotationOffset = 180;
    camera.attachControl(canvas, true);

    // Light
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

    // Platform 1
    var platform1 = BABYLON.MeshBuilder.CreateBox('platform1', {width:50, height:platformHeight, depth:10}, scene);
    //platform1.visibility = 0.2;
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
    var platform3 = BABYLON.MeshBuilder.CreateBox('platform3', {width:20, height:platformHeight, depth:10}, scene);
    platform3.position = new BABYLON.Vector3(0, -20, 0)
    platform3.material = ice;
    platform3.checkCollisions = true;
    groundObjects.push(platform3);

    // Player
    player.mesh = new BABYLON.MeshBuilder.CreateBox("player", {width: player.width, height:player.height, depth:player.depth}, scene);
    player.mesh.visibility = 0.5;
    player.mesh.position.y = (player.height + platformHeight)/2.0;
    player.mesh.ellipsoid = new BABYLON.Vector3(player.width/2, player.height/2, player.depth/2);
    player.mesh.checkCollisions = true;
    camera.lockedTarget = player.mesh;

    console.log(player.mesh.position.y)

    BABYLON.SceneLoader.ImportMesh("", "../models/", "knight.gltf", scene, function(newMeshes) {
        player.initializeMeshes(newMeshes);
    });


    //     newMeshes[0].parent = player.mesh;
    //     newMeshes[0].position.y -= 0.5;
        // newMeshes[0].position.y += 2.0;
        // console.log(newMeshes[0].getChildMeshes())

        // newMeshes.forEach(x => scene.addMesh(x))
 
        // // Get all meshes except __root__
        // var meshes = newMeshes.filter((x) => {
        //     return x.parent != null
        // })

        // newMeshes[0].parent = player.mesh;
        // console.log(newMeshes[0].name)
        // console.log(meshes)

        // meshes.forEach(function(mesh){
        //     console.log(mesh.name);
        //     mesh.parent = player.mesh;
        //     // console.log(mesh.parent.name)
        // })

    // });

    return scene;
}

var scene = createScene();

// scene.beforeRender = function() {
//     if (player.rootNode) {
//         console.log(player.rootNode)
//     }
// };