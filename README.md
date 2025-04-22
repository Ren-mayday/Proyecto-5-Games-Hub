src/
├── main.js               # App entry (imports SCSS + router)
├── router.js             # SPA navigation logic
│
├── views/                # Page templates
│   └── homeView.js       # Dynamic homepage
│
├── components/           # Reusable UI
│   ├── button.js         # Smart button factory
│   └── title.js          # Dynamic headings
│
├── games/                # Game modules
│   ├── tictactoe/        # ✅ Complete
│   │   ├── dom.js        # UI rendering
│   │   ├── game.js       # Core logic
│   │   ├── constants.js  # Rules/config
│   │   └── storage.js    # Score persistence
│   └── (snake, memory)   # 🚧 In progress
│
└── styles/               # SCSS architecture
    ├── base/             # Globals/resets
    ├── components/       # Button/header styles
    └── views/            # Game-specific CSS

# Games Hub 🎮

A modular gaming platform built with Vite and vanilla JS, featuring multiple games with clean architecture.

## Project Structure

### Core Architecture
- **`main.js`** - Entry point (imports SCSS and router)
- **`router.js`** - Handles SPA navigation between games:
  - `navigateTo(route)` - Switches views/games
  - Hash-based routing with `popstate` support

### Views (`/src/views`)
- **`homeView.js`** - Renders homepage with:
  - Dynamic title components
  - Game selection buttons
  - Accessible semantic HTML

### Reusable Components (`/src/components`)
1. **`button.js`** - Smart button factory:
   - `createButton(text, onClick, className)`
2. **`title.js`** - Dynamic heading generator:
   - `createTitle(text, headingLevel, className)`

### Games Architecture (`/src/games/`)
Each game follows modular pattern:
- **`dom.js`** - Rendering logic
- **`game.js`** - Core game mechanics
- **`constants.js`** - Configuration
- **`storage.js`** - Persistence

### Current Implementation
✅ **Functional Features:**
- SPA routing system
- Homepage with 3 game buttons
- Tic-Tac-Toe skeleton (rendering + routing)
- SCSS architecture setup
- Reusable component system

🚧 **In Progress:**
- Snake/Memory game integration

## Setup
```bash
npm install
npm run dev

## Tic-Tac-Toe Game Module (`/src/games/tictactoe/`)

### Modular Architecture
1. **`constants.js`**  
   - `winningConditions`: All possible winning combinations  
   - `initialScores`: Default score state (`{ X: 0, O: 0 }`)

2. **`dom.js`** - UI Rendering & Updates  
   - `renderTicTacToe()`: Builds complete game interface  
   - UI Updaters:  
     ```js
     updateCellUI()      // Marks cell with X/O  
     updateStatusUI()    // Shows current turn  
     showWinner()        // Displays win message  
     clearBoardUI()      // Resets visual board  
     updateScoreUI()     // Updates score display
     ```

3. **`game.js`** - Core Logic  
   - `initializeGame()`: Sets up event listeners and state  
   - Game Flow:  
     ```js
     handleCellClick()  // Processes player moves  
     checkWinner()      // Validates win/draw conditions  
     resetGame()       // Restarts round (keeps scores)
     ```
   - State Tracking:  
     ```js
     currentPlayer     // 'X' or 'O'  
     gameState         // Board array (9 positions)  
     gameActive        // Boolean for game status
     ```

4. **`storage.js`** - Persistence  
   - `saveScoresToStorage()`: Scores → localStorage  
   - `loadScoresFromStorage()`: Retrieves saved scores  
   - `resetStorageScores()`: Resets to `initialScores`

### Current Implementation
✅ **Complete Features:**  
- Functional 3x3 board with turn-based gameplay  
- Win/draw detection (8 winning conditions)  
- Persistent score tracking (localStorage)  
- Reset buttons (game + scores)  
- Accessible DOM updates  

🚧 **Potential Enhancements:**  
- Player name customization  
- Game history tracking  
- Animated win effects  

### Technical Highlights  
- Pure vanilla JS with modular separation  
- localStorage integration  
- Clean DOM-state synchronization  
- Reusable component patterns
