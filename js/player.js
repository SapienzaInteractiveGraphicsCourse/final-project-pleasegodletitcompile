// Init player object
var player = {
    mesh: null,
    position: new BABYLON.Vector3(0, 0, 0),
    velocity: new BABYLON.Vector3(0, 0, 0),
    acceleration: new BABYLON.Vector3(0, 0, 0),
    canJump: true,
    animations: [],
    startJumpAnimation: null,
    height: 2,
    checkpoint: new BABYLON.Vector3(0, 2, 0)
};