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
var particles4;

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
    if(timeCoin > 1){
        particles4.stop();
        if(timeCoin >2){
            particles4.dispose();
        }
    }
    if(timeCoin2 > 1){
        if(timeCoin2 >2){
            particles5.dispose();
        }
    }
    
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
    checkFront();
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

function checkFront() {
    var halfPoint = new BABYLON.Vector3(player.mesh.position.x-1, player.mesh.position.y, player.mesh.position.z);
    var halfPoint2 = new BABYLON.Vector3(player.mesh.position.x+1, player.mesh.position.y, player.mesh.position.z);
    var intersectLine2 = new BABYLON.MeshBuilder.CreateLines("intersectLine2", {points: [player.mesh.position, halfPoint]}, scene);
    var intersectLine3 = new BABYLON.MeshBuilder.CreateLines("intersectLine3", {points: [player.mesh.position, halfPoint2]}, scene);
    for (obj of groundObjects) {
        if (intersectLine2.intersectsMesh(obj, false) || intersectLine3.intersectsMesh(obj, false)) {
            checkMaterial(obj);
        }
    }
    intersectLine2.dispose();
    intersectLine3.dispose();
}

// Manage the velocities, it might not be elegant, but works for sure!
function checkMaterial(obj) {
    if(obj.material.id == "fireM"){
        dmg = false
        if(obj.id == "fireBox" && fireIsOn == false){
            fireON();  
        }
        if(obj.id == "fireBox2" && fireIsOn2 == false){
            fireON2();  
        }
    }
    if(obj.id == "coinBox" && coinIsOn == false){
        dmg = false
        coinON();
        player.coins++;
        updateCoins();
    }
    if(obj.id == "coinBox2" && coinIsOn2 == false){
        dmg = false
        coinON2();
    }
    if(obj.material.id == "spikesM"){
        trapON();
        if(dmg == false){
            player.lives--;
            updateHealth();
            dmg = true;
        }
    }
    if(obj.material.id == "multiIce"){
        dmg = false
        ice = true;
        walk = 0.01;
        run = 0.015;
    }
    else if(obj.material.id == "multiSnow" || obj.material.id == "ground"){
        dmg = false
        ice = false;
        walk = 0.03;
        run = 0.06;
    }
    if(obj.material.id == "multiGrass"){ 
        walk = 0.03;
        run = 0.06;
    }

/*
}
function coinON(){
    CoinDisappear();
    coinIsOn = true;
    //Particles system Fire
    particles4 = new BABYLON.GPUParticleSystem("particles4", 10000, scene);
    //Texture of each particle
    particles4.particleTexture = new BABYLON.Texture("../textures/goldparticle.png", scene);
    //particles2.translationPivot = new BABYLON.Vector3(0, 0,0);
    //Where the particles come from
    
    particles4.emitter = new BABYLON.Vector3(-7,-17,0);
    
    
    particles4.minEmitBox = new BABYLON.Vector3(-0.5, 0, 0); // Starting all from
    particles4.maxEmitBox = new BABYLON.Vector3(0.5, 0, 0); // To...

    // Colors of all particles
    particles4.color1 = new BABYLON.Color4(1, 0.84, 0, 1.0);
    particles4.color2 = new BABYLON.Color4(1, 0.84, 0, 1.0);
    particles4.colorDead = new BABYLON.Color4(1, 0.84, 0, 0.0);

    // Size of each particle (random between...
    particles4.minSize = 0.1;
    particles4.maxSize = 0.5;

    // Life time of each particle (random between...
    particles4.minLifeTime = 0.01;
    particles4.maxLifeTime = 0.01;

    // Emission rate
    particles4.emitRate = 100;

    window.ps = particles4;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particles4.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particles4.gravity = new BABYLON.Vector3(0, 0, -2);

    // Direction of each particle after it has been emitted
    particles4.direction1 = new BABYLON.Vector3(1, 1, 0.2);
    particles4.direction2 = new BABYLON.Vector3(-1, 1, -0.2);

    // Angular speed, in radians
    particles4.minAngularSpeed = 0;
    particles4.maxAngularSpeed = Math.PI;

    // Speed
    particles4.minEmitPower = 10;
    particles4.maxEmitPower = 10;

    // Start the particle system
    particles4.start();

}

function fireON(){
    fireIsOn = true;
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

function fireON2(){
    fireIsOn2 = true;
    checkpoint = new BABYLON.Vector3(220,41.1,0.5);
    //Particles system Fire
    var particles3 = new BABYLON.GPUParticleSystem("particles3", 10000, scene);
    //Texture of each particle
    particles3.particleTexture = new BABYLON.Texture("../textures/fireParticle.png", scene);
    //particles2.translationPivot = new BABYLON.Vector3(0, 0,0);
    //Where the particles come from
    
    particles3.emitter = new BABYLON.Vector3(220, 36.1, 0.5);
    
    
    particles3.minEmitBox = new BABYLON.Vector3(-0.5, 0, 0); // Starting all from
    particles3.maxEmitBox = new BABYLON.Vector3(0.5, 0, 0); // To...

    // Colors of all particles
    particles3.color1 = new BABYLON.Color4(1, 0, 0, 1.0);
    particles3.color2 = new BABYLON.Color4(1, 1, 0, 1.0);
    particles3.colorDead = new BABYLON.Color4(1, 0, 0, 0.0);

    // Size of each particle (random between...
    particles3.minSize = 0.1;
    particles3.maxSize = 0.5;

    // Life time of each particle (random between...
    particles3.minLifeTime = 0.05;
    particles3.maxLifeTime = 0.1;

    // Emission rate
    particles3.emitRate = 600;

    window.ps = particles3;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particles3.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particles3.gravity = new BABYLON.Vector3(0, 0, -2);

    // Direction of each particle after it has been emitted
    particles3.direction1 = new BABYLON.Vector3(0.2, 1, 0.2);
    particles3.direction2 = new BABYLON.Vector3(-0.2, 1, -0.2);
    

    // Angular speed, in radians
    particles3.minAngularSpeed = 0;
    particles3.maxAngularSpeed = Math.PI;

    // Speed
    particles3.minEmitPower = .01;
    particles3.maxEmitPower = 30;

    // Start the particle system
    particles3.start();
    
*/

}