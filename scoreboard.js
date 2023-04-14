export default class scoreboard {
  constructor(root, player1, player2) {
    this.root = root;
    this.root.innerHTML = `
      <h2 id="scoreboard">
        <div class="scoreboard_name">${player1}</div>
        <div class="scoreboard_name">${player2}</div>
        <div id="P1_score">0</div>
        <div id="P2_score">0</div>
      </h2>
    `;
  }
}
