var framerate = 60;

function rotateAnimation(angle1, angle2) {
    var rotateLeft = new BABYLON.Animation( "rotate", "rotation.y", framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
    var keys = [];
    keys.push({ frame: 0, value: player.mesh.rotation.y });
    keys.push({ frame: framerate, value: angle1 * Math.PI/180 });
    rotateLeft.setKeys(keys);
    player.mesh.animations.push(rotateLeft);
    scene.beginAnimation(player.mesh, 0, framerate, false, 10);

    var camRotateLeft = new BABYLON.Animation( "camRotate", "rotationOffset", framerate, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
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
    var idleThighR = new BABYLON.Animation("idleThighRight", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
    var keys = [];
    keys.push({ frame: 0, value: player.body.thigh_R.rotation });
    keys.push({ frame: framerate, value: new BABYLON.Vector3(deg2rad(170),0,0) });
    idleThighR.setKeys(keys);
    player.body.thigh_R.animations.push(idleThighR);
    scene.beginAnimation(player.body.thigh_R, 0, framerate, false, 10);

    var idleThighL = new BABYLON.Animation("idleThighLeft", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
    keys = [];
    keys.push({ frame: 0, value: player.body.thigh_L.rotation });
    keys.push({ frame: framerate, value: new BABYLON.Vector3(deg2rad(170),0,0) });
    idleThighL.setKeys(keys);
    player.body.thigh_L.animations.push(idleThighL);
    scene.beginAnimation(player.body.thigh_L, 0, framerate, false, 10);

    // Bring arms in idle position
    var idleUpperArmR = new BABYLON.Animation("idleUpperArmRight", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
    keys = [];
    keys.push({ frame: 0, value: player.body.upper_arm_R.rotation });
    keys.push({ frame: framerate, value: new BABYLON.Vector3(deg2rad(340), deg2rad(90), deg2rad(270)) });
    idleUpperArmR.setKeys(keys);
    player.body.upper_arm_R.animations.push(idleUpperArmR);
    scene.beginAnimation(player.body.upper_arm_R, 0, framerate, false, 10);

    var idleUpperArmL = new BABYLON.Animation("idleUpperArmLeft", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
    keys = [];
    keys.push({ frame: 0, value: player.body.upper_arm_L.rotation });
    keys.push({ frame: framerate, value: new BABYLON.Vector3(deg2rad(180), deg2rad(90), deg2rad(270)) });
    idleUpperArmL.setKeys(keys);
    player.body.upper_arm_L.animations.push(idleUpperArmL);
    scene.beginAnimation(player.body.upper_arm_L, 0, framerate, false, 10);
    
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
    // Right leg
    var walkThighR = new BABYLON.Animation("walkThighRight", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    var keys = [];
    keys.push({ frame: 0, value: new BABYLON.Vector3(deg2rad(170),0,0) });
    keys.push({ frame: 0.25*framerate, value: new BABYLON.Vector3(deg2rad(230), 0, 0) });
    keys.push({ frame: 0.5*framerate, value: new BABYLON.Vector3(deg2rad(170),0,0) });
    keys.push({ frame: 0.75*framerate, value: new BABYLON.Vector3(deg2rad(110), 0, 0) });
    keys.push({ frame: framerate, value: new BABYLON.Vector3(deg2rad(170),0,0) });
    walkThighR.setKeys(keys);
    walkGroup.addTargetedAnimation(walkThighR, player.body.thigh_R);

    // Left leg
    var walkThighL = new BABYLON.Animation("walkThighLeft", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    keys = [];
    keys.push({ frame: 0, value: new BABYLON.Vector3(deg2rad(170),0,0) });
    keys.push({ frame: 0.25*framerate, value: new BABYLON.Vector3(deg2rad(110), 0, 0) });
    keys.push({ frame: 0.5*framerate, value: new BABYLON.Vector3(deg2rad(170),0,0) });
    keys.push({ frame: 0.75*framerate, value: new BABYLON.Vector3(deg2rad(230), 0, 0) });
    keys.push({ frame: framerate, value: new BABYLON.Vector3(deg2rad(170),0,0) });
    walkThighL.setKeys(keys);
    walkGroup.addTargetedAnimation(walkThighL, player.body.thigh_L);
    
    // Right arm
    var walkUpperArmR = new BABYLON.Animation("walkUpperArmRight", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    keys = [];
    keys.push({ frame: 0, value: new BABYLON.Vector3(deg2rad(340), deg2rad(90), deg2rad(270)) });
    keys.push({ frame: 0.25*framerate, value: new BABYLON.Vector3(deg2rad(340), deg2rad(150), deg2rad(270)) });
    keys.push({ frame: 0.5*framerate, value: new BABYLON.Vector3(deg2rad(340), deg2rad(90), deg2rad(270)) });
    keys.push({ frame: 0.75*framerate, value: new BABYLON.Vector3(deg2rad(340), deg2rad(50), deg2rad(270)) });
    keys.push({ frame: framerate, value: new BABYLON.Vector3(deg2rad(340), deg2rad(90), deg2rad(270)) });
    walkUpperArmR.setKeys(keys);
    walkGroup.addTargetedAnimation(walkUpperArmR, player.body.upper_arm_R);

    // Left arm
    var walkUpperArmL = new BABYLON.Animation("walkUpperArmLeft", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    keys = [];
    keys.push({ frame: 0, value: new BABYLON.Vector3(deg2rad(180), deg2rad(90), deg2rad(270)) });
    keys.push({ frame: 0.25*framerate, value: new BABYLON.Vector3(deg2rad(180), deg2rad(130), deg2rad(270)) });
    keys.push({ frame: 0.5*framerate, value: new BABYLON.Vector3(deg2rad(180), deg2rad(90), deg2rad(270)) });
    keys.push({ frame: 0.75*framerate, value: new BABYLON.Vector3(deg2rad(180), deg2rad(30), deg2rad(270)) });
    keys.push({ frame: framerate, value: new BABYLON.Vector3(deg2rad(180), deg2rad(90), deg2rad(270)) });
    walkUpperArmL.setKeys(keys);
    walkGroup.addTargetedAnimation(walkUpperArmL, player.body.upper_arm_L);
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

function snowMan(){
    var RotateRightArm = new BABYLON.Animation("rightArm", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    
    var keys = [];
    keys.push({ frame: 0, value: new BABYLON.Vector3(0,0,4.7)});
    keys.push({ frame: 0.25*framerate, value: new BABYLON.Vector3(0,0,5.1) });
    keys.push({ frame: 0.5*framerate, value: new BABYLON.Vector3(0,0,5.7) });
    keys.push({ frame: 0.75*framerate, value: new BABYLON.Vector3(0,0,5.1) });
    keys.push({ frame: framerate, value: new BABYLON.Vector3(0,0,4.7) });

    RotateRightArm.setKeys(keys);
    snowRA.animations.push(RotateRightArm)
    scene.beginAnimation(snowRA, 0, framerate, true, 1);
    snowRA2.animations.push(RotateRightArm)
    scene.beginAnimation(snowRA2, 0, framerate, true, 1);
    snowRA3.animations.push(RotateRightArm)
    scene.beginAnimation(snowRA3, 0, framerate, true, 1);
    snowRA4.animations.push(RotateRightArm)
    scene.beginAnimation(snowRA4, 0, framerate, true, 1);
    snowRA5.animations.push(RotateRightArm)
    scene.beginAnimation(snowRA5, 0, framerate, true, 1);
    snowRA6.animations.push(RotateRightArm)
    scene.beginAnimation(snowRA6, 0, framerate, true, 1);
}


function Coin(obj){
    var RotateCoin = new BABYLON.Animation("coinRot", "rotation", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    
    var keys = [];
    keys.push({ frame: 0, value: new BABYLON.Vector3(deg2rad(-90),0,0) });
    keys.push({ frame: 0.25*framerate, value: new BABYLON.Vector3(deg2rad(-90),0,deg2rad(90)) });
    keys.push({ frame: 0.5*framerate, value: new BABYLON.Vector3(deg2rad(-90),0,deg2rad(180)) });
    keys.push({ frame: 0.75*framerate, value: new BABYLON.Vector3(deg2rad(-90),0,deg2rad(270)) });
    keys.push({ frame: framerate, value: new BABYLON.Vector3(deg2rad(-90),0,deg2rad(360)) });

    RotateCoin.setKeys(keys);
    obj.animations.push(RotateCoin);
    scene.beginAnimation(obj, 0, framerate, true, 1);
}

function CoinDisappear(obj){
    var CoinPuff = new BABYLON.Animation("coinDis", "scaling", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    
    var keys = [];
    keys.push({ frame: 0, value: new BABYLON.Vector3(8,8,8) });
    keys.push({ frame: 0.5*framerate, value: new BABYLON.Vector3(6,6,6) });
    keys.push({ frame: framerate, value: new BABYLON.Vector3(0,0,0) });

    CoinPuff.setKeys(keys);
    obj.animations.push(CoinPuff)
    scene.beginAnimation(obj, 0, framerate, false, 1);
}

function trapON(obj){
    var SpikesUp = new BABYLON.Animation("SpikesUp", "position", framerate, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    
    var keys = [];
    keys.push({ frame: 0, value: new BABYLON.Vector3(0,-1,0) });
    keys.push({ frame: framerate, value: new BABYLON.Vector3(0,-2.5,0) });
    spikesON = false;
    SpikesUp.setKeys(keys);
    obj.animations.push(SpikesUp)
    scene.beginAnimation(obj, 0, framerate, false, 1);
}



