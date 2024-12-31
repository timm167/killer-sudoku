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
            cell.type = "number";
            cell.classList.add("cell");
            cell.row = r;
            cell.col = c;
            cell.id = `${cell.row}/${cell.col}`
            cell.box = getBoxIndex(r, c);
            row.push(cell);
            gridElement.appendChild(cell);
        }
        grid.push(row);
    }

    document.getElementById("clearButton").addEventListener("click", function() {
        clearSudoku(grid);
    });
    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("input", function() {
            checkSudoku(cells[i]);
        });
    }
});

let rows = Array(9).fill().map(() => []);
let cols = Array(9).fill().map(() => []);
let boxes = Array(9).fill().map(() => []);
let isValid = true;

function checkSudoku(selectedCell) { 
    let r = selectedCell.row;
    let c = selectedCell.col;
    let boxIndex = selectedCell.box;
    let value = selectedCell.value;
    
    if (value) {
        // Check if the value already exists in the row, column, or box
        if (rows[r].includes(value) || cols[c].includes(value) || boxes[boxIndex].includes(value)) {
            isValid = false;
            selectedCell.classList.add("invalid"); // Mark cell as invalid if duplicate found
        } else {
            // Update the tracking arrays with the new value
            rows[r].push(value);
            cols[c].push(value);
            boxes[boxIndex].push(value);
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
    rows = Array(9).fill().map(() => []);
    cols = Array(9).fill().map(() => []);
    boxes = Array(9).fill().map(() => []);
    isValid = true; // Reset the validation flag
}

