class Game {
    constructor() {
      this.startScreen = document.getElementById("game-intro");
      this.gameScreen = document.getElementById("game-screen");
      this.gameEndScreen = document.getElementById("game-end");
      this.winGameScreen = document.getElementById("win-game");
      this.backgroundMusic = document.getElementById("background-music");
      this.collisionSound = document.getElementById("collision-sound");
      this.yaySound = document.getElementById("yayy-page");
      this.gameOverAudio = document.getElementById("game-over-audio");
      this.player = new Player(this.gameScreen,
        200,
        500,
        100,
        150,
        "./images/newBowl.png");
      this.height = window.innerHeight;
      this.width = window.innerWidth; 
      this.obstacles = [];
      this.score = 0;
      this.gameIsOver = false;
      this.gameIntervalId;
      this.gameLoopFrequency = Math.round(1000/60); // 60fps
      this.health = 5;
    }

    
    start() {
      this.gameScreen.style.height = `${this.height}px`;
      this.gameScreen.style.width = `${this.width}px`;
  
      this.startScreen.style.display = "none";
      document.getElementById("game-container").style.display = 'flex';
      
      this.gameScreen.style.display = "block";

      this.gameLoop();

    }

    gameLoop() {
      console.log("in the game loop");
      if (this.gameIsOver) return;

      this.update();
      requestAnimationFrame(() => this.gameLoop());

    }

    startMusic() {
      this.backgroundMusic.volume = 0.5; 
      this.backgroundMusic.play();
  }
  
      stopMusic() {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0; 
  }

      startYaySound(){
        this.yaySound.volume = 0.5;
        this.yaySound.play();
      }

      startGameoverAudio(){
        this.gameOverAudio.volume = 0.5;
        this.gameOverAudio.play();
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
      
   update() { 
      console.log("in the update");
      this.player.move();
     
          for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i];
            obstacle.move();
        
            if (this.player.didCollide(obstacle)) {
              this.collisionSound.currentTime = 0; 
              this.collisionSound.play();
             
  this.updateHealth(obstacle.type);

  
  if (obstacle.type === "obstacle") {
    this.score += 5;
  } else if (obstacle.type === "obstacle2") {
    this.score += 7;
  } else if (obstacle.type === "obstacle3") {
    this.score += 10;
  }
  else if (obstacle.type == "obstacle4"){
    this.score -= 5;
  }
  else if (obstacle.type == "obstacle5"){
    this.score -= 7;
  }
  else if (obstacle.type == "obstacle6"){
    this.score -= 10;
  }

  this.updateScoreDisplay();

 
  obstacle.element.remove();
  this.obstacles.splice(i, 1);
  i--;
} else if (obstacle.top > this.height) {
  this.score;
  this.updateScoreDisplay();

  obstacle.element.remove();
  this.obstacles.splice(i, 1);
  i--;
}       
}
      
      
         

          if (Math.random() > 0.98 && this.obstacles.length < 10) {
            const randomType = Math.random();
            let newObstacle;
    
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

    const isOverlapping = this.obstacles.some((obstacle) => this.checkOverlap(obstacle, newObstacle));

    if (!isOverlapping) {
        this.obstacles.push(newObstacle);
    } else {
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
        obstacle1.left + obstacle1.width < obstacle2.left || 
        obstacle1.left > obstacle2.left + obstacle2.width || 
        obstacle1.top + obstacle1.height < obstacle2.top || 
        obstacle1.top > obstacle2.top + obstacle2.height    
    );
}
endGame() {
  this.player.element.remove();
  this.obstacles.forEach(obstacle => obstacle.element.remove());

  this.gameIsOver = true;
  this.stopMusic(); 
  this.startGameoverAudio();

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
  this.stopMusic();  
  this.startYaySound(); 
  
  this.gameScreen.style.display = "none";
  

  const finalScoreElement = document.getElementById("final-score-win");
    finalScoreElement.textContent = this.score;

    this.gameScreen.style.display = "none";
    document.getElementById("game-container").style.display = "none";
}


}