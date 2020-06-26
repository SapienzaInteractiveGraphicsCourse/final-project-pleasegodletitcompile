// Init player object
var player = {
    mesh: null,
    sword: null,
    width: 1,
    height: 1,
    depth: 1,
    velocity: new BABYLON.Vector3(0, 0, 0),
    acceleration: new BABYLON.Vector3(0, 0, 0),
    canJump: true,
    animations: [],
    startJumpAnimation: null,
};