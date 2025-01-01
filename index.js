import {transparentColors} from './colors.js';

// TODO
// ADD FUNCTIONALITY TO DELETE BOXES
// Make it so that box cells must be adjacent
// FIX UNDO TO NOT DELETE BOXES
// ADD BOX ACTION UNDO SPECIFIC TO BOXES
// MAKE addCellToBox less ugly (max twice nested)

document.addEventListener("DOMContentLoaded", function() {
    const gridElement = document.getElementById("grid");
    let grid = [];
    
    // Helper function to get the cube index
    function getCubeIndex(row, col) {
        return Math.floor(row / 3) * 3 + Math.floor(col / 3);
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

    // Helper function to check if a cell is a valid addition to a box
    function isValidBoxAddition(cell) {
        if (!cells_with_box.includes(cell)) {
            if (currentBox.length === 0) {
                return true;
            } else {
                return isAdjacent(cell);
            }
        }
        
    }
    // Helper function to add a cell to a box when selected. Works when addingBox is true as toggled within createBox()
    function addCellToBox(cell) {
        if (isValidBoxAddition(cell)) {
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
        }
    }

    function colorBox(box) {
        let color = available_box_colors.pop();
        for (let i = 0; i < box.length; i++) {
            box[i].classList.add(color);
            box[i].classList.remove("selected");
            box[i].color = color;
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
            colorBox(currentBox);
            for (let i = 0; i < currentBox.length; i++) {
                sumBox += currentBox[i].actualValue;
                cells_with_box.push(currentBox[i]);
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
            undoAction((active_cell[active_cell.length - 1]))
        });
        document.getElementById("newBoxButton").addEventListener("click", function() {
            createBox();
        });
        document.getElementById("delBoxButton").addEventListener("click", function() {
            undoAction(active_cell[-1])
        });
        document.getElementById("setBoxButton").addEventListener("click", function() {
            undoAction(active_cell[-1])
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
    // Initializes each cell with the necessary properties and event listeners
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
                cell.color = null;
                cell.value = cell.id;
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

    // Initialize the Sudoku grid
    setupEventListeners();
    createSudokuGrid();

});

// Initializing state tracking
let rows = Array(9).fill().map(() => ({})); // Initialize empty tracking arrays for rows
let cols = Array(9).fill().map(() => ({})); // Initialize empty tracking arrays for columns
let cubes = Array(9).fill().map(() => ({})); // Initialize empty tracking arrays for 3x3 cubes
let active_cell = []; // Used to track the most recently edited cell for undo
let isValid = true; // Used to track if an input is valid and halts activity. Also used to halt activity when toggling sums.
let togglingSums = false; // Used to track if the sums are being toggled (i.e. if the "Sum Boxes" button has been clicked)
let addingBox = false; // Used to track if the "Place Box" button has been clicked so user can select cells to add to a box
let boxes = {}; // Used to track the boxes, their cells, and their sums
let currentBox = []; // Used to track the cells selected for a box
let boxCount = 0; // Used to track the number of boxes created for indexing
let cells_with_box = []; // Used to track cells that are part of a box
let available_box_colors = transparentColors // Used to track the colors available for boxes

// Helper function to clear a cell
function clearCell(cell) {
    console.log(`clearing cell ${cell.id}`)
    cell.value = ""; // Clear the input 
    cell.actualValue = 0;
    cell.classList.remove(cell.color)
    rows[cell.row][cell.id] = ""; // Clear the tracking dictionaries
    cols[cell.col][cell.id] = "";
    cubes[cell.cube][cell.id] = "";
    cell.inBox && (boxes[cell.inBox]['sum'] -= cell.actualValue);
    cell.inBox = null;
    cells_with_box = cells_with_box.filter((item) => item !== cell);
    active_cell = active_cell.filter((item) => item !== cell);
}

// Helper function to undo the most recent action
function undoAction(cell) {
    clearCell(cell);
    cell.classList.remove("invalid"); // Remove the "invalid" css class
    isValid = true; // Reset the validation flag
}

// Helper function to validate the input
function validateSudoku(cell) {
    let value = cell.value;
    if (!/^\d$/.test(value) || isValid === false) {
        clearCell(cell);
    } else {
        active_cell.push(cell);
        checkSudoku(cell);
    }
}

// Helper function to check if the input follows Sudoku rules
function checkSudoku(cell) { 
    // Get the row, column, cube, and value of the cell
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

// Helper function to clear the Sudoku board
function clearSudoku(grid) {
    // Reset the grid values and remove "invalid" css from all cells
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let cell = grid[r][c];
            cell.value = "";  
            cell.classList.remove("invalid");  
            cell.classList.remove("selected");
            cell.classList.remove(cell.color);
            cell.color = null;
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
    cells_with_box = [];
    active_cell = [];   
    document.getElementById("numberButton").textContent = "Sum Boxes"
    document.getElementById("sumButtons").classList.add("hidden")
}