import { setIsValid, state, setTogglingSums } from "./state.js";
import { transparentColors } from "./colors.js";

// Helper function to get the cube index
function getCubeIndex(row, col) {
    return Math.floor(row / 3) * 3 + Math.floor(col / 3);
}

// Helper function to clear the Sudoku board
function clearSudoku() {
    window.location.reload();
}

// Helper function to check if a cell is adjacent to at least one member in currentBox
function isAdjacent(cell) {
    for (let i = 0; i < state.currentBox.length; i++) {
        let boxCell = state.currentBox[i];
        if ((cell.row === boxCell.row && (cell.col === boxCell.col + 1 || cell.col === boxCell.col - 1)) ||
            (cell.col === boxCell.col && (cell.row === boxCell.row + 1 || cell.row === boxCell.row - 1))) {
            return true;
        }
    }   
    return false;
}

// Helper function to undo the most recent action
function undoAction(cell) {
    cell.classList.remove("invalid"); // Remove the "invalid" css class
    clearCell(cell);
    setIsValid(true) // Reset the validation flag
}

function colorChange() {
    if (state.availableColors.length === 0) {
        state.availableColors = [...transparentColors];
    }
    colorView.classList.remove(state.buttonColor);
    state.availableColors.pop()
    state.colorIndex = state.availableColors.length;
    state.buttonColor = state.availableColors[state.colorIndex-1];
    colorView.classList.add(state.buttonColor);
}

const colorView = document.getElementById("colorView")

colorView.addEventListener("click", function() {
    colorChange();
})


// Helper function to clear a cell
function clearCell(cell) {
    cell.value = ""; // Clear the input 
    cell.actualValue = 0;
    state.rows[cell.row][cell.id] = ""; // Clear the tracking dictionaries
    state.cols[cell.col][cell.id] = "";
    state.cubes[cell.cube][cell.id] = "";
    state.active_cell = state.active_cell.filter((item) => item !== cell);
}

// Toggle the visibility of sum-related controls
function toggleSums() {
    setTogglingSums(!state.togglingSums);
    const sumButtons = document.getElementById("sumButtons");
    if (state.togglingSums) {
        setIsValid(false)// Disable Sudoku validation while summing
        sumButtons.classList.remove("hidden");
    } else {
        sumButtons.classList.add("hidden");
    }
}

export { getCubeIndex, clearSudoku, isAdjacent, undoAction, colorChange, clearCell, toggleSums }