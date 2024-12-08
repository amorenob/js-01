class MovementPattern {
    static CANVAS_WIDTH = 800;   // Default canvas width
    static CANVAS_HEIGHT = 600;  // Default canvas height
    
    static leftToRight(gameObject) {
        gameObject.x += gameObject.velocity.x * gameObject.deltaTime;
    }

    static rightToLeft(gameObject) {
        gameObject.x -= gameObject.velocity.x * gameObject.deltaTime;
    }

    static bounceOnTopAndBottom(gameObject) {
        if (gameObject.y < 0) {
            gameObject.y = 0;
            gameObject.velocity.y = Math.abs(gameObject.velocity.y);
        }
        if (gameObject.y > MovementPattern.CANVAS_HEIGHT - gameObject.height) {
            gameObject.y = MovementPattern.CANVAS_HEIGHT - gameObject.height;
            gameObject.velocity.y = Math.abs(gameObject.velocity.y) * -1;
        }
    }

    // random diagonal movement
    static randomDiagonal(gameObject, maxShift = 1) {
        if (!gameObject.yShift) {
            gameObject.yShift = Math.random()*maxShift - maxShift/2;
            gameObject.velocity.y *= gameObject.yShift;
        }
        MovementPattern.rightToLeft(gameObject);
        gameObject.y +=  gameObject.velocity.y * gameObject.deltaTime;
    }

    static sine(gameObject, amplitude = 50, frequency = 1) {
        gameObject.sineOffset = gameObject.sineOffset || 0;
        gameObject.baseY = gameObject.baseY ?? gameObject.y;
        
        gameObject.y = gameObject.baseY + Math.sin(gameObject.sineOffset) * amplitude;
        gameObject.sineOffset += frequency * gameObject.deltaTime;
    }

    static circle(gameObject, radius = 100, speed = 1) {
        gameObject.angle = gameObject.angle || 0;
        gameObject.centerX = gameObject.centerX ?? gameObject.x;
        gameObject.centerY = gameObject.centerY ?? gameObject.y;

        gameObject.x = gameObject.centerX + Math.cos(gameObject.angle) * radius;
        gameObject.y = gameObject.centerY + Math.sin(gameObject.angle) * radius;
        gameObject.angle += speed * gameObject.deltaTime;
    }

    static randomJump(gameObject, interval = 1) {
        if (!gameObject.nextJump) {
            gameObject.nextJump = interval;
        }

        gameObject.nextJump -= gameObject.deltaTime;
        if (gameObject.nextJump <= 0) {
            gameObject.x = Math.random() * (MovementPattern.CANVAS_WIDTH - gameObject.width);
            gameObject.y = Math.random() * (MovementPattern.CANVAS_HEIGHT - gameObject.height);
            gameObject.nextJump = interval;
        }
    }

    static shake(gameObject, intensity = 300) {
        const delta = intensity * gameObject.deltaTime;
        gameObject.x += Math.random() * delta - delta/2;
        gameObject.y += Math.random() * delta - delta/2;
    }

    static bounceOnBorders(gameObject) {
        // Bounce on borders with velocity adjustments
        if(gameObject.x < 0) 
            gameObject.velocity.x = Math.abs(gameObject.velocity.x); 
        if(gameObject.x > MovementPattern.CANVAS_WIDTH - gameObject.width) 
            gameObject.velocity.x = Math.abs(gameObject.velocity.x) * -1;
        if(gameObject.y < 0) 
            gameObject.velocity.y = Math.abs(gameObject.velocity.y);
        if(gameObject.y > MovementPattern.CANVAS_HEIGHT - gameObject.height) 
            gameObject.velocity.y = Math.abs(gameObject.velocity.y) * -1;

        // Apply movement with deltaTime
        gameObject.x += gameObject.velocity.x * gameObject.deltaTime;
        gameObject.y += gameObject.velocity.y * gameObject.deltaTime;
    }

    // Method to set canvas dimensions if needed
    static setCanvasDimensions(width, height) {
        MovementPattern.CANVAS_WIDTH = width;
        MovementPattern.CANVAS_HEIGHT = height;
    }
}

export default MovementPattern;