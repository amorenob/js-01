export class UIManager {
    constructor(game) {
        this.game = game;
        this.turnDisplay = document.getElementById('current-turn');
        this.gameStatus = document.getElementById('game-status');
        this.saveButton = document.getElementById('save-button');
        this.loadButton = document.getElementById('load-button');
        this.newGameButton = document.getElementById('new-game');
        this.rapidChessButton = document.getElementById('10-0');
        this.blitzChessButton = document.getElementById('5-0');
        this.bulletChessButton = document.getElementById('1-0');
        this.newGameOptions = document.getElementById('new-game-options');
        this.newGameTimeControls = document.querySelectorAll('.new-game-controls button');
        this.whiteTime = document.getElementById('white-time');
        this.blackTime = document.getElementById('black-time');
        this.init();
        this.addSaveButtonListener();
        this.addLoadButtonListener();
        this.addNewGameButtonListener();
        this.addNewGameTimeControlListener();
        this.updatePlayersTimeInterval = setInterval(() => {
            this.updatePlayersTime();
        }, 100);
    }

    init() {
        this.updateTurnDisplay();
    }

    updateTurnDisplay() {
        this.turnDisplay.textContent = this.game.currentTurn.charAt(0).toUpperCase() + this.game.currentTurn.slice(1);
    }

    updatePlayersTime() {
        const gameTimeLeft = this.game.getGameTimeLeftFormatted();
        this.whiteTime.textContent = gameTimeLeft.white;
        this.blackTime.textContent = gameTimeLeft.black;
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

    addNewGameButtonListener() {
        this.newGameButton.addEventListener('click', () => {
            const newGameOptions = document.getElementById('new-game-options');
            console.log(newGameOptions);
            newGameOptions.classList.remove('hidden');
            newGameOptions.classList.remove('fade-out');
            newGameOptions.classList.add('fade-in');
        });
    }

    addNewGameTimeControlListener() {
        this.newGameTimeControls.forEach(button => {
            button.addEventListener('click', () => {
                const timeControl = button.id;
                this.game.reset(timeControl);
                console.log(button.id);

                this.newGameOptions.classList.remove('fade-in');
                this.newGameOptions.classList.add('fade-out');
                setTimeout(() => {
                    this.newGameOptions.classList.add('hidden');
                }, 300);
            });
        });
    }
} 