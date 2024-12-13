import { Board } from './board.js';
import { Renderer } from './renderer.js';
import { UIManager } from '../utils/ui-manager.js';

class ChessGame {
    constructor(canvas, debug = false) {
        this.board = new Board();
        this.renderer = new Renderer(canvas, this.board, debug);
        this.currentTurn = 'white';
        this.debug = debug;
        this.ui = new UIManager(this);
        this.addGlobalClickListener();
        this.castlingRights = {
            white: {
                king: true,
                queen: true
            },
            black: {
                king: true,
                queen: true
            }
        };
    }

    async startFromFen(fen) {
        this.board.loadFromFen(fen);
        await this.renderer.initialRender();
    }

    loadFromFen(fen) {
        const fenParts = fen.split(' ');
        const fenString = fenParts[0];
        const turn = fenParts[1];
        this.board.loadFromFen(fenString);
        this.currentTurn = turn === 'w' ? 'white' : 'black';
        this.ui.updateTurnDisplay();
        // TODO: add castling rights
        // TODO: add en passant square
        // TODO: add halfmove clock
        // TODO: add fullmove number
        this.renderer.render();
    }

    saveToFen() {
        let fen = this.board.saveToFen();
        // Add the current turn to the fen
        fen += ' ' + this.currentTurn[0];
        // TODO: add castling rights
        // TODO: add en passant square
        // TODO: add halfmove clock
        // TODO: add fullmove number
        return fen;
    }

    makeMove(from, to) {
        this.board.movePiece(from, to);

        // If king is moved, update castling rights
        if (this.board.selectedPiece.type === 'king' && this.board.selectedPiece.hasMoved) {
            this.castlingRights[this.currentTurn]['king'] = false;
            this.castlingRights[this.currentTurn]['queen'] = false;
            console.log(this.castlingRights);
        }

        // If rook is moved, update castling rights
        if (this.board.selectedPiece.type === 'rook') {
            if (this.board.selectedPiece.position.col === 0) {
                this.castlingRights[this.currentTurn]['queen'] = false;
            } else if (this.board.selectedPiece.position.col === 7) {
                this.castlingRights[this.currentTurn]['king'] = false;
            }
            console.log(this.castlingRights);
        }
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
                        this.handlePieceMove(this.board.selectedPiece.position, clickedPiece);
                        this.board.selectedPiece = null;
                        this.board.potentialMoves = [];
                    } else {
                        console.log('Invalid move');
                    }
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
        //console.log(this.currentTurn, this.isCheckmate());
        if (this.isCheckmate()) {
            this.ui.updateGameStatus('Checkmate!');
        }
    }
    isKingInCheck(color) {
        return this.board.isSquareAttacked(this.board.getKing(color).position, color);
    }
    isCheckmate() {
        const king = this.board.getKing(this.currentTurn);
        // Evaluate all moves of the king
        const moves = this.board.getPotentialMoves(king);
        // Check if any other piece can move to a square that would block the king
        const canBeBlocked = this.board.getPieces(this.currentTurn).some(piece => {
            const pieceMoves = this.board.getPotentialMoves(piece);
            return pieceMoves.length > 0;
        });
        //console.log(moves);
        return moves.length === 0 && !canBeBlocked;
    }

    handlePieceMove(selectedPosition, targetPosition) {
        const selectedPiece = this.board.selectedPiece;
        // If the move is a castling move, handle it
        if (selectedPiece.type === 'king' &&
            selectedPiece.isCastlingMove) {
            this.handleCastling(targetPosition);
        } else {
            this.makeMove(selectedPosition, targetPosition);
        }
    }

    hasAnyCastlingRights(color) {
        return this.castlingRights[color]['king'] || this.castlingRights[color]['queen'];
    }


    handleCastling(targetPosition) {
        const castlingPositions = this.board.KingCastlingPositions[this.currentTurn];
        const castlingSide =
            targetPosition.col === castlingPositions.king.col ? 'king' : 'queen';

        if (this.castlingRights[this.currentTurn][castlingSide]) {
            this.board.performCastling(this.board.selectedPiece.position, targetPosition);
            this.switchTurn();
        } else {
            console.log('Invalid castling rights');
        }
    }

}

export { ChessGame };
