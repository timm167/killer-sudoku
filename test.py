from sudoku_logic import validate_box_context

cell = {'inBox': 'box1'}
boxes = {
    'box1': {'sum': 15, 'declaredValue': 20, 'cells': [{'actualValue': 0}, {'actualValue': 5}]}
}
attemptedValue = 6
print(validate_box_context(cell, boxes, attemptedValue))  # Expected: False

cell = {'inBox': 'box2'}
boxes = {
    'box2': {'sum': 18, 'declaredValue': 21, 'cells': [{'actualValue': 0}, {'actualValue': 3}]}
}
attemptedValue = 3
print(validate_box_context(cell, boxes, attemptedValue))  # Expected: True
