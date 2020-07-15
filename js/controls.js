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
    // Jump and gravity falling 
    isGrounded();
    
    // Walk left
    if ((inputKeys["a"])) {
        
        buttonA = true;
        if(ResetA == true){
            timeWalk =1;
            //player.position.x = 0;
            //player.acceleration.x = 0;
            player.rotateLeftAnimation();
            player.walking = true;
            ResetA = false;
        }
        player.acceleration.x -= walk;
        player.acceleration.x = Math.max(player.acceleration.x, -0.3)
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
            //player.position.x = 0;
            //player.acceleration.x = 0;
            player.rotateRightAnimation();
            player.walking = true;
            ResetD = false;
        }
        player.acceleration.x += walk;
        player.acceleration.x = Math.min(player.acceleration.x, 0.3)
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

    if(player.grounded == false){
        player.acceleration.y += gravity;
        //walk = 0.03;
        //run = 0.03;
    }

    if (inputKeys[" "] && player.grounded) {
        player.grounded = false;
        timeJump = 1;
        player.acceleration.y = 2 + gravity;
        player.position.y = 0;
        jumpsound.play();
    };

    if(player.grounded == true){
        timeJump = 0;
        player.position.y = 0;
    }

    checkSbattiTesta();
    player.position.y = (0.5 * player.acceleration.y * ((timeJump) ** 2));

    player.mesh.moveWithCollisions(new BABYLON.Vector3(player.position.x, player.position.y , 0));

    // Only for developing
    if (inputKeys["e"]) {
        checkpoint.copyFrom(player.mesh.position);
        timeWalk = 0;
        player.position.x = 0;
        player.acceleration.x = 0;
        console.log(player.mesh.position);
    }
});

 // Reset the acceleration for walking in case the button is released
window.addEventListener("keyup", handleKeyUp, false);
//window.addEventListener("keydown", handleKeyDown, false);

    function handleKeyUp(evt) {
        if (evt.keyCode == 65) { //A
            buttonA = false;
            timeSlide = Math.min(timeWalk, 1.2);
            ResetA = true;
            player.walking = false;
            //player.rotateIdleAnimation();
            if(ice == true){
                //player.acceleration.x -= walk;
                player.position.x = Math.max(0.5 * player.acceleration.x * ((timeSlide) ** 2), -0.3);
            }
            else{
                player.position.x = 0;
                player.acceleration.x = 0;
            }
            if(buttonA == false && buttonD == false){
                player.rotateIdleAnimation();
            }
            /*
            if(buttonA == false && buttonD == true){
                player.rotateRightAnimation();
            }
            */
        }

        if (evt.keyCode == 68) { //D
            buttonD = false;
            timeSlide = Math.min(timeWalk, 1.2);
            ResetD = true;
            player.walking = false;
            //player.rotateIdleAnimation();
            if(ice == true){
                //player.acceleration.x += walk;
                player.position.x = Math.min(0.5 * player.acceleration.x * ((timeSlide) ** 2), 0.3);
            }
            else{
                player.position.x = 0;
                player.acceleration.x = 0;
            }
            
            if(buttonA == false && buttonD == false){
                player.rotateIdleAnimation();
            }
            /*
            if(buttonA == true && buttonD == false){
                player.rotateLeftAnimation();
            }
            */
        }
    }


// Check if the player is touching the ground + go to check the material
function isGrounded() {
    player.grounded = false;
    var groundPoint = new BABYLON.Vector3(player.mesh.position.x, player.mesh.position.y - player.height/2 - 0.1, player.mesh.position.z);
    var intersectLine = new BABYLON.MeshBuilder.CreateLines("intersectLine", {points: [player.mesh.position, groundPoint]}, scene);
    for (obj of groundObjects) {
        if (intersectLine.intersectsMesh(obj, false)) {
            player.grounded = true;
            checkMaterial(obj);
        }
    }
    intersectLine.dispose();
}

// Check if the player is sbatting the testa
function checkSbattiTesta() {
    player.grounded = false;
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
    if(obj.material.id == "fireM"){
        fireON();
    }
    if(obj.material.id == "multiIce"){
        ice = true;
        walk = 0.01;
        run = 0.015;
    }
    else if(obj.material.id == "multiSnow"){
        ice = false;
        walk = 0.03;
        run = 0.06;
    }
}

function fireON(){
    checkpoint = new BABYLON.Vector3(-12,-14,0);
    //Particles system Fire
    var particles2 = new BABYLON.GPUParticleSystem("particles2", 10000, scene);
    //Texture of each particle
    particles2.particleTexture = new BABYLON.Texture("../textures/fireParticle.png", scene);
    //particles2.translationPivot = new BABYLON.Vector3(0, 0,0);
    //Where the particles come from
    
    particles2.emitter = new BABYLON.Vector3(-12, -19.1, 0);
    
    
    particles2.minEmitBox = new BABYLON.Vector3(-0.5, 0, 0); // Starting all from
    particles2.maxEmitBox = new BABYLON.Vector3(0.5, 0, 0); // To...

    // Colors of all particles
    particles2.color1 = new BABYLON.Color4(1, 0, 0, 1.0);
    particles2.color2 = new BABYLON.Color4(1, 1, 0, 1.0);
    particles2.colorDead = new BABYLON.Color4(1, 0, 0, 0.0);

    // Size of each particle (random between...
    particles2.minSize = 0.1;
    particles2.maxSize = 0.5;

    // Life time of each particle (random between...
    particles2.minLifeTime = 0.05;
    particles2.maxLifeTime = 0.1;

    // Emission rate
    particles2.emitRate = 600;

    window.ps = particles2;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particles2.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particles2.gravity = new BABYLON.Vector3(0, 0, -2);

    // Direction of each particle after it has been emitted
    particles2.direction1 = new BABYLON.Vector3(0.2, 1, 0.2);
    particles2.direction2 = new BABYLON.Vector3(-0.2, 1, -0.2);
    

    // Angular speed, in radians
    particles2.minAngularSpeed = 0;
    particles2.maxAngularSpeed = Math.PI;

    // Speed
    particles2.minEmitPower = .01;
    particles2.maxEmitPower = 30;

    // Start the particle system
    particles2.start();

}
