var cam = this.scene.cameras[0];
cam.animations = [];
var a = new BABYLON.Animation( "a", "position.y", 20, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
// Animation keys
var keys = [];
keys.push({ frame: 0, value: cam.position.y });
keys.push({ frame: 10, value: cam.position.y + 2 });
keys.push({ frame: 20, value: cam.position.y });
a.setKeys(keys);
var easingFunction = new BABYLON.CircleEase();
easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
a.setEasingFunction(easingFunction);
cam.animations.push(a);
this.scene.beginAnimation(cam, 0, 20, false);
