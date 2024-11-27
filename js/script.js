window.onload = function () {
    const startButton = document.getElementById("start-btn");
    const restartButton = document.getElementById("restart-button");
    let game;
  
    startButton.addEventListener("click", function () {
      startGame();
    });
  
    function startGame() {
      console.log("start game");
      
      game = new Game(); // added
      game.start(); // added

    }
    
    function handleKeydown(event) {
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
    }
  
    // Add the handleKeydown function as an event listener for the keydown event
    window.addEventListener("keydown", handleKeydown);
  };

  let progress = 0;

function updateProgress(change) {
    // Update the progress value
    progress += change;

    // Clamp progress between 0% and 100%
    if (progress < 0) progress = 0;
    if (progress > 100) progress = 100;

    // Update the visual progress bar
    const progressBar = document.getElementById("progress-bar");
    progressBar.style.width = `${progress}%`;
}

//progress = 0  // Start progress

//function updateProgress(obstacleType):
    //if obstacleType == "Obstacle1":
       //progress += 5
    //elif obstacleType == "Obstacle2":
       // progress -= 5

    // Clamp progress
    //if progress < 0:
        //progress = 0
    //elif progress > 100:
       //progress = 100

    //displayProgress(progress)