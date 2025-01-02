import {transparentColors} from './colors.js';
import { state, setIsValid, setTogglingSums, setAddingBox, setSelectedCell} from './state.js';
import {createSudokuGrid} from './grid.js';

// TODO
// ADD LOGIC (numeracy) FOR BOXES (could be 3+ hours)
// ADD BOX ACTION UNDO SPECIFIC TO BOXES i.e. remove last cell added to current box
// SPLIT THIS CODE INTO MULTIPLE FILES (1 hour)

//TODO LATER
// ADD CHECK PUZZLE FUNCTIONALITY IN PYTHON
// ADD SOLVE PUZZLE FUNCTIONALITY IN PYTHON
// ADD SAVE PUZZLE FUNCTIONALITY USING JSON
// ADD LOAD PUZZLE FUNCTIONALITY USING JSON
// ADD PLAY SUDOKU FUNCTIONALITY (not core to the project)
// Maybe fix the animation for the boxes

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

function addHoverBox(box) {
    box.cells.forEach(c => {
        grid[c.row][c.col].classList.add("hover-box");
    });
}

function removeHoverBox(box) {
    box.cells.forEach(c => {
        grid[c.row][c.col].classList.remove("hover-box");
    });
}

function setBoxHoverAnimationOn() {
    // for (let key in boxes) {
    //     let box = boxes[key];
    //     box.cells.forEach(cell => {
    //         let row = cell.row;
    //         let col = cell.col;
    //         grid[row][col].addEventListener("mouseover", function() {
    //             addHoverBox(box)
    //     });
    //         grid[row][col].addEventListener("mouseout", function(){
    //             removeHoverBox(box)
    //         });
    //     });
    // }
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

function addBackDeletedBox() {
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

// Toggle the visibility of sum-related controls
function toggleSums() {
    togglingSums = !togglingSums;
    const sumButtons = document.getElementById("sumButtons");

    if (togglingSums) {
        setIsValid(false)// Disable Sudoku validation while summing
        sumButtons.classList.remove("hidden");
    } else {
        sumButtons.classList.add("hidden");
    }
}

function deleteBox(cell) {
    let box = boxes[cell.inBox];
    deletedBoxes.push(box);
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
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            grid[r][c].removeEventListener("mouseover", function() {
                addHoverBox(box);
            });
            grid[r][c].removeEventListener("mouseout", function() {
                removeHoverBox(box);
            });
        }
    }
}

// Helper function to set up event listeners for buttons
function setupEventListeners() {
    // document.getElementById("showSum").addEventListener("click", function() {
    //     console.log(boxes);
    // });
    document.getElementById("clearButton").addEventListener("click", function() {
        clearSudoku();
    });
    document.getElementById("undoButton").addEventListener("click", function() {
        if (togglingSums){
            currentBox = deleteBox[currentBox.length - 1];
            addBackDeletedBox();
            return;
        }
        undoAction((active_cell[active_cell.length - 1]))
        resetDeleteBox()
    });
    document.getElementById("newBoxButton").addEventListener("click", function() {
        resetDeleteBox();
        createBox();
    });
    const delBoxButton = document.getElementById("delBoxButton");
    delBoxButton.addEventListener("click", function() {
        if (addingBox){
            return;
        }
        if (deletingBox) {
            resetDeleteBox()
        }
        else if (!deletingBox) {
            setBoxHoverAnimationOn();
            document.getElementById("grid").classList.add("selectBox");
            delBoxButton.textContent = "Select a box";
            deletingBox = true;
        }
    });

    document.getElementById("setBoxButton").addEventListener("click", function() {
        // resetDeleteBox();
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
            setIsValid(true);
        }

        toggleSums();

        // Update button text based on the state
        numberToggler.textContent = togglingSums ? "Exit Killer" : "Killer Mode";
        numberToggler.classList.toggle("active");
    });
}

const colorView = document.getElementById("colorView")

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
    setIsValid(true) // Reset the validation flag
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
            setIsValid(false); // Mark the input as invalid
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
function clearSudoku() {
    window.location.reload();
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