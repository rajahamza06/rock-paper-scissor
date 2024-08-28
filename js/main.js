let playerWins = 0;
let computerWins = 0;
let ties = 0;

function playGame(playerMove) {

  //=================== Getting the computer move
  const computerMove = (() => {
    const moves = ["Rock", "Paper", "Scissors"];
    return moves[Math.floor(Math.random() * moves.length)];
  })(); // Immediately-invoked function to generate a random move for the computer

  //=============== Determining the winner
  const result = (() => {
    if (playerMove === computerMove) return "It's a tie!";
    if (
      (playerMove === "Rock" && computerMove === "Scissors") ||
      (playerMove === "Paper" && computerMove === "Rock") ||
      (playerMove === "Scissors" && computerMove === "Paper")
    ) return "You win!";
    return "Computer wins!";
  })(); // Immediately-invoked function to determine the result based on player and computer moves

  //================== Update the UI for the result
  document.getElementById("playerMove").textContent = playerMove; // Display the player's move
  document.getElementById("computerMove").textContent = computerMove; // Display the computer's move
  document.getElementById("gameResult").textContent = "Waiting..."; // Temporarily show "Waiting..." until the result is calculated

  // Clear previous animation
  const animationBox = document.getElementById("animationBox");
  animationBox.innerHTML = ""; // Remove any previous animations from the animation box

  //========================= Adding the moving icons animation
  const getMoveIcon = (move) => {
    if (move === "Rock") return '<i class="fa-regular fa-hand-back-fist"></i>';
    if (move === "Paper") return '<i class="fa-regular fa-hand"></i>';
    if (move === "Scissors") return '<i class="fa-regular fa-hand-scissors"></i>';
  }; // Function to return the appropriate icon based on the move

  // Create and animate the player's move
  const playerElement = document.createElement("div");
  playerElement.classList.add("move");
  playerElement.style.left = "0"; // Position player's move on the left side
  playerElement.innerHTML = getMoveIcon(playerMove);
  animationBox.appendChild(playerElement);

  // Create and animate the computer's move
  const computerElement = document.createElement("div");
  computerElement.classList.add("move");
  computerElement.style.right = "0"; // Position computer's move on the right side
  computerElement.innerHTML = getMoveIcon(computerMove);
  animationBox.appendChild(computerElement);

  setTimeout(() => {
    // Determine and highlight the winner and loser
    if (result === "You win!") {
      playerElement.classList.add("winner"); // Highlight player's move as the winner
      computerElement.classList.add("loser"); // Highlight computer's move as the loser
    } else if (result === "Computer wins!") {
      computerElement.classList.add("winner"); // Highlight computer's move as the winner
      playerElement.classList.add("loser"); // Highlight player's move as the loser
    }

    // Add fade-out effect to the losing move
    setTimeout(() => {
      document.querySelectorAll(".loser").forEach((element) => {
        element.classList.add("fade-out"); // Apply fade-out animation to the losing move
      });
    }, 100); // Adjust the delay if necessary

    document.getElementById("gameResult").textContent = result; // Update the UI to show the result

    //========================== Update the scores for the winner or loser
    if (result === "You win!") {
      playerWins++; // Increment player's win count
    } else if (result === "Computer wins!") {
      computerWins++; // Increment computer's win count
    } else {
      ties++; // Increment tie count
    }

    //================== Update scoreboard
    document.getElementById("playerWins").textContent = playerWins; // Update player's win count on UI
    document.getElementById("computerWins").textContent = computerWins; // Update computer's win count on UI
    document.getElementById("ties").textContent = ties; // Update tie count on UI
  }, 1000); // 1-second delay for animation
}

//================ Reset to the initial state
function restartGame() {
  playerWins = 0;
  computerWins = 0;
  ties = 0;
  document.getElementById("playerWins").textContent = playerWins; // Reset player's win count on UI
  document.getElementById("computerWins").textContent = computerWins; // Reset computer's win count on UI
  document.getElementById("ties").textContent = ties; // Reset tie count on UI
  document.getElementById("playerMove").textContent = "-"; // Clear player's move display
  document.getElementById("computerMove").textContent = "-"; // Clear computer's move display
  document.getElementById("gameResult").textContent = "Make your move!"; // Reset game result display
  document.getElementById("animationBox").innerHTML = ""; // Clear any animations
}
