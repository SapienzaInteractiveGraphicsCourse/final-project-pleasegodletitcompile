// Jump animation
player.startJumpAnimation = function(){
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
}