import { Rook } from "../../js/pieces/rook";
import { Piece } from "../../js/pieces/piece";
import { testScenarios } from "../helpers/boardHelper";
import { createMockBoard } from "../helpers/boardHelper";   


describe('Rook', () => {
    it('Should be a subclass of Piece', () => {
        const rook = new Rook('white', 'e1');
        expect(rook instanceof Piece).toBe(true);
        expect(rook.type).toBe('rook');
        expect(rook.color).toBe('white');
        expect(rook.position).toEqual({ row: 7, col: 4 });
    });

    describe('Clone', () => {
        it('Should return a new instance of Rook', () => {
            const rook = new Rook('white', 'e1');
            const clone = rook.clone();
            expect(clone).toEqual(rook);
        });
    });

    describe('getValidMoves', () => {
        it('Should return all valid moves for a rook on an empty board, rook at a1', () => {
            const rook = new Rook('white', 'a1');
            const moves = rook.getValidMoves(testScenarios.emptyBoard);
            const expectedMoves = [
                // Horizontal moves over rook's row  
                { row: 7, col: 1 }, { row: 7, col: 2 }, { row: 7, col: 3 }, { row: 7, col: 4 }, { row: 7, col: 5 }, { row: 7, col: 6 }, { row: 7, col: 7 },
                // Vertical moves over rook's column 
                { row: 0, col: 0 }, { row: 1, col: 0 }, { row: 2, col: 0 }, { row: 3, col: 0 }, { row: 4, col: 0 }, { row: 5, col: 0 }, { row: 6, col: 0 },
            ];
            expect(moves.length).toEqual(expectedMoves.length);
            expect(moves).toEqual(expect.arrayContaining(expectedMoves));
        });
        it('Should return all valid moves for a rook on an empty board, rook at h8', () => {
            const rook = new Rook('white', 'h8');
            const moves = rook.getValidMoves(testScenarios.emptyBoard);
            const expectedMoves = [
                // Horizontal moves over rook's row  
                { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 0, col: 3 }, { row: 0, col: 4 }, { row: 0, col: 5 }, { row: 0, col: 6 },
                // Vertical moves over rook's column 
                { row: 1, col: 7 }, { row: 2, col: 7 }, { row: 3, col: 7 }, { row: 4, col: 7 }, { row: 5, col: 7 }, { row: 6, col: 7 }, { row: 7, col: 7 },
            ];
            expect(moves.length).toEqual(expectedMoves.length);
            expect(moves).toEqual(expect.arrayContaining(expectedMoves));
        });
        it('Should return all valid moves for a rook trapped by own pieces', () => {
            const rook = new Rook('white', 'a1');
            const moves = rook.getValidMoves(testScenarios.initialBoard);
            const expectedMoves = [];
            expect(moves.length).toEqual(expectedMoves.length);
        });
        it('Should return all valid moves for a rook, front pawn capture', () => {
            const rook = new Rook('white', 'a1');
            const testScenario = createMockBoard([
                new Piece('pawn', 'black', 'a2'),
                new Piece('pawn', 'white', 'b1')
            ])
            const moves = rook.getValidMoves(testScenario);
            const expectedMoves = [{ row: 6, col: 0 }];
            expect(moves.length).toEqual(expectedMoves.length);
            expect(moves).toEqual(expect.arrayContaining(expectedMoves));
        });
        it('Should return all valid moves for a rook, back pawn capture', () => {
            const rook = new Rook('white', 'a2');
            const testScenario = createMockBoard([
                new Piece('pawn', 'black', 'a1'),
                new Piece('pawn', 'white', 'b2'),
                new Piece('pawn', 'white', 'a3')
            ])
            const moves = rook.getValidMoves(testScenario);
            const expectedMoves = [{ row: 7, col: 0 }];
            expect(moves.length).toEqual(expectedMoves.length);
            expect(moves).toEqual(expect.arrayContaining(expectedMoves));
        });
        it('Should return all valid moves for a rook, front pawn capture', () => {
            const rook = new Rook('white', 'a1');
            const testScenario = createMockBoard([
                new Piece('pawn', 'black', 'a3'),
                new Piece('pawn', 'white', 'b1')
            ])
            const moves = rook.getValidMoves(testScenario);
            const expectedMoves = [{ row: 6, col: 0 }, { row: 5, col: 0 }];
            expect(moves.length).toEqual(expectedMoves.length);
            expect(moves).toEqual(expect.arrayContaining(expectedMoves));
        });
        it('Should return all valid moves for a rook, cross pawn capture ', () => {
            const rook = new Rook('white', 'c3');
            const testScenario = createMockBoard([
                new Piece('pawn', 'black', 'c4'),
                new Piece('pawn', 'black', 'c2'),
                new Piece('pawn', 'black', 'b3'),
                new Piece('pawn', 'black', 'd3'),
            ])
            const moves = rook.getValidMoves(testScenario);
            const expectedMoves = [{ row: 5, col: 1 }, { row: 5, col: 3 }, { row: 4, col: 2 }, { row: 6, col: 2 }];
            expect(moves.length).toEqual(expectedMoves.length);
            expect(moves).toEqual(expect.arrayContaining(expectedMoves));
        });
    });
});