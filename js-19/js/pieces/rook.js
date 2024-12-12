import { Piece } from './piece.js';

class Rook extends Piece {
    constructor(color, position) {
        super('rook', color, position);
    }

    getValidMoves(board) {
        const moves = [];
        const directions = [
            { row: 1, col: 0 },  // down
            { row: -1, col: 0 }, // up
            { row: 0, col: 1 },  // right
            { row: 0, col: -1 }  // left
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
    clone() {
        return new Rook(this.color, this.position);
    }
}

export { Rook };