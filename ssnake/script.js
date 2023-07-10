/*----- constants -----*/
//Grid
const cellSize = 15;
const rows = 17;
const cols = 17;


/*----- state variables -----*/

let grid;
let context;

// Snake atr
let snakeR = cellSize * 5;
let snakeC = cellSize * 5;

let moveR = 0;
let moveC = 0;

let snakeLength = [];

  // Bits/food
  let bitsR;
  let bitsC;

  let gameOver = false;

	/*----- cached elements  -----*/


	/*----- event listeners -----*/


	/*----- functions -----*/

  window.onload = function() { 

    // Creates the grid everytime time the page reloades
    grid = document.getElementById("grid");
    grid.height = rows * cellSize;
    grid.weight = cols * cellSize;
    // Will be used for drawing on the board
    context = grid.getContext("2d")


    // Places the bits in random places around the map
    bitPlacement();

    // Moves the snake
    document.addEventListener("keyup", changePath)

    // updates the grid on the html and redraws it
    //update()
    setInterval(update, 1000/10);
  }

  function update() {

if (gameOver) {
  return;
}
    //changes color of the grid to green
   context.fillStyle = "green";
   context.fillRect(0, 0, grid.width, grid.height);

   
   // Changes color for the food to yellow
   context.fillStyle ="yellow";
   context.fillRect(bitsR, bitsC, cellSize, cellSize)
   // When snake touches bits
   if (snakeR == bitsR && snakeC == bitsC) {
      snakeLength.push([bitsR,bitsC])
      bitPlacement();
   }
   //Keeps body with head
   for ( let i = snakeLength.length-1; i > 0; i--) {
    snakeLength[i] = snakeLength[i-1];
   }
   if (snakeLength.length) {
    snakeLength[0] = [snakeR,snakeC];
  }
   
   // Changes color of the snake to red
   context.fillStyle = "red";
   // Movement for snake
   snakeC += moveC * cellSize;
   snakeR += moveR * cellSize;
   context.fillRect(snakeR, snakeC, cellSize, cellSize)
   //Increase length of snake when he 
   for (let i = 0; i < snakeLength.length; i++) {
     context.fillRect(snakeLength[i][0], snakeLength[i][1], cellSize, cellSize);
    }
  
   // Game Over Conditions
   if (snakeR < 0 || snakeR > cols*cellSize || snakeC < 0 || snakeC > rows*cellSize) {
     gameOver = true;
     alert("Game Over");
   }

   for (let i = 0; i < snakeLength.length; i++)
     if (snakeR == snakeLength[i][0] && snakeC == snakeLength[i][1]) {
      gameOver = true;
      alert("Game Over");
     }
  }
  function bitPlacement() {
    // Math.random returns a number between (0-1)
    // * the number of cols and rows (16.99,16.99) 
    // Math.floor gets rid of the decimals (16,16)
    // * by the cellSize which is 25

    bitsR = Math.floor(Math.random() * cols) * cellSize;
    bitsC = Math.floor(Math.random() * rows) * cellSize;
  }

  function changePath(e) {
    if (e.code == "ArrowUp" && moveC != 1) {
      moveR = 0;
      moveC = -1;
    }
    else if (e.code == "ArrowDown" && moveC != -1) {
      moveR = 0;
      moveC = 1;
    }
    else if (e.code == "ArrowLeft" && moveR != 1) {
      moveR = -1;
      moveC = 0;
    }
    else if (e.code == "ArrowRight" && moveR != -1) {
      moveR = 1;
      moveC = 0;
    }
  }