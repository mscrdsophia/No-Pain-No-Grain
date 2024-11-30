class Obstacle {
   
        constructor(gameScreen, type = "obstacle") {
          this.gameScreen = gameScreen;
          this.type = type;
          this.left = Math.floor(Math.random() * 600 + 70); 
          this.top = 0; 
          this.width = 100; 
          this.height = 150; 
          this.element = document.createElement("img");
  
          
          this.element.src = 
          type === "obstacle" 
          ? "/images/grainsOfRice.png" 
          : type === "obstacle2" 
          ? "/images/vegetable.png"
          : type === "obstacle3" 
          ? "/images/hotDog.png"
          : type === "obstacle4"
          ? "/images/fries.png"
          : type === "obstacle5"
          ? "/images/cola.png"
          : type === "obstacle6"
          ? "/images/beef.png"
          : "/images/default.png";
  
          this.element.style.position = "absolute";
          this.element.style.width = `${this.width}px`;
          this.element.style.height = `${this.height}px`;
          this.element.style.left = `${this.left}px`;
          this.element.style.top = `${this.top}px`;
  
          this.gameScreen.appendChild(this.element);
      }
  
      updatePosition() {
          
          this.element.style.left = `${this.left}px`;
          this.element.style.top = `${this.top}px`;
      }
  
      move() {
          
          this.top += 3;
          this.updatePosition();
      }
}

class Obstacle2 extends Obstacle {
  constructor(gameScreen) {
      super(gameScreen, "obstacle2");
  }
}

class Obstacle3 extends Obstacle {
  constructor (gameScreen){
    super (gameScreen, "obstacle3");
  }
}
class Obstacle4 extends Obstacle {
  constructor (gameScreen){
    super (gameScreen, "obstacle4");
  }
}
class Obstacle5 extends Obstacle {
  constructor (gameScreen){
    super (gameScreen, "obstacle5");
  }
}
class Obstacle6 extends Obstacle {
  constructor (gameScreen){
    super (gameScreen, "obstacle6");
  }
}