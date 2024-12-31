document.addEventListener("DOMContentLoaded", function() {
    const gridElement = document.getElementById("grid");
    let grid = [];
  
    for (let i = 0; i < 9; i++) {
      let row = [];
      for (let j = 0; j < 9; j++) {
        let cell = document.createElement("input");
        cell.type = "number";
        cell.classList.add("cell");
        cell.id = `${i}/${j}`;
        row.push(cell);
        gridElement.appendChild(cell);
      }
      grid.push(row);
    }

    function getBoxIndex(row, col) {
        return Math.floor(row / 3) * 3 + Math.floor(col / 3);
      }
    
    console.log(getBoxIndex(3, 8));
  });
  
