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
    other_non_fixed_cells = -1
    for box_cell in box['cells']:
        if box_cell['fixedValue'] == 0:
            other_non_fixed_cells += 1
    fixed_sum = box['fixedSum']
    value_to_try = fixed_sum + attemptedValue
    print(f"Fixed sum: {fixed_sum}, value to try: {attemptedValue}, declared total: {declared_total}, other non-fixed cells: {other_non_fixed_cells}")

    if value_to_try > declared_total:
        return True

    if other_non_fixed_cells == 1:
        if value_to_try + 9 < declared_total:
            print(f"Value {attemptedValue} is permanently too low")
            return True
        if value_to_try == declared_total:
            print(f"Value {attemptedValue} is permanently too high")
            return True

    if other_non_fixed_cells == 2:
        print("1 other cell in box", box)
        if value_to_try + 17 < declared_total:
            print(f"Value {attemptedValue} is permanently too low for box {cell['inBox']}")
            return True
        if value_to_try + 2 >= declared_total:
            print(f"Value {attemptedValue} is permanently too high for box {cell['inBox']}")
            return True

    if other_non_fixed_cells == 3:
        if value_to_try + 25 < declared_total:
            print(f"Value {attemptedValue} is permanently too low for box {cell['inBox']}")
            return True
        if value_to_try + 5 >= declared_total:
            print(f"Value {attemptedValue} is permanently too high for box {cell['inBox']}")
            return True
    
    if other_non_fixed_cells== 4:
        if value_to_try + 32 < declared_total:
            print(f"Value {attemptedValue} is permanently too low for box {cell['inBox']}")
            return True
        if value_to_try + 9 >= declared_total:
            print(f"Value {attemptedValue} is permanently too high for box {cell['inBox']}")
            return True
    
    if other_non_fixed_cells == 5:
        if value_to_try + 38 < declared_total:
            print(f"Value {attemptedValue} is permanently too low for box {cell['inBox']}")
            return True
        if value_to_try + 14 >= declared_total:
            print(f"Value {attemptedValue} is permanently too high for box {cell['inBox']}")
            return True
        
    if other_non_fixed_cells == 6:
        if value_to_try  + 43 < declared_total:
            print(f"Value {attemptedValue} is permanently too low for box {cell['inBox']}")
            return True
        if value_to_try + 20 >= declared_total:
            print(f"Value {attemptedValue} is permanently too high for box {cell['inBox']}")
            return True
    