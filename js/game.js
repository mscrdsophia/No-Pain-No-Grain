class Game {
    constructor() {
      this.startScreen = document.getElementById("game-intro");
      this.gameScreen = document.getElementById("game-screen");
      this.gameEndScreen = document.getElementById("game-end");
      this.winGameScreen = document.getElementById("win-game");
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
      this.gameIsOver = false;
      this.gameIntervalId;
      this.gameLoopFrequency = Math.round(1000/60); // 60fps
      this.health = 5;
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
      }, 100); 
    }

    stopScoreTimer() {
      clearInterval(this.scoreIntervalId);
    }
    
    updateScoreDisplay() {
      const scoreElement = document.getElementById("score"); 
      scoreElement.textContent = `${this.score}`;
    }
  
    updateHealth(obstacleType) {
          if (obstacleType == "obstacle"){
             this.health += 5;
          }
          else if (obstacleType == "obstacle2"){
             this.health += 7;
          }
          else if (obstacleType == "obstacle3"){
            this.health += 10;
         }
          else if (obstacleType == "obstacle4"){
            this.health -= 5;
          }
          else if (obstacleType == "obstacle5"){
            this.health -= 7;
          }
          else if (obstacleType == "obstacle6"){
            this.health -= 10;
          }
          this.health = Math.max(0, Math.min(this.health, 100));
      
          
          const progressBar = document.getElementById("progress-bar");
          progressBar.style.width = `${this.health}%`;
      }
      

   update() { // keep track of the different parts of the game updates
      console.log("in the update");
      this.player.move();
     
          for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i];
            obstacle.move();
        
            if (this.player.didCollide(obstacle)) {
                this.updateHealth(obstacle.type); // Pass the obstacle type
        
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
      
      
         

          if (Math.random() > 0.98 && this.obstacles.length < 10) {
            const randomType = Math.random();
            let newObstacle;
    
            // Decide obstacle type
            if (randomType < 0.4) {
                newObstacle = new Obstacle(this.gameScreen, "obstacle");
            } else if (randomType < 0.6) {
                newObstacle = new Obstacle2(this.gameScreen);
            } else if (randomType < 0.7) {
                newObstacle = new Obstacle3(this.gameScreen);
            } else if (randomType < 0.8) {
                newObstacle = new Obstacle4(this.gameScreen);
            } else if (randomType < 0.9){
                newObstacle = new Obstacle5(this.gameScreen);
            }
            else {
              newObstacle = new Obstacle6(this.gameScreen);
            }

    // Ensure no overlap before adding the new obstacle
    const isOverlapping = this.obstacles.some((obstacle) => this.checkOverlap(obstacle, newObstacle));

    if (!isOverlapping) {
        this.obstacles.push(newObstacle);
    } else {
        // Remove the newObstacle DOM element if it overlaps
        newObstacle.element.remove();
    }
}
if (this.health === 0){
  this.endGame();
  this.gameEndScreen.style.display = "block"; 
}
else if (this.health === 100){
  this.winGame();
  this.winGameScreen.style.display = "block"; 
}

}
checkCollision(player, obstacle){
  if (
    player.x < obstacle.x + obstacle.width &&
    player.x + player.width > obstacle.x &&
    player.y < obstacle.y + obstacle.height &&
    player.y + player.height > obstacle.y
) {
  updateProgress(obstacle.type);
 }

  }

  checkOverlap(obstacle1, obstacle2) {
    return !(
        obstacle1.left + obstacle1.width < obstacle2.left || // Obstacle1 is to the left
        obstacle1.left > obstacle2.left + obstacle2.width || // Obstacle1 is to the right
        obstacle1.top + obstacle1.height < obstacle2.top || // Obstacle1 is above
        obstacle1.top > obstacle2.top + obstacle2.height    // Obstacle1 is below
    );
}
endGame() {
  this.player.element.remove();
  this.obstacles.forEach(obstacle => obstacle.element.remove());

  this.gameIsOver = true;

  // Hide game screen
  this.gameScreen.style.display = "none";
  

  const finalScoreElement = document.getElementById("final-score");
    finalScoreElement.textContent = this.score;

    this.gameScreen.style.display = "none";
    document.getElementById("game-container").style.display = "none";
    
}

winGame(){
  this.player.element.remove();
  this.obstacles.forEach(obstacle => obstacle.element.remove());

  this.gameIsOver = true;

  // Hide game screen
  this.gameScreen.style.display = "none";
  

  const finalScoreElement = document.getElementById("final-score-win");
    finalScoreElement.textContent = this.score;

    this.gameScreen.style.display = "none";
    document.getElementById("game-container").style.display = "none";
}
}