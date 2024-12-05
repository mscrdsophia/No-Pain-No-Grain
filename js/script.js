window.onload = function () {
    const startButton = document.getElementById("start-btn");
    const restartButton = document.getElementById("restart-button");
    const restartButtonWin = document.getElementById("restart-button-win");
    const buttonClickSound = document.getElementById("button-click-sound");
    const backgroundMusic = document.getElementById("background-music");
    let game;
    
    function playButtonClickSound() {
      buttonClickSound.currentTime = 0;
      buttonClickSound.play();
  } 
    startButton.addEventListener("click", function () {
      playButtonClickSound();
      startGame();
      startMusic();
    });


    restartButton.addEventListener("click", function () {
      playButtonClickSound();
      restartGame();
    });

    restartButtonWin.addEventListener("click", function () {
      playButtonClickSound();
      restartGame();
     
    });

    function restartGame() {
      location.reload();
    }
  
    function startGame() {
      console.log("start game");
      
      game = new Game(); 
      game.start(); 
    }
    
     
      function handleKeydown(e) { 
        const key = e.key;
        const possibleKeystrokes = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];
        if (possibleKeystrokes.includes(key)) {
          e.preventDefault(); 
          switch (key) {
            case "ArrowLeft":
              game.player.directionX = -1;
              break;
            case "ArrowUp":
              game.player.directionY = -1;
              break;
            case "ArrowRight":
              game.player.directionX = 1;
              break;
            case "ArrowDown":
              game.player.directionY = 1;
              break;
          }
        }
      }
      
    window.addEventListener("keydown", handleKeydown);

  function startMusic() {
    backgroundMusic.volume = 0.4; 
    backgroundMusic.play();
} 
};
