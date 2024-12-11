chess-game/
│
├── index.html        // Main HTML file
├── style.css         // Styles for the board and canvas
│
├── assets/           // All game assets
│   └── pieces/       // Chess piece images
│       ├── white/    // White pieces
│       │   ├── king.svg
│       │   ├── queen.svg
│       │   ├── bishop.svg
│       │   ├── knight.svg
│       │   ├── rook.svg
│       │   └── pawn.svg
│       │
│       └── black/    // Black pieces
│           ├── king.svg
│           ├── queen.svg
│           ├── bishop.svg
│           ├── knight.svg
│           ├── rook.svg
│           └── pawn.svg
│
├── js/
│   ├── board.js      // Chessboard logic
│   ├── piece.js      // ChessPiece class and piece rules
│   ├── renderer.js   // Canvas rendering logic
│   ├── events.js     // Input handling
│   ├── game.js       // Main game logic
└── app.js            // Entry point, combines all modules 