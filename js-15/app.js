
// Suggested code may be subject to a license. Learn more: ~LicenseLog:3429813277.
const canvas1 = document.getElementById('canvas1')
const ctx1 = canvas1.getContext('2d');
const canvas2 = document.getElementById('canvas2')
const ctx2 = canvas2.getContext('2d');
const canvas3 = document.getElementById('canvas3')
const ctx3 = canvas3.getContext('2d');
const canvas4 = document.getElementById('canvas4')
const ctx4 = canvas4.getContext('2d');

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 800;

canvas1.width = CANVAS_WIDTH;
canvas1.height = CANVAS_HEIGHT;

canvas2.width = CANVAS_WIDTH;
canvas2.height = CANVAS_HEIGHT;

canvas3.width = CANVAS_WIDTH;
canvas3.height = CANVAS_HEIGHT;

canvas4.width = CANVAS_WIDTH;
canvas4.height = CANVAS_HEIGHT;

let enemyObjects = [];
let gameFrame = 0;
const numberOfEnemies = 50;

class MovementPatterns {
    static waveAnglexMod = Math.random() * Math.PI/2;
    static waveAngleyMod = Math.random() * Math.PI/2;
    static randomSpeed = Math.random() * 2 + 1;
    static waveAngle = Math.random() * 0.02 + 0.02; 
    static leftToRight(obj){
        obj.x += obj.xSpeed;
        if (obj.x > CANVAS_WIDTH - obj.width) obj.x = 0;
    }
    static rightToLeft(obj){
        obj.x -= obj.xSpeed;
        if (obj.x < 0 - obj.width) obj.x = CANVAS_WIDTH;
    }
    static topToBottom(obj){
        obj.y += obj.ySpeed;
        if (obj.y > CANVAS_HEIGHT - obj.height) obj.y = 0;
    }
    static bottomToTop(obj){
        obj.y -= obj.ySpeed;
        if (obj.y < 0 - obj.height) obj.y = CANVAS_HEIGHT;
    }
    static shaking(obj){
        obj.x += Math.random() * 8 - 4;
        obj.y += Math.random() * 5 - 2.5;
    }
    static bounceOnBorders(obj){
        if(obj.x < 0) 
            obj.xSpeed = Math.abs(obj.xSpeed); 
        if(obj.x > CANVAS_WIDTH - obj.width) 
            obj.xSpeed = Math.abs(obj.xSpeed) * -1;
        if(obj.y < 0) 
            obj.ySpeed =  Math.abs(obj.ySpeed);
        if(obj.y > CANVAS_HEIGHT - obj.height) 
            obj.ySpeed = Math.abs(obj.ySpeed) * -1;
        obj.x += obj.xSpeed;
        obj.y += obj.ySpeed;
    }
    static waveUpAndDown(obj){
        if (!obj.waveAmplitude) {
            obj.waveAmplitude = Math.random() * 3 + 1;
            obj.waveFrequency = Math.random() * 0.1 + 0.02; 
        }
        obj.y += Math.sin(gameFrame * obj.waveFrequency) * obj.waveAmplitude;
    }
    static waveLegtToRight(obj){
        if (!obj.waveAmplitude) {
            obj.waveAmplitude = Math.random() * 100 + 1;
            obj.waveFrequency = Math.random() * 0.1 + 0.02; 
        }
        obj.x = Math.sin(gameFrame * obj.waveFrequency) * obj.waveAmplitude + (CANVAS_WIDTH- obj.width) / 2;
    }
    static randomSinCos(obj){
        if (!obj.waveAngle) {
            obj.waveAngle = Math.random() * 0.04 + 0.02; 
            obj.waveAnglexMod = MovementPatterns.waveAnglexMod;
            obj.waveAngleyMod = MovementPatterns.waveAngleyMod;
        }
        obj.x = CANVAS_WIDTH/2 * Math.sin(gameFrame * obj.waveAngle * obj.waveAnglexMod ) + (CANVAS_WIDTH- obj.width) / 2;
        obj.y = CANVAS_HEIGHT/2 * Math.cos(gameFrame * obj.waveAngle * obj.waveAngleyMod) + (CANVAS_HEIGHT- obj.height) / 2;
    }
    static randomJump(obj){
        if (!obj.newX) {
            obj.newX = Math.random() * (CANVAS_WIDTH - obj.width);
            obj.newY = Math.random() * (CANVAS_HEIGHT - obj.height);
            obj.jumpP = Math.floor(Math.random() * 200 + 50)
        }
        if (gameFrame % obj.jumpP === 0){
            obj.newX = Math.random() * (CANVAS_WIDTH - obj.width);
            obj.newY = Math.random() * (CANVAS_HEIGHT - obj.height);
        }
        let dx = obj.x - obj.newX ;
        let dy = obj.y - obj.newY;
        obj.x -= dx / 70;
        obj.y -= dy / 70;

    }
}

class Enemy {
    constructor(width, image, spriteWidth, spriteHeight, movementPatterns, ctx){
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.width = width;
        this.height = Math.floor(this.width * this.spriteHeight / this.spriteWidth);
        this.x = Math.random() * (CANVAS_WIDTH - this.width);
        this.y = Math.random() * (CANVAS_HEIGHT - this.height);
        this.xSpeed = Math.random() * 2;
        this.ySpeed = Math.random() * 2;
        this.image = image;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.movementPatterns = movementPatterns;
        this.ctx = ctx;
    }

    update(){
        if (this.movementPatterns.length > 0){
            this.movementPatterns.forEach(pattern => {
                pattern(this);
            })
        }
        if (gameFrame % this.flapSpeed === 0){
            this.frame++;
            this.frame = this.frame % 4;

        }
    }

    draw(){
        this.ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, 
            this.spriteWidth, this.spriteHeight, 
            this.x, this.y, this.width, this.height);
    }
}


// Sprite 1 
const enemy1Image = new Image();
enemy1Image.src = './img/enemy1.png';
const enemy1Patterns = [
    MovementPatterns.shaking, 
    MovementPatterns.bounceOnBorders,
    MovementPatterns.waveUpAndDown
];

// Sprite 2
const enemy2Image = new Image();
enemy2Image.src = './img/enemy2.png';
const enemy2Patterns = [
    MovementPatterns.rightToLeft,
    MovementPatterns.waveUpAndDown
];

// Sprite 3
const enemy3Image = new Image();
enemy3Image.src = './img/enemy3.png';
const enemy3Patterns = [
    MovementPatterns.randomSinCos
];

// Sprite 4
const enemy4Image = new Image();
enemy4Image.src = './img/enemy4.png';
const enemy4Patterns = [
    MovementPatterns.shaking,
    MovementPatterns.randomJump
];

// Create an array of enemies Sprite 1
for (let i=0; i < numberOfEnemies; i++){
    enemyObjects.push(new Enemy(100, enemy1Image, 293, 155, enemy1Patterns, ctx1));
}
// Create an array of enemies Sprite 2
for (let i=0; i < numberOfEnemies; i++){
    enemyObjects.push(new Enemy(100, enemy2Image, 266, 188, enemy2Patterns, ctx2));
}
// Create an array of enemies Sprite 3
for (let i=0; i < numberOfEnemies; i++){
    enemyObjects.push(new Enemy(100, enemy3Image, 218, 177, enemy3Patterns, ctx3));
}
// Create an array of enemies Sprite 4
for (let i=0; i < numberOfEnemies/4; i++){
    enemyObjects.push(new Enemy(100, enemy4Image, 213, 213, enemy4Patterns, ctx4));
}

console.log(enemyObjects)
function animate(){
    ctx1.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx2.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx3.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx4.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemyObjects.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();