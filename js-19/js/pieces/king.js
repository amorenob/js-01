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

        // check for castling
        if (!this.hasMoved) {
            const rook = board.grid[this.position.row][0];
            const r1ClearPath = !board.grid[this.position.row][1] && !board.grid[this.position.row][2] && !board.grid[this.position.row][3];
            if (rook && !rook.hasMoved && r1ClearPath) {
                moves.push({ row: this.position.row, col: 2 });
            }
            const rook2 = board.grid[this.position.row][7];
            const r2ClearPath = !board.grid[this.position.row][5] && !board.grid[this.position.row][6];
            if (rook2 && !rook2.hasMoved && r2ClearPath) {
                moves.push({ row: this.position.row, col: 6 });
            }
        }

        return moves;
    }
    clone() {
        return new King(this.color, this.position);
    }
}

export { King };