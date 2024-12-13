# Zero to Checkmate
A complete chess game built from scratch using vanilla JavaScript, focusing on core programming concepts and game development fundamentals.

## Chess Game
This project is a comprehensive implementation of chess, built entirely with vanilla JavaScript without any external libraries. It serves as a practical application of fundamental programming concepts, game logic, UI management, and rendering techniques.

## Features
- Complete chess game implementation
- Time controls (Rapid, Blitz, Bullet)
- Move validation and game rules
- Check and checkmate detection
- Game history tracking
- FEN notation support
- Castling implementation
- Custom UI manager
- Canvas-based rendering

## Technical Stack
- Vanilla JavaScript (ES6+)
- HTML5 Canvas
- CSS3
- No external dependencies

## Core Components

### Game Logic (`js/core/game.js`)
- Game state management
- Turn handling
- Move validation
- Time control implementation
- Check/Checkmate detection

### Board (`js/core/board.js`)
- Board state representation
- Piece movement logic
- Position validation
- FEN notation handling

### Renderer (`js/core/renderer.js`)
- Canvas-based rendering
- Board visualization
- Piece movement animation
- UI updates

### UI Manager (`js/utils/ui-manager.js`)
- User interface state management
- Event handling
- Game controls
- Time display
- Move history

## Time Controls
- **Rapid Chess**: 10|0, 15|0, 15|10
- **Blitz Chess**: 5|0, 5|1, 5|5
- **Bullet Chess**: 1|0, 1|1, 2|0

## Key Learning Points
- Object-Oriented Programming in JavaScript
- Game State Management
- Event-Driven Programming
- Canvas Rendering
- UI/UX Design
- Chess Rules Implementation
- Time Management Systems
- Move Validation Algorithms

## Project Structure 
```
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
└── README.md        // Project documentation```