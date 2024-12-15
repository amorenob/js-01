import { Piece } from "../../js/pieces/piece";

export function createMockBoard(pieces = []) {
    const board = {
        grid: Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => null)),
    };
    pieces.forEach(piece => {
        board.grid[piece.position.row][piece.position.col] = piece;
    });
    return board;
}

export const testScenarios = {
    emptyBoard: createMockBoard(),
    initialBoard: createMockBoard([
        new Piece('rook', 'white', 'a1'),
        new Piece('knight', 'white', 'b1'),
        new Piece('bishop', 'white', 'c1'),
        new Piece('queen', 'white', 'd1'),
        new Piece('king', 'white', 'e1'),
        new Piece('bishop', 'black', 'f1'),
        new Piece('knight', 'black', 'g1'),
        new Piece('rook', 'black', 'h1'),
        new Piece('pawn', 'white', 'a2'),
        new Piece('pawn', 'white', 'b2'),
        new Piece('pawn', 'white', 'c2'),
        new Piece('pawn', 'white', 'd2'),
        new Piece('pawn', 'white', 'e2'),
        new Piece('pawn', 'white', 'f2'),
        new Piece('pawn', 'white', 'g2'),
        new Piece('pawn', 'white', 'h2'),
        new Piece('pawn', 'black', 'a7'),
        new Piece('pawn', 'black', 'b7'),
        new Piece('pawn', 'black', 'c7'),
        new Piece('pawn', 'black', 'd7'),
        new Piece('pawn', 'black', 'e7'),
        new Piece('pawn', 'black', 'f7'),
        new Piece('pawn', 'black', 'g7'),
        new Piece('pawn', 'black', 'h7'),
        new Piece('rook', 'black', 'a8'),
        new Piece('knight', 'black', 'b8'),
        new Piece('bishop', 'black', 'c8'),
        new Piece('queen', 'black', 'd8'),
        new Piece('king', 'black', 'e8'),
        new Piece('bishop', 'black', 'f8'),
        new Piece('knight', 'black', 'g8'),
        new Piece('rook', 'black', 'h8'),
    ]),
    
}; 