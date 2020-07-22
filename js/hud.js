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

    var levelMenuButton = new BABYLON.GUI.Button.CreateSimpleButton("levelMenuButton", "Select Level");
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

function tutorial(obj){
    
    tutorialPanel = new BABYLON.GUI.StackPanel();
    tutorialPanel.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        tutorialPanel.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        tutorialPanel.isVertical = true;
        tutorialPanel.width = 0.8;
        tutorialPanel.background = "yellow";
        tutorialPanel.color = "blue";
        advancedTexture.addControl(tutorialPanel);

    if(obj.id == "tutorial1"){
        tutorial1 = true;
        var tutorial11 = new BABYLON.GUI.Button.CreateSimpleButton("tutorialButton1", "Welcome to the tutorial");
        tutorial11.fontSize = "10px"
        tutorial11.height = "40px";
        tutorialPanel.addControl(tutorial11);
        tutorial11.onPointerClickObservable.add(function() {
            tutorialPanel.isVisible = false;
        });
    }
};