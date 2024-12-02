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
      // Call the restartGame function when the button is clicked
      restartGame();
    });

    restartButtonWin.addEventListener("click", function () {
      restartGame();
    });

    function restartGame() {
      location.reload();
    }
  
    function startGame() {
      console.log("start game");
      
      game = new Game(); // added
      game.start(); // added

    }
    
     /*{
      const key = event.key;
      const possibleKeystrokes = [
        "ArrowLeft",
        "ArrowUp",
        "ArrowRight",
        "ArrowDown",
      ];
  
      // Check if the pressed key is in the possibleKeystrokes array
      if (possibleKeystrokes.includes(key)) {
        event.preventDefault();
  
        // Update player's directionX and directionY based on the key pressed
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
    }*/
      function handleKeydown(e) { // 'e' is the event object passed explicitly
        const key = e.key;
        const possibleKeystrokes = ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"];
        if (possibleKeystrokes.includes(key)) {
          e.preventDefault(); // Explicitly use the event object
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
      

  
    // Add the handleKeydown function as an event listener for the keydown event
    window.addEventListener("keydown", handleKeydown);

function startMusic() {
    backgroundMusic.volume = 0.5; 
    backgroundMusic.play();
} 
};

// let progress = 5;

// function updateHealth(change, obstacleType) {
    
//     if (obstacleType == "obstacle"){
//        progress += 5;
//     }
//     else if (obstacleType == "obstacle2"){
//        progress += 7;
//     }
//     else if (obstacleType == "obstacle3"){
//       progress += 10;
//    }
//     else if (obstacleType == "obstacle4"){
//       progress -= 5;
//     }
//     else if (obstacleType == "obstacle5"){
//       progress -= 7;
//     }
//     else if (obstacleType == "obstacle6"){
//       progress -= 10;
//     }
//     progress = Math.max(0, Math.min(progress, 100));

    
//     const progressBar = document.getElementById("progress-bar");
//     progressBar.style.width = `${progress}%`;

// }
