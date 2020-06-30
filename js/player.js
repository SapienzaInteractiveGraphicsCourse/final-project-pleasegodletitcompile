// Init player object
var player = {
    mesh: null,
    rootNode: null,
    body: {
        chest: null,
        upper_arm_R: null,
        upper_arm_L: null,
        thigh_R: null,
        thigh_L: null
    },
    width: 2,
    height: 4.5,
    depth: 2,
    position: new BABYLON.Vector3(0, 0, 0),
    velocity: new BABYLON.Vector3(0, 0, 0),
    acceleration: new BABYLON.Vector3(0, 0, 0),
    grounded: true,
    rotateLeftAnimation: null,
    rotateRightAnimation: null, 
    rotateIdleAnimation: null,
    walking: false,
    loadingComplete: false,
    initializeRoot: function(newMesh) {
        player.rootNode = newMesh;
        player.rootNode.parent = player.mesh;
        player.rootNode.scaling = new BABYLON.Vector3(-2*player.width, player.height, 2*player.depth);
        player.rootNode.position.y -= 1.95;
        player.rootNode.rotate(new BABYLON.Vector3(0,1,0), deg2rad(-30));
    },
    initializeBody: function() {
        player.body.chest = scene.getTransformNodeByID("Chest");
        player.body.upper_arm_R = scene.getTransformNodeByID("upper_arm.R");
        player.body.upper_arm_L = scene.getTransformNodeByID("upper_arm.L");
        player.body.thigh_R = scene.getTransformNodeByID("thigh.R");
        player.body.thigh_L = scene.getTransformNodeByID("thigh.L");

        player.body.upper_arm_R.rotation = new BABYLON.Vector3(deg2rad(340), deg2rad(90), deg2rad(270));
        player.body.upper_arm_L.rotation = new BABYLON.Vector3(deg2rad(180), deg2rad(90), deg2rad(270));
    },
    initializeAnimations: function() {
        walkAnimation();
    }
};

function deg2rad(deg) {
    return deg * Math.PI/180;
}