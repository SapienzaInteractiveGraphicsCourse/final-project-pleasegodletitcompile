// Object that saves the keyboard events
var inputKeys = {};

var ResetA = true;
var ResetD = true;
var Jump = false;
var check = false;
var strength = 10;

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
            timeWalk = 1;
            ResetA = false;
        }        
        player.acceleration.x -= 0.03
        player.mesh.moveWithCollisions(new BABYLON.Vector3(Math.max(player.acceleration.x*(timeWalk**2), -0.3),0,0));
    }

    if ((inputKeys["d"] || inputKeys["D"])) {
        if(ResetD == true){
            timeWalk = 1;
            ResetD = false;
        }        
        player.acceleration.x += 0.03
        player.mesh.moveWithCollisions(new BABYLON.Vector3(Math.min(player.acceleration.x*(timeWalk**2), 0.3),0,0));
    }

    if ((inputKeys["d"] && inputKeys["a"])) {
        timeWalk = 0;
        player.mesh.moveWithCollisions(new BABYLON.Vector3(0,0,0));
    }

    checkCanJump();

    if(player.canJump == false){
        player.acceleration.y += gravity;
    }
    
    if (inputKeys[" "] && player.canJump) {
        Jump = true;
        player.canJump = false;
        timeJump = 1;
        player.acceleration.y = 3 + gravity;
        player.position.y = 0;
    };

    if(player.canJump == true){
        timeJump = 0;
        player.position.y = 0;
    }

    checkSbattiTesta();
    player.position.y = (0.5 * player.acceleration.y * ((timeJump) ** 2)); ; 

    player.mesh.moveWithCollisions(new BABYLON.Vector3(0, player.position.y , 0));
});

//Reset the acceleration in case the button is released
window.addEventListener("keyup", handleKeyUp, false);
function handleKeyUp(evt) {
    if (evt.keyCode == 65) {
        player.acceleration.x = 0;
        ResetA = true;
    }

    if (evt.keyCode == 68) {
        player.acceleration.x = 0;
        ResetD = true;
    }
}

// Check if the player is touching the ground
function checkCanJump() {
    player.canJump = false;
    var groundPoint = new BABYLON.Vector3(player.mesh.position.x, player.mesh.position.y - player.height/2 - 0.1, player.mesh.position.z);
    var intersectLine = new BABYLON.MeshBuilder.CreateLines("intersectLine", {points: [player.mesh.position, groundPoint]}, scene);
    for (obj of groundObjects) {
        if (intersectLine.intersectsMesh(obj, false)) {
            player.canJump = true;
        }
    }
    intersectLine.dispose();
}

// Check if the player is sbatting the testa
function checkSbattiTesta() {
    player.canJump = false;
    var headPoint = new BABYLON.Vector3(player.mesh.position.x, player.mesh.position.y + player.height/2 + 0.1, player.mesh.position.z);
    var intersectLine = new BABYLON.MeshBuilder.CreateLines("intersectLine", {points: [player.mesh.position, headPoint]}, scene);
    for (obj of groundObjects) {
        if (intersectLine.intersectsMesh(obj, false)) {
            player.acceleration.y = gravity;
        }
    }
    intersectLine.dispose();
}