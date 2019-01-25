let GameObjects = function (x, y) {
    this.sprite;
    this.x = 0;
    this.y = 0;
  };
  
  let Enemy = function(x, y, enemySpeed) {
    this.enemySpeed = enemySpeed;
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
  
  };
  
  /*Inheritted from GameObjects*/
  Enemy.prototype = Object.create(GameObjects.prototype);
  Enemy.prototype.constructor = Enemy;
  
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  
  Enemy.prototype.update = function (dt) {
    this.x += this.enemySpeed * dt;
    if (this.x >= 500) {
      this.x=0;
    }
    areaOfEnemies = {x: this.x, y: this.y};
    areaOfPlayer = {x: player.x, y: player.y};
    if ((areaOfEnemies.x < (areaOfPlayer.x + 59)) && ((areaOfEnemies.x + 74) > areaOfPlayer.x) && (areaOfEnemies.y < (areaOfPlayer.y + 64)) && ((79 + areaOfEnemies.y) > areaOfPlayer.y)) {
      setTimeout(player.reset(), 10000);
    };
  };
  
  // Draw the enemy on the screen, required method for game
  Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  
  // instantantiate objects
  let bugA = new Enemy(1, 60, 120);
  let bugB = new Enemy(1, 140, 160);
  let bugC = new Enemy(1, 220, 90);
  
  // Enemies our player must avoid
  const allEnemies = [bugA, bugB, bugC];
  
  let Character = function () {
    GameObjects.call(this, Character);
    this.sprite = 'images/char-horn-girl.png';
    this.x = 200;
    this.y = 380;
  };
  
  // inherits from GameObjects
  Character.prototype = Object.create(GameObjects);
  Character.prototype.constructor = Character;
  
  Character.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
  
  // necessary for the win-window
  let gamePanel = document.querySelector('.panel');
  
  // Change the player's position based on the user keyboard input
  Character.prototype.handleInput = function(direction) {
      if (direction == 'up') {
          this.y = this.y - 80;
      } else if (direction == 'down') {
          this.y = this.y + 80;
      } else if (direction == 'left') {
          this.x = this.x - 101;
      } else if (direction == 'right') {
          this.x = this.x + 101;
      } if (this.x < 0) {
          this.x = 0;
      } else if (this.x > 404) {
          this.x = 404;
    } else if (this.y > 404) {
      // reset Character to starting position if he moves down outside the canvas
      this.reset();
    } else if (this.y == -20) {
      winGame();
    }
  }
  
  // Reset the Character
  Character.prototype.reset = function() {
      this.x = 200;
      this.y = 380;
  }
  
  
let player = new Character();
  
  // This listens for key presses and sends the keys to your
  // Player.handleInput() method. You don't need to modify this.
  document.addEventListener('keyup', function(e) {
      var allowedKeys = {
          37: 'left',
          38: 'up',
          39: 'right',
          40: 'down'
      };
  
      player.handleInput(allowedKeys[e.keyCode]);
  });
  
  //winGame
  
  function winGame() {
    // create html
    const divHtml = document.createElement('div');
    const h1Html = document.createElement('h1');
  
    // give it a class
    divHtml.setAttribute('class', 'finished');
    const inside = document.createElement('div');
    inside.setAttribute('class', 'finished-inner');
    divHtml.appendChild(inside);
  
    // insert it into the html
    gamePanel.insertAdjacentElement('afterbegin', divHtml);
    inside.appendChild(h1Html);
  
    // add text
    h1Html.innerText =
    `Congratulations!
    You Successfully Finished the Game!`;
  
    // add play again button
    const playAgain = document.createElement('a');
    const playAgainText = document.createTextNode("Play again");
    playAgain.appendChild(playAgainText);
    playAgain.title = "Play again";
    playAgain.href = "index.html";
    inside.appendChild(playAgain);
  }
