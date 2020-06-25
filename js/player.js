// Init player object
var player = {
    mesh: null,
    verticalSpeed: 0,
    movementSpeed: 100,
    canJump: true,
    animations: [],
    startJumpAnimation: null,
    height: 2,
    checkpoint: new BABYLON.Vector3(0, 2, 0)
};