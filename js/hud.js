var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("HUD");

// Coins
var panelCoins = new BABYLON.GUI.StackPanel();
panelCoins.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
panelCoins.isVertical = false;
panelCoins.left = "1%";
panelCoins.top = "1%";
advancedTexture.addControl(panelCoins);   

var coinsHUD = [];
coinsHUD.push(new BABYLON.GUI.Image("coin1", "textures/coin.png"));
coinsHUD[0].verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
coinsHUD[0].height = "40px";
coinsHUD[0].width = "40px";
coinsHUD[0].alpha = 0.25;
panelCoins.addControl(coinsHUD[0]); 

coinsHUD.push(new BABYLON.GUI.Image("coin2", "textures/coin.png"));
coinsHUD[1].verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
coinsHUD[1].height = "40px";
coinsHUD[1].width = "40px";
coinsHUD[1].alpha = 0.25;
panelCoins.addControl(coinsHUD[1]);

coinsHUD.push(new BABYLON.GUI.Image("coin3", "textures/coin.png"));
coinsHUD[2].verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
coinsHUD[2].height = "40px";
coinsHUD[2].width = "40px";
coinsHUD[2].alpha = 0.25;
panelCoins.addControl(coinsHUD[2]);

// Updates the coins displayed
function updateCoins(){
    for(var i=0; i<player.coins; i++){  
        coinsHUD[i].alpha = 1;
    }
    for(var i=player.coins; i<3; i++){
        coinsHUD[i].alpha = 0.25;
    }
}


// Health
var panelHealth = new BABYLON.GUI.StackPanel();
panelHealth.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
panelHealth.isVertical = false;
panelHealth.left = "-1%";
panelHealth.top = "1%";
advancedTexture.addControl(panelHealth);  

var healthHUD = [];
healthHUD.push(new BABYLON.GUI.Image("heart1", "textures/health.png"));
healthHUD[0].verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
healthHUD[0].height = "40px";
healthHUD[0].width = "40px";
panelHealth.addControl(healthHUD[0]); 

healthHUD.push(new BABYLON.GUI.Image("heart2", "textures/health.png"));
healthHUD[1].verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
healthHUD[1].height = "40px";
healthHUD[1].width = "40px";
panelHealth.addControl(healthHUD[1]);

healthHUD.push(new BABYLON.GUI.Image("heart3", "textures/health.png"));
healthHUD[2].verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
healthHUD[2].height = "40px";
healthHUD[2].width = "40px";
panelHealth.addControl(healthHUD[2]);

// Updates the health displayed
function updateHealth(){
    for(var i=0; i<player.lives; i++){  
        healthHUD[i].alpha = 1;
    }
    for(var i=player.lives; i<3; i++){
        healthHUD[i].alpha = 0.25;
    }
}


// Menu
var menuIsOpen = false;
var endGame = false;
var menuPanel;
var endGamePanel;
var tutorialPanel;
var tutorialPanel2;
var tutorialPanel3;
var tutorialPanel4;
var tutorialPanel5;
var tutorialPanel6;

// Menu button
menuButton = new BABYLON.GUI.Button.CreateImageOnlyButton("menuButton", "textures/menu.png");
menuButton.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
menuButton.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
menuButton.top = "1%";
menuButton.height = "40px";
menuButton.width = "40px";
menuButton.thickness = 0;
advancedTexture.addControl(menuButton);

menuButton.onPointerClickObservable.add(function() {
    if(menuIsOpen == false){
        menu();
    }
    else {
        advancedTexture.removeControl(menuPanel);
        menuIsOpen = false;
    }
});

// Display menu
// gameover boolean allows to show a close button only if the game is not over
function menu(gameOver = false) {
    menuIsOpen = true;

    menuPanel = new BABYLON.GUI.StackPanel();
    menuPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    menuPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    menuPanel.isVertical = true;
    menuPanel.width = 0.5;
    menuPanel.background = "green";
    menuPanel.color = "orange";
    advancedTexture.addControl(menuPanel);
    
    var menuText = new BABYLON.GUI.TextBlock("menuText", "Menu");
    if(gameOver) {
        menuText.text = "Game Over";
    }
    menuText.fontSize = "30px";
    menuText.height = "60px";
    menuPanel.addControl(menuText);

    var restartButton = new BABYLON.GUI.Button.CreateSimpleButton("restartButton", "Restart");
    restartButton.height = "40px";
    menuPanel.addControl(restartButton);
    restartButton.onPointerClickObservable.add(function() {
        location.reload();
    });

    var mainMenuButton = new BABYLON.GUI.Button.CreateSimpleButton("mainMenuButton", "Main Menu");
    mainMenuButton.height = "40px";
    menuPanel.addControl(mainMenuButton);
    mainMenuButton.onPointerClickObservable.add(function() {
        window.location.href = "../index.html";
    });

    var levelMenuButton = new BABYLON.GUI.Button.CreateSimpleButton("levelMenuButton", "Level Select");
    levelMenuButton.height = "40px";
    menuPanel.addControl(levelMenuButton);
    levelMenuButton.onPointerClickObservable.add(function() {
        window.location.href = "../selectLevel.html";
    });

    if(gameOver == false){
        var closeButton = new BABYLON.GUI.Button.CreateSimpleButton("closeButton", "Close");
        closeButton.height = "40px";
        menuPanel.addControl(closeButton);
        closeButton.onPointerClickObservable.add(function() {
            menuIsOpen = false;
            advancedTexture.removeControl(menuPanel);
        });
    }
}

function endLevel(){
    endGame = true;

    endGamePanel = new BABYLON.GUI.StackPanel();
    endGamePanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    endGamePanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    endGamePanel.isVertical = true;
    endGamePanel.width = 0.5;
    endGamePanel.background = "green";
    endGamePanel.color = "orange";
    advancedTexture.addControl(endGamePanel);
    
    var endText = new BABYLON.GUI.TextBlock("endtext", "Congratulations!!!");
    if(nextLevel == null) endText.text = "The End"; // Last level case
    
    endText.fontSize = "30px";
    endText.height = "60px";
    endGamePanel.addControl(endText);

    var restartButton = new BABYLON.GUI.Button.CreateSimpleButton("restartButton", "Replay this level");
    restartButton.height = "40px";
    endGamePanel.addControl(restartButton);
    restartButton.onPointerClickObservable.add(function() {
        location.reload();
    });

    if(nextLevel != null) { // If it is not the last level
        var nextLevelButton = new BABYLON.GUI.Button.CreateSimpleButton("nextLevelButton", "Next Level");
        nextLevelButton.height = "40px";
        endGamePanel.addControl(nextLevelButton);
        nextLevelButton.onPointerClickObservable.add(function() {
            window.location.href = nextLevel;
        });
    }

    var mainMenuButton = new BABYLON.GUI.Button.CreateSimpleButton("mainMenuButton", "Main menu");
    mainMenuButton.height = "40px";
    endGamePanel.addControl(mainMenuButton);
    mainMenuButton.onPointerClickObservable.add(function() {
        window.location.href = "../index.html";
    });

};

function tutorialfunc(obj){
    
    tutorialPanel = new BABYLON.GUI.StackPanel();
    tutorialPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    tutorialPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    tutorialPanel.isVertical = true;
    tutorialPanel.width = 0.8;
    tutorialPanel.background = "yellow";
    tutorialPanel.color = "blue";
    advancedTexture.addControl(tutorialPanel);

    tutorial1 = true;
    var tutorial11 = new BABYLON.GUI.Button.CreateSimpleButton("tutorialButton1", "Hi, welcome to the tutorial, here you will learn the basics of the game.\nMove with (a) and (d), jump with (spacebar). Go head. (click to continue)");
    tutorial11.fontSize = "15px"
    tutorial11.height = "50px";
    tutorialPanel.addControl(tutorial11);
    tutorial11.onPointerClickObservable.add(function() {
        tutorialPanel.removeControl(tutorial11);
        tutorialIsOpen = false;
    });
};
    
function tutorial2func(){
    
    tutorialPanel2 = new BABYLON.GUI.StackPanel();
    tutorialPanel2.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    tutorialPanel2.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    tutorialPanel2.isVertical = true;
    tutorialPanel2.width = 0.8;
    tutorialPanel2.background = "yellow";
    tutorialPanel2.color = "blue";
    advancedTexture.addControl(tutorialPanel2);

    tutorial2 = true;
    var tutorial22 = new BABYLON.GUI.Button.CreateSimpleButton("tutorialButton2", "In the levels there are campfires that are lit when you pass on them. Those are checkpoints, \n from where you will respawn in case you fall off the platforms. (click to continue)");
    tutorial22.fontSize = "15px"
    tutorial22.height = "50px";
    tutorialPanel2.addControl(tutorial22);
    tutorial22.onPointerClickObservable.add(function() {
        tutorialPanel2.removeControl(tutorial22);
        tutorialIsOpen = false;
    });
};

function tutorial3func(obj){

    tutorialPanel3 = new BABYLON.GUI.StackPanel();
    tutorialPanel3.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    tutorialPanel3.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    tutorialPanel3.isVertical = true;
    tutorialPanel3.width = 0.8;
    tutorialPanel3.background = "yellow";
    tutorialPanel3.color = "blue";
    advancedTexture.addControl(tutorialPanel3);

    tutorial3 = true;
    var tutorial33 = new BABYLON.GUI.Button.CreateSimpleButton("tutorialButton3", "Be aware, there are traps placed in the level. If you step on them you will lose one heart.\nIf all the hearts are lost, you have to start the level from the beginning. (click to continue)");
    tutorial33.fontSize = "15px"
    tutorial33.height = "50px";
    tutorialPanel3.addControl(tutorial33);
    tutorial33.onPointerClickObservable.add(function() {
        tutorialPanel3.removeControl(tutorial33);
        tutorialIsOpen = false;
    });
};

function tutorial4func(obj){
    
    tutorialPanel4 = new BABYLON.GUI.StackPanel();
    tutorialPanel4.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    tutorialPanel4.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    tutorialPanel4.isVertical = true;
    tutorialPanel4.width = 0.8;
    tutorialPanel4.background = "yellow";
    tutorialPanel4.color = "blue";
    advancedTexture.addControl(tutorialPanel4);

    tutorial4 = true;
    var tutorial44 = new BABYLON.GUI.Button.CreateSimpleButton("tutorialButton4", "There are some jumps that require to run (pressing button p), in order to overcome them. So go back, \n run and try to jump to the next platform. Remember, the run is really important to overcome some obstacles. (click to continue)");
    tutorial44.fontSize = "15px"
    tutorial44.height = "40px";
    tutorialPanel4.addControl(tutorial44);
    tutorial44.onPointerClickObservable.add(function() {
        tutorialPanel4.removeControl(tutorial44);
        tutorialIsOpen = false;
    });
};

function tutorial5func(obj){
    tutorialPanel5 = new BABYLON.GUI.StackPanel();
    tutorialPanel5.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    tutorialPanel5.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    tutorialPanel5.isVertical = true;
    tutorialPanel5.width = 0.8;
    tutorialPanel5.background = "yellow";
    tutorialPanel5.color = "blue";
    advancedTexture.addControl(tutorialPanel5);

    tutorial5 = true;
    var tutorial55 = new BABYLON.GUI.Button.CreateSimpleButton("tutorialButton5", "To complete the level, you need to collect all the three coins and then go inside the active portal. (click to continue)");
    tutorial55.fontSize = "15px";
    tutorial55.height = "40px";
    tutorialPanel5.addControl(tutorial55);
    tutorial55.onPointerClickObservable.add(function() {
        tutorialPanel5.removeControl(tutorial55);
        tutorialIsOpen = false;
    });
};

function tutorial6func(obj){
    tutorialPanel6 = new BABYLON.GUI.StackPanel();
    tutorialPanel6.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    tutorialPanel6.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
    tutorialPanel6.isVertical = true;
    tutorialPanel6.width = 0.8;
    tutorialPanel6.background = "yellow";
    tutorialPanel6.color = "blue";
    advancedTexture.addControl(tutorialPanel6);

    tutorial6 = true;
    var tutorial66 = new BABYLON.GUI.Button.CreateSimpleButton("tutorialButton6", "Some platforms have specific materials, like sand and ice, that modify the way the player moves.\n So be careful on these plaforms. (click to continue)");
    tutorial66.fontSize = "15px"
    tutorial66.height = "40px";
    tutorialPanel6.addControl(tutorial66);
    tutorial66.onPointerClickObservable.add(function() {
        tutorialPanel6.removeControl(tutorial66);
        tutorialIsOpen = false;
    });
};
