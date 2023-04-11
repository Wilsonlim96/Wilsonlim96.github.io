import scoreboard from "./scoreboard.js";

// Setting up Game
let player1 = "Wilson"; // take input from form //
let player2 = "Lindi"; // take input from form //
let player1_score = 0;
let player2_score = 0;
let player = player1;

let gameEnd = false;

const boardRows = 7;
const boardCols = 7;
var game;
var currentTile;
var winner;

// New Game
newGame();

function newGame() {
  gameEnd = false;
  game = [];
  const board = $("#board");
  for (let c = 1; c <= boardCols; c++) {
    let col = [];
    board.append(`<ul id="c${c}" class="column" onclick='playTile(this.id)' >`);
    const column = $(`#c${c}`);
    for (let r = 1; r <= boardRows; r++) {
      col.push(" ");

      // Appending tiles
      let tile = `<div id="c${c}r${r}" class = "tile" ></div>`;
      column.append(tile);
    }
    game.push(col);
  }
  const turn = $("#turn");
  turn.append(`${player1}'s Turn`);
}

// Playing a Tile
window.playTile = playTile;
window.undo = undo;

let rowTracker_c1 = 7;
let rowTracker_c2 = 7;
let rowTracker_c3 = 7;
let rowTracker_c4 = 7;
let rowTracker_c5 = 7;
let rowTracker_c6 = 7;
let rowTracker_c7 = 7;

function playTile(e) {
  if (gameEnd) {
    alert("The game is over. Please start a new game."); // add alert to show who is the winner
  } else {
    // Update game board status

    const col = parseInt(e.slice(1));
    const row = eval(`rowTracker_${e}`);
    game[col - 1][row - 1] = player;
    currentTile = $(`#${e}r${row}`)[0];
    const tile = currentTile;
    eval(`rowTracker_${e}--`);

    // Changing player's turn
    const turn = $("#turn");
    if (row >= 1 && player == player1) {
      tile.classList.add("redtile");
      player = player2;
      turn[0].innerHTML = "";
      turn.append(`${player2}'s Turn`);
    } else if (row >= 1 && player == player2) {
      tile.classList.add("yellowtile");
      player = player1;
      turn[0].innerHTML = "";
      turn.append(`${player1}'s Turn`);
    } else {
      alert("The column is full. You cannot add more tiles.");
    }
    checkWinDraw();
  }
}

function undo(e) {}

// Check for winner or draw game
function checkWinDraw() {
  setTimeout(() => {
    // Check vertical win
    for (let c = 1; c <= boardCols; c++) {
      for (let r = 1; r <= boardRows - 3; r++) {
        let tile = game[c - 1][r - 1];
        let tile_down = game[c - 1][r];
        let tile_down2 = game[c - 1][r + 1];
        let tile_down3 = game[c - 1][r + 2];
        if (tile != " ") {
          if (
            tile == tile_down &&
            tile_down == tile_down2 &&
            tile_down2 == tile_down3
          ) {
            winner = tile;
            gameEnd = true;

            // Updated scoreboard
            if (winner == player1) {
              player1_score++;
            } else {
              player2_score++;
            }
            alert(`${winner} wins`);
            console.log(player1_score, player2_score);
            // newGame();
          }
        }
      }
    }

    // Check horizontal win
    for (let r = 1; r <= boardRows; r++) {
      for (let c = 1; c <= boardCols - 3; c++) {
        let tile = game[c - 1][r - 1];
        let tile_right = game[c][r - 1];
        let tile_right2 = game[c + 1][r - 1];
        let tile_right3 = game[c + 2][r - 1];
        if (tile != " ") {
          if (
            tile == tile_right &&
            tile_right == tile_right2 &&
            tile_right2 == tile_right3
          ) {
            winner = tile;
            gameEnd = true;

            // Updated scoreboard
            if (winner == player1) {
              player1_score++;
            } else {
              player2_score++;
            }
            alert(`${winner} wins`);
            console.log(player1_score, player2_score);
            // newGame();
          }
        }
      }
    }

    // Check diagonal win
    for (let r = 1; r <= boardRows - 3; r++) {
      for (let c = 1; c <= boardCols - 3; c++) {
        let tile = game[c - 1][r - 1];
        let tile_diag = game[c][r];
        let tile_diag2 = game[c + 1][r + 1];
        let tile_diag3 = game[c + 2][r + 2];
        if (tile != " ") {
          if (
            tile == tile_diag &&
            tile_diag == tile_diag2 &&
            tile_diag2 == tile_diag3
          ) {
            winner = tile;
            gameEnd = true;

            // Updated scoreboard
            if (winner == player1) {
              player1_score++;
            } else {
              player2_score++;
            }
            alert(`${winner} wins`);
            console.log(player1_score, player2_score);
            // newGame();
          }
        }
      }
    }
  }, 1);
}

// Scoreboard
const root = document.querySelector("#score");
const score = new scoreboard(root, player1, player2);
