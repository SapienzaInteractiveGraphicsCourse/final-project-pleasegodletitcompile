// Object that saves the keyboard events
var inputKeys = {};

var ResetA = true;
var ResetD = true;

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
        if(ResetA == true){
            timeWalk = 0;
            ResetA = false;
        }        
        player.acceleration.x -= 0.01
        player.mesh.moveWithCollisions(new BABYLON.Vector3(Math.max(player.acceleration.x*timeWalk, -0.3),0,0));
    }

    if ((inputKeys["d"] || inputKeys["D"])) {
        if(ResetD == true){
            timeWalk = 0;
            ResetD = false;
        }        
        player.acceleration.x += 0.01
        player.mesh.moveWithCollisions(new BABYLON.Vector3(Math.min(player.acceleration.x*timeWalk, 0.3),0,0));
    }

    if ((inputKeys["d"] && inputKeys["a"])) {
        timeWalk = 0;
        player.mesh.moveWithCollisions(new BABYLON.Vector3(0,0,0));
    }

    checkCanJump();
    if (inputKeys[" "] && player.canJump ) {  
        player.canJump = false;
        player.startJumpAnimation();
    }

});

//Reset the acceleration in case the button is released
window.addEventListener("keyup", handleKeyUp, false);
function handleKeyUp(evt) {
    if (evt.keyCode == 65) {
        player.acceleration.x = 0;
        time = 0;
        ResetA = true;
        
    }
    if (evt.keyCode == 68) {
        player.acceleration.x = 0;
        ResetD = true;
    }
    if (evt.keyCode == 32) {
        
    }
}

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