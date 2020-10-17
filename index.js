let array2D;
let cols = 7;
let rows = 6;
let size = 100;
let buffer;
let player = true;
let lastPos, win;

function setup(){
  canvas = createCanvas(cols*size, rows*size);
  background(100);
  ellipseMode(CORNER);
  noStroke();
  create2DArray();
}

function draw(){
  drawBoard();
  drawPreview();
}

function create2DArray() {
  array2D = new Array(rows);
  for (let i = 0; i < rows; i++){
    array2D[i] = new Array(cols);
    for (let j = 0; j < cols; j++){
      array2D[i][j] = 0;
    }
  }
}

function drawBoard(){
  buffer = size * 0.05;
  for (let i = 0; i < rows; i++){
    for (let j = 0; j < cols; j++){
      if (array2D[i][j] == 0) fill(255);
      else if (array2D[i][j] == 1) fill(0, 0, 255); // player 1
      else if (array2D[i][j] == 2) fill(255, 0, 0); // player 2 or AI
      ellipse(j*size+buffer, i*size+buffer, size * 0.9);
    }
  }
}

function drawPreview(){
  if (win) return;
  let columns = [0];
  for (let i = 1; i < cols+1; i++){
    columns.push(size * i);
  }
  for (let i = 0; i < columns.length; i++){
    if (mouseX > columns[i] && mouseX < columns[i+1]){
      let x = columns[i]/100;
      let y = findY(x);
      (player) ? fill(0, 0, 255, 150) : fill(255, 0, 0, 150);

      ellipse(x*100+buffer, y*100+buffer, size * 0.9);
      lastPos = {x: x, y: y};
    }
  }
}

function findY(x){
  for (let y = array2D.length-1; y >= 0; y--){
    if (array2D[y][x] == 0) return y;
  }
  return -1;
}

function mouseClicked(){
  if (win) return;
  x = lastPos.x;
  y = lastPos.y;
  if (y == -1) return;
  if (player){
    array2D[y][x] = 1;
  } else {
    array2D[y][x] = 2;
  }
  win = checkForWin(player);
  if (win){
    if (player) alert("Player 1 wins");
    else alert("Player 2 wins");
  }
  player = !player;
}

function checkForWin(player){
  let piece;
  if (player) piece = 1;
  else piece = 2;

  // horizontal
  for (let i = 0; i < cols-3; i++){
    for (let j = 0; j < rows; j++){
      if (array2D[j][i] == piece && array2D[j][i+1] == piece && 
          array2D[j][i+2] == piece && array2D[j][i+3] == piece){
        return true
      }
    }
  }
  
  // vertical
  for (let i = 0; i < cols; i++){
    for (let j = 0; j < rows-3; j++){
      if (array2D[j][i] == piece && array2D[j+1][i] == piece && 
          array2D[j+2][i] == piece && array2D[j+3][i] == piece){
        return true
      }
    }
  }

  // right diagonal
  for (let i = 0; i < cols-3; i++){
    for (let j = 0; j < rows-3; j++){
      if (array2D[j][i] == piece && array2D[j+1][i+1] == piece && 
          array2D[j+2][i+2] == piece && array2D[j+3][i+3] == piece){
        return true
      }
    }
  }

  // left diagonal
  for (let i = 0; i < cols-3; i++){
    for (let j = 3; j < rows; j++){
      if (array2D[j][i] == piece && array2D[j-1][i+1] == piece && 
          array2D[j-2][i+2] == piece && array2D[j-3][i+3] == piece){
        return true
      }
    }
  }
}