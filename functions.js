function findY(x){
  for (let y = board.length-1; y >= 0; y--){
    if (board[y][x] == 0) return y;
  }
  return -1;
}

function winningMove(board, player){
  // horizontal
  for (let i = 0; i < cols-3; i++){
    for (let j = 0; j < rows; j++){
      if (board[j][i] == player && board[j][i+1] == player && 
          board[j][i+2] == player && board[j][i+3] == player){
        return true;
      }
    }
  }
  
  // vertical
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows-3; j++){
      if (board[j][i] == player && board[j+1][i] == player && 
          board[j+2][i] == player && board[j+3][i] == player){
        return true;
      }
    }
  }

  // right diagonal
  for (let i = 0; i < cols-3; i++){
    for (let j = 0; j < rows-3; j++){
      if (board[j][i] == player && board[j+1][i+1] == player && 
          board[j+2][i+2] == player && board[j+3][i+3] == player){
        return true;
      }
    }
  }

  // left diagonal
  for (let i = 0; i < cols-3; i++){
    for (let j = 3; j < rows; j++){
      if (board[j][i] == player && board[j-1][i+1] == player && 
          board[j-2][i+2] == player && board[j-3][i+3] == player){
        return true;
      }
    }
  }
  return false;
}

// returns true if no spaces left
function gameDraw(){
  return !board.some(row => row.includes(0));
}

/* MINIMAX HELPER FUNCTIONS */

function getPossibleMoves(board){
  let possibleMoves = [];
  for (let x = 0; x < cols; x++){
    column = board.map((value) => { return value[x]; }); // get column
    y = column.lastIndexOf(0);
    if (y !== -1){
      console.log(y, column);
    }
    if (y !== -1) possibleMoves.push({y, x});
  }
  return possibleMoves;
}

function getCount(arr, el){
  return arr.filter(x => x == el).length;
}

function scorePosition(piece){
  let score = 0;
  let arrSlice = [];

  // center column
  let centerCol = board.map((value) => { return value[3]; });
  let centerCount = getCount(centerCol, piece); // How many AI pieces in column
  score += centerCount * 3;

  // horizontal
  for (let i = 0; i < rows; i++){
    rowArray = board[i];
    for (let j = 0; j < cols-3; j++){
      arrSlice = [...rowArray].splice(j, 4);
      score += evaluateSlice(arrSlice, piece);
    }
  }

  // vertical
  for (let i = 0; i < cols; i++){
    colArray = board.map((value) => { return value[i]; });
    for (let j = 0; j < rows-3; j++){
      arrSlice = [...rowArray].splice(j, 4);
      score += evaluateSlice(arrSlice, piece);
    }
  }

  // right diagonal
  for (let i = 0; i < rows-3; i++){
    for (let j = 0; j < cols-3; j++){
      for (let x = 0; x < 4; x++){
        arrSlice.push(board[i+x][j+x]);
      }
      score += evaluateSlice(arrSlice, piece);
    }
  }

  for (let i = 0; i < rows-3; i++){
    for (let j = 0; j < cols-3; j++){
      for (let x = 0; x < 4; x++){
        arrSlice.push(board[i+3-x][j+x]);
      }
      score += evaluateSlice(arrSlice, piece);
    }
  }

  return score;
}

function evaluateSlice(slice, piece){
  score = 0;

  oppPiece = 1;
  if (piece == 1){
    oppPiece = 2;
  }

  if (getCount(slice, piece) == 4) score += 100;
  else if (getCount(slice, piece) == 3 && getCount(slice, 0) == 1) score += 5;
  else if (getCount(slice, piece) == 2 && getCount(slice, 0) == 2) score += 2;

  if (getCount(slice, oppPiece) == 3 && getCount(slice, 0) == 1) score -= 4;

  return score;
}

function copyArray(arr){
  return JSON.parse(JSON.stringify(arr));
}