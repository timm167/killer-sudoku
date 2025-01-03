import {state, setIsValid} from './state.js';
import {clearCell} from './utils.js';

const {rows, cols, cubes, isValid} = state;


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
            state.rows[r][cell.id] = value
            state.cols[c][cell.id] = value
            state.cubes[cubeIndex][cell.id] = value;
            cell.actualValue = parseInt(value);
            if (cell.inBox !== null) {
                state.boxes[cell.inBox]['sum'] += cell.actualValue;
            }
        }
    }
}

// Helper function to validate the input
function validateSudoku(cell) {
    let value = cell.value;
    if (!/^\d$/.test(value) || state.isValid === false) {
        console.log(`invalid input is causing the cell ${cell.id} to be cleared`)
        clearCell(cell);
    } else {
        state.active_cell.push(cell);
        checkSudoku(cell);
    }
}

export { validateSudoku, checkSudoku };