import { Piece } from "../../js/pieces/piece";

describe('Piece base class', () => {
    let piece;

    beforeEach(() => {
        // Reset piece before each test
        piece = null;
    });

    describe('Constructor', () => {
        it('Should set the innitial properties', () => {
            piece = new Piece('pawn', 'white', 'e2');
            expect(piece.type).toBe('pawn');
            expect(piece.color).toBe('white');
            expect(piece.hasMoved).toBe(false);
            expect(piece.loaded).toBe(false);
            expect(piece.animate).toBe(false);
            expect(piece.visualX).toBe(0);
            expect(piece.visualY).toBe(0);
            expect(piece.animationVelocity).toBe(null);
        });

        it('Should set the position from a grid coordinate', () => {
            piece = new Piece('pawn', 'white', { row: 3, col: 4 });
            expect(piece.position).toEqual({ row: 3, col: 4 });
        });

        it('Should set the position from chess notation', () => {
            piece = new Piece('pawn', 'white', 'e5');
            expect(piece.position).toEqual({ row: 3, col: 4 });
        });
    });

    describe('mapSrcFile', () => {
        it('Should return the correct image path for white pieces', () => {
            piece = new Piece('pawn', 'white', 'e2');
            expect(piece.mapSrcFile()).toBe('./assets/pieces/white/pawn.svg');
        });

        it('Should return the correct image path for black pieces', () => {
            piece = new Piece('pawn', 'black', 'e2');
            expect(piece.mapSrcFile()).toBe('./assets/pieces/black/pawn.svg');
        });
    });

    describe('getGridCoords', () => {
        it('Should return the correct grid coordinates for a given chess notation', () => {
            piece = new Piece('pawn', 'white', 'e2');
            const chessNotations = ['a1', 'b2', 'c3', 'd4', 'e5', 'f6', 'g7', 'h8'];
            const expectedCoords = [
                { row: 7, col: 0 },
                { row: 6, col: 1 },
                { row: 5, col: 2 },
                { row: 4, col: 3 },
                { row: 3, col: 4 },
                { row: 2, col: 5 },
                { row: 1, col: 6 },
                { row: 0, col: 7 }
            ];
            chessNotations.forEach((notation, index) => {
                expect(piece.getGridCoords(notation)).toEqual(expectedCoords[index]);
            });
        });
    });

    describe('getValidMoves', () => {
        it('SHould throw an error if the method is not implemented', () => {
            piece = new Piece('pawn', 'white', 'e2');
            expect(() => piece.getValidMoves()).toThrow('Get potential moves not implemented for pawn');
        });
    });

    describe('clone', () => {
        it('Should throw an error if the method is not implemented', () => {
            piece = new Piece('pawn', 'white', 'e2');
            expect(() => piece.clone()).toThrow('Clone not implemented for pawn');
        });
    });

    describe('getFen', () => {
        const matchMap = {
            'pawn': 'P',
            'knight': 'N',
            'bishop': 'B',
            'rook': 'R',
            'queen': 'Q',
            'king': 'K',
        };
        it('Should return the correct fen notation for white pieces', () => {
            piece = new Piece('pawn', 'white', 'e2');
            expect(piece.getFen()).toBe(matchMap[piece.type]);
        });

        it('Should return the correct fen notation for black pieces', () => {
            piece = new Piece('pawn', 'black', 'e2');
            expect(piece.getFen()).toBe(matchMap[piece.type].toLowerCase());
        });
    });
});