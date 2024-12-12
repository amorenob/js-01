import { Piece } from './piece.js';
import { Rook } from './rook.js';
import { Bishop } from './bishop.js';

class Queen extends Piece {
    constructor(color, position) {
        super('queen', color, position);
    }

    getValidMoves(board) {
        const moves = [];
        // Queens move like rooks and bishops
        const rookMoves = new Rook(this.color, this.position).getValidMoves(board);
        const bishopMoves = new Bishop(this.color, this.position).getValidMoves(board);
        moves.push(...rookMoves, ...bishopMoves);
        return moves;
    }
    clone() {
        return new Queen(this.color, this.position);
    }
}

export { Queen };