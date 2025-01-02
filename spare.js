// FILE FOR STUFF I DON'T WANT TO DELETE BUT I AM NOT USING

setInterval(() => {
    if (isValid){
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                grid[r][c].canFocus = true;
                grid[r][c].classList.add("cell-focus");
            }
        }
    } else if (!isValid) {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                grid[r][c].canFocus = false;
                grid[r][c].classList.remove("cell-focus");
            }
        }
    }
}, 100);