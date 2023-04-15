import scoreboard from "./scoreboard.js";

// Setting up the Game

let player1 = localStorage.getItem("player1-name"); // take input from form //
let player2 = localStorage.getItem("player2-name"); // take input from form //
let player1_score = 0;
let player2_score = 0;
let starting_player = player1;

let gameEnd = false;

const boardRows = 7;
const boardCols = 7;
var game;
var moves;
var winner;
var player;
var rowTracker;

// Setting up Scoreboard
const root = $("#score")[0];
const score = new scoreboard(root, player1, player2);

// Starting a New Game
newGame();

function newGame() {
  const board = $("#board");
  const turn = $("#turn");

  // Switch Starting Player after game ended
  if (gameEnd == true) {
    gameEnd = false;
    for (let c = 1; c <= boardCols; c++) {
      $(`#c${c}`).remove();
    }
    if (starting_player == player1) {
      starting_player = player2;
    } else {
      starting_player = player1;
    }
    turn[0].innerHTML = "";
  }

  // Game Set-up
  game = [];
  moves = [];
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
  player = starting_player;
  if (player == "You") {
    turn.append(`${player}r Turn`);
  } else {
    turn.append(`${player}'s Turn`);
  }
  rowTracker = [7, 7, 7, 7, 7, 7, 7];
}

// Playing a Tile
window.playTile = playTile;

function playTile(e) {
  if (gameEnd) {
    alert("The game is over. Please start a new game.");
  } else {
    // Update game board status
    const col = parseInt(e.slice(1));
    const row = rowTracker[col - 1];
    game[col - 1][row - 1] = player;
    moves.push([col, row]);
    const tile = $(`#${e}r${row}`)[0];
    rowTracker[col - 1]--;

    // Changing player's turn
    if (row >= 1 && player == player1) {
      changePlayerTurn(player2, tile, "redtile");
    } else if (row >= 1 && player == player2) {
      changePlayerTurn(player1, tile, "yellowtile");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The column is full. You cannot add more tiles...",
      });
    }

    // Check if move causes win or draw
    checkWinDraw();
  }
}

// Change Player Turn
function changePlayerTurn(next_player, tile, colour) {
  tile.classList.add(colour);
  player = next_player;
  const turn = $("#turn");
  turn[0].innerHTML = "";
  if (player == "You") {
    turn.append(`${player}r Turn`);
  } else {
    turn.append(`${player}'s Turn`);
  }
}

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
            updateScore(winner);
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
            updateScore(winner);
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
            updateScore(winner);
          }
        }
      }
    }

    for (let r = 4; r <= boardRows; r++) {
      for (let c = 1; c <= boardCols - 3; c++) {
        let tile = game[c - 1][r - 1];
        let tile_diag = game[c][r - 2];
        let tile_diag2 = game[c + 1][r - 3];
        let tile_diag3 = game[c + 2][r - 4];
        if (tile != " ") {
          if (
            tile == tile_diag &&
            tile_diag == tile_diag2 &&
            tile_diag2 == tile_diag3
          ) {
            winner = tile;
            updateScore(winner);
          }
        }
      }
    }

    // Checking for draw
    let tile_counter = 0;
    for (let r = 1; r <= boardRows; r++) {
      for (let c = 1; c <= boardCols; c++) {
        let tile = game[c - 1][r - 1];
        if (tile != " ") {
          tile_counter++;
        }
      }
    }
    if (tile_counter == boardCols * boardRows) {
      gameEnd = true;
      Swal.fire({
        icon: "question",
        title: "Seriously?!",
        text: "Draw Game! Please start a new game.",
      });
      newGame();
    }
  }, 200);
}

// Updating Scoreboard
function updateScore(winner) {
  if (winner == player1) {
    player1_score++;
  } else {
    player2_score++;
  }
  if (winner == "AI") {
    Swal.fire({
      title: "Aww... So Close!",
      text: `${winner} win!`,
      imageUrl: "./Try_harder.jpg",
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "Custom image",
    });
  } else {
    Swal.fire({
      title: "Congratulations!",
      text: `${winner} win!`,
      imageUrl: "./Congrats.jpg",
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "Custom image",
    });
  }
  $("#P1_score")[0].innerHTML = player1_score;
  $("#P2_score")[0].innerHTML = player2_score;
  gameEnd = true;
  newGame();
}

// Undo last move
window.undoMove = undoMove;
function undoMove() {
  const lastMove = moves.slice(-1)[0];
  if (lastMove == undefined) {
    Swal.fire({
      icon: "warning",
      title: "Hey...",
      text: "No moves to undo. Please make a move.",
    });
  } else {
    // Get column and row of last move
    const lastMoveCol = lastMove[0];
    const lastMoveRow = lastMove[1];

    // Undo move from game board
    game[lastMoveCol - 1][lastMoveRow - 1] = " ";
    moves.pop();
    const tile = $(`#c${lastMoveCol}r${lastMoveRow}`)[0];
    rowTracker[lastMoveCol - 1]++;

    // Undo player's turn
    if (player == player1) {
      undoPlayerTurn(player2, tile, "yellowtile");
    } else {
      undoPlayerTurn(player1, tile, "redtile");
    }
  }
}

function undoPlayerTurn(prev_player, tile, colour) {
  tile.classList.remove(colour);
  player = prev_player;
  const turn = $("#turn");
  turn[0].innerHTML = "";
  if (player == "You") {
    turn.append(`${player}r Turn`);
  } else {
    turn.append(`${player}'s Turn`);
  }
}

// Back to Main Menu
window.mainMenu = mainMenu;

function mainMenu() {
  window.location.href = "./index.html";
}
