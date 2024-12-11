# Manual Chess Game
## Core Features
1. Chessboard Rendering
    Create an 8x8 chessboard using the HTML canvas.
    Alternate colors for squares (e.g., light and dark squares).

2. Piece Placement
    Display chess pieces at their starting positions.
        Use either:
            Unicode symbols (♙, ♖, etc.).
            Custom-drawn shapes (circles, icons).
            Images (e.g., PNG or SVG).

3. Manual Piece Movement
    Click and drag pieces to move them.
    Snap pieces to the center of the target square.

4. Turn-Based Play
    Alternate turns between players (e.g., White moves first, then Black).

5. Move Validation
    Ensure pieces move only to valid squares based on their type:
        Pawns move forward (diagonally for captures).
        Rooks move horizontally or vertically.
        Knights move in an "L" shape.
        Bishops move diagonally.
        Queens combine rook and bishop moves.
        Kings move one square in any direction.
        Prevent illegal moves (e.g., moving through other pieces).

6. Check Detection
    Notify the player if their king is in check.
    Allow manual moves to resolve check situations.

7. Game State Display
    Show whose turn it is (e.g., "White's Turn" or "Black's Turn").
    Display captured pieces (optional).
    Notify when the game ends (e.g., checkmate or stalemate).

8. Reset Game
    Add a button to reset the board to the starting position.

## Optional Features (For Later Stages)

1. Move History
    Display a list of moves (e.g., "e2 → e4").
    Allow undoing moves.

2. Highlighted Moves
    Highlight valid moves for a selected piece.
    Highlight the last moved piece or square.

3. Drag-and-Drop Movement
    Implement smooth drag-and-drop functionality for moving pieces.

4. Chess Notation Display
        Show moves in standard chess notation (e.g., "Nf3", "Bb5").

5. Timers
    Add countdown timers for each player (like a chess clock).

## Canvas-Specific Features

1. Draw the board, pieces, and UI entirely using the canvas API.
2. Handle click events for selecting and moving pieces on the canvas.
3. Use requestAnimationFrame for smooth interactions.
