const CANVAS_SIZE = 400;
const FIELD_SIZE = 8;
const CELL_SIZE = CANVAS_SIZE / FIELD_SIZE;
const PIECE_SIZE = CELL_SIZE - 10;
let turn = -1;
let field = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, -1, 1, 0, 0, 0],
  [0, 0, 0, 1, -1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
let copy = new Array(8);

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  
  for (let i = 0; i <= 7; i++) {
    copy[i] = new Array(8);
  } 
  
  for (let i = 0; i < FIELD_SIZE; i++)
  {
    for (let j = 0; j < FIELD_SIZE; j++)
    {
      fill("green")
      square(CELL_SIZE * i, CELL_SIZE * j, CELL_SIZE);
    }
  }
  let passBtn = createButton("pass");
  passBtn.position(CANVAS_SIZE / 2, CANVAS_SIZE + 10);
  passBtn.mousePressed(pass);
}

function copyField() {
  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 7; j++) {
      copy[i][j] = field[i][j];
    }
  }
}

function restoreField() {
  for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 7; j++) {
      field[i][j] = copy[i][j];
    }
  }
}

function draw() {
  let whitePieces = 0;
  let blackPieces = 0;
  for(let i = 0; i < FIELD_SIZE; i++)
  {
    for(let j = 0; j < FIELD_SIZE; j++)
    {
      if(field[i][j] == 1)
      {
        fill("white");
        ellipse(CELL_SIZE * j + CELL_SIZE / 2,CELL_SIZE * i + CELL_SIZE / 2,PIECE_SIZE,PIECE_SIZE);
        whitePieces += 1;
      }
      if (field[i][j] == -1)
      {
        fill("black");
        ellipse(CELL_SIZE * j + CELL_SIZE / 2, CELL_SIZE * i + CELL_SIZE / 2,PIECE_SIZE, PIECE_SIZE);
        blackPieces += 1;
      }
    }
  }
}

function mouseClicked()
{
  let x = floor(mouseX/CELL_SIZE);
  let y = floor(mouseY/CELL_SIZE);
  if(reversePieces(x,y) > 0) {
    pass();
  }
}

function pass() {
  turn *= -1;
}

function reversePieces(_x, _y) {
  let totalReverseCnt = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      copyField();
      let x = _x;
      let y = _y;
      let samePieces = 0;
      let reverseCnt = 0;

      while (true) {
        x += i;
        y += j;

        if (x < 0 || y < 0 || x > 7 || y > 7) {
          break;
        } else if (field[y][x] == 0) {
          break;
        } else if (field[y][x] == turn) {
          samePieces = 1;
          break;
        }
        field[y][x] *= -1;
        reverseCnt = reverseCnt + 1;
      }

      // ひっくり返せるかの確認
      if (reverseCnt > 0) {
        if (samePieces > 0) {
          totalReverseCnt = totalReverseCnt + reverseCnt;
          field[_y][_x] = turn;
        } else {
          restoreField();
        }
      }
    }
  }
  return totalReverseCnt;
}