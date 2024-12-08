import Sprite from "../base/Sprite.js";

export default class Explosion extends Sprite {
    
    constructor(x, y, width) {
        const imgSrc = 'assets/images/boom.png';
        const spriteWidth = 200;
        const spriteHeight = 179;
        const spriteSheetColumns = 5;
        const height = width * spriteHeight / spriteWidth;
        const frameInterval = 0.05;
        super(x, y, width, height, imgSrc, spriteWidth, spriteHeight, spriteSheetColumns, frameInterval);
        this.audio = new Audio('assets/audio/Impact 12.wav');
    }

    markForDeletion() {
        return this.frame === this.spriteSheetColumns - 1;
    }

    update(deltaTime) {
        super.update(deltaTime);
        if (this.frame === 0) this.audio.play();
    }
}