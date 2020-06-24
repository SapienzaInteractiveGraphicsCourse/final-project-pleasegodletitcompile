// Object that saves the key events
var keys = {};

scene.actionManager = new BABYLON.ActionManager(scene);

// Set the key to true on keyDown
scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (event) {
    keys[event.sourceEvent.key] = event.sourceEvent.type == "keydown"; 

}));

// Set the key to false ok keyUp
scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (event) {
    keys[event.sourceEvent.key] = event.sourceEvent.type == "keydown";
}));

// Move sphere
scene.registerAfterRender(function () {

    if ((keys["a"] || keys["A"])) {
        sphere.position.x -= 0.1;
    }

    if ((keys["d"] || keys["D"])) {
        sphere.position.x += 0.1;
    }

    if (keys[" "] && canJump ) {
        canJump = false;
        velocity += 1;
    }

});