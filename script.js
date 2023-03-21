/* Last updated: 3/14/2023   */

//DECLARE VARIABLES
const e = 16; //GRID SIZE

//FUNCTION buildGrid();
function buildGrid(e) {
  const container = document.getElementById("container");
  let winH = window.innerHeight;
  let winW = window.innerWidth;

  //SQUARE THE HEIGHT, WIDTH
  if (winH >= winW) {
    winH = winW - (winW * .2); //20% SPACING
  } else {
    winW = winH - (winH * .2); //20% SPACING
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

//BUILD THE GRID
window.onload = buildGrid(e); //RUN GRID

//ETCH-A-SKETCH ON MOUSEOVER
document.querySelectorAll(".column").forEach((item, index) => {
  let i = 0;
  item.addEventListener("mouseover", () => {
    switch (i) {
      case (i = 0):
        //APPEND .overlay DIV
        const div = document.createElement("div"); //CREATE CHILD DIV
        item.appendChild(div); //ADD CHILD TO PARENT DIV
        div.classList.add("overlay"); //NAME CHILD DIV

        //CHOOSE & ASSIGN RANDOM COLOR
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);
        item.firstElementChild.style.backgroundColor = "#" + randomColor;
        item.style.backgroundColor = "#000";
        i++; //UPDATE COUNT
        break;
      case (i = 1):
        item.firstElementChild.style.opacity = 1 - `0.${i}`; //0.9
        i++;
        break;
      case (i = 2):
        item.firstElementChild.style.opacity = 1 - `0.${i}`; //0.8
        i++;
        break;
      case (i = 3):
        item.firstElementChild.style.opacity = 1 - `0.${i}`; //0.7
        i++;
        break;
      case (i = 4):
        item.firstElementChild.style.opacity = 1 - `0.${i}`; //0.6
        i++;
        break;
      case (i = 5):
        item.firstElementChild.style.opacity = 1 - `0.${i}`; //0.5
        i++;
        break;
      case (i = 6):
        item.firstElementChild.style.opacity = 1 - `0.${i}`; //0.4
        i++;
        break;
      case (i = 7):
        item.firstElementChild.style.opacity = 1 - `0.${i}`; //0.3
        i++;
        break;
      case (i = 8):
        item.firstElementChild.style.opacity = 1 - `0.${i}`; //0.2
        i++;
        break;
      case (i = 9):
        item.firstElementChild.style.opacity = 1 - `0.${i}`; //0.1
        i++;
        break;
      case (i = 10):
        item.firstElementChild.style.opacity = 1 - i; //0.0
    }
  });
});
//END ETCH-A-SKETCH ON MOUSEOVER
