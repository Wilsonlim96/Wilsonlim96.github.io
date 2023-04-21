// Setting Single Player Mode
const computer = "Computer AI";
const you = "You";

function singlePlayer() {
  Swal.fire({
    icon: "warning",
    title: "BEWARE!",
    text: "OUR AI WILL TRASH AND WRECK YOU!",
    footer: '<a href="./single-player.html">BRING IT ON!</a>',
  });
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

function storeinput(event) {
  const input1 = $("#player1-name").val();
  const input2 = $("#player2-name").val();
  if (!(input1 == "") && input1 == input2) {
    event.preventDefault();
    Swal.fire({
      icon: "question",
      title: "SAME NAME?!",
      text: "Use different names please! Thank you :)",
    });
  } else {
    localStorage.setItem("player1-name", input1);
    localStorage.setItem("player2-name", input2);
    // window.location.href = "./connect4-gameplay.html";
  }
}
