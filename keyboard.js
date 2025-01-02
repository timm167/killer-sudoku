import { state } from './state.js';

// Listen for key inputs
export function handleKeyInputs(e) {
    if (state.isValid === false && state.togglingSums === false) {
        document.getElementById("undoButton").click();
    }
    else if (e.key === "Backspace" && (e.ctrlKey || e.shiftKey)) {
        document.getElementById("clearButton").click();
    }
    else if (e.key === "Backspace") {
        document.getElementById("undoButton").click();
    }
    else if (e.key === "ArrowUp") {
        navigateGrid("up");
    }
    else if (e.key === "ArrowDown") {
        navigateGrid("down");
    }
    else if (e.key === "ArrowLeft") {
        navigateGrid("left");
    }
    else if (e.key === "ArrowRight") {
        navigateGrid("right");
    }
    else if (e.key === "Enter") {
        e.preventDefault();
        if (state.togglingSums) {
            document.getElementById("newBoxButton").click();
        }
    }
    else if (e.key === "Shift"){
        document.getElementById("numberButton").click();
    }
}

// Just navigates the grid based on the direction
function navigateGrid(direction) {
    const { grid, selectedCell } = state;
    let cell = selectedCell;
    let row = cell.row;
    let col = cell.col;
    let newRow = row;
    let newCol = col;

    switch (direction) {
        case "up":
            newRow = row === 0 ? 8 : row - 1;
            break;
        case "down":
            newRow = row === 8 ? 0 : row + 1;
            break;
        case "left":
            newCol = col === 0 ? 8 : col - 1;
            break;
        case "right":
            newCol = col === 8 ? 0 : col + 1;
            break;
    }

    selectedCell = grid[newRow][newCol];
    selectedCell.focus();
}
