import GameObject from "../base/GameObject.js";

export default class Particle extends GameObject {
    constructor(x, y, size, color, velocity) {
        const rX = x + size/1.3 + Math.random() * 30 - 15;
        const rY = y + size/3 + Math.random() * 30 - 15;
        super(rX, rY, size, size);
        this.velocity = velocity;
        this.size = size;
        this.radius = Math.random() * this.size/15;
        this.maxRadius = this.radius * 3.5;
        this.color = color;
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.radius += 0.2;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = 1 - Math.min(1, (this.radius / this.maxRadius));
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
    markForDeletion() {
        return this.radius >= this.maxRadius;
    }
}