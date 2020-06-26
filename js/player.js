// Init player object
var player = {
    mesh: null,
    sword: null,
    boundingBox: null,
    velocity: new BABYLON.Vector3(0, 0, 0),
    acceleration: new BABYLON.Vector3(0, 0, 0),
    canJump: true,
    animations: [],
    startJumpAnimation: null,
    height: 2,
};