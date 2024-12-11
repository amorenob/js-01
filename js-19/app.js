
import { ChessGame } from './js/game.js';

const canvas = document.getElementById('chess-board');
canvas.width = 800;
canvas.height = 800;

const game = new ChessGame(canvas, true);


// game.board.loadFromFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');


game.startFromFen('rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1');
game.renderer.renderLoop();
console.log(game.board.grid);
