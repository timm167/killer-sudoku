import { clearSudoku, undoAction } from './index.js';

function addEventListeners() {   
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
}

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