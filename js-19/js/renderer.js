class Renderer {
    constructor(canvas, board, debug = false) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.board = board;
        this.lightSquareColor = 'white';
        this.darkSquareColor = 'gray';
        this.debug = debug;
        this.squareSize = this.canvas.width / 8;
    }
    drawBoard() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 === 0) {
                    this.ctx.fillStyle = this.lightSquareColor;
                    this.ctx.fillRect(i * this.squareSize, j * this.squareSize, this.squareSize, this.squareSize);
                } else {
                    this.ctx.fillStyle = this.darkSquareColor;
                    this.ctx.fillRect(i * this.squareSize, j * this.squareSize, this.squareSize, this.squareSize);
                }
            }
        }
    }

    drawPieces() {
        this.board.grid.forEach((row, i) => {
            row.forEach((piece, j) => {
                if (piece) {
                    this.drawPiece(piece, j, i);
                }
            });
        });
    }
    
    drawPiece(piece, x, y) {
        this.ctx.drawImage(piece.image, x * this.squareSize, y * this.squareSize, this.squareSize, this.squareSize);
    }

    drawPotentialMoves(moves) {
        moves.forEach(move => {
            this.ctx.beginPath();
            this.ctx.strokeStyle = 'red';
            this.ctx.lineWidth = 2;
            this.ctx.arc(
                (move.col + 0.5) * this.squareSize, 
                (move.row + 0.5) * this.squareSize,
                this.squareSize / 4,
                0,
                2 * Math.PI
            );
            this.ctx.stroke();
        });
    }

    drawDebugInfo() {
        // draw each square with its row and col
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                this.ctx.fillStyle = 'red';
                this.ctx.font = '10px Arial';
                // Draw raw coordinates
                this.ctx.fillText(`Row: ${j}, Col: ${i}`, i * this.squareSize + 5, j * this.squareSize + 15);
                // Draw formatted chess notation (e.g. "a1", "h8")
                const file = String.fromCharCode('a'.charCodeAt(0) + i);
                const rank = 8 - j;
                this.ctx.fillText(`${file}${rank}`, i * this.squareSize + 5, j * this.squareSize + 30);
            }
        }
    }
    render() {
        this.drawBoard();
        this.drawPieces();
        if (this.board.selectedPiece) {
            this.drawPotentialMoves(this.board.potentialMoves);
        }
        if (this.debug) {
            this.drawDebugInfo();
        }
    }

    renderLoop() {
        this.render();
        requestAnimationFrame(this.renderLoop.bind(this));
    }
}

export { Renderer };