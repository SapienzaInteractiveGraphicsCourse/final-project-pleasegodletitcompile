var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("HUD");

var panel = new BABYLON.GUI.StackPanel();
panel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
advancedTexture.addControl(panel);   

var image = new BABYLON.GUI.Image("coin", "textures/coin.png");
image.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
image.height = "50px";
image.width = "30px";
panel.addControl(image);

var panel2 = new BABYLON.GUI.StackPanel();
panel2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
panel2.isVertical = false;
advancedTexture.addControl(panel2);  

var heart = [];
heart.push(new BABYLON.GUI.Image("heart1", "textures/health.png"));
heart[0].verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
heart[0].height = "50px";
heart[0].width = "30px";
panel2.addControl(heart[0]); 

heart.push(new BABYLON.GUI.Image("heart2", "textures/health.png"));
heart[1].verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
heart[1].height = "50px";
heart[1].width = "30px";
panel2.addControl(heart[1]);

heart.push(new BABYLON.GUI.Image("heart3", "textures/health.png"));
heart[2].verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
heart[2].height = "50px";
heart[2].width = "30px";
panel2.addControl(heart[2]); 

function updateHUD(){
    for(var i=0; i<player.lives; i++){  
        heart[i].source = "textures/health.png";
    }
    for(var i=player.lives; i<3; i++){
        heart[i].source = "textures/health_lost.png";
    }
}