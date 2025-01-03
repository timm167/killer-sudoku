import { updateGridFocus } from "./grid.js";
import { transparentColors } from "./colors.js";

// Initial state
const state = {
    rows: Array(9).fill().map(() => ({})),  // Initialize empty tracking arrays for rows
    cols: Array(9).fill().map(() => ({})),  // Initialize empty tracking arrays for columns
    cubes: Array(9).fill().map(() => ({})), // Initialize empty tracking arrays for 3x3 cubes
    buttonColor: 'white',
    colorIndex: 0,
    active_cell: [],                        // Used to track the most recently edited cell for undo
    isValid: true,                          // Used to track if an input is valid and halts activity
    togglingSums: false,                    // Used to track if the sums are being toggled
    addingBox: false,                       // Used to track if the "Place Box" button is clicked
    boxes: {},                              // Used to track the boxes, their cells, and their sums
    currentBox: [],                         // Used to track the cells selected for a box
    boxCount: 0,                            // Used to track the number of boxes created
    cells_with_box: [],                     // Used to track cells that are part of a box
    selectedCell: null,                     // Used to track the most recently selected cell
    availableColors: [...transparentColors],  // Used to track the colors available for boxes
    cellColors: [...transparentColors],    
    deletingBox: false,                     // Used to track if the "Delete Box" button has been clicked
    deletedBoxes: [],                        // Used to track deleted boxes
    grid: [],
    isButtonDisabled: false,
    settingBoxTotal: false, 
};

// Functions to interact with state

// Update validity of inputs
function setIsValid(valid) {
    state.isValid = valid;
    updateGridFocus();
}

// Set toggling sums state
function setTogglingSums(isToggling) {
    state.togglingSums = isToggling;
}

// Toggle adding box state
function setAddingBox(isAdding) {
    state.addingBox = isAdding;
}

// Update selected cell
function setSelectedCell(cell) {
    state.selectedCell = cell;
}

function setDeletingBox(isDeleting) {
    state.deletingBox = isDeleting;
}

function getState() {
    return state;
}   

export { 
    state, 
    setIsValid, 
    setTogglingSums, 
    setAddingBox, 
    setSelectedCell, 
    getState, 
    setDeletingBox,
};