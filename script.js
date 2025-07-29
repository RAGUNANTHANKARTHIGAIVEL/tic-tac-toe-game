const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function checkWinner() {
  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      statusText.textContent = `${currentPlayer} Wins!`;
      highlightWinner(condition);
      return;
    }
  }

  if (!board.includes("")) {
    gameActive = false;
    statusText.textContent = "It's a Draw!";
  }
}

function highlightWinner(winningCombo) {
  winningCombo.forEach(index => {
    cells[index].style.backgroundColor = "#d4edda";
  });
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  checkWinner();
  if (gameActive) {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s Turn`;
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.style.backgroundColor = "white";
  });
  statusText.textContent = `${currentPlayer}'s Turn`;
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetBtn.addEventListener("click", resetGame);

statusText.textContent = `${currentPlayer}'s Turn`;
