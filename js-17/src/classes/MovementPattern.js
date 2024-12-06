class MovementPattern {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }
    
    // Movement patterns
    leftToRight(gameObject, speed = 2) {
        gameObject.x += speed;
        console.log(this);
        if (gameObject.x > this.canvasWidth - gameObject.width) {
            gameObject.x = 0;
        }
    }

    rightToLeft(gameObject, speed = 2) {
        gameObject.x -= speed;
        if (gameObject.x < 0 - gameObject.width) {
            gameObject.x = this.canvasWidth;
        }
    }

    bounce(gameObject) {
        // Update position based on velocity
        gameObject.x += gameObject.velocity.x;
        gameObject.y += gameObject.velocity.y;

        // Bounce on borders
        if (gameObject.x <= 0 || gameObject.x >= this.canvasWidth - gameObject.width) {
            gameObject.velocity.x *= -1;
        }
        if (gameObject.y <= 0 || gameObject.y >= this.canvasHeight - gameObject.height) {
            gameObject.velocity.y *= -1;
        }
    }

    sine(gameObject, amplitude = 50, frequency = 0.02) {
        gameObject.sineOffset = gameObject.sineOffset || 0;
        gameObject.baseY = gameObject.baseY ?? gameObject.y;
        
        gameObject.y = gameObject.baseY + Math.sin(gameObject.sineOffset) * amplitude;
        gameObject.sineOffset += frequency;
    }

    circle(gameObject, radius = 100, speed = 0.02) {
        gameObject.angle = gameObject.angle || 0;
        gameObject.centerX = gameObject.centerX ?? gameObject.x;
        gameObject.centerY = gameObject.centerY ?? gameObject.y;

        gameObject.x = gameObject.centerX + Math.cos(gameObject.angle) * radius;
        gameObject.y = gameObject.centerY + Math.sin(gameObject.angle) * radius;
        gameObject.angle += speed;
    }

    randomJump(gameObject, interval = 60) {
        if (!gameObject.nextJump) {
            gameObject.nextJump = interval;
        }

        gameObject.nextJump--;
        if (gameObject.nextJump <= 0) {
            gameObject.x = Math.random() * (this.canvasWidth - gameObject.width);
            gameObject.y = Math.random() * (this.canvasHeight - gameObject.height);
            gameObject.nextJump = interval;
        }
    }

    shake(gameObject, intensity = 5) {
        gameObject.x += Math.random() * intensity - intensity/2;
        gameObject.y += Math.random() * intensity - intensity/2;
    }
} 

export default MovementPattern;