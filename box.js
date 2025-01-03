import { state, setAddingBox, setDeletingBox } from './state.js';
import { colorChange } from './utils.js';
import { addHoverBox, removeHoverBox } from './animation.js';

const {cellColors, colorIndex, grid, cells_with_box, boxes, deletedBoxes, addingBox, currentBox, deletingBox} = state;

function colorBox(box) {
    let color = cellColors[colorIndex];
    for (let i = 0; i < box.length; i++) {
        box[i].classList.add(color);
        box[i].classList.remove("selected");
        box[i].color = color;
        colorChange();
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
            setAddingBox(false)
        }
    }
}

// Helper function to create a box when the "New Box" button is clicked
// Second click will place the box
function createBox() {
    setAddingBox(!addingBox)
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
    if (!cells_with_box.includes(cell)) {
        if (currentBox.length === 0) {
            return true;
        } else {
            return isAdjacent(cell);
        }
    }
}

export { createBox, deleteBox, resetDeleteBox, addCellToBox, addBackDeletedBox };