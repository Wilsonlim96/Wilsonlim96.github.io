# PROJECT 1 : CONNECT-4 GAME

## SUMMARY

This project shows a game called Connect-4. It is a strategy game where 2 players go 1-on-1 to own the grid!

Players choose red (player 1) or yellow (player 2) tiles. They drop the tiles into the board, stacking one another starting from the the most bottom row. The first player to get 4 in a row (can be horizontally, vertically or diagonally) wins the game.

The Connect-4 game is a great choice for anyone to pit their brains against another player for a quick and exciting game. It is also an excellent choice for anyone looking for a real challenge, to try and win against the AI in the `SINGLE PLAYER` game mode.

## UX/UI

The objective of this project is the create an interactive game for users to have fun and/or kill time. Thus, the page layout adopts a simplistic design to ensure easy natigation. Also, given that there will be different type of users (i.e. single player and multi-players), different pages are created to prepare / lead the players to kickstart of the game.

## FEATURES

The game caters for both single and multiple players. When it is a player's turn, he/she will be able to play a disc into one of the seven columns available. The disc will always be played on the lowest row available for that column. Each column will be stored as an array of 7 items representing the 7 rows in each column. The entire game board is another array that holds all the seven column arrays. After each move is made, the item in the respective column array will be updated with the player who made the move and there will be a check to see if any player has won with that move. If a player has won, the scoreboard will update and the player who started second in the current game will now go first in the next game.

For single player mode, user will be playing against a AI, of which the algorithm used to decide the moves made is an API called from Kevinalbs. Player can choose to start first or start second.

While for the multi-player mode, 2 users will take turns to make their move.

## USER STORIES

1. As a player, I am able to select multiplayer so that I am able to play with another player.
2. As a player, I am able to select single player so that I am able to play against the AI.
3. As a player, I am able to put a disc in any column so that I am able to make a move.
4. As a player, I am able to undo move so that I redo a wrong move made.
5. As a player, I am able to go to the main menu so that I am able to restart the game anytime I wish.

## TECHNOLOGIES USED

The main language used is Javascript and HTML. Libraries used include (see URL link under `CREDITS`):

1. Axios - for importing API data
2. Jquery - for accessing variables in the HTML script
3. Sweetalert - for creating fanciful alerts for the gamers

## TESTING

| Test Case # | Test Case Description                        | Test Steps                                                                 | Expected Result                                                                                                                                                                                                                                                         |
| ----------- | -------------------------------------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1           | Choose game mode                             | (a) Click on `SINGLE PLAYER` button <br> (b) CLick on `MULTIPLAYER` button | (a) An alert prompt will be shown. Click on 'OK' to return to main menu. Cick on 'BRING IT ON' button to choose player to start game. <br> (b) User will be prompted to enter player name to start game. User will not be allowed to start game with empty name fields. |
| 2           | Single player game mode                      | User to click on the column to register his move.                          | User's move will be displayed on screen, with Player 1's move shown in Red and Player 2's shown in yellow. After which, 'Computer AI' will automatically makes it move and user can continue with the game.                                                             |
| 3           | Multi-player game mode                       | User to click on the column to register his move.                          | User's move will be displayed on screen, with Player 1's move shown in Red and Player 2's shown in yellow.                                                                                                                                                              |
| 4           | 'Undo' button to undo the action             | User to click on the undo button.                                          | User's last move will be removed from the screen. For Single player mode, 'Computer AI' move will be removed at the same time. When no more moves shown on the screen, alert will be prompted to notify user that no more moves can undo.                               |
| 5           | 'Main Menu' button to return to main menu    | User to click on the 'Main Menu' button.                                   | Page will be redirected to the main menu - for user to choose the game mode.                                                                                                                                                                                            |
| 6           | 'Back' button to return to the previous page | User to click on the 'Back' button.                                        | Page will be redirected to the last accessed page.                                                                                                                                                                                                                      |
| 7           | Complete a round of game                     | Four of the same colour formed a row.                                      | A prompt will be shown to notify user the results of the game, either 'Win' or 'Lose'.                                                                                                                                                                                  |

## DEPLOYMENT

1. The hosting platform is Github.io.
2. The database is hosted using arrays.
3. The environment variable is AI_API and it is responsible for calling the api to get moves for the AI.

## LIVE LINK

- [Connect-4 Game](https://wilsonlim96.github.io/)

## CREDITS AND ACKNOWLEDGEMENT

- [API for AI](https://kevinalbs.com/connect4/back-end/index.php/)
- [Alert effects](https://cdn.jsdelivr.net/npm/sweetalert2@11)
- [Blinking effects](https://linuxhint.com/how-to-make-blinking-flashing-text-with-css/)
- [General coding](https://www.w3schools.com/)
