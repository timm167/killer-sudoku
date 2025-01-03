import {createSudokuGrid} from './grid.js';
import { handleKeyInputs } from './keyboard.js';
import { setUpButtons } from './buttons.js';

// TODO
// ADD SET BOX TOTAL FUNCTIONALITY
// CHECK PUZZLE SHOULD CHECK IF PUZZLE

//TODO LATER
// ADD CHECK PUZZLE FUNCTIONALITY IN PYTHON
// ADD SOLVE PUZZLE FUNCTIONALITY IN PYTHON
// ADD SAVE PUZZLE FUNCTIONALITY USING JSON
// ADD LOAD PUZZLE FUNCTIONALITY USING JSON
// ADD PLAY SUDOKU FUNCTIONALITY (not core to the project)
// Maybe fix the animation for the boxes

// Adds the ability to navigate using the keyboard
document.addEventListener("keydown", handleKeyInputs);

document.addEventListener("DOMContentLoaded", function() {
    // Set up the buttons to work
    setUpButtons();
    // Initialize the Sudoku grid
    createSudokuGrid();
});