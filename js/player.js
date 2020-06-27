// Init player object
var player = {
    mesh: null,
    position: new BABYLON.Vector3(0, 0, 0),
    rootNode: null,
    sword: null,
    width: 2.8,
    height: 4,
    depth: 2.8,
    velocity: new BABYLON.Vector3(0, 0, 0),
    acceleration: new BABYLON.Vector3(0, 0, 0),
    canJump: true,
    animations: [],
    startJumpAnimation: null,
    goLeftAnimation: null,
    goRightAnimation: null,
    idleAnimation: null,
    initializeMeshes: function(newMeshes) {
        player.rootNode = newMeshes[0];
        player.rootNode.parent = player.mesh;
        player.rootNode.scaling = new BABYLON.Vector3(1.5*player.width, 1.15*player.height, 1.5*player.depth);
        player.rootNode.position.y -= player.height/2;
    }
};

function deg2rad(deg) {
    return deg * Math.PI/180;
}