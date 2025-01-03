import { state } from './state.js';

const { grid } = state;

function addHoverBox(box) {
    box.cells.forEach(c => {
        grid[c.row][c.col].classList.add("hover-box");
    });
}

function removeHoverBox(box) {
    box.cells.forEach(c => {
        grid[c.row][c.col].classList.remove("hover-box");
    });
}

function setBoxHoverAnimationOn() {
    // for (let key in boxes) {
    //     let box = boxes[key];
    //     box.cells.forEach(cell => {
    //         let row = cell.row;
    //         let col = cell.col;
    //         grid[row][col].addEventListener("mouseover", function() {
    //             addHoverBox(box)
    //     });
    //         grid[row][col].addEventListener("mouseout", function(){
    //             removeHoverBox(box)
    //         });
    //     });
    // }
}

export { setBoxHoverAnimationOn, addHoverBox, removeHoverBox };