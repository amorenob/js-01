
import { Piece } from '../pieces/piece.js';
import { Pawn } from '../pieces/pawn.js';
import { Rook } from '../pieces/rook.js';
import { Bishop } from '../pieces/bishop.js';
import { Knight } from '../pieces/knight.js';
import { Queen } from '../pieces/queen.js';
import { King } from '../pieces/king.js';

class Board {
    constructor() {
        this.grid = this.initializeGrid();
        this.selectedPiece = null;
        this.potentialMoves = [];
        this.KingCastlingPositions = {
            white: {
                king: { row: 7, col: 6 },
                queen: { row: 7, col: 2 }
            },
            black: {
                king: { row: 0, col: 6 },
                queen: { row: 0, col: 2 }
            }
        };
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

    saveToFen() {
        let fen = this.grid.map(row => row.map(piece => piece ? piece.getFen() : '1').join('')).join('/');
        // Wrap consecutive ones with a number
        for (let i = 8; i >= 2; i--) {
            fen = fen.replace(new RegExp('1{' + i + '}', 'g'), i);
        }

        return fen;
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

    clone() {
        const clonedBoard = new Board();
        clonedBoard.grid = this.grid.map(row => row.map(piece => piece ? piece.clone() : null));
        return clonedBoard;
    }

    getPosition(row, col) {
        // Convert grid coordinates to chess notation (e.g., "a8", "e4")
        const files = "abcdefgh";
        return files[col] + (8 - row);
    }

    getPotentialMoves(piece) {
        const moves = piece.getValidMoves(this)
        const filteredMoves = moves.filter(move => !this.wouldBeInCheck(piece, move));
        return filteredMoves;
    }

    wouldBeInCheck(piece, move) {
        const originalPosition = piece.position;
        const clonedBoard = this.clone();
        clonedBoard.movePiece(originalPosition, move);
        const isInCheck = clonedBoard.isSquareAttacked(clonedBoard.getKing(piece.color).position, piece.color);
        //console.log('isInCheck', move, isInCheck);
        return isInCheck;
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
        piece.hasMoved = true;
        piece.animate = true;
    }

    performCastling(from, to) {
        const king = this.grid[from.row][from.col];

        if (king.type === 'king') {
            this.movePiece(king.position, to);
            if (to.col === 2) {
                this.movePiece(this.grid[from.row][0].position, { row: from.row, col: 3 });
            } else if (to.col === 6) {
                this.movePiece(this.grid[from.row][7].position, { row: from.row, col: 5 });
            }
        }
    }

    getPieces(color) {
        return this.grid.flat().filter(piece => piece && piece.color === color);
    }

    isSquareAttacked(square, color) {
        const pieces = this.getPieces(color === 'white' ? 'black' : 'white');
        for (const piece of pieces) {
            if (piece.getValidMoves(this).some(move => move.row === square.row && move.col === square.col)) {
                return true;
            }
        }
        return false;
    }

    getKing(color) {
        return this.getPieces(color).find(piece => piece.type === 'king');
    }

    getClickedSquare(event) {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const row = Math.floor(y / 100); //TODO: make this dynamic
        const col = Math.floor(x / 100); //TODO: make this dynamic
        return { row, col };
    }


}

export { Board };