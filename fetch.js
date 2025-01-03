import { state } from './state.js';

const handleSolveButtonClick = async () => {
    try {
        const response = await fetch('/solve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ grid: state.grid }),
        });

        if (response.ok) {
            const result = await response.json();
            alert('Solvable:', result.solvable, 'Ways:', result.ways);
            // Update state or UI with the result
        } else {
            alert('Failed to solve Sudoku:', await response.text());
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export { handleSolveButtonClick };