from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from sudoku_logic import check_solvable
from grid import simplify_grid

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


# This function just tests the API is working
def handle_sudoku(fetched_grid):
    grid = simplify_grid(fetched_grid)
    solvable = check_solvable(grid)
    ways = 1
    failedSquare = None
    solvedGrid = None

    # This logic is going to be replaced with DFS algorithm to solve the sudoku
    return solvable, ways, failedSquare, solvedGrid

@app.route('/solve', methods=['POST']) # This endpoint receives a POST request
def solve():
    try:
        # Extract the grid from the incoming JSON data
        data = request.get_json()
        fetched_grid = data.get('grid')  # grid is expected to be an array of arrays
        
        if not fetched_grid:
            return jsonify({'error': 'Grid not provided'}), 400

        # Call the handle_sudoku function
        solvable, ways, failedSquare, solvedGrid = handle_sudoku(fetched_grid)
        
        # Send back a JSON response with solvability and number of ways
        return jsonify({
            'solvable': solvable,
            'ways': ways,
            'failedSquare': failedSquare,
            'solvedGrid': solvedGrid
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)