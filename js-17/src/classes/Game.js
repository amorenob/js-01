class Game {
    constructor(canvasId, canvasWidth, canvasHeight) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.lastTime = 0;
        this.gameObjects = [];
        this.gameSpeed = 1;
        this.paused = false;
        this.score = 0;
        
        // Set canvas dimensions
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
    }

    setGameSpeed(speed) {
        this.gameSpeed = speed;
    }

    togglePause() {
        this.paused = !this.paused;
    }

    addObject(gameObject) {
        this.gameObjects.push(gameObject);
    }

    update(currentTime) {
        if (this.paused) return;

        // Calculate delta time in seconds and apply game speed
        const deltaTime = ((currentTime - this.lastTime) / 1000) * this.gameSpeed;
        this.lastTime = currentTime;
     
        // Update all game objects
        this.gameObjects.forEach(object => {
            object.update(deltaTime);
        });
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Remove objects marked for deletion
        this.gameObjects = this.gameObjects.filter(object => !object.markedForDeletion);
        
        // Draw all game objects
        this.gameObjects.forEach(object => {
            object.draw(this.ctx);
        });

        

        // Draw game speed indicator if needed
        if (this.gameSpeed !== 1) {
            this.ctx.fillStyle = 'black';
            this.ctx.font = '20px Arial';
            this.ctx.fillText(`Speed: ${this.gameSpeed}x`, 10, 30);
        }

        // Draw score
        this.ctx.fillStyle = 'black';
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`Score: ${this.score}`, 10, 60);
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