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
scene.registerAfterRender(function () {
    // checkCanJump();

    if ((inputKeys["a"] || inputKeys["A"])) {
        player.mesh.moveWithCollisions(new BABYLON.Vector3(-0.1,gravity,0));
    }

    if ((inputKeys["d"] || inputKeys["D"])) {
        player.mesh.moveWithCollisions(new BABYLON.Vector3(0.1,gravity,0));
    }

    if (inputKeys[" "] && player.canJump ) {
        console.log(player.canJump);
        player.canJump = false;
        player.startJumpAnimation();
    }

});

// Check if the player it touching the ground
// TODO: check for every ground
function checkCanJump() {
    player.canJump = player.mesh.intersectsMesh(scene.getMeshByName("platform1"), false);
}