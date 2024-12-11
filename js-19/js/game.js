import { Board } from './board.js';
import { Renderer } from './renderer.js';

class ChessGame {
    constructor(canvas, debug = false) {
        this.board = new Board();
        this.renderer = new Renderer(canvas, this.board, debug);
        this.currentTurn = 'white';
        this.debug = debug;
    }

    async startFromFen(fen) {
        this.board.loadFromFen(fen);
        this.renderer.render();
    }

    makeMove(from, to) {
        this.board.movePiece(from, to);
        this.renderer.render();
    }
}

export { ChessGame };