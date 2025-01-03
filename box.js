import { state, setAddingBox, setDeletingBox } from './state.js';
import { colorChange, isAdjacent } from './utils.js';
// import { addHoverBox, removeHoverBox } from './animation.js';

const {boxes, currentBox } = state;

function colorBox(box) {
    colorChange();
    let color = state.cellColors[state.colorIndex];
    for (let i = 0; i < box.length; i++) {
        box[i].classList.add(color);
        box[i].classList.remove("selected");
        box[i].color = color;
    }
}

// Helper function to add a cell to a box when selected. Works when addingBox is true as toggled within createBox()
function addCellToBox(cell) {
    if (isValidBoxAddition(cell)) {
        if (state.addingBox) {
            cell.classList.toggle("selected");
            cell.selected = !cell.selected;
            if (cell.selected) {
                state.currentBox.push(cell);
            } else {
                state.currentBox = state.currentBox.filter((item) => item !== cell);
            }
        } else {
            setAddingBox(false)
        }
    }
}

// Helper function to create a box when the "New Box" button is clicked
// Second click will place the box
function createBox() {
    setAddingBox(!state.addingBox)
    document.getElementById("newBoxButton").textContent = state.addingBox ? "Place Box" : "New Box";
    if (!state.addingBox) {
        let boxId = `box${state.boxCount++}`;
        let sumBox = 0;
        colorBox(state.currentBox);
        for (let i = 0; i < state.currentBox.length; i++) {
            sumBox += state.currentBox[i].actualValue;
            state.cells_with_box.push(state.currentBox[i]);
        }
        state.boxes[boxId] = { 'cells': [...state.currentBox], 'sum': sumBox, 'declaredTotal': sumBox }
        for (let i = 0; i < currentBox.length; i++) {
            state.currentBox[i].inBox = boxId;
        }
        state.currentBox = [];
    }
}

function addBackDeletedBox() {
    let boxId = `box${state.boxCount++}`;
    let sumBox = 0;
    colorBox(currentBox);
    for (let i = 0; i < currentBox.length; i++) {
        sumBox += currentBox[i].actualValue;
        state.cells_with_box.push(currentBox[i]);
    }
    boxes[boxId] = { 'cells': [...currentBox], 'sum': sumBox }
    for (let i = 0; i < currentBox.length; i++) {
        state.currentBox[i].inBox = boxId;
    }
    state.currentBox = [];
}

function deleteBox(cell) {
    let box = state.boxes[cell.inBox];
    state.deletedBoxes.push(box);
    for (let i = 0; i < box.cells.length; i++) {
        let boxCell = box.cells[i];
        boxCell.classList.remove(boxCell.color);
        boxCell.inBox = null;
        boxCell.color = null;
        boxCell.actualValue = 0;
        state.cells_with_box = state.cells_with_box.filter((item) => item !== boxCell);
    }
    delete state.boxes[cell.inBox];
    resetDeleteBox();
}

function resetDeleteBox() {
    document.getElementById("grid").classList.remove("selectBox")
    document.getElementById("delBoxButton").textContent = "Delete Box";
    setDeletingBox(false);
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            // grid[r][c].removeEventListener("mouseover", function() {
            //     addHoverBox(box);
            // });
            // grid[r][c].removeEventListener("mouseout", function() {
            //     removeHoverBox(box);
            // });
        }
    }
}

// Helper function to check if a cell is a valid addition to a box
function isValidBoxAddition(cell) {
    if (!state.cells_with_box.includes(cell)) {
        if (state.currentBox.length === 0) {
            return true;
        } else {
            return isAdjacent(cell);
        }
    }
}

function setBoxTotal(cell) {
    let newDeclaredTotal = parseInt(prompt("Enter the new declared total for the box:"), 10);
    if (isNaN(newDeclaredTotal)) {
        alert("Please enter a valid number.");
        return;
    }
    if (newDeclaredTotal < cell.inBox['sum']) {
        alert("The declared total cannot be less than the sum of numbers already in the box.");
    }
    state.boxes[cell.inBox]['declaredTotal'] = newDeclaredTotal;
    console.log("boxes", state.boxes);
    let cellContainer = cell.parentElement;
    let span = cellContainer.querySelector('.box-total-note');
    span.textContent = newDeclaredTotal;
    state.settingBoxTotal = false;
}

export { createBox, deleteBox, resetDeleteBox, addCellToBox, addBackDeletedBox, setBoxTotal };