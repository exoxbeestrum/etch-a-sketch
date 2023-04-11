/* Last updated: 4/11/2023   */

//DECLARE VARIABLES
const e = 64; //GRID SIZE

//FUNCTION buildGrid();
function buildGrid(e) {
  let winH = window.innerHeight;
  let winW = window.innerWidth;

  //SQUARE THE HEIGHT, WIDTH
  if (winH >= winW) {
    winH = winW - winW * 0.2; //ADD 20% SPACING
  } else {
    winH = winH - winH * 0.2; //ADD 20% SPACING
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
    document.getElementById("gridbox").appendChild(row);
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

//DRAGGABLE SCORECARD FUNCTION
//VIA https://www.w3schools.com/howto/howto_js_draggable.asp
let elem = document.getElementById("options");

function dragElement(elem) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById("grabber")) {
    //DECLARE THE DRAGGABLE HANDLE
    document.getElementById("grabber").onmousedown = dragMouseDown;
  } else {
    //OTHERWISE, THE WHOLE THING IS GRABBABLE
    elem.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    //GET MOUSE POSITION AT STARTUP
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    //CALL FUNCTION WHEN MOUSE MOVES
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    //CALCULATE NEW CURSOR POSITION
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    //SET ELEM NEW POSITION
    elem.style.top = elem.offsetTop - pos2 + "px";
    elem.style.left = elem.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    //STOP MOVING ON MOUSE RELEASE
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
//DRAG THE SCORECARD
dragElement(elem);