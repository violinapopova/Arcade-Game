'use strict;'

let GameObjects = function (x, y) {
    this.x = 0;
    this.y = 0;
    this.sprite;
}

// Enemies our player must avoid
let Enemy = function (x, y, enemySpeed) {
    this.enemySpeed = enemySpeed;
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

//INHERITTED FROM GameObjects
Enemy.prototype = Object.create(GameObjects.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x += this.enemySpeed * dt;
    if (this.x >= 500) {
        this.x = 0;
    }
    areaOfEnemies = { x: this.x, y: this.y };
    areaOfPlayer = { x: player.x, y: player.y };
    if ((areaOfEnemies.x < (areaOfPlayer.x + 59)) && ((areaOfEnemies.x + 74) > areaOfPlayer.x) && (areaOfEnemies.y < (areaOfPlayer.y + 64)) && ((79 + areaOfEnemies.y) > areaOfPlayer.y)) {
        setTimeout(player.restart(), 10000);
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//DECLARE OBJECTS
let bugA = new Enemy(1, 59, 119);
let bugB = new Enemy(1, 139, 159);
let bugC = new Enemy(1, 219, 89);
const allEnemies = [bugA, bugB, bugC];

let Character = function () {
    GameObjects.call(this, Character);
    this.x = 200;
    this.y = 380;
    this.sprite = "images/char-horn-girl.png";
}

//INHERITTED FROM GameObjects
Character.prototype = Object.create(GameObjects);
Character.prototype.constructor = Character;

Character.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//WINNING WINDOW
let gamePanel = document.querySelector(".panel")

//CHARACTER`S POSITION
Character.prototype.handleInput = function (arrowKeyPosition) {
    if (arrowKeyPosition == "right") {
        this.x = this.x + 101;
    } else if (arrowKeyPosition == "left") {
        this.x = this.x - 101;
    } else if (arrowKeyPosition == "up") {
        this.y = this.y - 80;
    } else if (arrowKeyPosition == "down") {
        this.y = this.y + 80;
    } if (this.x > 404) {
        this.x = 404;
    } else if (this.x < 0) {
        this.x = 0;
    } else if (this.y > 404) {
        this.restart();
    } else if (this.y == -20) {
        gameIsWon();
    }
}

Character.prototype.restart = function () {
    this.x = 200;
    this.y = 380;
}

let player = new Character();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//WHEN PLAYER WINS THE GAME NEW HTML, DIV AND H2 WILL BE CREATED
function gameIsWon() {
    const createdDiv = document.createElement("div");
    const createdHeader = document.createElement("h2");
    createdDiv.setAttribute("class", "winning-game");
    const content = document.createElement("div");
    content.setAttribute("class", "game-notification");
    createdDiv.appendChild(content);
    gamePanel.insertAdjacentElement("afterbegin", createdDiv);
    content.appendChild(createdHeader);
    
    //WINNING MESSAGE
    createdHeader.innerText = "Great! You won the game!";
    
    //RESTART THE GAME
    const startNewGame = document.createElement("a");
    const startNewGameButton = document.createTextNode("Start New Game");
    startNewGame.appendChild(startNewGameButton);
    startNewGame.title = "Start New Game";
    startNewGame.href = "index.html";
    content.appendChild(startNewGame);
}