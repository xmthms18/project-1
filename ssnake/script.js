document.addEventListener("DOMContentLoaded", createGrid);

function createGrid() {
  const gridContainer = document.getElementById("grid-container");

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const gridCell = document.createElement("div");
      gridCell.classList.add("grid-cell");
      gridContainer.appendChild(gridCell);
    }
  }
}