import { Piece } from './piece.js';

class Bishop extends Piece {
    constructor(color, position) {
        super('bishop', color, position);
    }

    getValidMoves(board) {
        const moves = [];
        // Bishops move diagonally
        const directions = [
            { row: 1, col: 1 },
            { row: 1, col: -1 },
            { row: -1, col: 1 },
            { row: -1, col: -1 }
        ];

        directions.forEach(dir => {
            let row = this.position.row + dir.row;
            let col = this.position.col + dir.col;

            while (row >= 0 && row < 8 && col >= 0 && col < 8) {
                const square = board.grid[row][col];
                if (!square) {
                    // Empty square - valid move
                    moves.push({ row, col });
                } else if (square.color !== this.color) {
                    // Enemy piece - valid move, but can't go further
                    moves.push({ row, col });
                    break;
                } else {
                    // Own piece - can't go further
                    break;
                }
                row += dir.row;
                col += dir.col;
            }
        }); 
        return moves;
    }
}

export { Bishop };