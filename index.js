import {transparentColors} from './colors.js';

// TODO
// ADD LOGIC FOR BOXES
// ADD FUNCTIONALITY TO DELETE BOXES
// FIX UNDO TO NOT DELETE BOXES
// ADD BOX ACTION UNDO SPECIFIC TO BOXES
// ADD SHORTCUT KEY ON LEFT SIDE 

//TODO LATER
// ADD CHECK PUZZLE FUNCTIONALITY IN PYTHON
// ADD SOLVE PUZZLE FUNCTIONALITY IN PYTHON
// ADD SAVE PUZZLE FUNCTIONALITY USING JSON
// ADD LOAD PUZZLE FUNCTIONALITY USING JSON
// ADD PLAY SUDOKU FUNCTIONALITY (not core to the project)

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

function setBoxHoverAnimationOn() {
    for (let i = 0; i < boxes.length; i++) {
        let box = boxes[i];
        for (let j = 0; j < box.cells.length; j++) {
            let cell = box.cells[j];
            
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
    let color = cellColors[colorIndex];
    for (let i = 0; i < box.length; i++) {
        box[i].classList.add(color);
        box[i].classList.remove("selected");
        box[i].color = color;
        colorChange();
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

function deleteBox(cell) {
    let box = boxes[cell.inBox];
    for (let i = 0; i < box.cells.length; i++) {
        let boxCell = box.cells[i];
        boxCell.classList.remove(boxCell.color);
        boxCell.inBox = null;
        boxCell.color = null;
        boxCell.actualValue = 0;
        cells_with_box = cells_with_box.filter((item) => item !== boxCell);
    }
    delete boxes[cell.inBox];
    resetDeleteBox();
}

function resetDeleteBox() {
    document.getElementById("grid").classList.remove("selectBox")
    delBoxButton.textContent = "Delete Box";
    deletingBox = false;
}

// Helper function to set up event listeners for buttons
function setupEventListeners() {
    // document.getElementById("showSum").addEventListener("click", function() {
    //     console.log(boxes);
    // });
    document.getElementById("clearButton").addEventListener("click", function() {
        clearSudoku(grid);
    });
    document.getElementById("undoButton").addEventListener("click", function() {
        resetDeleteBox()
        undoAction((active_cell[active_cell.length - 1]))
    });
    document.getElementById("newBoxButton").addEventListener("click", function() {
        resetDeleteBox();
        createBox();
    });
    const delBoxButton = document.getElementById("delBoxButton");
    delBoxButton.addEventListener("click", function() {
        if (deletingBox) {
            resetDeleteBox()
        }
        else if (!deletingBox) {
            setBoxHoverAnimationOn();
            document.getElementById("grid").classList.add("selectBox");
            delBoxButton.textContent = "Select Box";
            deletingBox = true;
        }
    });
    document.getElementById("setBoxButton").addEventListener("click", function() {
        resetDeleteBox();
        undoAction(active_cell[-1])
    });

    const numberToggler = document.getElementById("numberButton");

    // Toggle sums when the button is clicked
    numberToggler.addEventListener("click", function () {
        resetDeleteBox();
        if (!isValid) {
            if (!togglingSums) {
                alert("Please remove errors from the board before toggling the sums.");
                return;
            }
            isValid = true;
        }

        toggleSums();

        // Update button text based on the state
        numberToggler.textContent = togglingSums ? "Exit Killer" : "Killer Mode";
        numberToggler.classList.toggle("active");
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
            cell.addEventListener("input", function() {
                validateSudoku(cell)
            });
            cell.addEventListener("click", function() {
                if (deletingBox && cell.inBox) {
                    deleteBox(cell)
                }
                else {
                    selectedCell = cell;
                    addCellToBox(cell);
            }
            });
            row.push(cell);
            gridElement.appendChild(cell);
        }
        grid.push(row);
    };
};


const colorView = document.getElementById("colorView")
let buttonColor = 'white'
let colorIndex = 0;
let availableColors = [...transparentColors];

function colorChange() {
    if (availableColors.length === 0) {
        availableColors = [...transparentColors];
    }
    colorView.classList.remove(buttonColor);
    buttonColor = availableColors.pop()
    colorIndex = availableColors.length;
    colorView.classList.add(buttonColor);
}

colorView.addEventListener("click", function() {
    colorChange();
})

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
let selectedCell = null; // Used to track the most recently selected cell
const cellColors = [...transparentColors] // Used to track the colors available for boxes
let deletingBox = false; // Used to track if the "Delete Box" button has been clicked

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
    window.location.reload();
    // for (let r = 0; r < 9; r++) {
    //     for (let c = 0; c < 9; c++) {
    //         let cell = grid[r][c];
    //         cell.value = "";  
    //         cell.classList.remove("invalid");  
    //         cell.classList.remove("selected");
    //         cell.classList.remove(cell.color);
    //         cell.color = null;
    //     }
    // }
    // // Re-initialize empty tracking arrays
    // rows = Array(9).fill().map(() => ({}));
    // cols = Array(9).fill().map(() => ({}));
    // cubes = Array(9).fill().map(() => ({}));
    // isValid = true; // Reset the validation flag
    // togglingSums = false; // Reset the toggling flag
    // currentBox = [];
    // boxes = {};
    // cells_with_box = [];
    // active_cell = [];   
    // document.getElementById("numberButton").textContent = "Killer Mode";
    // document.getElementById("sumButtons").classList.add("hidden")
    // document.getElementById("numberButton").classList.remove("active");
    // console.clear();
    // colorView.classList.remove(buttonColor);
    // colorView.textContent = "Toggle Color";
    // colorIndex = 0;
    // availableColors = transparentColors;

}

// GLOBAL EVENT LISTENERS

// KEY INPUTS

document.addEventListener("keydown", function(e) {
    console.log(e.key)
    if (isValid === false && togglingSums === false) {
        document.getElementById("undoButton").click();
    }
    else if (e.key === "Backspace" && (e.ctrlKey || e.shiftKey)) {
        document.getElementById("clearButton").click();
    }
    else if (e.key === "Backspace") {
        document.getElementById("undoButton").click();
    }
    else if (e.key === "ArrowUp") {
        let cell = selectedCell
        let row = cell.row;
        let col = cell.col;
        let newRow = row === 0 ? 8 : row - 1;
        selectedCell = grid[newRow][col];
        selectedCell.focus();
    }
    else if (e.key === "ArrowDown") {
        let cell = selectedCell
        let row = cell.row;
        let col = cell.col;
        let newRow = row === 8 ? 0 : row + 1;
        selectedCell = grid[newRow][col];
        selectedCell.focus();
    }
    else if (e.key === "ArrowLeft") {
        let cell = selectedCell
        let row = cell.row;
        let col = cell.col;
        let newCol = col === 0 ? 8 : col - 1;
        selectedCell = grid[row][newCol];
        selectedCell.focus();
    }
    else if (e.key === "ArrowRight") {
        let cell = selectedCell
        let row = cell.row;
        let col = cell.col;
        let newCol = col === 8 ? 0 : col + 1;
        selectedCell = grid[row][newCol];
        selectedCell.focus();
    } 
    else if (e.key === "Enter") {
        e.preventDefault();
        if (togglingSums) {
            document.getElementById("newBoxButton").click();
        }
    }
    else if (e.key === "Shift"){
        document.getElementById("numberButton").click();
    }
})


document.addEventListener("DOMContentLoaded", function() {
    // Initialize the Sudoku grid
    setupEventListeners();
    createSudokuGrid();
});