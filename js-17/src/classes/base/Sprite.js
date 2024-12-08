import GameObject from "./GameObject.js";

export default class Sprite extends GameObject {
    constructor(x, y, width, height, imgSrc, spriteWidth, spriteHeight, spriteSheetColumns, frameInterval = 0.1) {
        super(x, y, width, height);
        this.img = new Image();
        this.img.src = imgSrc;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.frame = 0;
        this.frameInterval = frameInterval;
        this.frameTimer = 0;
        this.spriteSheetColumns = spriteSheetColumns;
    }

    update(deltaTime) {
        super.update(deltaTime);
        this.frameTimer += deltaTime;
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            this.frame = (this.frame + 1) % this.spriteSheetColumns;
        }
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight, 
            this.x, this.y, this.width, this.height);
    }

}