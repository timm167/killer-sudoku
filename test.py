from sudoku_logic import check_solvable
from grid import simplify_grid
from boxes import simplify_boxes
from test_grid import test_grid
from test_boxes import test_boxes

grid_instance = simplify_grid(test_grid)
boxes_instance = simplify_boxes(test_grid, test_boxes)

solvable, solvedGrid, solvedBoxes = check_solvable(grid_instance, boxes_instance)