// Setting Single Player Mode

function singlePlayer() {
  window.location.href = "./single-player.html";
}

function SetPlayer1() {
  window.location.href = "./connect4-gameplay.html";
  localStorage.setItem("player1-name", "You");
  localStorage.setItem("player2-name", "AI");
}

function SetPlayer2() {
  window.location.href = "./connect4-gameplay.html";
  localStorage.setItem("player1-name", "AI");
  localStorage.setItem("player2-name", "You");
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
