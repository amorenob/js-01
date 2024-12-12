import { Board } from './board.js';
import { Renderer } from './renderer.js';
import { UIManager } from './ui-manager.js';

class ChessGame {
    constructor(canvas, debug = false) {
        this.board = new Board();
        this.renderer = new Renderer(canvas, this.board, debug);
        this.currentTurn = 'white';
        this.debug = debug;
        this.ui = new UIManager(this);
        this.addGlobalClickListener();
    }

    async startFromFen(fen) {
        this.board.loadFromFen(fen);
        await this.renderer.initialRender();
    }

    loadFromFen(fen) {
        this.board.loadFromFen(fen);
        this.renderer.render();
    }

    makeMove(from, to) {
        this.board.movePiece(from, to);
        this.renderer.render();
        this.switchTurn();
    }

    // TODO: make this a callback
    addGlobalClickListener() {
        document.addEventListener('click', (event) => {
            const clickedPiece = this.board.getClickedPiece(event);
            // Get the piece at the clicked position
            const piece = this.board.grid[clickedPiece.row][clickedPiece.col];

            if (piece && piece.color === this.currentTurn) {
                console.log(piece);
                this.board.selectedPiece = piece;
                this.board.potentialMoves = this.board.getPotentialMoves(piece);
            } else {
                if (this.board.selectedPiece) {
                    //check if the move is in the potential moves
                    if (this.board.potentialMoves.some(move => move.row === clickedPiece.row && move.col === clickedPiece.col)) {
                        if (this.board.selectedPiece.type === 'king' && (clickedPiece.col === 2 || clickedPiece.col === 6)) {
                            this.board.performCastling(this.board.selectedPiece.position, clickedPiece);
                            this.switchTurn();
                        } else {    
                            this.makeMove(this.board.selectedPiece.position, clickedPiece);
                        }
                    } else {
                        console.log('Invalid move');
                    }
                    this.board.selectedPiece = null;
                    this.board.potentialMoves = [];
                }
            }
            this.renderer.render();
        });
    }
    switchTurn() {
        this.currentTurn = this.currentTurn === 'white' ? 'black' : 'white';
        this.ui.updateTurnDisplay();
        

        if (this.isKingInCheck(this.currentTurn)) {
            this.ui.updateGameStatus('Check!');
        } else {
            this.ui.updateGameStatus('In Progress');
        }
    }
    isKingInCheck(color) {
        return this.board.isSquareAttacked(this.board.getKing(color).position, color);
    }
}

export { ChessGame };