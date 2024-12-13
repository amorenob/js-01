
import { ChessGame } from './js/core/game.js';

const canvas = document.getElementById('chess-board');
canvas.width = 800;
canvas.height = 800;
const game = new ChessGame(canvas, true);
game.startFromFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
//game.board.loadFromFen('rnbqk2r/ppppppbp/5np1/8/8/5NP1/PPPPPPBP/RNBQK2R w KQkq - 0 1');


// game.board.loadFromFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');




