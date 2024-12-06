import Game from "./classes/Game.js";
import GameObject from "./classes/gameObject.js";
import MovementPattern from "./classes/MovementPattern.js";



const game = new Game('canvas1', 800, 600);
const player = new GameObject(210, 210, 100, 100);
const movementPattern = new MovementPattern(800, 600);
console.log(movementPattern);
player.addMovementPattern(movementPattern.leftToRight,10);
game.addObject(player);
game.start();
