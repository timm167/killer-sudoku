from flask import Flask, request, jsonify

app = Flask(__name__)

# This function just tests the API is working
def handle_sudoku(grid):
    # This is a dummy function that just returns True and 1
    solvable = True
    ways = 1
    # This logic is going to be replaced with DFS algorithm to solve the sudoku
    return solvable, ways

@app.route('/solve', methods=['POST']) # This endpoint receives a POST request
def solve():
    try:
        # Extract the grid from the incoming JSON data
        data = request.get_json()
        grid = data.get('grid')  # grid is expected to be an array of arrays
        
        if not grid:
            return jsonify({'error': 'Grid not provided'}), 400

        # Call the handle_sudoku function
        solvable, ways = handle_sudoku(grid)
        
        # Send back a JSON response with solvability and number of ways
        return jsonify({
            'solvable': solvable,
            'ways': ways
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)