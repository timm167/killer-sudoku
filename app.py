from flask import Flask, request, jsonify
from flask_cors import CORS  
from sudoku_logic import check_solvable, check_ways_solvable
from grid import simplify_grid
from boxes import simplify_boxes
import sys 

sys.setrecursionlimit(60000) 

app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:3000"])

# def write_grid_data(data):
#     with open(JSON_FILE_PATH, 'w') as file:
#         json.dump(data, file, indent=4) 

# def write_box_data(data):
#     with open(JSON_FILE_PATH, 'w') as file:
#         json.dump(data, file, indent=4)

# This function just tests the API is working
def handle_sudoku(fetched_grid, fetched_boxes):
    grid = simplify_grid(fetched_grid)
    boxes = simplify_boxes(grid, fetched_boxes)
    print("Grid", fetched_grid)
    print("Boxes", fetched_boxes)
    ways = 1
    solvable, solvedGrid, solvedBoxes = check_solvable(grid, boxes)
    if not solvable:
        ways = 0
    # ways = check_ways_solvable(grid, boxes, simplify_grid(fetched_grid), simplify_boxes(grid, fetched_boxes))

    # This logic is going to be replaced with DFS algorithm to solve the sudoku
    return solvable, ways, solvedGrid, solvedBoxes

@app.route('/solve', methods=['POST']) # This endpoint receives a POST request
def solve():
    try:
        # Extract the grid from the incoming JSON data
        data = request.get_json()
        fetched_grid = data.get('grid')  # grid is expected to be an array of arrays
        fetched_boxes = data.get('boxes')  # boxes is expected to be a dictionary with cells, sum, and declaredValue
        
        if not fetched_grid:
            return jsonify({'error': 'Grid not provided'}), 400

        if not fetched_boxes or fetched_boxes == {}:
            return jsonify({'error': 'Boxes not provided'}), 400
        
        # Call the handle_sudoku function
        solvable, ways, solvedGrid, solvedBoxes  = handle_sudoku(fetched_grid, fetched_boxes)
        
        # Send back a JSON response with solvability and number of ways
        return jsonify({
            'solvable': solvable,
            'ways': ways,
            'solvedGrid': solvedGrid,
            'solvedBoxes': solvedBoxes
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# @app.route('/store', methods=['POST'])
# def store():
#     try:
#         data = request.get_json()
#         fetched_grid = data.get('grid')  # grid is expected to be an array of arrays
#         fetched_boxes = data.get('boxes')  # boxes is expected to be a dictionary with cells, sum, and declaredValue
#         print("something ")
#         write_grid_data(data)
#         write_box_data(data)

#         if not fetched_grid:
#             return jsonify({'error': 'Grid not provided'}), 400

#         if not fetched_boxes or fetched_boxes == {}:
#             return jsonify({'error': 'Boxes not provided'}), 400
        
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)