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
        } 
        else if (cell.inBox && (state.boxes[cell.inBox]['declaredTotal'] !== 0) && ((parseInt(state.boxes[cell.inBox]['sum']) + parseInt(value)) > state.boxes[cell.inBox]['declaredTotal'])) {
            setIsValid(false); // Mark the input as invalid
            cell.classList.add("invalid"); // Mark cell as invalid if duplicate found
        }
        else {
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
function boxFullAndNotEqual(cell){
    let counter = 0;
    for (let i in state.boxes[cell.inBox]['cells']) {
        if (state.boxes[cell.inBox]['cells'][i].actualValue !== 0) {
            counter++;
        }
    }
    counter++;
    if (counter !== state.boxes[cell.inBox]['cells'].length) {
        console.log("counter", counter);
        return false;
    }

    if ((parseInt(state.boxes[cell.inBox]['sum']) + parseInt(cell.value) === state.boxes[cell.inBox]['declaredTotal'])) {
        console.log("sum", state.boxes[cell.inBox]['sum']);
        return false;
    }

        return true;
    }



// Helper function to validate the input
function validateSudoku(cell) {
    let value = cell.value;
    console.log("validating sudoku");
    console.log("cell.inBox", cell.inBox);
    console.log(boxFullAndNotEqual(cell));
    if (!/^\d$/.test(value) || state.isValid === false) {
        clearCell(cell);
    } else if (cell.inBox && boxFullAndNotEqual(cell)) { 
            alert("If the box is full, the declared total must be the sum of the numbers in the box.");
            clearCell(cell);
    } else {
        state.active_cell.push(cell);
        checkSudoku(cell);
    }
}

export { validateSudoku, checkSudoku };