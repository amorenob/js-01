class Game {
    constructor(canvasId, canvasWidth, canvasHeight) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.lastTime = 0;
        this.gameObjects = [];
        
        // Set canvas dimensions
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
    }

    addObject(gameObject) {
        this.gameObjects.push(gameObject);
    }

    update(currentTime) {
        // Calculate delta time in seconds
        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        // Update all game objects
        this.gameObjects.forEach(object => {
            object.update(deltaTime);
        });
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw all game objects
        this.gameObjects.forEach(object => {
            object.draw(this.ctx);
        });
    }

    gameLoop(currentTime) {
        this.update(currentTime);
        this.draw();
        
        // Continue the game loop
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    start() {
        // Start the game loop
        requestAnimationFrame((time) => this.gameLoop(time));
    }
}

export default Game; 