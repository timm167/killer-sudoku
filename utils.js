
// Helper function to get the cube index
function getCubeIndex(row, col) {
    return Math.floor(row / 3) * 3 + Math.floor(col / 3);
}

export { getCubeIndex };