document.addEventListener("DOMContentLoaded", function() {
    const gridElement = document.getElementById("grid");
    let grid = [];
    
    function getCubeIndex(row, col) {
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
            cell.cube = getCubeIndex(r, c);
            cell.selected = false;
            cell.addEventListener("input", function() {
                validateSudoku(cell)
            });
            cell.addEventListener("click", function() {
                if (addingBox) {
                    cell.classList.toggle("selected");
                    cell.selected = !cell.selected;
                    if (cell.selected) {
                        currentBox.push(cell);
                    } else {
                        currentBox = currentBox.filter((item) => item !== cell);
                    }

                } else {
                    addingBox = false;
                }
            });
            row.push(cell);
            gridElement.appendChild(cell);
        }
        grid.push(row);
    }

    // BUTTONS FOR GAME FUNCTIONALITY
    document.getElementById("clearButton").addEventListener("click", function() {
        clearSudoku(grid);
    });
    document.getElementById("undoButton").addEventListener("click", function() {
        undoAction(active_cell)
    });
    document.getElementById("newBoxButton").addEventListener("click", function() {
        addingBox = !addingBox;
        document.getElementById("newBoxButton").textContent = addingBox ? "Place Box" : "New Box";
        if (!addingBox) {
            boxes[currentBox] = currentBox;
            currentBox = [];
        }

    });
    document.getElementById("delBoxButton").addEventListener("click", function() {
        undoAction(active_cell)
    });
    document.getElementById("setBoxButton").addEventListener("click", function() {
        undoAction(active_cell)
    });

    const numberToggler = document.getElementById("numberButton");

    // Toggle sums when the button is clicked
    numberToggler.addEventListener("click", function () {
        if (!isValid) {
            if (!togglingSums) {
                alert("Please remove errors from the board before toggling the sums.");
                return;
            }
            isValid = true;
        }

        toggleSums();

        // Update button text based on the state
        numberToggler.textContent = togglingSums ? "Back" : "Sum Boxes";
    });
});
// Initializing state tracking
let rows = Array(9).fill().map(() => ({}));
let cols = Array(9).fill().map(() => ({}));
let cubes = Array(9).fill().map(() => ({}));
let active_cell = null;
let isValid = true;
let togglingSums = false;
let addingBox = false;
let boxes = {};
let currentBox = [];

// Toggle the visibility of sum-related controls
function toggleSums() {
    togglingSums = !togglingSums;
    const sumButtons = document.getElementById("sumButtons");

    if (togglingSums) {
        isValid = false; // Disable Sudoku validation while summing
        sumButtons.classList.remove("hidden");
    } else {
        sumButtons.classList.add("hidden");
    }
}


// END OF KILLER SUDOKU FUNCTIONS

// FUNCTIONS FOR ADDING SUDOKU FUNCTIONALITY
function clearCell(cell) {
    cell.value = ""; // Clear the input 
    rows[cell.row][cell.id] = ""; // Clear the tracking arrays
    cols[cell.col][cell.id] = "";
    cubes[cell.cube][cell.id] = "";
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
    let cubeIndex = cell.cube;
    let value = cell.value;
    
    if (value) {
        // Check if the value already exists in the row, column, or cube
        
        if (Object.values(rows[r]).includes(value) || Object.values(cols[c]).includes(value) || Object.values(cubes[cubeIndex]).includes(value)){
            isValid = false;
            cell.classList.add("invalid"); // Mark cell as invalid if duplicate found
        } else {
            // Update the tracking arrays with the new value
            rows[r][cell.id] = value
            cols[c][cell.id] = value
            cubes[cubeIndex][cell.id] = value;
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
            cell.classList.remove("selected");
        }
    }
    // Re-initialize empty tracking arrays
    rows = Array(9).fill().map(() => ({}));
    cols = Array(9).fill().map(() => ({}));
    cubes = Array(9).fill().map(() => ({}));
    isValid = true; // Reset the validation flag
    togglingSums = false; // Reset the toggling flag
    document.getElementById("numberButton").textContent = "Sum Boxes"
    document.getElementById("sumButtons").classList.add("hidden")
}

