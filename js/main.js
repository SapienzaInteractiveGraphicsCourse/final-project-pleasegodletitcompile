/// <reference path="../reference/babylon.d.ts" />
/// <reference path="../reference/babylonjs.loaders.d.ts" />

// Render loop
engine.runRenderLoop(function() {
    // delta = engine.getDeltaTime()
    // Render jump / fall
    // if(player.mesh.position.y < 1.01 && player.mesh.position.y >= 1.0){
    //     player.canJump = true;
    // } 
    // else if(sphere.position.y >= 1.01) {
    //     player.verticalSpeed -= 0.1;
    // }
    // else {
    //     player.mesh.position.y = 1;
    //     player.verticalSpeed = 0;
    // }
    // player.mesh.position.y += 0.01 * player.verticalSpeed * delta;
    if(player.canJump == true){
        // player.mesh.moveWithCollisions(new BABYLON.Vector3(0, gravity, 0));
    }
    if(player.mesh.position.y < -35){
        player.mesh.position = player.checkpoint;
    }
    if(Math.abs(player.mesh.position.x - 20) < 1){
        player.checkpoint= player.mesh.position.clone();
    }
    // console.log(player.mesh.position.y);
    if (scene) {
        scene.render(); 
    }
});

// Canvas/Window resize event handler
window.addEventListener('resize', function() {
    engine.resize();
});