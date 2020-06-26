// Init player object
var player = {
    mesh: null,
    rootNode: null,
    sword: null,
    width: 2,
    height: 2,
    depth: 2,
    velocity: new BABYLON.Vector3(0, 0, 0),
    acceleration: new BABYLON.Vector3(0, 0, 0),
    canJump: true,
    animations: [],
    startJumpAnimation: null,
    initializeMeshes: function(newMeshes) {
        player.rootNode = newMeshes[0];
        player.rootNode.parent = player.mesh;
        player.rootNode.scaling = new BABYLON.Vector3(1.15*player.width, 1.15*player.height, 1.15*player.depth);
        player.rootNode.position.y -= player.height/2;
    }
};