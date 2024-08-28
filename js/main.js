// Game state object to keep track of scores
const gameState = {
  playerWins: 0,
  computerWins: 0,
  ties: 0,
};

// Function to get a random move for the computer
function getComputerMove() {
  const moves = ["Rock", "Paper", "Scissors"];
  return moves[Math.floor(Math.random() * moves.length)];
}

// Function to determine the result based on player and computer moves
function determineWinner(playerMove, computerMove) {
  if (playerMove === computerMove) return "It's a tie!";
  if (
    (playerMove === "Rock" && computerMove === "Scissors") ||
    (playerMove === "Paper" && computerMove === "Rock") ||
    (playerMove === "Scissors" && computerMove === "Paper")
  )
    return "You win!";
  return "Computer wins!";
}

// Function to update the UI
function updateUI(playerMove, computerMove, result) {
  document.getElementById("playerMove").textContent = playerMove;
  document.getElementById("computerMove").textContent = computerMove;
  document.getElementById("gameResult").textContent = "Waiting...";

  // Clear previous animations
  const animationBox = document.getElementById("animationBox");
  animationBox.innerHTML = "";

  // Add move animations
  addMoveAnimation(playerMove, "left");
  addMoveAnimation(computerMove, "right");

  // Update the result after a delay
  setTimeout(() => {
    highlightWinner(result);
    updateScores(result);
    document.getElementById("gameResult").textContent = result;
  }, 1000); // 1-second delay for animation
}

// Function to add move animations
function addMoveAnimation(move, position) {
  const animationBox = document.getElementById("animationBox");
  const moveElement = document.createElement("div");
  moveElement.classList.add("move");
  moveElement.style[position] = "0";
  moveElement.innerHTML = getMoveIcon(move);
  animationBox.appendChild(moveElement);
}

// Function to get the icon for a move
function getMoveIcon(move) {
  const icons = {
    Rock: '<i class="fa-regular fa-hand-back-fist"></i>',
    Paper: '<i class="fa-regular fa-hand"></i>',
    Scissors: '<i class="fa-regular fa-hand-scissors"></i>',
  };
  return icons[move];
}

// Function to highlight the winner and loser
function highlightWinner(result) {
  const playerElement = document.querySelector(".move:first-child");
  const computerElement = document.querySelector(".move:last-child");

  if (result === "You win!") {
    playerElement.classList.add("winner");
    computerElement.classList.add("loser");
  } else if (result === "Computer wins!") {
    computerElement.classList.add("winner");
    playerElement.classList.add("loser");
  }

  // Fade out the losing move
  setTimeout(() => {
    document.querySelectorAll(".loser").forEach((element) => {
      element.classList.add("fade-out");
    });
  }, 100); // Adjust delay if necessary
}

// Function to update the scores
function updateScores(result) {
  if (result === "You win!") {
    gameState.playerWins++;
  } else if (result === "Computer wins!") {
    gameState.computerWins++;
  } else {
    gameState.ties++;
  }
  updateScoreboard();
}

// Function to update the scoreboard UI
function updateScoreboard() {
  document.getElementById("playerWins").textContent = gameState.playerWins;
  document.getElementById("computerWins").textContent = gameState.computerWins;
  document.getElementById("ties").textContent = gameState.ties;
}

// Function to restart the game
function restartGame() {
  gameState.playerWins = 0;
  gameState.computerWins = 0;
  gameState.ties = 0;
  updateScoreboard();
  document.getElementById("playerMove").textContent = "-";
  document.getElementById("computerMove").textContent = "-";
  document.getElementById("gameResult").textContent = "Make your move!";
  document.getElementById("animationBox").innerHTML = "";
}

// Main function to play the game
function playGame(playerMove) {
  const computerMove = getComputerMove();
  const result = determineWinner(playerMove, computerMove);
  updateUI(playerMove, computerMove, result);
}
