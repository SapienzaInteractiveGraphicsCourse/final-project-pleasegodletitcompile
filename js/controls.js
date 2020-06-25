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

// Move sphere
scene.registerAfterRender(function () {

    if ((inputKeys["a"] || inputKeys["A"])) {
        // sphere.position.x -= 0.1;
        player.mesh.moveWithCollisions(new BABYLON.Vector3(-0.1,gravity,0));
    }

    if ((inputKeys["d"] || inputKeys["D"])) {
        // sphere.position.x += 0.1;
        player.mesh.moveWithCollisions(new BABYLON.Vector3(0.1,gravity,0));
    }

    /* if (inputKeys[" "] && canJump ) {
        canJump = false;
        verticalSpeed += 1;
        player.mesh.jump();
    } */

});