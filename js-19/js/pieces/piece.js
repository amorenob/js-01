class Piece {
    constructor(type, color, position) {
        this.type = type;
        this.color = color;
        // check position notatio
        if (position.length === 2) {
            this.position = this.getGridCoords(position);
        } else {
            this.position = position;
        }
        this.image = new Image();
        this.image.src = this.mapSrcFile();
    }
    mapSrcFile(){
        const baseSrc = './assets/pieces/';
        const srcMap = {
            'whitepawn': baseSrc + 'white/pawn.svg',
            'whiteknight': baseSrc + 'white/knight.svg',
            'whitebishop': baseSrc + 'white/bishop.svg',
            'whiterook': baseSrc + 'white/rook.svg',
            'whitequeen': baseSrc + 'white/queen.svg',
            'whiteking': baseSrc + 'white/king.svg',
            'blackpawn': baseSrc + 'black/pawn.svg',
            'blackknight': baseSrc + 'black/knight.svg',
            'blackbishop': baseSrc + 'black/bishop.svg',
            'blackrook': baseSrc + 'black/rook.svg',
            'blackqueen': baseSrc + 'black/queen.svg',
            'blackking': baseSrc + 'black/king.svg',
        };
        return srcMap[this.color + this.type];
    }
    getValidMoves(board) {  
        throw new Error('Get potential moves not implemented for ' + this.type);
    }
    getGridCoords(positionChessNotation) {
        // chess notation to grid coords
        const row = 8 - parseInt(positionChessNotation[1]);
        const col = positionChessNotation[0].charCodeAt(0) - 'a'.charCodeAt(0);
        return { row, col };
    }
}

export { Piece };