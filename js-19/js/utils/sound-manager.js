export class SoundManager {
    constructor() {
        this.moveSound = new Audio('./assets/sounds/move.mp3');
        this.captureSound = new Audio('./assets/sounds/Capture.mp3');
        this.castlingSound = new Audio('./assets/sounds/castling.wav');
        this.checkSound = new Audio('./assets/sounds/Check.mp3');
        this.timeWarningSound = null;
        this.checkmateSound = null;
    }

    playMoveSound() {
        this.moveSound.currentTime = 0;
        this.moveSound.play();
    }

    playCaptureSound() {
        this.captureSound.currentTime = 0;
        this.captureSound.play();
    }

    playCastlingSound() {
        this.castlingSound.currentTime = 0;
        this.castlingSound.play();
    }

    playCheckSound() {
        this.checkSound.currentTime = 0;
        this.checkSound.play();
    }
}