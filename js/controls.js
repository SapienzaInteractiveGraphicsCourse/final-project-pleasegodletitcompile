// Object that saves the keyboard events
var inputKeys = {};

var ResetA = true;
var ResetD = true;
var buttonA = false;
var buttonD = false;
var ice = false;
var fire = false;
var walk;
var run;

var fireIsOn = false;
var fireIsOn2 = false;
var coinIsOn = false;
var coinIsOn2 = false;
var coinIsOn3 = false;
var particles4;
var allCoinsCollected = false;


var jumpsound = new BABYLON.Sound("jumpsound", "../sounds/hollow.wav", scene, {volume:0.5});

//var runsound = new BABYLON.Sound("runsound", "../sounds/net.wav", scene, {volume:0.8, });

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
    checkPortal();
    // Jump and gravity falling 
    isGrounded();

    if(timeCoin > 1){
        particles4.stop();
        if(timeCoin >3){
            particles4.dispose();
        }
    }
    if(timeCoin2 > 1){
        particles5.stop();
        if(timeCoin2 >3){
            particles5.dispose();
        }
    }
    if(timeCoin3 > 1){
        particles10.stop();
        if(timeCoin3 >3){
            particles10.dispose();
        }
    }
    
    // Idle
    if ((inputKeys["a"] && inputKeys["d"]) || (inputKeys["A"] && inputKeys["D"])) {
        buttonA = true;
        buttonD = true;
        player.walking = false;
        if (ResetA || ResetD) {
            player.rotateIdleAnimation();
            ResetA = false;
            ResetD = false;
        }
        player.position.x = 0;
        player.acceleration.x = 0;
    }
    // Run left
    else if ((inputKeys["a"] && inputKeys["p"]) || (inputKeys["A"] && inputKeys["P"])) {
        player.walking = true;
        buttonA = true;
        if(ResetA == true){
            player.rotateLeftAnimation();
            timeWalk = 1;
            ResetA = false;
        }
        player.acceleration.x -= run;
        player.acceleration.x = Math.max(player.acceleration.x, -0.3);
        player.position.x = Math.max(0.5 * player.acceleration.x * ((timeWalk) ** 2), -0.6); 
    }
    // Run right
    else if ((inputKeys["d"] && inputKeys["p"]) || (inputKeys["D"] && inputKeys["P"])) {
        player.walking = true;
        buttonD = true;
        if(ResetD == true){
            player.rotateRightAnimation();
            timeWalk = 1;
            ResetD = false;
        }
        player.acceleration.x += run;
        player.acceleration.x = Math.min(player.acceleration.x, +0.3);
        player.position.x = Math.min(0.5 * player.acceleration.x * ((timeWalk) ** 2), 0.6);
    }
    // Walk left
    else if ((inputKeys["a"]) || (inputKeys["A"])) {
        player.walking = true;
        buttonA = true;
        if(ResetA == true){
            player.rotateLeftAnimation();
            timeWalk = 1;
            ResetA = false;
        }
        player.acceleration.x -= walk;
        player.acceleration.x = Math.max(player.acceleration.x, -0.3)
        player.position.x = Math.max(0.5 * player.acceleration.x * ((timeWalk) ** 2), -0.3); 
    }
    // Walk right
    else if ((inputKeys["d"]) || (inputKeys["D"])) {
        player.walking = true;
        buttonD = true;
        if(ResetD == true){
            player.rotateRightAnimation();
            timeWalk = 1;
            ResetD = false;
        }
        player.acceleration.x += walk;
        player.acceleration.x = Math.min(player.acceleration.x, 0.3)
        player.position.x = Math.min(0.5 * player.acceleration.x * ((timeWalk) ** 2), 0.3); 
    }

    if(player.grounded == false){
        player.acceleration.y += gravity;
    }

    if (inputKeys[" "] && player.grounded) {
        dmg = false;
        player.grounded = false;
        timeJump = 1;
        player.acceleration.y = 2.2 + gravity;
        player.position.y = 0;
        jumpsound.play();
    };

    if(player.grounded == true){
        timeJump = 0;
        player.position.y = 0;
    }

    checkSbattiTesta();
    player.position.y = (0.5 * player.acceleration.y * ((timeJump)));

    player.mesh.moveWithCollisions(new BABYLON.Vector3(player.position.x, player.position.y , 0));

    // Only for developing
    if (inputKeys["e"]) {
        checkpoint.copyFrom(player.mesh.position);
        timeWalk = 0;
        player.position.x = 0;
        player.acceleration.x = 0;
        console.log(player.mesh.position);
    }
    if (inputKeys["r"]) {
        player.lives = 3;
        console.log(player.lives);
    }
    checkFront();
});

 // Reset the acceleration for walking in case the button is released
window.addEventListener("keyup", handleKeyUp, false);

    function handleKeyUp(evt) {
        if (evt.keyCode == 65) { //A
            buttonA = false;
            timeSlide = Math.min(timeWalk, 1.2);
            ResetA = true;
            player.walking = false;
            if(ice == true){
                player.position.x = Math.max(0.5 * player.acceleration.x * ((timeSlide) ** 2), -0.3);
            }
            else{
                player.position.x = 0;
                player.acceleration.x = 0;
            }
            if(buttonA == false && buttonD == false){
                player.rotateIdleAnimation();
            }
            else if (buttonD == true) {
                player.rotateRightAnimation();
            }
        }

        if (evt.keyCode == 68) { //D
            buttonD = false;
            timeSlide = Math.min(timeWalk, 1.2);
            ResetD = true;
            player.walking = false;
            if(ice == true){
                player.position.x = Math.min(0.5 * player.acceleration.x * ((timeSlide) ** 2), 0.3);
            }
            else{
                player.position.x = 0;
                player.acceleration.x = 0;
            }
            
            if(buttonA == false && buttonD == false){
                player.rotateIdleAnimation();
            }
            else if (buttonA == true) {
                player.rotateLeftAnimation();
            }
        }
    }


// Check if the player is touching the ground + go to check the material
function isGrounded() {
    player.grounded = false;
    var groundPoint = new BABYLON.Vector3(player.mesh.position.x, player.mesh.position.y - player.height/2 - 0.1, player.mesh.position.z);
    var groundPoint2 = new BABYLON.Vector3(player.mesh.position.x+0.2, player.mesh.position.y - player.height/2 - 0.1, player.mesh.position.z);
    var groundPoint3 = new BABYLON.Vector3(player.mesh.position.x-0.2, player.mesh.position.y - player.height/2 - 0.1, player.mesh.position.z);
    var intersectLine = new BABYLON.MeshBuilder.CreateLines("intersectLine", {points: [player.mesh.position, groundPoint]}, scene);
    var intersectLine2 = new BABYLON.MeshBuilder.CreateLines("intersectLine", {points: [player.mesh.position, groundPoint2]}, scene);
    var intersectLine3 = new BABYLON.MeshBuilder.CreateLines("intersectLine", {points: [player.mesh.position, groundPoint3]}, scene);
    for (obj of groundObjects) {
        if (intersectLine.intersectsMesh(obj, false) || intersectLine2.intersectsMesh(obj, false) || intersectLine3.intersectsMesh(obj, false)) {
            checkMaterial(obj);
        }
    }
    intersectLine.dispose();
    intersectLine2.dispose();
    intersectLine3.dispose();
}

// Check if the player is sbatting the testa
function checkSbattiTesta() {
    player.grounded = false;
    var headPoint = new BABYLON.Vector3(player.mesh.position.x, player.mesh.position.y + player.height/2 + 0.1, player.mesh.position.z);
    var intersectLine = new BABYLON.MeshBuilder.CreateLines("intersectLine", {points: [player.mesh.position, headPoint]}, scene);
    for (obj of groundObjects) {
        if (intersectLine.intersectsMesh(obj, false) && (obj.material.id == "multiIce" || obj.material.id == "multiGround" || obj.material.id == "multiGrass")) {
            player.acceleration.y = gravity;
        }
    }
    intersectLine.dispose();
}

function checkFront() {
    var halfPoint = new BABYLON.Vector3(player.mesh.position.x-1.5, player.mesh.position.y, player.mesh.position.z);
    var halfPoint2 = new BABYLON.Vector3(player.mesh.position.x+1.5, player.mesh.position.y, player.mesh.position.z);
    var intersectLine2 = new BABYLON.MeshBuilder.CreateLines("intersectLine2", {points: [player.mesh.position, halfPoint]}, scene);
    var intersectLine3 = new BABYLON.MeshBuilder.CreateLines("intersectLine3", {points: [player.mesh.position, halfPoint2]}, scene);
    for (obj of groundObjects) {
        if (intersectLine2.intersectsMesh(obj, false) || intersectLine3.intersectsMesh(obj, false)) {
            checkMaterial(obj, false);
        }
    }
    intersectLine2.dispose();
    intersectLine3.dispose();
}

// Manage the velocities, it might not be elegant, but works for sure!
function checkMaterial(obj, resetDmg = true) {
    if(obj.material.id == "fireM"){
        if(resetDmg) dmg = false;
        if(obj.id == "fireBox" && fireIsOn == false){
            fireON();  
        }
        if(obj.id == "fireBox2" && fireIsOn2 == false){
            fireON2();  
        }
    }
    if(obj.id == "coinBox" && coinIsOn == false){
        if(resetDmg) dmg = false;
        coinON();
        player.coins++;
        updateCoins();
    }
    if(obj.id == "coinBox2" && coinIsOn2 == false){
        if(resetDmg) dmg = false;
        coinON2();
        player.coins++;
        updateCoins();
    }
    if(obj.id == "coinBox3" && coinIsOn3 == false){
        if(resetDmg) dmg = false;
        coinON3();
        player.coins++;
        updateCoins();
    }
    if(obj.material.id == "spikesM"){
        player.grounded = true;
        trapActive(obj.id);
        if(dmg == false){
            player.lives--;
            updateHealth();
            dmg = true;
        }
    }
    if(obj.id == "portalBox" && allCoinsCollected == true && endGame == false){
        endLevel();
        inputKeys = {};
        scene.actionManager = null;
        player.position.x = 0;
    }
    if(obj.material.id == "multiIce"){
        player.grounded = true;
        if(resetDmg) dmg = false;
        ice = true;
        walk = 0.01;
        run = 0.015;
    }
    else if(obj.material.id == "multiGround"){
        player.grounded = true;
        if(resetDmg) dmg = false;
        ice = false;
        walk = 0.03;
        run = 0.06;
    }
}

function checkPortal(){
    if(player.coins == 3 && allCoinsCollected == false){
        portalON();
        allCoinsCollected = true;
    }
}