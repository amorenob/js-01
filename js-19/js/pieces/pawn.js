import { Piece } from './piece.js';

class Pawn extends Piece {
    constructor(color, position) {
        super('pawn', color, position);
    }

    getValidMoves(board) {
        const moves = [];
        // Pawns move forward one square, or two squares if they are on their starting row
        const direction = this.color === 'white' ? -1 : 1;
        const startRow = this.color === 'white' ? 6 : 1;
        const row = this.position.row;
        const col = this.position.col;

        // if the pawn is on its starting row, it can move two squares forward
        if (row === startRow) {
            if (board.grid[row + direction][col] === null) {
                moves.push({ row: row + direction, col });
                if (board.grid[row + 2 * direction][col] === null) {
                    moves.push({ row: row + 2 * direction, col });
                }
            }
        }

        // if the pawn is not on its starting row, it can move one square forward
        if (row !== startRow && board.grid[row + direction][col] === null) {
            moves.push({ row: row + direction, col });
        }

        // check for captures
        if (board.grid[row + direction][col + 1] && board.grid[row + direction][col + 1].color !== this.color) {
            moves.push({ row: row + direction, col: col + 1 });
        }
        if (board.grid[row + direction][col - 1] && board.grid[row + direction][col - 1].color !== this.color) {
            moves.push({ row: row + direction, col: col - 1 });
        }

        return moves;
    }
    clone() {
        return new Pawn(this.color, this.position);
    }
}

export { Pawn };