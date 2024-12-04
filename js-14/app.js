
const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');
const speedInputEl = document.querySelector('#speedSlider');
const showGameSpeedEl = document.querySelector('#showGameSpeed');

const CANVAS_WIDTH = canvas.width = 800;
const CAVAS_HEIGHT = canvas.height = 700;

let gameSpeed = 5;
showGameSpeedEl.textContent = gameSpeed;
speedInputEl.addEventListener('change', () => {
    gameSpeed = speedInputEl.value;  
    showGameSpeedEl.textContent = gameSpeed;
})

class Layer {

    constructor(image_src, speedModifier) {
        this.width = 2400;
        this.height = 700;
        this.image = new Image();
        this.image.src = image_src;
        this.x = 0;
        this.y = 0;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }

    update(){
        this.speed = gameSpeed * this.speedModifier;
        if (this.x <= -this.width)this.x = -1;
        this.x -= Math.floor(this.speed);
        
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
}

const bgLayer1 = new Layer('img/layer-1.png', 0.2);
const bgLayer2 = new Layer('img/layer-2.png', 0.4);
const bgLayer3 = new Layer('img/layer-3.png', 0.6);
const bgLayer4 = new Layer('img/layer-4.png', 0.8);
const bgLayer5 = new Layer('img/layer-5.png', 1);

const gameObjects = [bgLayer1, bgLayer2, bgLayer3, bgLayer4, bgLayer5]

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CAVAS_HEIGHT);

    gameObjects.forEach( (gameObject) => {
            gameObject.update();
            gameObject.draw();
    })

    requestAnimationFrame(animate);
}

window.addEventListener('load', animate)
