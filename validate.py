def check_row(grid_row, attemptedValue):
    for item in grid_row:
        if item['actualValue'] == attemptedValue:
            return False
    return True ## returns true if the value is not in the row

def check_cube(grid_cube, attemptedValue):
    for item in grid_cube:
        if item['actualValue'] == attemptedValue:
            return False
    return True ## returns true if the value is not in the cube

def check_col(grid_col, attemptedValue):
    for item in grid_col:
        if item['actualValue'] == attemptedValue:
            return False
    return True ## returns true if the value is not in the column

def validate_grid_context(cell, grid, attemptedValue): 
    row = cell['row']
    col = cell['col']
    cube = cell['cube']
    value = attemptedValue
    grid_row = grid[row] ## get all cells in the same row
    grid_col = [row[col] for row in grid] ## get all cells in the same column
    grid_cube = [cell for row in grid for cell in row if cell['cube'] == cube]  ## get all cells in the same cube
    if check_row(grid_row, value) and check_col(grid_col, value) and check_cube(grid_cube, value):
        return True
    print("Row, column, or cube violation")
    return False

def validate_box_context(cell, boxes, attemptedValue):
    if cell['inBox'] is None:  # If the cell isn't in a box, skip the box constraints
        print("Cell is not in a box")
        return True

    box = boxes[cell['inBox']]  # Get the box the cell is in
    box_sum = box['sum'] + attemptedValue
    declared_total = box['declaredTotal']
    
    # Count the number of empty cells in the box
    empty_cells = sum(1 for box_cell in box['cells'] if box_cell['actualValue'] == 0) - 1
    print(f"Box has {empty_cells} empty cells")
    # If the box is full, make sure the sum matches the declared total
    if empty_cells == 0:  # The box is full
        print(f"Box is full, checking sum")
        if box_sum != declared_total:
            print(f"Box is full but sum is {box_sum} instead of {declared_total}.")
            return False
        return True  # The box is full, and the sum matches the declared total
    
    # Box isn't full, so we can't check the sum yet
    return True

def validate_cell_iteration(cell, boxes, grid, attemptedValue):
    print(f"Attempting to check if cell {cell['row']}, {cell['col']} can be {attemptedValue}")
    if validate_box_context(cell, boxes, attemptedValue):
        return validate_grid_context(cell, grid, attemptedValue) ## returns true if the constraints are met
    return False ## returns false if the contraints are broken

