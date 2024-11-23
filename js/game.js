class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.score = 0;
        this.gameOver = false;
        this.bowl = newBowl();
        this.foods = [];
        this.gameLoop = this.gameLoop.bind(this);
    }

    start() {
        this.gameLoop();
    }

    gameLoop() {
        if(!this.gameOver) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            document.addEventListener('keydown', (event) => {
                if (event.key === 'ArrowLeft') {
                  this.bowl.dx = -this.bowl.speed;
                } else if (event.key === 'ArrowRight') {
                  this.bowl.dx = this.bowl.speed;
                } else {
                  this.bowl.dx = 0;
                }
              });

            this.bowl.update();
            this.updateFoods();

            this.checkCollisions();

            this.bowl.draw(this.ctx);

            this.drawFoods(this.ctx);
            this.drawScore();
            requestAnimationFrame(this.gameLoop);

        } else {
            this.gameOverScreen();
          }

          if (Math.random() < 0.05) {
            grains.push(new Grain(Math.random() * canvas.width, 0, 20, 20, 2, grainImage));
          }

          if (Math.random() < 0.02) {
            processedFoods.push(new ProcessedFood(Math.random() * canvas.width, 0, 20, 20, 3, processedFoodImage));
          }

          grains.forEach(grain => {
            grain.update();
            grain.draw(ctx);
          });
      
          processedFoods.forEach(food => {
            food.update();
            food.draw(ctx);
          });
    }
}

class Player {
    constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    }

    draw(ctx) {
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        this.x = Math.max(0, Math.min(this.x, canvas.width - this.width));
    }

    checkCollisions(food) {
        return (
            this.x < food.x + food.width &&
            this.x + this.width > food.x &&
            this.y < food.y + food.height &&
            this.y + this.height > food.y
          );
    }
}

class Food {
    constructor(x, y, width, height, speed, image) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.image = image;
    }

    draw(ctx){
       ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
     }

     update() {
        this.y += this.speed;
      }
}

class Grain extends Food {
    constructor(x, y, width, height, speed, image) {
        super(x, y, width, height, speed, image);
    }
}

class ProcessedFood extends Food {
    constructor(x, y, width, height, speed, image) {
        super(x, y, width, height, speed, image);
    }
}