class Renderer {
    constructor(canvas, board, debug = false) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.board = board;
        this.lightSquareColor = 'white';
        this.darkSquareColor = 'gray';
        this.debug = debug;
        this.squareSize = this.canvas.width / 8;
        this.imagesLoaded = false;
        this.lastTime = 0;
        this.pieceAnimationSteps = 25;
    }


    async initialRender() {
        await this.loadImages();
        //console.log('Images loaded');
        this.render();
    }

    async loadImages() {

        const pieces = this.board.grid.flat().filter(piece => piece);
        const loadPromises = pieces.map(piece => {
            //console.log(`Loading ${piece.type} image`);
            return new Promise((resolve) => {
                if (piece.image.complete) {
                    //console.log(`${piece.type} already loaded`);
                    resolve();
                } else {
                    piece.image.onload = () => {
                        //console.log(`${piece.type} loaded`);
                        resolve();
                    };
                }
            });
        });
        await Promise.all(loadPromises);
        this.imagesLoaded = true;
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
                    if (!piece.animate) this.drawPiece(piece, j, i);
                }
            });
        });
    }

    drawPiece(piece, x, y) {
        this.ctx.drawImage(piece.image, x * this.squareSize, y * this.squareSize, this.squareSize, this.squareSize);
        piece.visualX = x * this.squareSize;
        piece.visualY = y * this.squareSize;
    }

    drawAnimatedPiece(piece, x, y) {
        // TODO: Make this simpler or more efficient
        const targetX = x * this.squareSize;
        const targetY = y * this.squareSize;

        // Calculate the distance to move
        const distanceX = targetX - piece.visualX;
        const distanceY = targetY - piece.visualY;

        // Calculate movement speed based on distance
        if (piece.animationVelocity === null) {
            piece.animationVelocity = { x: distanceX / this.pieceAnimationSteps, y: distanceY / this.pieceAnimationSteps };
        }
        const speed = piece.animationVelocity;
        const dx = Math.min(Math.abs(distanceX), speed.x);
        const dy = Math.min(Math.abs(distanceY), speed.y);

        // Update position 
        piece.visualX += dx;
        piece.visualY += dy;

        // Draw the piece
        this.ctx.drawImage(piece.image, piece.visualX, piece.visualY, this.squareSize, this.squareSize);

        // Check if piece reached its destination (with small threshold )
        const threshold = 0.1;
        if (Math.abs(piece.visualX - targetX) < threshold &&
            Math.abs(piece.visualY - targetY) < threshold) {
            piece.visualX = targetX;
            piece.visualY = targetY;
            piece.animate = false;
            piece.animationVelocity = null;
            //console.log('Piece animation complete');
        }
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
    render(currentTime) {
        this.drawBoard();
        this.drawPieces();
        if (this.board.selectedPiece) {
            this.drawPotentialMoves(this.board.potentialMoves);
        }
        if (this.debug) {
            this.drawDebugInfo();
        }
        // draw animated pieces

        // check if any piece is animating
        const animatingPieces = this.board.grid.flat().filter(piece => piece && piece.animate);
        if (animatingPieces.length > 0) {
            animatingPieces.forEach(animatedPiece => {
                const { row, col } = animatedPiece.position;
                this.drawAnimatedPiece(animatedPiece, col, row);
            });
            requestAnimationFrame(this.render.bind(this, currentTime));
        }


    }

    renderLoop() {
        this.render();
        requestAnimationFrame(this.renderLoop.bind(this));
    }
}

export { Renderer };