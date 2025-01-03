class Piece {
    constructor(type, color, position) {
        this.type = type;
        this.color = color;
        // check position notatio
        if (typeof position === 'string') {
            this.position = this.getGridCoords(position);
        } else {
            this.position = position;
        }
        this.image = new Image();
        this.image.src = this.mapSrcFile();
        this.hasMoved = false;
        this.loaded = false;
        this.animate = false;
        this.visualX = 0;
        this.visualY = 0;
        this.animationVelocity = null;

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

    getChessPosition(){
        return `${'abcdefgh'[this.position.col]}${8-this.position.row}`
    }

    getFen() {
        const fenMap = {
            'pawn': 'p',
            'knight': 'n',
            'bishop': 'b',
            'rook': 'r',
            'queen': 'q',
            'king': 'k'
        };
        return this.color === 'black' ? fenMap[this.type]: fenMap[this.type].toUpperCase();
    }
    clone() {
        throw new Error('Clone not implemented for ' + this.type);
    }
}

export { Piece };