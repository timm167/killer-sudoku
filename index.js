document.addEventListener("DOMContentLoaded", function() {
    const gridElement = document.getElementById("grid");
    let grid = [];
    
    function getBoxIndex(row, col) {
        return Math.floor(row / 3) * 3 + Math.floor(col / 3);
    }

    for (let r = 0; r < 9; r++) {
        let row = [];
        for (let c = 0; c < 9; c++) {
            let cell = document.createElement("input");
            cell.type = "text";
            cell.classList.add("cell");
            cell.row = r;
            cell.col = c;
            cell.id = `${cell.row}/${cell.col}`
            cell.box = getBoxIndex(r, c);
            cell.addEventListener("input", function() {
                validateSudoku(cell)
            });
            row.push(cell);
            gridElement.appendChild(cell);
        }
        grid.push(row);
    }
    document.getElementById("clearButton").addEventListener("click", function() {
        clearSudoku(grid);
    });
    document.getElementById("undoButton").addEventListener("click", function() {
        undoAction(active_cell)
    });
});

let rows = Array(9).fill().map(() => ({}));
let cols = Array(9).fill().map(() => ({}));
let boxes = Array(9).fill().map(() => ({}));
let active_cell = null;
let isValid = true;

function clearCell(cell) {
    cell.value = ""; // Clear the input 
    rows[cell.row][cell.id] = ""; // Clear the tracking arrays
    cols[cell.col][cell.id] = "";
    boxes[cell.box][cell.id] = "";
}

function undoAction(cell) {
    clearCell(cell);
    cell.classList.remove("invalid"); // Remove the "invalid" css class
    isValid = true; // Reset the validation flag
}

function validateSudoku(cell) {
    let value = cell.value;
    if (!/^\d$/.test(value) || isValid === false) {
        clearCell(cell);
    } else {
        active_cell = cell;
        checkSudoku(cell);
    }
}

function checkSudoku(cell) { 
    let r = cell.row;
    let c = cell.col;
    let boxIndex = cell.box;
    let value = cell.value;
    
    if (value) {
        // Check if the value already exists in the row, column, or box
        
        if (Object.values(rows[r]).includes(value) || Object.values(cols[c]).includes(value) || Object.values(boxes[boxIndex]).includes(value)){
            isValid = false;
            cell.classList.add("invalid"); // Mark cell as invalid if duplicate found
        } else {
            // Update the tracking arrays with the new value
            rows[r][cell.id] = value
            cols[c][cell.id] = value
            boxes[boxIndex][cell.id] = value;
        }
    }
}

function clearSudoku(grid) {
    // Reset the grid values and remove "invalid" css from all cells
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let cell = grid[r][c];
            cell.value = "";  
            cell.classList.remove("invalid");  
        }
    }
    // Re-initialize empty tracking arrays
    rows = Array(9).fill().map(() => ({}));
    cols = Array(9).fill().map(() => ({}));
    boxes = Array(9).fill().map(() => ({}));
    isValid = true; // Reset the validation flag
}

