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

function rotateAnimation(angle1, angle2) {
    var rotateLeftAnimation = new BABYLON.Animation( "rotateAnimation", "mesh.rotation.y", framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var keys = [];
    keys.push({ frame: 0, value: player.mesh.rotation.y });
    keys.push({ frame: framerate, value: angle1 * Math.PI/180 });
    rotateLeftAnimation.setKeys(keys);
    player.animations.push(rotateLeftAnimation);
    scene.beginAnimation(player, 0, framerate, false, 10);

    var camRotateLeftAnimation = new BABYLON.Animation( "camRotateAnimation", "rotationOffset", framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    keys = [];
    keys.push({ frame: 0, value: camera.rotationOffset });
    keys.push({ frame: framerate, value: angle2 });
    camRotateLeftAnimation.setKeys(keys);
    camera.animations.push(camRotateLeftAnimation);
    scene.beginAnimation(camera, 0, framerate, false, 10);
}

player.rotateLeftAnimation = function() {
    rotateAnimation(90, 90);
}

player.rotateRightAnimation = function() {
    rotateAnimation(-90, 270);
}

player.rotateIdleAnimation = function() {
    rotateAnimation(0, 180);

    // if(player.body){
    //     /* // console.log(player.body)
    //     var bodyIdleAnimation = new BABYLON.Animation( "bodyIdleAnimation", "position.y", framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    //     keys = [];
    //     keys.push({ frame: 0, value: player.body.position.y });
    //     keys.push({ frame: framerate/2, value: player.body.position.y - 5 });
    //     keys.push({ frame: framerate, value: player.body.position.y });
    //     bodyIdleAnimation.setKeys(keys);
    //     player.body.animations.push(bodyIdleAnimation);
    //     scene.beginAnimation(player.body, 0, framerate, false, 10); */

    //     // scene.registerBeforeRender(function () {
    //     //     player.body.position.y += 1; 
    //     // });
    // }
}