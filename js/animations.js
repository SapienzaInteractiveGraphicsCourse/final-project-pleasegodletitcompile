// Jump animation
player.startJumpAnimation = function(){
    /*
    var jumpAnimation = new BABYLON.Animation( "jumpAnimation", "mesh.position.y", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var keys = [];
    keys.push({ frame: 0, value: player.mesh.position.y });
    keys.push({ frame: 30, value: player.mesh.position.y + 10 });
    keys.push({ frame: 60, value: player.mesh.position.y });
    jumpAnimation.setKeys(keys);
    var easingFunction = new BABYLON.QuadraticEase();
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    jumpAnimation.setEasingFunction(easingFunction);
    player.animations.push(jumpAnimation);
    scene.beginAnimation(player, 0, 60, false);
    */
    player.position.y = 0;
    check = player.mesh.position.y;
    player.acceleration.y += 10;
    while (player.position.y < 30) { 
        player.acceleration.y -= gravity;
        prePosition = player.position.y
        player.position.y += 0.5 * player.acceleration.y * ((timeJump+0.001) ** 2); //* player.acceleration.y;
        player.mesh.moveWithCollisions(new BABYLON.Vector3(0, player.position.y - prePosition , 0));
    };
    
}

//Moving equation
