import { Piece } from './piece.js';

class King extends Piece {
    constructor(color, position) {
        super('king', color, position);
    }

    getValidMoves(board) {
        const moves = [];
        const directions = [
            { row: 1, col: 0 },
            { row: -1, col: 0 },
            { row: 1, col: 1 },
            { row: 1, col: -1 },
            { row: -1, col: 1 },
            { row: -1, col: -1 },
            { row: 0, col: 1 },
            { row: 0, col: -1 }
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

export { King };