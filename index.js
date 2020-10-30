let board;
let cols = 7;
let rows = 6;
let size = 100;
let buffer;
let player = 1;
let lastPos, gameWon, gameDrawn;

const DEBUG = true; 

function setup(){
  canvas = createCanvas(cols*size, rows*size);
  background(100);
  ellipseMode(CORNER);
  noStroke();
  createBoard();
}

function draw(){
  drawBoard();
  drawPreview();
}

function createBoard() {
  board = new Array(rows);
  for (let i = 0; i < rows; i++){
    board[i] = new Array(cols);
    for (let j = 0; j < cols; j++){
      board[i][j] = 0;
    }
  }
}

function drawBoard(){
  buffer = size * 0.05;
  for (let i = 0; i < rows; i++){
    for (let j = 0; j < cols; j++){
      if (board[i][j] == 0) fill(255);
      else if (board[i][j] == 1) fill(0, 0, 255); // player 1
      else if (board[i][j] == 2) fill(255, 0, 0); // player 2 or AI
      ellipse(j*size+buffer, i*size+buffer, size * 0.9);
      if (DEBUG) {
        fill(0);
        textSize(20);
        text(`X:${j}\nY:${i}`, j*size+30, i*size+50);
      }
    }
  }
}

function drawPreview(){
  if (gameWon) return;
  let columns = [0];
  for (let i = 1; i < cols+1; i++){
    columns.push(size * i);
  }
  for (let i = 0; i < columns.length; i++){
    if (mouseX > columns[i] && mouseX < columns[i+1]){
      let x = columns[i]/100;
      let y = findY(x);
      (player == 1) ? fill(0, 0, 255, 150) : fill(255, 0, 0, 150);

      ellipse(x*100+buffer, y*100+buffer, size * 0.9);
      if (y !== -1){
        lastPos = {x: x, y: y};
      }
    }
  }
}

function mouseClicked(){
  if (gameWon || gameDrawn) return;
  x = lastPos.x;
  y = lastPos.y;
  board[y][x] = 1;
  checkForGameWin();
  nextPlayer();
  AI_Move();
}

function checkForGameWin(){
  gameWon = winningMove(board, player);
  gameDrawn = gameDraw();
  if (gameWon){
    if (player == 1) alert("Blue Wins");
    else if (player == 2) alert("Red Wins");
  } else if (gameDrawn) alert("Game drawn");
}

function AI_Move(){
  let move = minimax(board, 2, true)["bestMove"];
  if (!move) return; // Once game is won, minimax returns null. Don't let continue if won
  y = move["y"];
  x = move["x"];
  board[y][x] = 2;
  checkForGameWin();
  nextPlayer();
}

function nextPlayer(){
  (player == 1) ? player++ : player--;
}

// function mouseClicked(){
//   if (gameWon || gameDrawn) return;
//   x = lastPos.x;
//   y = lastPos.y;
//   if (player == 1){
//     board[y][x] = 1;
//   } else if (player == 2){
    
//     board[y][x] = 2;
//   }
//   gameWon = gameWon(board, player);
//   gameDrawn = gameDraw();
//   if (gameWon){
//     if (player == 1) alert("Blue Wins");
//     else if (player == 2) alert("Red Wins");
//   } else if (gameDrawn){
//     alert("Game drawn");
//   }
//   (player == 1) ? player++ : player--;
// }