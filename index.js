document.addEventListener("DOMContentLoaded", function() {
    const gridElement = document.getElementById("grid");
    let grid = [];
    
    function getBoxIndex(row, col) {
        return Math.floor(row / 3) * 3 + Math.floor(col / 3);
    }

    for (let r = 0; r < 9; r++) {
        let row = [];
        for (let c = 0; c < 9; c++) {
            let cell = document.createElement("input");
            cell.type = "number";
            cell.classList.add("cell");
            cell.row = r + 1;
            cell.col = c + 1;
            cell.id = `${cell.row}/${cell.col}`
            cell.box = getBoxIndex(r, c);
            row.push(cell);
            gridElement.appendChild(cell);
        }
        grid.push(row);
    }

    document.getElementById("checkButton").addEventListener("click", function() {
        checkSudoku(grid);
    });

    document.getElementById("clearButton").addEventListener("click", function() {
        clearSudoku(grid);
    });
});

function checkSudoku(grid) {
    let rows = Array(9).fill().map(() => []);
    let cols = Array(9).fill().map(() => []);
    let boxes = Array(9).fill().map(() => []);
    let isValid = true;

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let cell = grid[r][c];
            let value = cell.value;
            if (value) {
                if (rows[r].includes(value) || cols[c].includes(value) || boxes[cell.box].includes(value)) {
                    isValid = false;
                    cell.classList.add("invalid");
                    return
                } else {
                    cell.classList.remove("invalid");
                    rows[r].push(value);
                    cols[c].push(value);
                    boxes[cell.box].push(value);
                }
            }
        }
      }
      return isValid
}

function clearSudoku(grid) {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let cell = grid[r][c];
            cell.value = "";
            cell.classList.remove("invalid");
        }
    }
}