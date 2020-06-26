var framerate = 60;

// Jump animation
player.startJumpAnimation = function(){
    var jumpAnimation = new BABYLON.Animation( "jumpAnimation", "mesh.position.y", framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var keys = [];
    keys.push({ frame: 0, value: player.mesh.position.y });
    keys.push({ frame: framerate/2, value: player.mesh.position.y + 10 });
    keys.push({ frame: framerate, value: player.mesh.position.y });
    jumpAnimation.setKeys(keys);
    var easingFunction = new BABYLON.QuadraticEase();
    easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    jumpAnimation.setEasingFunction(easingFunction);
    player.animations.push(jumpAnimation);
    
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

player.goLeftAnimation = function() {
    var goLeftAnimation = new BABYLON.Animation( "goLeftAnimation", "mesh.rotation.y", framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var keys = [];
    keys.push({ frame: 0, value: player.mesh.rotation.y });
    keys.push({ frame: framerate, value: 90 * Math.PI/180 });
    goLeftAnimation.setKeys(keys);
    player.animations.push(goLeftAnimation);
    scene.beginAnimation(player, 0, framerate, false, 10);

    var camGoLeftAnimation = new BABYLON.Animation( "camGoLeftAnimation", "rotationOffset", framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var keys2 = [];
    keys2.push({ frame: 0, value: camera.rotationOffset });
    keys2.push({ frame: framerate, value: 90 });
    camGoLeftAnimation.setKeys(keys2);
    camera.animations.push(camGoLeftAnimation);
    scene.beginAnimation(camera, 0, framerate, false, 10);
}

player.goRightAnimation = function() {
    var goRightAnimation = new BABYLON.Animation( "goRightAnimation", "mesh.rotation.y", framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var keys = [];
    keys.push({ frame: 0, value: player.mesh.rotation.y });
    keys.push({ frame: framerate, value: -90 * Math.PI/180 });
    goRightAnimation.setKeys(keys);
    player.animations.push(goRightAnimation);
    scene.beginAnimation(player, 0, framerate, false, 10);

    var camGoRightAnimation = new BABYLON.Animation( "camGoRightAnimation", "rotationOffset", framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var keys2 = [];
    keys2.push({ frame: 0, value: camera.rotationOffset });
    keys2.push({ frame: framerate, value: 270 });
    camGoRightAnimation.setKeys(keys2);
    camera.animations.push(camGoRightAnimation);
    scene.beginAnimation(camera, 0, framerate, false, 10);
}

player.idleAnimation = function() {
    var idleAnimation = new BABYLON.Animation( "idleAnimation", "mesh.rotation.y", framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var keys = [];
    keys.push({ frame: 0, value: player.mesh.rotation.y });
    keys.push({ frame: framerate, value: 0 });
    idleAnimation.setKeys(keys);
    player.animations.push(idleAnimation);
    scene.beginAnimation(player, 0, framerate, false, 10);

    var camIdleAnimation = new BABYLON.Animation( "camIdleAnimation", "rotationOffset", framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var keys2 = [];
    keys2.push({ frame: 0, value: camera.rotationOffset });
    keys2.push({ frame: framerate, value: 180 });
    camIdleAnimation.setKeys(keys2);
    camera.animations.push(camIdleAnimation);
    scene.beginAnimation(camera, 0, framerate, false, 10);
}