// Setting Single Player Mode
const computer = "Computer AI";
const you = "You";

function singlePlayer() {
  window.location.href = "./single-player.html";
}

function SetPlayer1() {
  window.location.href = "./connect4-gameplay.html";
  localStorage.setItem("player1-name", you);
  localStorage.setItem("player2-name", computer);
}

function SetPlayer2() {
  window.location.href = "./connect4-gameplay.html";
  localStorage.setItem("player1-name", computer);
  localStorage.setItem("player2-name", you);
}

function mainMenu() {
  window.location.href = "./index.html";
}

// Multiplayer Mode - POP-UP form
function openForm() {
  const multiplayerForm = $("#MultiplayerForm")[0];
  multiplayerForm.style.display = "block";
}
function closeForm() {
  const multiplayerForm = $("#MultiplayerForm")[0];
  multiplayerForm.style.display = "none";
}

function storeinput() {
  const input1 = $("#player1-name").val();
  const input2 = $("#player2-name").val();
  localStorage.setItem("player1-name", input1);
  localStorage.setItem("player2-name", input2);
}
