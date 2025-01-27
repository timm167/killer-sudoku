from validate import validate_cell_iteration
from permanent import permanently_disallowed, cell_too_high
import sys
sys.setrecursionlimit(60000) 

def check_solvable(grid, boxes, empty_cell=None, disallowed_pairs=[], filled_cells=[], permanently_disallowed_pairs=[], recursion_depth=0):
    print("Recursion depth", recursion_depth)
    recursion_depth += 1
    if recursion_depth > 50000:
        print("Recursion depth exceeded")
        return False, grid, boxes

    empty_cell = find_empty_cell(grid, filled_cells)

    if not empty_cell:
        print("No empty cell found. Sudoku is solved.")
        return True, grid, boxes

    print("permanent disallowed pairs", permanently_disallowed_pairs)
    print("Trying to fill cell", empty_cell)

    for i in range(1, 10):
        print(f"Checking value {i} for cell ({empty_cell['row']}, {empty_cell['col']})")
        if ((empty_cell['row'], empty_cell['col']), i) in disallowed_pairs or ((empty_cell['row'], empty_cell['col']), i) in permanently_disallowed_pairs:
            print(f"Skipping {i} as it's a disallowed pair for cell ({empty_cell['row']}, {empty_cell['col']})")
            continue

        attemptedValue = i
        if permanently_disallowed(cell=empty_cell, boxes=boxes, attemptedValue=attemptedValue):
            print(f"Value {attemptedValue} is permanently disallowed for cell ({empty_cell['row']}, {empty_cell['col']})")
            permanently_disallowed_pairs.append(((empty_cell['row'], empty_cell['col']), attemptedValue))
            continue

        if cell_too_high(cell=empty_cell, boxes=boxes, grid=grid, attemptedValue=attemptedValue):
            print(f"Value {attemptedValue} is too high for cell ({empty_cell['row']}, {empty_cell['col']})")
            break

        if validate_cell_iteration(cell=empty_cell, boxes=boxes, grid=grid, attemptedValue=attemptedValue):
            print(f"Value {attemptedValue} validated successfully for cell ({empty_cell['row']}, {empty_cell['col']})")
            grid[empty_cell['row']][empty_cell['col']]['actualValue'] = attemptedValue
            boxes[empty_cell['inBox']]['sum'] += attemptedValue
            for box_cell in boxes[empty_cell['inBox']]['cells']:
                if box_cell['row'] == empty_cell['row'] and box_cell['col'] == empty_cell['col']:
                    box_cell['actualValue'] = attemptedValue  # updates the boxes

            filled_cells.append(empty_cell)

            print("Recursing to check next cell")
            result, solved_grid, solved_boxes = check_solvable(grid, boxes, find_empty_cell(grid, filled_cells), disallowed_pairs, filled_cells, permanently_disallowed_pairs, recursion_depth)
            if result:
                return result, solved_grid, solved_boxes
            return False, grid, boxes

    if len(filled_cells) == 0:
        print("No valid value found for the initial empty cell. Sudoku is unsolvable.")
        return False, grid, boxes

    print("Backtracking")
    disallowed_pairs = [pair for pair in disallowed_pairs if pair[0] != (empty_cell['row'], empty_cell['col'])]  # remove all disallowed pairs that have the last filled cell

    empty_cell = filled_cells.pop()  # get the last filled cell

    disallowed_pairs.append(((empty_cell['row'], empty_cell['col']), grid[empty_cell['row']][empty_cell['col']]['actualValue']))  # add the filled cell to the disallowed pairs

    for box_cell in boxes[empty_cell['inBox']]['cells']:
        if box_cell['row'] == empty_cell['row'] and box_cell['col'] == empty_cell['col']:
            box_cell['actualValue'] = 0
    boxes[empty_cell['inBox']]['sum'] -= grid[empty_cell['row']][empty_cell['col']]['actualValue']  # reset the box sum
    grid[empty_cell['row']][empty_cell['col']]['actualValue'] = 0  # reset the cell

    print("State after backtracking:")
    # print("Grid:", grid)
    # print("Boxes:", boxes)
    print("Empty cell:", empty_cell)
    print("Disallowed pairs:", disallowed_pairs)
    print("Filled cells:", filled_cells)

    result, solvedGrid, solvedBoxes = check_solvable(grid, boxes, empty_cell, disallowed_pairs, filled_cells, permanently_disallowed_pairs, recursion_depth)
    return result, solvedGrid, solvedBoxes

def check_ways_solvable(grid, boxes, fetched_grid, fetched_boxes):
    return 1  # This is a placeholder for the actual implementation

def find_empty_cell(grid, filled_cells):
    for row in grid:
        for cell in row:
            if cell['actualValue'] == 0 and cell not in filled_cells:
                return cell
    return None