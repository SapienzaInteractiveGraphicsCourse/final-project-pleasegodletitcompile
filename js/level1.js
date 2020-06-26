// Canvas
var canvas = document.getElementById('renderCanvas');
// 3D Engine
var engine = new BABYLON.Engine(canvas, true);

//Time to try to implement gravity and run
var timeWalk = 0;
var timeJump = 0;
// Set gravity
var gravity = -0.98;

var checkpoint = new BABYLON.Vector3(0, 50, 0)

var platformHeight = 2;
var knight;
var helmet;

// List of objects that are considered ground
var groundObjects = [];

var createScene = function() {
    // Scene
    var scene = new BABYLON.Scene(engine);

    // Camera
    var camera = new BABYLON.FollowCamera('camera', new BABYLON.Vector3(0, 0, 0), scene);
    camera.radius = 20;
    camera.heightOffset = 10;
    camera.rotationOffset = 180;
    camera.attachControl(canvas, true);

    
    // player.mesh = BABYLON.MeshBuilder.CreateBox("myBox", {height: 2, width: 2, depth: 0.5}, scene);
    // player.checkCollisions = true;
    // player.mesh.position.y = 100;

    // Light
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), scene);

    // Platform 1
    var platform1 = BABYLON.MeshBuilder.CreateBox('platform1', {width:50, height:platformHeight, depth:10}, scene);
    platform1.checkCollisions = true;
    groundObjects.push(platform1);

    // Platform 2
    var platform2 = BABYLON.MeshBuilder.CreateBox('platform2', {width:20, height:platformHeight, depth:10}, scene);
    platform2.position = new BABYLON.Vector3(23, -10, 0)
    platform2.checkCollisions = true;
    groundObjects.push(platform2);

    // Platform 3
    var platform3 = BABYLON.MeshBuilder.CreateBox('platform3', {width:20, height:platformHeight, depth:10}, scene);
    platform3.position = new BABYLON.Vector3(0, -20, 0)
    platform3.checkCollisions = true;
    groundObjects.push(platform3);

    // Player
    player.mesh = new BABYLON.MeshBuilder.CreateBox("player", {size: player.height}, scene);
    player.mesh.visibility = 0.2;
    /* BABYLON.SceneLoader.ImportMesh("", "../models/", "knight.gltf", scene, function(newMeshes) {
        // newMeshes.forEach(x => scene.addMesh(x))

        // Get all meshes except __root__
        var meshes = newMeshes.filter((x) => {
            return x.parent != null
        })

        newMeshes[0].parent = player.mesh;
        // console.log(newMeshes[0].name)
        console.log(meshes)
        // Get bounding box
        var min = null;
        var max = null;
        newMeshes.forEach(function(mesh){
            console.log(mesh.name);
            mesh.parent = player.mesh;
            // console.log(mesh.parent.name)

            const boundingBox = mesh.getHierarchyBoundingVectors();
            if(min === null){
                min = new BABYLON.Vector3();
                min.copyFrom(boundingBox.min);
            }

            if(max === null){
                max = new BABYLON.Vector3();
                max.copyFrom(boundingBox.max);
            }

            min = BABYLON.Vector3.Minimize(min, boundingBox.min);
            max = BABYLON.Vector3.Maximize(max, boundingBox.max);
        })

        // var min_max = newMeshes[0].getHierarchyBoundingVectors();
        // // console.log(min_max);
        // var min = min_max.min;
        // var max = min_max.max;
        
        const size = max.subtract(min);
        const boundingInfo = new BABYLON.BoundingInfo(min,max);
        const bbCenterWorld = boundingInfo.boundingBox.centerWorld;

        player.mesh.scaling.copyFrom(size);
        player.mesh.position.copyFrom(bbCenterWorld);
        
        console.log("Width: ", size.x);
        console.log("Height: ", size.y);
        console.log("Depth: ", size.z);
        console.log("min: ", min);
        console.log("max: ", max);
        console.log("center: ", bbCenterWorld);
    }); */
    player.mesh.position.y = (player.height + platformHeight)/2.0;
    player.mesh.checkCollisions = true;
    camera.lockedTarget = player.mesh;

    return scene;
}

var scene = createScene();