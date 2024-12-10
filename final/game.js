const gridRows = 5;
const gridCols = 5;

const lightsGrid = document.getElementById("game-board");

function flipCell(row, col, grid) {
    const flip = (r, c) => {
        if (r >= 0 && r < gridRows && c >= 0 && c < gridCols) {
            grid[r][c].classList.toggle("is-off");
        }
    };
    flip(row, col);
    flip(row - 1, col); // Top
    flip(row + 1, col); // Bottom
    flip(row, col - 1); // Left
    flip(row, col + 1); // Right
}

function isVictory(grid) {
    return grid.every(row => row.every(cell => cell.classList.contains("is-off")));
}

const gridCells = [];
for (let r = 0; r < gridRows; r++) {
    const rowArray = [];
    for (let c = 0; c < gridCols; c++) {
        const square = document.createElement("div");
        square.className = "cell";
        square.addEventListener("click", () => {
            flipCell(r, c, gridCells);
            if (isVictory(gridCells)) {
                setTimeout(() => alert("Congratulations! You turned off all the lights!"), 100);
            }
        });
        rowArray.push(square);
        lightsGrid.appendChild(square);
    }
    gridCells.push(rowArray);
}

function shuffleBoard() {
    const flips = [];
    const totalFlips = Math.floor(Math.random() * 10) + 5; // Randomize between 5 and 15 moves

    for (let i = 0; i < totalFlips; i++) {
        const randomRow = Math.floor(Math.random() * gridRows);
        const randomCol = Math.floor(Math.random() * gridCols);
        flips.push([randomRow, randomCol]);
    }

    flips.forEach(([row, col]) => {
        flipCell(row, col, gridCells);
    });
}

shuffleBoard();

