var framerate = 60;

function rotateAnimation(angle1, angle2) {
    var rotateLeft = new BABYLON.Animation( "rotate", "rotation.y", framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var keys = [];
    keys.push({ frame: 0, value: player.mesh.rotation.y });
    keys.push({ frame: framerate, value: angle1 * Math.PI/180 });
    rotateLeft.setKeys(keys);
    player.mesh.animations.push(rotateLeft);
    scene.beginAnimation(player.mesh, 0, framerate, false, 10);

    var camRotateLeft = new BABYLON.Animation( "camRotate", "rotationOffset", framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    keys = [];
    keys.push({ frame: 0, value: camera.rotationOffset });
    keys.push({ frame: framerate, value: angle2 });
    camRotateLeft.setKeys(keys);
    camera.animations.push(camRotateLeft);
    scene.beginAnimation(camera, 0, framerate, false, 10);
}

player.rotateLeftAnimation = function() {
    // Rotate to the left
    rotateAnimation(90, 90);
}

player.rotateRightAnimation = function() {
    // Rotate to the right
    rotateAnimation(-90, 270);
}

player.rotateIdleAnimation = function() {
    // Rotate towards the user
    rotateAnimation(0, 180);

    // Bring legs in idle position
    var idleThighR = new BABYLON.Animation("idleThighRight", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keys = [];
    keys.push({ frame: 0, value: player.body.thigh_R.rotation });
    keys.push({ frame: framerate, value: new BABYLON.Vector3(deg2rad(170),0,0) });
    idleThighR.setKeys(keys);
    player.body.thigh_R.animations.push(idleThighR);
    scene.beginAnimation(player.body.thigh_R, 0, framerate, false, 10);

    var idleThighL = new BABYLON.Animation("idleThighLeft", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    keys = [];
    keys.push({ frame: 0, value: player.body.thigh_L.rotation });
    keys.push({ frame: framerate, value: new BABYLON.Vector3(deg2rad(170),0,0) });
    idleThighL.setKeys(keys);
    player.body.thigh_L.animations.push(idleThighL);
    scene.beginAnimation(player.body.thigh_L, 0, framerate, false, 10);
    
    // Breathing animation
    var chestIdle = new BABYLON.Animation( "chestIdle", "position.y", framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    keys = [];
    keys.push({ frame: 0, value: 0.075 });
    keys.push({ frame: framerate/2, value: 0.065 });
    keys.push({ frame: framerate, value: 0.075 });
    chestIdle.setKeys(keys);
    player.body.chest.animations.push(chestIdle);
    scene.beginAnimation(player.body.chest, 0, framerate, true, 1);
}

// Walking animation
var walkGroup = new BABYLON.AnimationGroup("walk");
function walkAnimation() {
    var neutralAngle = new BABYLON.Vector3(deg2rad(170),0,0);
    var forwardAngle = new BABYLON.Vector3(deg2rad(230), 0, 0);
    var backwardAngle =  new BABYLON.Vector3(deg2rad(110), 0, 0);

    var walkThighR = new BABYLON.Animation("walkThighRight", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keys = [];
    keys.push({ frame: 0, value: neutralAngle });
    keys.push({ frame: 0.25*framerate, value: forwardAngle });
    keys.push({ frame: 0.5*framerate, value: neutralAngle });
    keys.push({ frame: 0.75*framerate, value: backwardAngle });
    keys.push({ frame: framerate, value: neutralAngle });
    walkThighR.setKeys(keys);
    walkGroup.addTargetedAnimation(walkThighR, player.body.thigh_R);

    var walkThighL = new BABYLON.Animation("walkThighLeft", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    keys = [];
    keys.push({ frame: 0, value: neutralAngle });
    keys.push({ frame: 0.25*framerate, value: backwardAngle });
    keys.push({ frame: 0.5*framerate, value: neutralAngle });
    keys.push({ frame: 0.75*framerate, value: forwardAngle });
    keys.push({ frame: framerate, value: neutralAngle });
    walkThighL.setKeys(keys);
    walkGroup.addTargetedAnimation(walkThighL, player.body.thigh_L);
}

// Checks what animation group to play
function animationGroups() {
    if (player.walking) {
        walkGroup.play(true);
    }
    else {
        walkGroup.stop();
    }
}