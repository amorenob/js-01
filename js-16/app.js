const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const gameSpeed = 10;
let gameFrame = 0
let canvasPosition = canvas.getBoundingClientRect();
let explosions = [];
console.log(canvasPosition);


class Explosion {
    constructor(x, y){
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
        this.x = x - (this.width * 0.5);
        this.y = y - (this.height * 0.5);
        this.frame = 0 ;
        this.image = new Image();
        this.image.src = './img/boom.png';
        this.audio = new Audio();
        this.audio.src = './audio/impact 12.wav'
    }
    update(){
        if (this.frame === 0) this.audio.play();
        if (gameFrame % gameSpeed=== 0){
            this.frame++;
        }
        
    }
    draw(){
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, 
            this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height)
    }
}



window.addEventListener('click', (e) => {
    let canvasPosition = canvas.getBoundingClientRect();
    const x = e.x - canvasPosition.x
    const y = e.y - canvasPosition.y 
    const explosion = new Explosion(x, y)
    explosions.push(explosion)
    console.log(explosions)
})


function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    explosions.forEach((explosion) => {
        explosion.update()
        explosion.draw()
    })
    explosions = explosions.filter((x) => x.frame < 5)
    gameFrame++
    requestAnimationFrame(animate)
}

animate()