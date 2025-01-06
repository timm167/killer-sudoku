import { state } from './state.js';

function populateBoxes(){
    console.log(state.boxes);
    console.log(state.grid);
    for (let key in state.boxes) {
        let box = state.boxes[key];
        console.log("box:",box);
        let cell = box.cells[0];
        console.log("cell:",cell);
        let child = state.grid[cell.row][cell.col];
        console.log("child:",child);
        let cellContainer = child.parentElement
        console.log(cellContainer);
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
            for (let box_cell of state.boxes[cell.inBox]['cells']) {
                if (box_cell.row === r && box_cell.col === c) {
                    box_cell.actualValue = cell.actualValue;
                }
            }
        }
    }
}

export {populateBoxes, populateGrid};