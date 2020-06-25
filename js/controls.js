// Object that saves the keyboard events
var inputKeys = {};

scene.actionManager = new BABYLON.ActionManager(scene);

// Set the key to true on keyDown
scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (event) {
    inputKeys[event.sourceEvent.key] = event.sourceEvent.type == "keydown"; 

}));

// Set the key to false ok keyUp
scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (event) {
    inputKeys[event.sourceEvent.key] = event.sourceEvent.type == "keydown";
}));

// Move player
// This function is called after every frame render
scene.registerAfterRender(function () {

    if ((inputKeys["a"] || inputKeys["A"])) {
        // player.mesh.moveWithCollisions(new BABYLON.Vector3(-0.1,0,0));
    }

    if ((inputKeys["d"] || inputKeys["D"])) {
        // player.mesh.moveWithCollisions(new BABYLON.Vector3(0.1,0,0));
    }

    checkCanJump();
    if (inputKeys[" "] && player.canJump ) {
        player.canJump = false;
        player.startJumpAnimation();
    }

});

// Check if the player it touching the ground
function checkCanJump() {
    player.canJump = false;
    var groundPoint = new BABYLON.Vector3(player.mesh.position.x, player.mesh.position.y - player.height/2 -0.5, player.mesh.position.z);
    var intersectLine = new BABYLON.MeshBuilder.CreateLines("intersectLine", {points: [player.mesh.position, groundPoint]}, scene);
    for (obj of groundObjects) {
        if (intersectLine.intersectsMesh(obj, false)) {
            player.canJump = true;
        }
    }
    intersectLine.dispose();
}