// Object that saves the keyboard events
var inputKeys = {};

var ResetA = true;
var ResetD = true;
var Jump = false;
var check = false;
var strength = 10;
var walk;
var run;

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

    // Walk left
    if ((inputKeys["a"])) {
        if(ResetA == true){
            timeWalk = 0.1;
            ResetA = false;
        }
        player.acceleration.x -= walk;
        player.position.x = Math.max(0.5 * player.acceleration.x * ((timeWalk) ** 2), -0.3); 
    }

    if ((inputKeys["a"] && inputKeys["Shift"])) {
        if(ResetA == true){
            timeWalk = 0.1;
            ResetA = false;
        }
        player.acceleration.x -= run;
        player.position.x = Math.max(0.5 * player.acceleration.x * ((timeWalk) ** 2), -0.6); 
    }

    // Walk right
    if ((inputKeys["d"])) {
        if(ResetD == true){
            timeWalk = 0.1;
            ResetD = false;
            player.goRightAnimation();
        }        
        player.acceleration.x += walk;
        player.position.x = Math.min(0.5 * player.acceleration.x * ((timeWalk) ** 2), 0.3); 
    }

    if ((inputKeys["d"] && inputKeys["Shift"])) {
        if(ResetD == true){
            timeWalk = 0.1;
            ResetD = false;
        }
        player.acceleration.x += run;
        player.position.x = Math.min(0.5 * player.acceleration.x * ((timeWalk) ** 2), 0.6); 
    }

        
    if ((inputKeys["d"] && inputKeys["a"])) {
        timeWalk = 0;
        player.position.x = 0;
        player.acceleration.x = 0;
    }

    // Jump and gravity falling
    checkCanJump();
    
    if(player.canJump == false){
        player.acceleration.y += gravity;
    }
    
    if (inputKeys[" "] && player.canJump) {
        Jump = true;
        player.canJump = false;
        timeJump = 1;
        player.acceleration.y = 2 + gravity;
        player.position.y = 0;
    };

    if(player.canJump == true){
        timeJump = 0;
        player.position.y = 0;
    }

    checkSbattiTesta();
    player.position.y = (0.5 * player.acceleration.y * ((timeJump) ** 2)); 

    

//Reset the acceleration in case the button is released
window.addEventListener("keyup", handleKeyUp, false);
function handleKeyUp(evt) {
    if (evt.keyCode == 65) {
        player.position.x = 0;
        player.acceleration.x = 0;
        ResetA = true;
        player.idleAnimation();
    }

    if (evt.keyCode == 68) {
        player.position.x = 0;
        player.acceleration.x = 0;
        ResetD = true;
        player.idleAnimation();

    }

    player.mesh.moveWithCollisions(new BABYLON.Vector3(player.position.x, player.position.y , 0));
    
});



// Check if the player is touching the ground
function checkCanJump() {
    player.canJump = false;
    var groundPoint = new BABYLON.Vector3(player.mesh.position.x, player.mesh.position.y - player.height/2 - 0.01, player.mesh.position.z);
    var intersectLine = new BABYLON.MeshBuilder.CreateLines("intersectLine", {points: [player.mesh.position, groundPoint]}, scene);
    for (obj of groundObjects) {
        if (intersectLine.intersectsMesh(obj, false)) {
            player.canJump = true;
            checkMaterial(obj);
        }
    }
    intersectLine.dispose();
}

// Check if the player is sbatting the testa
function checkSbattiTesta() {
    player.canJump = false;
    var headPoint = new BABYLON.Vector3(player.mesh.position.x, player.mesh.position.y + player.height/2 + 0.01, player.mesh.position.z);
    var intersectLine = new BABYLON.MeshBuilder.CreateLines("intersectLine", {points: [player.mesh.position, headPoint]}, scene);
    for (obj of groundObjects) {
        if (intersectLine.intersectsMesh(obj, false)) {
            player.acceleration.y = gravity;
        }
    }
    intersectLine.dispose();
}

// Manage the velocities, it might not be elegant, but works for sure!
function checkMaterial(obj) {
    if(obj.material.id == "ice"){
        walk = 0.001;
        run = 0.002;
    }
    else{
        walk = 0.03;
        run = 0.06;
    }
}