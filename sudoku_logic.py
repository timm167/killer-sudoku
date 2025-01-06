from validate import validate_cell_iteration

def check_solvable(grid, boxes, empty_cell=None, disallowed_pairs=[], filled_cells=[]):
    if empty_cell is None:
        empty_cell = find_empty_cell(grid)
    if not empty_cell:
        print("no empty cell")
        return True, grid, boxes
    for i in range(1, 10):
        print(f"Checking value {i} for cell ({empty_cell['row']}, {empty_cell['col']})")
        if ((empty_cell['row'], empty_cell['col']), i) in disallowed_pairs:
            print(f"Skipping {i} as it's in disallowed pairs")
            continue

        attemptedValue = i
        print("pre validate boxes", boxes)
        if validate_cell_iteration(cell=empty_cell, boxes=boxes, grid=grid, attemptedValue=attemptedValue):
            print(f"Value {attemptedValue} validated successfully for cell ({empty_cell['row']}, {empty_cell['col']})")
            grid[empty_cell['row']][empty_cell['col']]['actualValue'] = attemptedValue
            boxes[empty_cell['inBox']]['sum'] += attemptedValue
            for box_cell in boxes[empty_cell['inBox']]['cells']:
                if box_cell['row'] == empty_cell['row'] and box_cell['col'] == empty_cell['col']:
                    box_cell['actualValue'] = attemptedValue ## updates the boxes 

            filled_cells.append(empty_cell)

            print("Recursing to check next cell")
            result, solved_grid, solved_boxes = check_solvable(grid, boxes, find_empty_cell(grid), disallowed_pairs, filled_cells)
            if result:
                return result, solved_grid, solved_boxes
    # print(f"no valid value for cell {empty_cell['row']}, {empty_cell['col']}")
    if len(filled_cells) == 0:
        return False, grid, boxes

    print("Backtracking")
    disallowed_pairs = [pair for pair in disallowed_pairs if pair[0] != (empty_cell['row'], empty_cell['col'])] ## remove all disallowed pairs that have the last filled cell
    
    empty_cell=filled_cells.pop() ## get the last filled cell
    
    disallowed_pairs.append(((empty_cell['row'], empty_cell['col']), grid[empty_cell['row']][empty_cell['col']]['actualValue'])) ## add the filled cell to the disallowed pairs
    
    for box_cell in boxes[empty_cell['inBox']]['cells']:
        if box_cell['row'] == empty_cell['row'] and box_cell['col'] == empty_cell['col']:
                box_cell['actualValue'] = 0
    boxes[empty_cell['inBox']]['sum'] = int(boxes[empty_cell['inBox']]['sum']) - int(grid[empty_cell['row']][empty_cell['col']]['actualValue'] )
    grid[empty_cell['row']][empty_cell['col']]['actualValue'] = 0 ## reset the cell
    result, solvedGrid, solvedBoxes = check_solvable(grid, boxes, empty_cell, disallowed_pairs, filled_cells)
    if result:
        return result, solvedGrid, solvedBoxes


def check_ways_solvable(grid, boxes, fetched_grid, fetched_boxes):
    return 1 ## This is a placeholder for the actual implementation

def find_empty_cell(grid):
    for row in grid:
        for cell in row:
            if cell['actualValue'] == 0:
                return cell
    return None

## box sum also broken