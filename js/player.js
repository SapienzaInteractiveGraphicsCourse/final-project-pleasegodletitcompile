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
};