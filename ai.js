export default async function AI_Move(board_data) {
  // format = '0000000000000000020000001200000210000021001012100&player=2'
  const AI_API = axios.create({
    baseURL: "https://kevinalbs.com/connect4/back-end/index.php/",
  });
  try {
    const response = await AI_API.get(
      // "getMoves?board_data=0000000000000000020000001200000210000021001012100&player=2"
      `getMoves?board_data=${board_data}`
    );
    // console.log(board_data);
    const moves = response["data"];
    const bestMove = Object.keys(moves).reduce((a, b) =>
      moves[a] > moves[b] ? a : b
    );
    return bestMove;
  } catch (e) {
    console.log("Unable to fetch data from API");
  }
}
