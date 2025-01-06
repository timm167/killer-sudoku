def cell_too_high(cell, boxes, grid, attemptedValue):
    box = boxes[cell['inBox']]  # Get the box the cell is in
    box_sum = box['sum'] + attemptedValue
    declared_total = box['declaredTotal']

    # If adding the attempted value exceeds the declared total, it's invalid
    if box_sum > declared_total:
        print(f"Box sum violation: box sum {box_sum}, attempted value {attemptedValue}, declared total {declared_total}")
        return True
    return False

def permanently_disallowed(cell, boxes, attemptedValue):
    box = boxes[cell['inBox']]  # Get the box the cell is in
    declared_total = box['declaredTotal']
    other_cells_in_box = len(box['cells']) - 1

    if attemptedValue > declared_total:
        print(f"Value {attemptedValue} is permanently too high for box {cell['inBox']}")
        return True

    if other_cells_in_box == 1:
        if attemptedValue < declared_total + 9:
            print(f"Value {attemptedValue} is permanently too low for box {cell['inBox']}")
            return True
        if attemptedValue == declared_total:
            print(f"Value {attemptedValue} is permanently too high for box {cell['inBox']}")
            return True

    if other_cells_in_box == 2:
        if attemptedValue < declared_total + 17:
            print(f"Value {attemptedValue} is permanently too low for box {cell['inBox']}")
            return True
        if attemptedValue + 2 >= declared_total:
            print(f"Value {attemptedValue} is permanently too high for box {cell['inBox']}")
            return True

    if other_cells_in_box == 3:
        if attemptedValue < declared_total + 25:
            print(f"Value {attemptedValue} is permanently too low for box {cell['inBox']}")
            return True
        if attemptedValue + 5 >= declared_total:
            print(f"Value {attemptedValue} is permanently too high for box {cell['inBox']}")
            return True
    
    if other_cells_in_box == 4:
        if attemptedValue < declared_total + 32:
            print(f"Value {attemptedValue} is permanently too low for box {cell['inBox']}")
            return True
        if attemptedValue + 9 >= declared_total:
            print(f"Value {attemptedValue} is permanently too high for box {cell['inBox']}")
            return True
    
    if other_cells_in_box == 5:
        if attemptedValue < declared_total + 38:
            print(f"Value {attemptedValue} is permanently too low for box {cell['inBox']}")
            return True
        if attemptedValue + 14 >= declared_total:
            print(f"Value {attemptedValue} is permanently too high for box {cell['inBox']}")
            return True
        
    if other_cells_in_box == 6:
        if attemptedValue < declared_total + 43:
            print(f"Value {attemptedValue} is permanently too low for box {cell['inBox']}")
            return True
        if attemptedValue + 20 >= declared_total:
            print(f"Value {attemptedValue} is permanently too high for box {cell['inBox']}")
            return True
    