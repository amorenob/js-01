import { Piece } from './piece.js';

class Knight extends Piece {
    constructor(color, position) {
        super('knight', color, position);
    }

    getValidMoves(board) {
        const moves = [];
        const directions = [
            { row: 2, col: 1 },
            { row: 2, col: -1 },
            { row: -2, col: 1 },
            { row: -2, col: -1 },
            { row: 1, col: 2 },
            { row: 1, col: -2 },
            { row: -1, col: 2 },
            { row: -1, col: -2 }
        ];

        directions.forEach(dir => {
            const row = this.position.row + dir.row;
            const col = this.position.col + dir.col;

            if (row >= 0 && row < 8 && col >= 0 && col < 8) {
                const square = board.grid[row][col];
                if (!square || square.color !== this.color) {
                    moves.push({ row, col });
                }
            }
        });

        return moves;
    }
}

export { Knight };