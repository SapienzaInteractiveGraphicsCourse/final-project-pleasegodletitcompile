// Jump animation
var jumpAnimation = new BABYLON.Animation( "jumpAnimation", "player.mesh.position.y", 60, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
var keys = [];
keys.push({ frame: 0, value: player.mesh.position.y });
keys.push({ frame: 30, value: player.mesh.position.y + 10 });
keys.push({ frame: 60, value: player.mesh.position.y });
jumpAnimation.setKeys(keys);
var easingFunction = new BABYLON.CircleEase();
easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
jumpAnimation.setEasingFunction(easingFunction);

player.startJumpAnimation = function(){
    player.animations.push(jumpAnimation);
    scene.beginAnimation(player.mesh, 0, 60, false, 0.5, console.log("ANIMATION ENDED"));
}