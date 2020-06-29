// Init player object
var player = {
    mesh: null,
    rootNode: null,
    position: new BABYLON.Vector3(0, 0, 0),
    body: {
        chest: null,
        upper_arm_R: null,
        upper_arm_L: null,
        thigh_R: null,
        thigh_L: null
    },
    width: 2.8,
    height: 4,
    depth: 2.8,
    velocity: new BABYLON.Vector3(0, 0, 0),
    acceleration: new BABYLON.Vector3(0, 0, 0),
    canJump: true,
    animations: [],
    startJumpAnimation: null,
    rotateLeftAnimation: null,
    rotateRightAnimation: null, 
    rotateIdleAnimation: null,
    initializeRoot: function(newMesh) {
        player.rootNode = newMesh;
        player.rootNode.parent = player.mesh;
        player.rootNode.scaling = new BABYLON.Vector3(-1.5*player.width, 1.15*player.height, 1.5*player.depth);
        player.rootNode.position.y -= player.height/2;
        player.rootNode.rotate(new BABYLON.Vector3(0,1,0), deg2rad(-25));
    },
    initializeSkeleton: function() {
        player.body.chest = scene.getTransformNodeByID("Chest");
        player.body.upper_arm_R = scene.getTransformNodeByID("upper_arm.R");
        player.body.upper_arm_L = scene.getTransformNodeByID("upper_arm.L");
        player.body.thigh_R = scene.getTransformNodeByID("thigh.R");
        player.body.thigh_L = scene.getTransformNodeByID("thigh.L");
    }
};

function deg2rad(deg) {
    return deg * Math.PI/180;
}