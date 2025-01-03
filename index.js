import {createSudokuGrid} from './grid.js';
import { handleKeyInputs } from './keyboard.js';
import { setUpButtons } from './buttons.js';

// Adds the ability to navigate using the keyboard
document.addEventListener("keydown", handleKeyInputs);

document.addEventListener("DOMContentLoaded", function() {
    // Set up the buttons to work
    setUpButtons();
    // Initialize the Sudoku grid
    createSudokuGrid();
});