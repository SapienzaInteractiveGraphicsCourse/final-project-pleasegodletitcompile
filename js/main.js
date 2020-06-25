/// <reference path="../reference/babylon.d.ts" />

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
    player.mesh.moveWithCollisions(new BABYLON.Vector3(0, gravity, 0));
    if(player.mesh.position.y < -35){
        player.mesh.position = new BABYLON.Vector3(0,2,0);
    }
    // console.log(player.mesh.position.y);

    scene.render();
});

// Canvas/Window resize event handler
window.addEventListener('resize', function() {
    engine.resize();
});