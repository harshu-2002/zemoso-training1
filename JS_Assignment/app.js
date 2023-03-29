let localScore = parseInt(localStorage.getItem("localScore")) || 0;
let sessionScore = parseInt(sessionStorage.getItem("sessionScore")) || 0;

// Update the UI with the current scores
document.getElementById("local-score").textContent = localScore;
document.getElementById("session-score").textContent = sessionScore;

// Increment the Local Score and Session Score when the button is clicked
document.getElementById("increment-button").addEventListener("click", () => {
  localScore += 1;
  sessionScore += 1;
  localStorage.setItem("localScore", localScore);
  sessionStorage.setItem("sessionScore", sessionScore);
  document.getElementById("local-score").textContent = localScore;
  document.getElementById("session-score").textContent = sessionScore;
});