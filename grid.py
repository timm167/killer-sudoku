def simplify_grid(grid):
    newGrid = []
    for row in grid:
        newRow = []
        for cell in row:
            new_cell = {key: value for key, value in cell.items() if key in ['row', 'col', 'cube', 'actualValue', 'inBox']}
            fixed_value = new_cell['actualValue']
            new_cell['fixedValue'] = fixed_value
            newRow.append(new_cell)
        newGrid.append(newRow)
    return newGrid