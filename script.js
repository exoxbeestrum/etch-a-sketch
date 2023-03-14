/* Last updated: 3/14/2023   */

//DECLARE VARIABLES
const e = 64; //GRID SIZE

//FUNCTION buildGrid();
function buildGrid(e) {
  const container = document.getElementById("container");
  let winH = window.innerHeight;
  let winW = window.innerWidth;

  //SQUARE THE HEIGHT, WIDTH
  if (winH >= winW) {
    winH = winW;
  } else {
    winW = winH;
  }

  for (let i = 0; i < e; i++) {
    //SETS ROWS & COLUMNS
    const row = document.createElement("div");
    //DECLARE .row CLASS
    row.className = "row";
    //ASSIGN # OF COLUMNS, COLUMN WIDTH IN ROWS
    row.style.gridTemplateColumns = "repeat(" + e + ", " + winH / e + "px)";
    //ASSIGN ROW HEIGHT
    row.style.gridTemplateRows = winH / e + "px";

    //SET COLUMNS IN EACH ROW
    for (let x = 0; x < e; x++) {
      const column = document.createElement("div");
      column.className = "column";
      row.appendChild(column);
    }
    document.getElementById("container").appendChild(row);
  }
}
//END FUNCTION buildGrid();

window.onload = buildGrid(e); //RUN GRID

//ETCH-A-SKETCH ON MOUSEOVER
document.querySelectorAll(".column").forEach((item, index) => {
  item.addEventListener("mouseover", () => {
   item.style.backgroundColor = "red";
  });
});
