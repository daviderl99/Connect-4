const PLAYER = 1;
const AI = 2;

function minimax(board, depth, maximizingPlayer){
  possibleMoves = getPossibleMoves(board);
  isTerminal = isTerminalNode(board);

  if (depth == 0 || isTerminal){
    if (isTerminal) {
      if (winningMove(board, PLAYER)) return {bestMove: null, score: -Infinity}; // Player
      if (winningMove(board, AI)) return {bestMove: null, score: Infinity}; // AI
      return {bestMove: null, score: 0}; // No more valid moves
    } else {
      return {bestMove: null, score: scorePosition(AI)};
    }
  }
  if (maximizingPlayer){
    let score = -Infinity;
    let bestMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]; // Random pos
    for (move of possibleMoves){
      boardCopy = copyArray(board);
      boardCopy[move["y"]][move["x"]] = AI;
      let newScore = minimax(boardCopy, depth-1, false)["score"]; // Getting score from return value
      if (newScore > score) {
        score = newScore;
        bestMove = move;
      }
      return {score, bestMove};
    } 
  }
  else { // Minimizing player
    let score = Infinity;
    let bestMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    for (move of possibleMoves){
      boardCopy = copyArray(board); 
      boardCopy[move["y"]][move["x"]] = PLAYER;
      let newScore = minimax(boardCopy, depth-1, true)["score"];
      if (newScore < score) {
        score = newScore;
        bestMove = move;
      }
      return {score, bestMove};
    }
  }
  return;
}

function isTerminalNode(testBoard){
  return (winningMove(testBoard, PLAYER) || winningMove(testBoard, AI) || gameDraw());
}