import Game from "./classes/Game.js";
import MovementPattern from "./classes/utils/MovementPattern.js";
import Sprite from "./classes/base/Sprite.js";
import Explosion from "./classes/effects/Explosion.js";
import Particle from "./classes/effects/Particle.js";

const game = new Game('canvas1', 1024, 800);
MovementPattern.CANVAS_WIDTH = game.canvas.width;
MovementPattern.CANVAS_HEIGHT = game.canvas.height;
game.setGameSpeed(1.2); 

class Raven extends Sprite {
    constructor() {
        const spriteWidth = Math.random() * 200 + 50;
        const spriteHeight = spriteWidth * 194 / 271;
        const velocity = {
            x: Math.random() * 100 + 100,
            y: Math.random() * 100 + 100
        };
        const frameInterval = velocity.x * -0.0002 + 0.08;
        super(
            game.canvas.width, 
            (Math.random() * (game.canvas.height-300)) + 100, 
            spriteWidth, 
            spriteHeight, 
            'assets/images/enemy_raven.png', 
            271, 
            194, 
            6, 
            frameInterval
        );
        this.velocity = velocity;

        this.addMovementPattern(MovementPattern.randomDiagonal, 0.8);
        this.addMovementPattern(MovementPattern.bounceOnTopAndBottom);


        this.boundHandleClick = this.handleClick.bind(this);
        this.lastFrame = 0;
        this.particlesColor = `rgba(${Math.random() * 125}, ${Math.random() * 125}, ${Math.random() * 125}, 0.5)`;
        this.hasTrail = Math.random() > 0.5;
    }

    markForDeletion() {
        return this.x < 0 - this.width || this.markedForDeletion;
    }

    handleClick(event) {
        let canvasPosition = game.canvas.getBoundingClientRect();
        const clickX = event.x - canvasPosition.x;
        const clickY = event.y - canvasPosition.y;
        const bounds = this.getBounds();

        if (bounds.left < clickX && bounds.right > clickX && bounds.bottom > clickY && bounds.top < clickY) {
            console.log('Shoot at position:', clickX, clickY);
            this.markedForDeletion = true;
            this.unbindEvents();
            game.score++;
            const explosion = new Explosion(this.x, this.y, this.width);
            game.addObject(explosion);
        }
    }

    update(deltaTime) {
        super.update(deltaTime);
        if (this.frame !== this.lastFrame && this.hasTrail) {
            this.lastFrame = this.frame;
            for (let i = 0; i < 2; i++) {
                const particle = new Particle(this.x , this.y , this.width, this.particlesColor, this.velocity);
                game.addObject(particle);
            }
        }
    }

    bindEvents() {
        document.addEventListener('click', this.boundHandleClick);
    }
    unbindEvents() {
        document.removeEventListener('click', this.boundHandleClick);
    }
}


setInterval(() => {
    const raven = new Raven();
    raven.bindEvents();
    game.addObject(raven);
    game.gameObjects.sort((a, b) => a.width - b.width);
}, 500);



game.start();