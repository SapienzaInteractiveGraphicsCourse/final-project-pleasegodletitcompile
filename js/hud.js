var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("HUD");


// Coins
var panelCoins = new BABYLON.GUI.StackPanel();
panelCoins.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
panelCoins.isVertical = false;
advancedTexture.addControl(panelCoins);   

var coin = [];
coin.push(new BABYLON.GUI.Image("coin1", "textures/coin.png"));
coin[0].verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
coin[0].height = "40px";
coin[0].width = "40px";
coin[0].alpha = 0.25;
panelCoins.addControl(coin[0]); 

coin.push(new BABYLON.GUI.Image("coin2", "textures/coin.png"));
coin[1].verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
coin[1].height = "40px";
coin[1].width = "40px";
coin[1].alpha = 0.25;
panelCoins.addControl(coin[1]);

coin.push(new BABYLON.GUI.Image("coin3", "textures/coin.png"));
coin[2].verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
coin[2].height = "40px";
coin[2].width = "40px";
coin[2].alpha = 0.25;
panelCoins.addControl(coin[2]); 


// Health
var panelHealth = new BABYLON.GUI.StackPanel();
panelHealth.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
panelHealth.isVertical = false;
advancedTexture.addControl(panelHealth);  

var health = [];
health.push(new BABYLON.GUI.Image("heart1", "textures/health.png"));
health[0].verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
health[0].height = "40px";
health[0].width = "40px";
panelHealth.addControl(health[0]); 

health.push(new BABYLON.GUI.Image("heart2", "textures/health.png"));
health[1].verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
health[1].height = "40px";
health[1].width = "40px";
panelHealth.addControl(health[1]);

health.push(new BABYLON.GUI.Image("heart3", "textures/health.png"));
health[2].verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
health[2].height = "40px";
health[2].width = "40px";
panelHealth.addControl(health[2]); 

function updateHealth(){
    for(var i=0; i<player.lives; i++){  
        health[i].alpha = 1;
    }
    for(var i=player.lives; i<3; i++){
        health[i].alpha = 0.25;
    }
}

function updateCoins(){
    for(var i=0; i<player.coins; i++){  
        coin[i].alpha = 0.25;
    }
    for(var i=player.coins; i<3; i++){
        coin[i].alpha = 1;
    }
}