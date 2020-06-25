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
    checkCanJump();
    console.log(player.canJump);

    if ((inputKeys["a"] || inputKeys["A"])) {
        player.mesh.moveWithCollisions(new BABYLON.Vector3(-0.1,gravity,0));
    }

    if ((inputKeys["d"] || inputKeys["D"])) {
        player.mesh.moveWithCollisions(new BABYLON.Vector3(0.1,gravity,0));
    }

    if (inputKeys[" "] && player.canJump ) {
        player.canJump = false;
        player.startJumpAnimation();
    }

});

// Check if the player it touching the ground
// TODO: do the intersect check with in a for with a list of "ground" objects
function checkCanJump() {
    var groundPoint = new BABYLON.Vector3(player.mesh.position.x, player.mesh.position.y - player.height/2 -0.5, player.mesh.position.z);
    var intersectLine = new BABYLON.MeshBuilder.CreateLines("intersectLine", {points: [player.mesh.position, groundPoint]}, scene);
    player.canJump = intersectLine.intersectsMesh(scene.getMeshByName("platform1"), false)
                || intersectLine.intersectsMesh(scene.getMeshByName("platform2"), false)
                || intersectLine.intersectsMesh(scene.getMeshByName("platform3"), false);
    intersectLine.dispose();
}