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
    scene.beginAnimation(player, 0, 60, false);

};


player.goLeftAnimation = function() {
    var goLeftAnimation = new BABYLON.Animation( "goLeftAnimation", "mesh.rotation.y", framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var keys = [];
    keys.push({ frame: 0, value: player.mesh.rotation.y });
    keys.push({ frame: framerate, value: 90 * Math.PI/180 });
    goLeftAnimation.setKeys(keys);
    player.animations.push(goLeftAnimation);
    scene.beginAnimation(player, 0, framerate, false, 10);

    var camGoLeftAnimation = new BABYLON.Animation( "camGoLeftAnimation", "rotationOffset", framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    keys = [];
    keys.push({ frame: 0, value: camera.rotationOffset });
    keys.push({ frame: framerate, value: 90 });
    camGoLeftAnimation.setKeys(keys);
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
    keys = [];
    keys.push({ frame: 0, value: camera.rotationOffset });
    keys.push({ frame: framerate, value: 270 });
    camGoRightAnimation.setKeys(keys);
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

    var camIdleAnimation = new BABYLON.Animation( "camIdleAnimation", "rotationOffset", framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    keys = [];
    keys.push({ frame: 0, value: camera.rotationOffset });
    keys.push({ frame: framerate, value: 180 });
    camIdleAnimation.setKeys(keys);
    camera.animations.push(camIdleAnimation);
    scene.beginAnimation(camera, 0, framerate, false, 10);

    if(player.body){
        console.log(player.body)
        var bodyIdleAnimation = new BABYLON.Animation( "bodyIdleAnimation", "body.position.y", framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
        keys = [];
        keys.push({ frame: 0, value: player.body.position.y });
        keys.push({ frame: framerate/2, value: player.body.position.y - 5 });
        keys.push({ frame: framerate, value: player.body.position.y });
        bodyIdleAnimation.setKeys(keys);
        player.body.animations.push(bodyIdleAnimation);
    }

    scene.beginAnimation(player, 0, framerate, false, 10);

}