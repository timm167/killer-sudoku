def validate_box_context(cell, boxes, attemptedValue):
    if cell['inBox'] is None: ## if the cell is not in a box, the box has 0 constraints
        return True
    box = boxes[cell['inBox']] ## get the box that the cell is in
    if int(box['sum']) + int(attemptedValue) > int(box['declaredTotal']): 
        return False ## if the sum of the box and the attempted value is greater than the declared value, this breaks the killer sudoku constraint
    counter = 0
    for box_cell in box['cells']:
        if counter == 1: ## check if the box is full (counter of 1 is full because the box does not yet include the attempted value)
            return True
        if box_cell['actualValue'] == 0: ## iterates if the cell is empty to count if more than 1 cell is empty
            counter += 1
    if int(box['sum']) + int(attemptedValue) != int(box['declaredTotal']): ## Since box is full, check if the sum is equal to the declared value
        return False
    return True ## Even though the box is full, the sum is equal to the declared value so this is a valid box context

def check_row(grid_row, attemptedValue):
    # print(attemptedValue)
    # print(grid_row)
    for item in grid_row:
        # print(item)
        if item['actualValue'] == attemptedValue:
            # print("returning false")
            return False
    return True ## returns true if the value is not in the row

def check_cube(grid_cube, attemptedValue):
    # print("checking cube")
    for item in grid_cube:
        if item['actualValue'] == attemptedValue:
            return False
    return True ## returns true if the value is not in the cube

def check_col(grid_col, attemptedValue):
    # print("checking col")
    # print(f"checking col for {attemptedValue}")
    # print(grid_col)
    for item in grid_col:
        if item['actualValue'] == attemptedValue:
            # print(f"attempted value {attemptedValue} is in the column")
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
    # print("about to check rows, cols, cubes")
    if check_row(grid_row, value) and check_col(grid_col, value) and check_cube(grid_cube, value):
        return True
    # print("failed grid context with cell", cell)
    return False




def validate_cell_iteration(cell, boxes, grid, attemptedValue):
    if validate_box_context(cell, boxes, attemptedValue):
        # print(f"validated box context {attemptedValue} at cell {cell['row']}, {cell['col']}")
        return validate_grid_context(cell, grid, attemptedValue) ## returns true if the constraints are met
    return False ## returns false if the contraints are broken