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
├── js/              // JavaScript source files
│   ├── core/        // Core game logic
│   │   ├── board.js      // Chessboard logic
│   │   ├── game.js       // Main game logic
│   │   └── renderer.js   // Canvas rendering logic
│   │
│   ├── pieces/      // Piece-specific logic
│   │   ├── piece.js      // Base piece class
│   │   ├── pawn.js
│   │   ├── rook.js
│   │   ├── knight.js
│   │   ├── bishop.js
│   │   ├── queen.js
│   │   └── king.js
│   │
│   ├── utils/       // Utility functions
│   │   ├── events.js     // Input handling
│   │   └── ui-manager.js // UI state management
│   │
│   └── app.js       // Entry point
│
└── README.md        // Project documentation 