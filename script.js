/*----- constants -----*/
//Grid
const cellSize = 16;
const rows = 15;
const cols = 18;

/*----- state variables -----*/

let grid;
let context;

// Snake location
let snakeR = cellSize * 5;
let snakeC = cellSize * 5;

//snake movement
let moveR = 0;
let moveC = 0;

//snake length stored in an object
let snakeLength = [];

  // Bits/food
  let bitsR;
  let bitsC;

  let gameOver = false;

	/*----- event listeners -----*/
// Moves the snake with arrcow keys
document.addEventListener("keyup", changePath)

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

  
    // updates the grid on the html and redraws it
    //update()
    setInterval(update, 1000/10);
  }
  
  function startGame() {
    console.log('Starting game...');
    toggleScreen("start-screen", false);
    toggleScreen("grid", true);
    toggleScreen("game-over-screen", false);
    update();
  }

  function gameEnd() {
    console.log("Game Ending...")
    toggleScreen("start-screen", false);
    toggleScreen("grid", false);
    toggleScreen("game-over-screen", true);
    update();
  }
  function resetGame() {
    // Reset state variables
  snakeR = cellSize * 5;
  snakeC = cellSize * 5;
  moveR = 0;
  moveC = 0;
  snakeLength = [];
  bitsR = undefined;
  bitsC = undefined;
  gameOver = false;

  // Clear the canvas
  context.clearRect(0, 0, grid.width, grid.height);

  // Hide the game over screen
  toggleScreen("game-over-screen", false);

  // Show the grid and start screen
  toggleScreen("grid", true);
  toggleScreen("start-screen", true);

  // Start the game again
  startGame();

  //Resets food placement
  bitPlacement();
  }
  

  function toggleScreen(id, toggle) {
     let element = document.getElementById(id);
     let display = (toggle) ? "block" : "none";
     element.style.display = display;
  }

  function update() {

    if (gameOver) {
  
      return;
    }
    //changes color of the grid to black
   context.fillStyle = "black";
   context.fillRect(0, 0, grid.width, grid.height);

   // Changes color for the food to red
   context.fillStyle ="red";
   context.fillRect(bitsR, bitsC, cellSize, cellSize)

   
   // When snake touches bits
   if (snakeR == bitsR && snakeC == bitsC) {
     snakeLength.push([bitsR,bitsC])
     bitPlacement();
    }
    //Keeps body with head
    for ( let i = snakeLength.length-1; i > 0; i--) {
      // assigns the value of the previous body segment (snakeLength[i - 1]) 
      // to the current body segment (snakeLength[i]).
      snakeLength[i] = snakeLength[i-1];
    }
    if (snakeLength.length) {
      // assigns the current position of the snake's head 
      // to the first element of the snakeLength array.
      snakeLength[0] = [snakeR,snakeC];
    }
    
    // Changes color of the snake to green
    context.fillStyle = "green";
    // Movement for snake
    snakeC += moveC * cellSize;
    snakeR += moveR * cellSize;
    context.fillRect(snakeR, snakeC, cellSize, cellSize)

    //Increase length of snake when he it eats 
    for (let i = 0; i < snakeLength.length; i++) {
     context.fillRect(snakeLength[i][0], snakeLength[i][1], cellSize, cellSize);
    }
  
   // Game Over Conditions
   // Conditions when snake hits border
   if (snakeR < 0 || snakeR > cols*cellSize || snakeC < 0 || snakeC > rows*cellSize) {
    gameOver = true;
     gameEnd()
   }
  // condition when snake eats itself
   for (let i = 0; i < snakeLength.length; i++)
     if (snakeR == snakeLength[i][0] && snakeC == snakeLength[i][1]) {
      gameOver = true;
      gameEnd()
     }
  }

  function bitPlacement() {
    // Math.random returns a number between (0-1)
    // * the number of cols and rows (16.99,16.99) 
    // Math.floor gets rid of the decimals (16,16)
    // * by the cellSize which is 16

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