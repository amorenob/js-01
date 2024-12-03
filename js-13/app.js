
const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');
const selectEl = document.querySelector('#animations')

const CANVAS_WIDTH = canvas.width = 600;
const CAVAS_HEIGHT = canvas.height = 600;
const spriteWidth = 575;
const spriteheight = 523;

let playerState = 'run'
let spriteAnimations = {};

const animationsStates = [
    {
        name: 'idle',
        frames: 7
    },
    {
        name: 'jump',
        frames: 7
    },
    {
        name: 'fall',
        frames: 7
    },
    {
        name: 'run',
        frames: 9
    },
    {
        name: 'dizzy',
        frames:11
    },
    {
        name: 'sit',
        frames: 5
    },
    {
        name: 'roll',
        frames: 7
    },
    {
        name: 'bite',
        frames: 7
    },
    {
        name: 'ko',
        frames: 12
    },
    {
        name: 'getHit',
        frames: 4
    }
]

class Animation{
    constructor (name, frames, idx){
        this.name = name;
        this.frames = frames;
        this.loc = [];
        this.setLocation(idx)
    }

    setLocation(idx) {
        for (let i=0; i < this.frames; i++){
            this.loc.push({
                x: i * spriteWidth, 
                y: idx * spriteheight
            });
        };
    };
};

animationsStates.forEach((state, idx) => {
    spriteAnimations[state.name] = new Animation(state.name, state.frames, idx);
})


selectEl.addEventListener('change', (e) => {
    
    playerState = e.target.value;
    console.log(playerState);
});

console.log(spriteAnimations)

const playerImage = new Image();
playerImage.src = './img/shadow_dog.png'

let frame = 0;
const framesPerUpdate = 5;



function animate(){
    ctx.clearRect(0,0, CANVAS_WIDTH, CAVAS_HEIGHT);
    let state = spriteAnimations[playerState];
    let postion = Math.floor(frame/framesPerUpdate) % (state.frames-1);
    let { x:sx, y:sy } = state.loc[postion];
    frame++;
    ctx.drawImage(playerImage, sx, sy, spriteWidth, spriteheight, 0, 0, CANVAS_WIDTH, CAVAS_HEIGHT);
    requestAnimationFrame(animate);
}

animate();
