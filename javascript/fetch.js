import { populateGrid } from './populate.js';
import { state } from './state.js';

const BASE_URL =
    console.log(window.location.hostname)
    window.location.hostname === 'localhost'
        ? 'http://127.0.0.1:5000' // Local backend
        : 'https://killer-sudoku.onrender.com'; // Deployed backend

const handleSolveButtonClick = async () => {
    try {
        const response = await fetch(`${BASE_URL}/solve`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ grid: state.grid, boxes: state.boxes }),
        });

        if (response.ok) {
            const result = await response.json();
            alert(`Solvable: ${result.solvable}, Ways: ${result.ways}`);
            // Update state or UI with the result
            state.grid = result.solvedGrid;
            state.boxes = result.solvedBoxes;
            populateGrid();

        } else {
            alert('Failed to connect to server.', await response.text());
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export { handleSolveButtonClick };