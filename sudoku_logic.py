from validate import validate_cell_iteration

def check_solvable(grid, boxes):
    empty_cell = find_empty_cell(grid)
    if not empty_cell:
        return True
    for i in range(1, 10):
        attemptedValue = i
        if validate_cell_iteration(empty_cell, grid, boxes, attemptedValue):
            empty_cell['actualValue'] = attemptedValue
            if check_solvable(grid, boxes):
                return True
            empty_cell['actualValue'] = 0
    return False

def check_ways_solvable(grid, boxes):
    if not check_solvable(grid, boxes):
        return 0
    return 1 ## This is a placeholder for the actual implementation

def find_empty_cell(grid):
    for row in grid:
        for cell in row:
            if cell['actualValue'] == 0:
                return cell
    return None

