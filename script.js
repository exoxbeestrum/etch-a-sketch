/* Last updated: 3/14/2023   */

function makeGrid(e) {
  console.log(e);
  for (let i = 0; i < e; i++) {
    //SETS ROWS & COLUMNS
    const row = document.createElement("div");
    row.className = "row";
    for (let x = 0; x < e; x++) {
      const column = document.createElement("div");
      column.className = "column";
      row.appendChild(column);
    }
    document.getElementById("container").appendChild(row);
  }
}

const e = 3; //DECLARE GRID SIZE
window.onload = makeGrid(e); //RUN GRID
