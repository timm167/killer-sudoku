// grid.js
import { state, setSelectedCell } from './state.js';
import { getCubeIndex } from './utils.js';
import { validateSudoku } from './sudoku.js';
import { addCellToBox, deleteBox } from './box.js';

const { deletingBox } = state;

const gridElement = document.getElementById("grid");
let grid = [];

function createSudokuGrid() {
    for (let r = 0; r < 9; r++) {
        let row = [];
        for (let c = 0; c < 9; c++) {
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
                validateSudoku(cell);
            });
            cell.addEventListener("click", function() {
                if (state.deletingBox && cell.inBox) {
                    deleteBox(cell);
                } else {
                    setSelectedCell(cell);
                    addCellToBox(cell);
                }
            });
            row.push(cell);
            gridElement.appendChild(cell);
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
