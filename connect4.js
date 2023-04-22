import scoreboard from "./scoreboard.js";
import AI_Move from "./ai.js";

// Setting up the Game

let player1 = localStorage.getItem("player1-name"); // take input from form //
let player2 = localStorage.getItem("player2-name"); // take input from form //
let player1_score = 0;
let player2_score = 0;
let player1colour = "red";
let player2colour = "yellow";
let winnercolour = "win";
let starting_player = player1;
let gameEnd = false;

const boardRows = 7;
const boardCols = 7;
const computer = "Computer AI";
const you = "You";
var game;
var moves;
var winner;
var player;
var rowTracker;
var boardState;

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

  // Update Turn
  updateTurnColour(turn);
  if (player == you) {
    turn.append(`${player}r Turn`);
  } else {
    turn.append(`${player}'s Turn`);
  }

  rowTracker = [7, 7, 7, 7, 7, 7, 7];

  // Getting BoardState
  boardState = getBoardState(game, player);
  if (player == computer) {
    AI_Play(boardState);
  }
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
      changePlayerTurn(player2, tile, `${player1colour}tile`);
    } else if (row >= 1 && player == player2) {
      changePlayerTurn(player1, tile, `${player2colour}tile`);
    } else {
      //Alert effects
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The column is full. You cannot add more tiles...",
      });
    }

    // Updating Turn Colour
    const turn = $("#turn");
    updateTurnColour(turn);

    // Getting BoardState
    boardState = getBoardState(game, player);
    if (player == computer) {
      AI_Play(boardState);
    }

    // Check if move causes win or draw
    checkWinDraw();
  }
}

async function AI_Play(boardState) {
  const response = await AI_Move(boardState);
  const AImoveCol = parseInt(response) + 1;
  const AImove = $(`#c${AImoveCol}`);
  AImove.click();
}

// Change Player Turn
// Need to add colouring to turn and change colour when changing turn
function changePlayerTurn(next_player, tile, colour) {
  tile.classList.add(colour);
  player = next_player;
  const turn = $("#turn");
  turn[0].innerHTML = "";
  if (player == you) {
    turn.append(`${player}r Turn`);
  } else {
    turn.append(`${player}'s Turn`);
  }
}

function updateTurnColour(turn) {
  if (player == player1) {
    turn[0].classList.remove(`${player2colour}turn`);
    turn[0].classList.add(`${player1colour}turn`);
  } else {
    turn[0].classList.remove(`${player1colour}turn`);
    turn[0].classList.add(`${player2colour}turn`);
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
            let col_start = c;
            let col_end = c + 4;

            for (col_start; col_start < col_end; col_start++) {
              let disc = $(`#c${col_start}r${r}`)[0];
              flashWinningTile(disc);
            }
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
      // Alert effects
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
  setTimeout(() => {
    if (winner == player1) {
      player1_score++;
    } else {
      player2_score++;
    }

    // Alert effects
    if (winner == computer) {
      Swal.fire({
        title: "Aww... So Close!",
        text: `${winner} win!`,
        imageUrl: "./try_harder.jpg",
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
    } else {
      Swal.fire({
        title: "Congratulations!",
        text: `${winner} win!`,
        imageUrl: "./congrats.jpg",
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: "Custom image",
      });
    }
    $("#P1_score")[0].innerHTML = player1_score;
    $("#P2_score")[0].innerHTML = player2_score;
    gameEnd = true;
    newGame();
  }, 1000);
}

// Undo last move
window.undoMove = undoMove;
function undoMove() {
  const lastMove = moves.slice(-1)[0];
  if (lastMove == undefined) {
    // Alert effects
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
      undoPlayerTurn(player2, tile, `${player2colour}tile`);
    } else {
      undoPlayerTurn(player1, tile, `${player1colour}tile`);
    }

    // Undo Move one more time, if it's AI turn
    if (player == computer) {
      undoMove();
    }
  }
}

function flashWinningTile(tile) {
  tile.classList.add(`${winnercolour}tile`);
}

function undoPlayerTurn(prev_player, tile, colour) {
  tile.classList.remove(colour);
  player = prev_player;
  const turn = $("#turn");
  turn[0].innerHTML = "";
  if (player == you) {
    turn.append(`${player}r Turn`);
  } else {
    turn.append(`${player}'s Turn`);
  }
  updateTurnColour(turn);
}

// Back to Main Menu
window.mainMenu = mainMenu;

function mainMenu() {
  window.location.href = "./index.html";
}

// Getting board state for AI Move
// Input format: '0000000000000000020000001200000210000021001012100&player=2'
function getBoardState(game, player) {
  let boardState = "";
  for (let r = 1; r <= boardRows; r++) {
    for (let c = 1; c <= boardCols; c++) {
      const tile = game[c - 1][r - 1];
      if (tile == " ") {
        boardState += "0";
      } else if (tile == player1) {
        boardState += "1";
      } else {
        boardState += "2";
      }
    }
  }
  let currentPlayer = 2;
  if (player == starting_player) {
    currentPlayer = 1;
  }
  // console.log(`${boardState}&player=${currentPlayer}`);
  return `${boardState}&player=${currentPlayer}`;
}
