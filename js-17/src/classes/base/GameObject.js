class GameObject {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocity = {
            x: 60,
            y: 60
        };
        this.isActive = true;
        this.animation = null;
        this.movementPatterns = [];
        this.deltaTime = 0;
        this.markedForDeletion = false;
    }

    addMovementPattern(pattern, ...args) {
        this.movementPatterns.push((gameObject) => pattern(gameObject, ...args));
    }

    update(deltaTime) {
        this.deltaTime = deltaTime;
        this.movementPatterns.forEach((pattern) => pattern(this));
        this.markedForDeletion = this.markForDeletion(this);

    }

    draw(context) {
        if (!this.isActive) return;
        else {
            context.fillStyle = 'red';
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    // Utility methods that child classes might need
    getBounds() {
        return {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
        };
    }

    collidesWith(other) {
        const bounds = this.getBounds();
        const otherBounds = other.getBounds();

        return bounds.left < otherBounds.right &&
               bounds.right > otherBounds.left &&
               bounds.top < otherBounds.bottom &&
               bounds.bottom > otherBounds.top;
    }

    markForDeletion(callback) {
        this.markedForDeletion = this.markedForDeletion || callback(this);
    }
}

export default GameObject;