
import { Piece } from './pieces/piece.js';
import { Pawn } from './pieces/pawn.js';
import { Rook } from './pieces/rook.js';
import { Bishop } from './pieces/bishop.js';
import { Knight } from './pieces/knight.js';
import { Queen } from './pieces/queen.js';
import { King } from './pieces/king.js';

class Board {
    constructor() {
        this.grid = this.initializeGrid();
        this.addGlobalClickListener();
        this.selectedPiece = null;
        this.potentialMoves = [];
    }
    initializeGrid() {
        return Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => null));
    }

    loadFromFen(fen) {
        // load board from FEN string
        this.grid = this.initializeGrid();

        const boardPositions = fen.split(' ')[0];
        const rows = boardPositions.split('/');
        for (let row = 0; row < rows.length; row++) {
            let col = 0;
            for (const char of rows[row]) {
                if (!isNaN(char)) {
                    // Empty squares (number indicates how many)
                    col += parseInt(char, 10);
                } else {
                    // Create a ChessPiece instance based on FEN notation
                    const color = char === char.toUpperCase() ? "white" : "black";
                    const type = this.getPieceTypeFromFEN(char.toLowerCase());
                    switch (type) {
                        case 'pawn':
                            this.grid[row][col] = new Pawn(color, this.getPosition(row, col));
                            break;
                        case 'rook':
                            this.grid[row][col] = new Rook(color, this.getPosition(row, col));
                            break;
                        case 'bishop':
                            this.grid[row][col] = new Bishop(color, this.getPosition(row, col));
                            break;
                        case 'knight':
                            this.grid[row][col] = new Knight(color, this.getPosition(row, col));
                            break;
                        case 'queen':
                            this.grid[row][col] = new Queen(color, this.getPosition(row, col));
                            break;
                        case 'king':
                            this.grid[row][col] = new King(color, this.getPosition(row, col));
                            break;
                        default:
                            this.grid[row][col] = new Piece(type, color, this.getPosition(row, col));
                    }
                    col++;
                }
            }
        }
    }

    getPieceTypeFromFEN(char) {
        const pieceMap = {
            'p': 'pawn',
            'n': 'knight',
            'b': 'bishop',
            'r': 'rook',
            'q': 'queen',
            'k': 'king'
        };
        return pieceMap[char];
    }

    getPosition(row, col) {
        // Convert grid coordinates to chess notation (e.g., "a8", "e4")
        const files = "abcdefgh";
        return files[col] + (8 - row);
    }

    getRowColFromPosition(position) {
        const row = 8 - parseInt(position[1]);
        const col = position.charCodeAt(0) - 'a'.charCodeAt(0);
        return { row, col };
    }

    movePiece(from, to) {
        if (this.grid[from.row][from.col] === null) {
            console.log('No piece at', from);
            return;
        }
        const piece = this.grid[from.row][from.col];
        this.grid[to.row][to.col] = piece;
        this.grid[from.row][from.col] = null;
        piece.position = to;
    }

    getBlackPieces() {
        return this.grid.flat().filter(piece => piece && piece.color === 'black');
    }

    getWhitePieces() {
        return this.grid.flat().filter(piece => piece && piece.color === 'white');
    }

    // TODO: make this a callback
    addGlobalClickListener() {
        document.addEventListener('click', (event) => {
            const clickedPiece = this.getClickedPiece(event);
            // Get the piece at the clicked position
            const piece = this.grid[clickedPiece.row][clickedPiece.col];
            
            if (piece) {
                console.log(piece.position);
                this.selectedPiece = piece;
                this.potentialMoves = piece.getValidMoves(this);
                console.log(this.potentialMoves);
            } else {
                if (this.selectedPiece) {
                    //check if the move is in the potential moves
                    if (this.potentialMoves.some(move => move.row === clickedPiece.row && move.col === clickedPiece.col)) {
                        this.movePiece(this.selectedPiece.position, clickedPiece);
                    } else {
                        console.log('Invalid move');
                    }
                    this.selectedPiece = null;
                    this.potentialMoves = [];
                }
            }
        });
    }

    getClickedPiece(event) {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const row = Math.floor(y / 100); //TODO: make this dynamic
        const col = Math.floor(x / 100); //TODO: make this dynamic
        return { row, col };
    }

}

export { Board };