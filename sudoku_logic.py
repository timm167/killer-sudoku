def check_solvable(grid, boxes):
    return True ## This is a placeholder for the actual implementation  

def check_ways_solvable(grid, boxes):
    if not check_solvable(grid, boxes):
        return 0
    return 1 ## This is a placeholder for the actual implementation

def validate_box_context(cell, boxes, attemptedValue):
    if not cell.inBox: ## if the cell is not in a box, the box has 0 constraints
        return True
    box = boxes[cell.inBox]
    if int(box['sum']) + int(attemptedValue) > int(box['declaredValue']): 
        return False ## if the sum of the box and the attempted value is greater than the declared value, this breaks the killer sudoku constraint
    counter = 0
    for cell in box['cells']: 
        if counter > 1: ## check if the box is full (counter of 1 is full because the box does not yet include the attempted value)
            return True
        if cell['actualValue'] == 0: ## iterates if the cell is empty to count if more than 1 cell is empty
            counter += 1
    if int(box['sum']) + int(attemptedValue) != int(box['declaredValue']): ## Since box is full, check if the sum is equal to the declared value
        return False
    return True ## Even though the box is full, the sum is equal to the declared value so this is a valid box context

def validate_grid_context(cell, grid, attemptedValue): 
    row = cell['row']
    col = cell['col']
    cube = cell['cube']
    value = attemptedValue
    grid_row = grid[row] ## get all cells in the same row
    grid_col = [row[col] for row in grid] ## get all cells in the same column
    grid_cube = [cell for row in grid for cell in row if cell['cube'] == cube]  ## get all cells in the same cube
    if value in grid_row or value in grid_col or value in grid_cube: ## check if the value is already in the row, column, or cube 
        return False ## contraint is broken
    return True ## returns true if the value is not in the row, column, or cube

def validate_cell_iteration(cell, boxes, grid):
    if validate_box_context(cell, boxes, grid) and validate_grid_context(cell, grid): ## checks contraints of the cell (box and grid)
        return True
    return False ## returns false if the contraints are broken

