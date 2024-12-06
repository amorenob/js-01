class GameObject {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.velocity = {
            x: 1,
            y: 1
        };
        this.isActive = true;
        this.animation = null;
        this.movementPatterns = [];
    }

    addMovementPattern(pattern, ...args) {
        console.log(this.movementPatterns);
        this.movementPatterns.push(pattern);
        
    }

    update(deltaTime) {
        // Apply all movement patterns
        this.movementPatterns.forEach(pattern => pattern(this));
        
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
}

export default GameObject;