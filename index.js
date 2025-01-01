document.addEventListener("DOMContentLoaded", function() {
    const gridElement = document.getElementById("grid");
    let grid = [];
    
    // Helper function to get the cube index
    function getCubeIndex(row, col) {
        return Math.floor(row / 3) * 3 + Math.floor(col / 3);
    }

    // Helper function to add a cell to a box when selected. Works when addingBox is true as toggled within createBox()
    function addCellToBox(cell) {
        if (addingBox  && !cellsWithBox.includes(cell)) {
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
    }

    // Helper function to create a box when the "New Box" button is clicked
    // Second click will place the box
    function createBox() {
        addingBox = !addingBox;
        document.getElementById("newBoxButton").textContent = addingBox ? "Place Box" : "New Box";
        if (!addingBox) {
            let boxId = `box${boxCount++}`;
            let sumBox = 0;
            for (let i = 0; i < currentBox.length; i++) {
                sumBox += currentBox[i].actualValue;
                cellsWithBox.push(currentBox[i]);
            }
            boxes[boxId] = { 'cells': [...currentBox], 'sum': sumBox }
            for (let i = 0; i < currentBox.length; i++) {
                currentBox[i].inBox = boxId;
            }
            currentBox = [];
        }
    }

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

    // Helper function to set up event listeners for buttons
    function setupEventListeners() {
        document.getElementById("showSum").addEventListener("click", function() {
            console.log(boxes);
        });
        document.getElementById("clearButton").addEventListener("click", function() {
            clearSudoku(grid);
        });
        document.getElementById("undoButton").addEventListener("click", function() {
            undoAction(active_cell)
        });
        document.getElementById("newBoxButton").addEventListener("click", function() {
            createBox();
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
    }

    // Create the Sudoku grid
    // Initialises each cell with the necessary properties and event listeners
    function createSudokuGrid() {
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
                cell.actualValue = 0;
                cell.inBox = null;
                cell.addEventListener("input", function() {
                    validateSudoku(cell)
                });
                cell.addEventListener("click", function() {
                    addCellToBox(cell);
                });
                row.push(cell);
                gridElement.appendChild(cell);
            }
            grid.push(row);
        };
    };


    setupEventListeners();
    createSudokuGrid();

});
// Initializing state tracking
let rows = Array(9).fill().map(() => ({})); // Initialize empty tracking arrays
let cols = Array(9).fill().map(() => ({})); // Initialize empty tracking arrays
let cubes = Array(9).fill().map(() => ({})); // Initialize empty tracking arrays
let active_cell = []; // Used to track the most recently edited cell for undo
let isValid = true;
let togglingSums = false;
let addingBox = false;
let boxes = {};
let currentBox = [];
let boxCount = 0;
let cellsWithBox = []; 

// Helper function to clear a cell
function clearCell(cell) {
    cell.value = ""; // Clear the input 
    cell.actualValue = 0;
    rows[cell.row][cell.id] = ""; // Clear the tracking dictionaries
    cols[cell.col][cell.id] = "";
    cubes[cell.cube][cell.id] = "";
    cell.inBox = null;
    boxes[cell.inBox]['sum'] -= cell.actualValue;
    cellsWithBox = cellsWithBox.filter((item) => item !== cell);
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
        active_cell.push(cell);
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
            cell.actualValue = parseInt(value);
            if (cell.inBox !== null) {
                boxes[cell.inBox]['sum'] += cell.actualValue;
            }
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
    currentBox = [];
    boxes = {};
    cellsWithBox = [];
    document.getElementById("numberButton").textContent = "Sum Boxes"
    document.getElementById("sumButtons").classList.add("hidden")
}