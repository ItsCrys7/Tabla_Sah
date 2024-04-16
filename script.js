let boardSize = 8;
let squareSize;
let pawns = [];

function setup() {
  createCanvas(400, 400);
  squareSize = width / boardSize;
  // Centrăm tabla pe mijlocul canvas-ului
  translate((width - squareSize * boardSize) / 2, (height - squareSize * boardSize) / 2);
  // Generăm 16 pioni cu poziții și expresii aleatorii
  for (let i = 0; i < 16; i++) {
    pawns.push(new Pawn(floor(random(boardSize)), floor(random(boardSize)), randomExpression()));
  }
}

function draw() {
  background(255);
  drawBoard();
  for (let pawn of pawns) {
    pawn.draw();
  }
}

function drawBoard() {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      fill((i + j) % 2 == 0 ? 'white' : 'saddlebrown');
      rect(i * squareSize, j * squareSize, squareSize, squareSize);
    }
  }
}

// Funcție pentru generarea aleatoare a expresiilor faciale
function randomExpression() {
  const expressions = ['happy', 'sad', 'angry', 'surprised'];
  return random(expressions);
}

// Clasa Pawn
class Pawn {
  constructor(x, y, expression) {
    this.x = x;
    this.y = y;
    this.expression = expression;
  }

  draw() {
    // Desenăm corpul pionului
    fill('white');
    ellipse(this.x * squareSize + squareSize / 2, this.y * squareSize + squareSize / 2, squareSize / 2, squareSize / 2);
    // Adăugăm expresia facială
    this.drawFace();
  }

  drawFace() {
    let faceX = this.x * squareSize + squareSize / 2.4;
    let faceY = this.y * squareSize + squareSize / 2.9;
    
    // Desenăm ochii
    fill('white');
    ellipse(faceX - squareSize / 8, faceY - squareSize / 8, squareSize / 10, squareSize / 10);
    ellipse(faceX + squareSize / 8, faceY - squareSize / 8, squareSize / 10, squareSize / 10);
    
    // Desenăm gura la o distanță de 2 unități sub ochi
    let mouthY = faceY + squareSize / 8 + 2; // Ajustăm poziția gurii
    switch(this.expression) {
      case 'happy':
        noFill();
        arc(faceX, mouthY, squareSize / 4, squareSize / 4, 0, PI);
        break;
      case 'sad':
        noFill();
        arc(faceX, mouthY, squareSize / 4, squareSize / 4, PI, TWO_PI);
        break;
      case 'angry':
        fill('red');
        triangle(faceX - squareSize / 8, mouthY, faceX, mouthY - squareSize / 8, faceX + squareSize / 8, mouthY);
        break;
      case 'surprised':
        noFill();
        ellipse(faceX, mouthY, squareSize / 6, squareSize / 6);
        break;
    }
  }
}
