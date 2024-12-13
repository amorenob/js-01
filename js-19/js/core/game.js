import { Board } from './board.js';
import { Renderer } from './renderer.js';
import { UIManager } from '../utils/ui-manager.js';

class ChessGame {
    // Define time presets as static property
    static TIME_CONTROLS = {
        RAPID: {
            '10-0': { baseTime: 10 * 60 * 1000, increment: 0 },
            '15-0': { baseTime: 15 * 60 * 1000, increment: 0 },
            '15-10': { baseTime: 15 * 60 * 1000, increment: 10 * 1000 }
        },
        BLITZ: {
            '5-0': { baseTime: 5 * 60 * 1000, increment: 0 },
            '5-1': { baseTime: 5 * 60 * 1000, increment: 1000 },
            '5-5': { baseTime: 5 * 60 * 1000, increment: 5 * 1000 }
        },
        BULLET: {
            '1-0': { baseTime: 60 * 1000, increment: 0 },
            '1-1': { baseTime: 60 * 1000, increment: 1000 },
            '2-0': { baseTime: 2 * 60 * 1000, increment: 0 }
        }
    };

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
        this.gameHistory = [];
        // game Options
        this.gameOptions = {
            baseTime: ChessGame.TIME_CONTROLS.RAPID['15-10'].baseTime,
            increment: ChessGame.TIME_CONTROLS.RAPID['15-10'].increment,
            decrement: 10  // Update interval in milliseconds
        };
        // players remaining Time
        this.playersTime = {
            white: this.gameOptions.baseTime,
            black: this.gameOptions.baseTime
        };
        this.gameStatus = 'Waiting to start';
        this.loadDefaultGame();
        this.gameInterval = null;
    }

    async startFromFen(fen) {
        this.board.loadFromFen(fen);
        await this.renderer.initialRender();
    }

    loadFromFen(fen) {
        const fenParts = fen.split(' ');
        const fenString = fenParts[0];
        const turn = fenParts[1] ? fenParts[1] : 'w';
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

    loadDefaultGame() {
        this.startFromFen('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
        this.renderer.render();
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

        // increment the clock
        this.playersTime[this.currentTurn] += this.gameOptions.increment;
        this.ui.updatePlayersTime();

        this.renderer.render();
        this.switchTurn();


    }

    // TODO: make this a callback
    addGlobalClickListener() {
        document.addEventListener('click', (event) => {
            const clickedSquare  = this.board.getClickedSquare(event);
            // Get the piece at the clicked position
            const piece = this.board.grid[clickedSquare.row][clickedSquare.col];

            if (piece && piece.color === this.currentTurn) {
                console.log(piece);
                this.board.selectedPiece = piece;
                this.board.potentialMoves = this.board.getPotentialMoves(piece);
            } else {
                if (this.board.selectedPiece) {
                    //check if the move is in the potential moves
                    if (this.board.potentialMoves.some(move => move.row === clickedSquare.row && move.col === clickedSquare.col)) {
                        this.handlePieceMove(this.board.selectedPiece.position, clickedSquare);
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
        if (this.gameStatus === 'Waiting to start') {
            this.startGame();
        }

        if (this.isKingInCheck(this.currentTurn)) {
            this.gameStatus = 'Check!';
        } else {
            this.gameStatus = 'In Progress';
        }
        //console.log(this.currentTurn, this.isCheckmate());
        if (this.isCheckmate()) {
            this.gameStatus = 'Checkmate!';
        }
        this.ui.updateGameStatus(this.gameStatus);
    }

    startGame() {
        this.gameInterval = setInterval(() => {
            this.updatePlayersTime();
        }, this.gameOptions.decrement);
        this.gameStatus = 'In Progress';
    }   

    updatePlayersTime() {
        this.playersTime[this.currentTurn] -= this.gameOptions.decrement;
        this.ui.updatePlayersTime();
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

    getFormattedTime(time) {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    getGameTimeLeftFormatted() {
        const whiteTime = this.playersTime.white;
        const blackTime = this.playersTime.black;   
        const gameTimeLeft = {
            white: this.getFormattedTime(whiteTime),
            black: this.getFormattedTime(blackTime)
        }
        return gameTimeLeft;
    }

    reset(timeControl) {
        const [minutes, increment] = timeControl.split('-');
        const baseTime = parseInt(minutes) * 60 * 1000;
        const incrementTime = parseInt(increment) * 1000;

        // Reset game options
        this.gameOptions = {
            baseTime: baseTime,
            increment: incrementTime,
            decrement: 10
        };

        // Reset board
        this.board = new Board();
        this.renderer.board = this.board;
        this.loadDefaultGame();

        // Reset game state
        this.currentTurn = 'white';
        this.gameStatus = 'Waiting to start';
        
        // Reset players time
        this.playersTime = {
            white: this.gameOptions.baseTime,
            black: this.gameOptions.baseTime
        };
        
        // Reset castling rights
        this.castlingRights = {
            white: { king: true, queen: true },
            black: { king: true, queen: true }
        };
        
        // Clear history
        this.gameHistory = [];
        
        // Clear intervals
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
            this.gameInterval = null;
        }
        
        // Update UI
        this.renderer.render();
        this.ui.updateTurnDisplay();
        this.ui.updatePlayersTime();
    }

}

export { ChessGame };
