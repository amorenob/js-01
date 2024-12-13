export class UIManager {
    constructor(game) {
        this.game = game;
        this.turnDisplay = document.getElementById('current-turn');
        this.gameStatus = document.getElementById('game-status');
        this.saveButton = document.getElementById('save-button');
        this.loadButton = document.getElementById('load-button');
        this.init();
        this.addSaveButtonListener();
        this.addLoadButtonListener();
    }

    init() {
        this.updateTurnDisplay();
    }

    updateTurnDisplay() {
        this.turnDisplay.textContent = this.game.currentTurn.charAt(0).toUpperCase() + this.game.currentTurn.slice(1);
    }

    updateGameStatus(status) {
        this.gameStatus.textContent = status;
    }

    addSaveButtonListener() {
        this.saveButton.addEventListener('click', () => {
            console.log(this.game.saveToFen());
        });
    }

    addLoadButtonListener() {
        this.loadButton.addEventListener('click', () => {
            const fenString = prompt("Please enter the FEN string:", "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
            if (fenString) {
                this.game.loadFromFen(fenString);
            }
        });
    }
} 