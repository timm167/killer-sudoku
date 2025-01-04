def simplify_grid(grid):
    newGrid = []
    for row in grid:
        newRow = []
        for cell in row:
            new_cell = {key: value for key, value in cell.items() if key in ['row', 'col', 'cube', 'actualValue', 'inBox']}
            newRow.append(new_cell)
        newGrid.append(newRow)
    print(newGrid)
    return newGrid