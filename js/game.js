class Game {
    constructor() {
      this.startScreen = document.getElementById("game-intro");
      this.gameScreen = document.getElementById("game-screen");
      this.gameEndScreen = document.getElementById("game-end");
      this.player = new Player(this.gameScreen,
        200,
        500,
        100,
        150,
        "../images/newBowl.png");
      this.height = 1000;
      this.width = 1000;
      this.obstacles = [];
      this.score = 0;
      this.lives = 3;
      this.gameIsOver = false;
      this.gameIntervalId;
      this.gameLoopFrequency = Math.round(1000/60); // 60fps
    }
  
    start() {
      // Set the height and width of the game screen
      this.gameScreen.style.height = `${this.height}px`;
      this.gameScreen.style.width = `${this.width}px`;
  
      // Hide the start screen
      this.startScreen.style.display = "none";
      document.getElementById("game-container").style.display = 'flex';
      
      // Show the game screen
      this.gameScreen.style.display = "block";

      this.gameLoop();

      this.startScoreTimer();
    }
  
    gameLoop() {
      console.log("in the game loop");
      if (this.gameIsOver) return;

      this.update();
      requestAnimationFrame(() => this.gameLoop());

    }

    startScoreTimer() {
      this.scoreIntervalId = setInterval(() => {
        if (!this.gameIsOver) {
          this.score++;
          this.updateScoreDisplay();
        }
      }, 1000); 
    }

    stopScoreTimer() {
      clearInterval(this.scoreIntervalId);
    }
    
    updateScoreDisplay() {
      const scoreElement = document.getElementById("score"); 
      scoreElement.textContent = `${this.score}`;
    }
  
   update() { // keep track of the different parts of the game updates
      console.log("in the update");
      this.player.move();
     
          for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i];
            obstacle.move();
        
            if (this.player.didCollide(obstacle)) {
                updateProgress(0, obstacle.type); // Pass the obstacle type
        
                // Remove the obstacle
                obstacle.element.remove();
                this.obstacles.splice(i, 1);
                i--;
            } else if (obstacle.top > this.height) {
                this.score++;
                obstacle.element.remove();
                this.obstacles.splice(i, 1);
                i--;
            }

        }
      
       /* if (Math.random() > 0.98 && this.obstacles.length < 10) {
          // Randomly decide the obstacle type
          const obstacleType = Math.random() > 0.5 ? "obstacle" : "obstacle2";
          this.obstacles.push(new Obstacle(this.gameScreen, obstacleType));
      }*/
          if (Math.random() > 0.98 && this.obstacles.length < 10) {
            const randomType = Math.random();
            if (randomType < 0.4) {
                this.obstacles.push(new Obstacle(this.gameScreen, "obstacle"));
            } else if (randomType < 0.6) {
                this.obstacles.push(new Obstacle2(this.gameScreen));
            } else if (randomType < 0.7){
                this.obstacles.push(new Obstacle3(this.gameScreen));
            }
              else if (randomType < 0.8){
              this.obstacles.push(new Obstacle4(this.gameScreen));
          }
              else if (randomType < 0.9){
            this.obstacles.push(new Obstacle5(this.gameScreen));
        }
            else {
              this.obstacles.push(new Obstacle6(this.gameScreen));
          }
        }
      
}

checkCollision(player, obstacle) {
  if (
    player.x < obstacle.x + obstacle.width &&
    player.x + player.width > obstacle.x &&
    player.y < obstacle.y + obstacle.height &&
    player.y + player.height > obstacle.y
) {
  updateProgress(obstacle.type);
 }

  }
}
