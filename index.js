// For POP-UP form
// window.openForm = openForm;
// window.closeForm = closeForm;
// window.showinput = showinput;

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
