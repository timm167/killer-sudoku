import testBoxes from './testboxes.js';
import testGrid from './testgrid.js';   
import { state } from './state.js';

function populateBoxes(){
    for (let key in state.boxes) {
        let box = state.boxes[key];
        let cell = box.cells[0];
        let first = state.grid[cell.row][cell.col];
        let cellContainer = first.parentElement;
        let span = cellContainer.querySelector('.box-total-note');
        span.textContent = box.declaredTotal;
        box.cells.forEach(cell => {
            state.grid[cell.row][cell.col].classList.add(cell.color);
            state.grid[cell.row][cell.col].inBox = cell.inBox;      
            state.grid[cell.row][cell.col].color = cell.color;
            state.grid[cell.row][cell.col].actualValue = cell.actualValue;
            state.grid[cell.row][cell.col].row = cell.row;
            state.grid[cell.row][cell.col].col = cell.col;
            state.grid[cell.row][cell.col].cube = cell.cube;
            state.cells_with_box.push(cell);
        });
    }
}

function populateGrid(){
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let cell = state.grid[r][c];
            let inputElement = document.getElementById(`${r}/${c}`);
            if (inputElement && cell.actualValue !== 0) {
                inputElement.value = cell.actualValue;
            }
            
        }
    }
}

export {populateBoxes, populateGrid};