// grid.js
import { state, setSelectedCell } from './state.js';
import { getCubeIndex, undoAction } from './utils.js';
import { validateSudoku } from './sudoku.js';
import { addCellToBox, deleteBox, setBoxTotal } from './box.js';

const gridElement = document.getElementById("grid");

function createSudokuGrid() {
    for (let r = 0; r < 9; r++) {
        let row = [];
        for (let c = 0; c < 9; c++) {
            let cellContainer = document.createElement('div');
            cellContainer.classList.add('cell-container');

            let cell = document.createElement("input");
            cell.type = "text";
            cell.classList.add("cell");
            cell.classList.add("cell-focus");
            cell.canFocus = true;
            cell.row = r;
            cell.col = c;
            cell.id = `${cell.row}/${cell.col}`;
            cell.cube = getCubeIndex(r, c);
            cell.selected = false;
            cell.actualValue = 0;
            cell.inBox = null;
            cell.color = null;
            cell.addEventListener("input", function() {
                if (state.isValid === false) {
                    undoAction(cell); // MAYBE TRY ADDING ANOTHER STATE VARIABLE TO CHECK IF THE CELL IS INVALID
                    return;
                }
                validateSudoku(cell);
            });
            cell.addEventListener("click", function() {
                if (state.deletingBox && cell.inBox) {
                    deleteBox(cell);
                }
                else if (state.settingBoxTotal && cell.inBox) {
                    setBoxTotal(cell)

                }
                 else {
                    setSelectedCell(cell);
                    state.togglingSums && addCellToBox(cell);
                }
            });
            let span = document.createElement('span');
            span.classList.add('box-total-note');  
            span.textContent = '';

            // Append the input and span to the container
            cellContainer.appendChild(cell); // The input goes first
            cellContainer.appendChild(span); // The span goes second

            // Append the container to the grid
            row.push(cellContainer);
            gridElement.appendChild(cellContainer);  
        }
        state.grid.push(row);
    };
};

function updateGridFocus() {
    const { isValid } = state; 
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (isValid) {
                state.grid[r][c].canFocus = true;
                state.grid[r][c].classList.add("cell-focus");
            } else {
                state.grid[r][c].canFocus = false;
                state.grid[r][c].classList.remove("cell-focus");
            }
        }
    }
}

export { createSudokuGrid, updateGridFocus };
