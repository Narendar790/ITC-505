const rows = 5;
const cols = 5;

const gameBoard = document.getElementById("game-board");

function toggleCell(row, col, board) {
    const toggle = (r, c) => {
        if (r >= 0 && r < rows && c >= 0 && c < cols) {
            board[r][c].classList.toggle("is-off");
        }
    };
    toggle(row, col);
    toggle(row - 1, col);
    toggle(row + 1, col); 
    toggle(row, col - 1); 
    toggle(row, col + 1); 
}

function checkWin(board) {
    return Array.from(board).flat().every(cell => cell.classList.contains("is-off"));
}

const board = [];
for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.addEventListener("click", () => {
            toggleCell(i, j, board);
            if (checkWin(board)) {
                setTimeout(() => alert("You win!"), 100);
            }
        });
        row.push(cell);
        gameBoard.appendChild(cell);
    }
    board.push(row);
}

function randomizeBoard() {
    for (let i = 0; i < rows * cols; i++) {
        const randomRow = Math.floor(Math.random() * rows);
        const randomCol = Math.floor(Math.random() * cols);
        toggleCell(randomRow, randomCol, board);
    }
}

randomizeBoard();
