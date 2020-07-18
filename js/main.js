/// <reference path="../reference/babylon.d.ts" />
/// <reference path="../reference/babylonjs.loaders.d.ts" />

//BABYLON.Engine.audioEngine.setGlobalVolume(0.5);

//music
//var musicl1 = new BABYLON.Sound("music", "../sounds/musica3.mp3", {loop:true, autoplay:true}, scene, function(){
//    musicl1.play();
//});


// Render loop
engine.runRenderLoop(function() {
    delta = engine.getDeltaTime();
    timeWalk += delta / 1000;
    timeJump += delta / 1000;
    timeSlide -= delta / 500;
    timeAnimation += delta / 1000;
    timeSlide = Math.max(timeSlide, 0);
    

    if(player.mesh.position.y < -100){
        player.mesh.position.copyFrom(checkpoint);
        timeWalk = 0;
        player.position.x = 0;
        player.acceleration.x = 0;
        if(player.lives>0){
            player.lives--;
        }
        updateHealth();
    }
    // console.log(player.lives)
    if(player.loadingComplete){
        animationGroups();
    }

    if (scene) {
        scene.render(); 
    }    

    if(snowAnim == true){
        if(timeAnimation > 2){
            snowMan();
            if(coinIsOn == false){
                // Coin();
            }
            if(coinIsOn2 == false){
                Coin2();
            }            
            timeAnimation = 0;
        }
    }

    if(coinIsOn == true){
        timeCoin += delta / 1000;
    }    
    if(coinIsOn2 == true){
        timeCoin2 += delta / 1000;
    }   
    if(player.lives = 0){
        console.log("sei morto")
    }
});

// Canvas/Window resize event handler
window.addEventListener('resize', function() {
    engine.resize();
});