// Object that saves the keyboard events
var inputKeys = {};

var ResetA = true;
var ResetD = true;
var buttonA = false;
var buttonD = false;
var ice = false;
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
        buttonA = true;
        if(ResetA == true){
            timeWalk =1;
            player.rotateLeftAnimation();
            player.walkAnimation();
            ResetA = false;
        }
        player.acceleration.x -= walk;
        player.position.x = Math.max(0.5 * player.acceleration.x * ((timeWalk) ** 2), -0.3); 
    }

    if ((inputKeys["a"] && inputKeys["p"])) {
        if(ResetA == true){
            timeWalk = 1;
            ResetA = false;
        }
        player.acceleration.x -= run;
        player.position.x = Math.max(0.5 * player.acceleration.x * ((timeWalk) ** 2), -0.6); 
    }

    // Walk right
    if ((inputKeys["d"])) {
        buttonD = true;
        if(ResetD == true){
            timeWalk = 1;
            player.rotateRightAnimation();
            player.walkAnimation();
            ResetD = false;
        }        
        player.acceleration.x += walk;
        player.position.x = Math.min(0.5 * player.acceleration.x * ((timeWalk) ** 2), 0.3); 
    }

    if ((inputKeys["d"] && inputKeys["p"])) {
        if(ResetD == true){
            timeWalk = 1;
            ResetD = false;
        }
        player.acceleration.x += run;
        player.position.x = Math.min(0.5 * player.acceleration.x * ((timeWalk) ** 2), 0.6);
    }

        
    if ((inputKeys["d"] && inputKeys["a"])) {
        timeWalk = 1;
        player.position.x = 0;
        player.acceleration.x = 0;
        player.rotateIdleAnimation();
    }

    // Jump and gravity falling 
    checkCanJump();

    if(player.canJump == false){
        player.acceleration.y += gravity;
        walk = 0.03;
        run = 0.06;
    }

    if (inputKeys[" "] && player.canJump) {
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

    player.mesh.moveWithCollisions(new BABYLON.Vector3(player.position.x, player.position.y , 0));

});

 // Reset the acceleration for walking in case the button is released
window.addEventListener("keyup", handleKeyUp, false);
//window.addEventListener("keydown", handleKeyDown, false);

    function handleKeyUp(evt) {
        if (evt.keyCode == 65) {
            buttonA = false;
            timeSlide = Math.min(timeWalk, 2);
            ResetA = true;
            if(ice == true){
                player.acceleration.x -= walk;
                player.position.x = Math.max(0.5 * player.acceleration.x * ((timeSlide) ** 2), -0.6);
            }
            else{
                player.position.x = 0;
                player.acceleration.x = 0;
            }
            if(buttonA == false && buttonD == false){
                player.rotateIdleAnimation();
            }
            
        
        }

        if (evt.keyCode == 68) {
            buttonD = false;
            timeSlide = Math.min(timeWalk, 2);
            ResetD = true;
            if(ice == true){
                player.acceleration.x += walk;
                player.position.x = Math.min(0.5 * player.acceleration.x * ((timeSlide) ** 2), 0.6);
            }
            else{
                player.position.x = 0;
                player.acceleration.x = 0;
            }
            
            if(buttonA == false && buttonD == false){
                player.rotateIdleAnimation();
            }
        
        }
    }


// Check if the player is touching the ground + go to check the material
function checkCanJump() {
    player.canJump = false;
    var groundPoint = new BABYLON.Vector3(player.mesh.position.x, player.mesh.position.y - player.height/2 - 0.1, player.mesh.position.z);
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
    var headPoint = new BABYLON.Vector3(player.mesh.position.x, player.mesh.position.y + player.height/2 + 0.1, player.mesh.position.z);
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
        ice = true;
        walk = 0.001;
        run = 0.002;
    }
    else{
        ice = false;
        walk = 0.03;
        run = 0.06;
    }
}