def simplify_boxes(grid, boxes):
    print("Simplifying boxes")
    for box_key, box in boxes.items():
        for cell in box['cells']:
            cell['fixedValue'] = grid[cell['row']][cell['col']]['actualValue']
        box['fixedSum'] = sum(cell['fixedValue'] for cell in box['cells'])
        box['sum'] = box['fixedSum']
    return boxes