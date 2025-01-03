import { setIsValid, state, setTogglingSums } from "./state.js";

const { rows, cols, cubes, active_cell, togglingSums, boxes, currentBox, cells_with_box } = state;

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
    for (let i = 0; i < currentBox.length; i++) {
        let boxCell = currentBox[i];
        if ((cell.row === boxCell.row && (cell.col === boxCell.col + 1 || cell.col === boxCell.col - 1)) ||
            (cell.col === boxCell.col && (cell.row === boxCell.row + 1 || cell.row === boxCell.row - 1))) {
            return true;
        }
    }
    return false;
}

// Helper function to undo the most recent action
function undoAction(cell) {
    clearCell(cell);
    cell.classList.remove("invalid"); // Remove the "invalid" css class
    setIsValid(true) // Reset the validation flag
}

function colorChange() {
    if (state.availableColors.length === 0) {
        state.availableColors = [...transparentColors];
    }
    colorView.classList.remove(state.buttonColor);
    state.buttonColor = state.availableColors.pop()
    state.colorIndex = state.availableColors.length;
    colorView.classList.add(state.buttonColor);
}

const colorView = document.getElementById("colorView")

colorView.addEventListener("click", function() {
    colorChange();
})


// Helper function to clear a cell
function clearCell(cell) {
    console.log(`clearing cell ${cell.id}`)
    cell.value = ""; // Clear the input 
    cell.actualValue = 0;
    cell.classList.remove(cell.color)
    state.rows[cell.row][cell.id] = ""; // Clear the tracking dictionaries
    state.cols[cell.col][cell.id] = "";
    state.cubes[cell.cube][cell.id] = "";
    cell.inBox && (boxes[cell.inBox]['sum'] -= cell.actualValue);
    cell.inBox = null;
    state.cells_with_box = cells_with_box.filter((item) => item !== cell);
    state.active_cell = active_cell.filter((item) => item !== cell);
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