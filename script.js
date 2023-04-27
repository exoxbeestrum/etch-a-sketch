/* Last updated: 4/27/2023   */

/*-----------------------------------------*/
/* RANDOM PLACEMENT OF "Choose a Number"   */
/*-----------------------------------------*/
let randoPlacement = (target) => {
  const divH = document.getElementById(target).clientHeight;
  const divW = document.getElementById(target).clientWidth;
  const winH = window.innerHeight;
  const winW = window.innerWidth;

  let randoTop = Math.floor(Math.random() * (winH - divH) + 112);
  let randoLeft = Math.floor(Math.random() * (winW - divW));

  //AVOID PLACEMENT BELOW CLIENT WINDOW
  if (randoTop >= winH - divH) {
    let randoBumper = Math.floor(Math.random() * (216 - 72 + 1) + 72); //ADDS BOTTOM PADDING TO PLACEMENT
    randoTop = winH - divH - randoBumper;
  }
  //AVOID PLACEMENT TO THE LEFT OF CLIENT WINDOW
  if (randoLeft >= winW - divW) {
    randoLeft = winW - divW;
  }
  document.getElementById(target).style.top = randoTop + "px";
  document.getElementById(target).style.left = randoLeft + "px";
};
/* END RANDOM PLACEMENT OF "Choose a Number" --*/

/*--------------------*/
/* CHOOSE GRID SIZE   */
/*--------------------*/
let optionsBox = () => {
  let gridSize;
  let text = document.getElementById("text");
  const defaultText = document.getElementById("text").value;
  const button = document.getElementById("submit");

  //MOUSEDOWN
  button.addEventListener("mousedown", (event) => {
    button.innerHTML = "&#129295;";
    evalForm(text.value, "msg_error", defaultText);
  });
  //MOUSEUP
  button.addEventListener("mouseup", (event) => {
    button.innerHTML = "&#128072;";
  });
  //INPUT BOX ONFOCUS
  text.addEventListener("focus", (event) => {
    if (text.value === defaultText) {
      text.value = "";
    }
  });
  //INPUT BOX ONBLUR
  text.addEventListener("blur", (event) => {
    if (text.value == false) {
      text.value = defaultText;
    }
  });
};
/* END CHOOSE GRID SIZE --*/

/*-------------------------------------*/
/* CHOOSE-A-GRID-SIZE FORM EVALUATOR   */
/*-------------------------------------*/
let evalForm = (text, target, error) => {
  //IF NOT A NUMBER
  if (isNaN(text) && text !== error) {
    document.getElementById(
      target
    ).innerHTML = `${text} is not a number. Choose again, ${randInsult(
      msgArray
    )}.`;
    msgScroller(); //DISPLAY ERROR MESSAGE
  }

  //IF FORM IS BLANK OR IS ZERO
  if (!text || text == false) {
    if (text === "0") {
      document.getElementById(
        target
      ).innerHTML = `${text} won't work. Try a larger number, ${randInsult(
        msgArray
      )}.`;
    } else {
      document.getElementById(
        target
      ).innerHTML = `Really? You're not even trying! Pick a number, ${randInsult(
        msgArray
      )}.`;
    }
    msgScroller();
  }

  //IF FORM ONLY HAS NUMBERS
  if (Math.sign(text)) {
    //text = +text; //CONVERT STRING TO NUMBER W/ UNARY PLUS OPERATOR
    if (text >= 101) {
      document.getElementById(
        target
      ).innerHTML = `${text} is too high. Try again, ${randInsult(msgArray)}.`;
      msgScroller();
    } else if (Math.sign(text) == "-1") {
      document.getElementById(
        target
      ).innerHTML = `C'mon, ${text} is too low. Let's do it again, ${randInsult(
        msgArray
      )}.`;
      msgScroller();
    } else {
      //INPUT PASSES VALIDATION
      console.log("success: building grid");
      fadeIn(5, "blanket", 9, 0);
      fadeIn(10, "msg_options", 9, 0);
      text = +text;
      buildGrid(text);
      etchSketch();
    }
  }
};
/* END CHOOSE-A-GRID-SIZE FORM EVALUATOR --*/

/*---------------------------*/
/* RANDOM INSULT GENERATOR   */
/*---------------------------*/
const msgArray = [
  "beefhead",
  "birdbrain",
  "blockhead",
  "bonehead",
  "Brains",
  "captain",
  "clod",
  "clodpoll",
  "dimwit",
  "dodo",
  "dolt",
  "dope",
  "dullard",
  "dumbbell",
  "dummkopf",
  "dummy",
  "dumdum",
  "dunce",
  "dunderhead",
  "Einstein",
  "fool",
  "genius",
  "goof ball",
  "half-wit",
  "harebrain",
  "idiot",
  "ignoramus",
  "imbecile",
  "knothead",
  "knucklehead",
  "lame-brain",
  "moron",
  "nincompoop",
  "nitwit",
  "numbskull",
  "oaf",
  "pinhead",
  "scatterbrain",
  "schnook",
  "Sherlock",
  "simpleton",
  "tomfool",
  "twit",
  "whiz",
];

let insult = "";
let randInsult = (items) => {
  return items[Math.floor(Math.random() * items.length)];
};
/* END RANDOM INSULT GENERATOR --*/

/*--------------------------*/
/* ERROR MESSAGE SCROLLER   */
/*--------------------------*/
let msgScroller = () => {
  const elem = document.getElementById("msg_error");
  const elemHeight = elem.offsetHeight;
  const speed = 5;
  const pause = 1500;
  let initPos = 14;

  //SCROLL MESSAGE DOWN
  let scrollDown = () => {
    document.getElementById("submit").disabled = true; //DISABLE SUBMIT BUTTON
    let i = elemHeight;
    let initFirst = setInterval(function () {
      if (i === initPos) {
        clearInterval(initFirst);
        scrollPause(); //FIRE scrollPause() AFTER LOOPING
      } else {
        elem.style.top = `-${i}px`;
        i--;
      }
    }, speed);
  };

  //PAUSE MESSAGE
  let scrollPause = () => {
    setTimeout(function () {
      scrollUp(); //FIRE scrollUp() AFTER PAUSE
    }, pause);
  };

  //SCROLL MESSAGE UP
  let scrollUp = () => {
    let i = -initPos;
    let initThird = setInterval(function () {
      if (i === -elemHeight - 1) {
        clearInterval(initThird); //END scrollUp() AFTER LOOPING
        document.getElementById("submit").disabled = false; //RE-ENABLE SUBMIT
        document.getElementById("submit").innerHTML = "&#128072;"; //RESET SUBMIT IMAGE
      } else {
        elem.style.top = `${i}px`;
        i--;
      }
    }, speed);
  };
  scrollDown(); //START FUNCTION SEQUENCE
};
/* END ERROR MESSAGE SCROLLER  */

/*--------------------------------*/
/* DRAGGABLE CHOOSE-A-GRID FORM   */
/*--------------------------------*/
let dragElement = (target, handle) => {
  let elem = document.getElementById(target);
  let drag = document.getElementById(handle);
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  let dragMouseDown = (e) => {
    e = e || window.event;
    e.preventDefault();
    //GET MOUSE POSITION AT STARTUP
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    //CALL FUNCTION WHEN MOUSE MOVES
    document.onmousemove = elementDrag;
  };

  let elementDrag = (e) => {
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
  };

  let closeDragElement = () => {
    //STOP MOVING ON MOUSE RELEASE
    document.onmouseup = null;
    document.onmousemove = null;
  };

  if (drag) {
    //DECLARE THE DRAGGABLE HANDLE
    drag.onmousedown = dragMouseDown;
  } else {
    //OTHERWISE, THE WHOLE THING IS GRABBABLE
    elem.onmousedown = dragMouseDown;
  }
};
/* END DRAGGABLE CHOOSE-A-GRID FORM --*/

/*-------------------------*/
/* FUNCTION buildGrid();   */
/*-------------------------*/
let buildGrid = (e) => {
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
};
/* END FUNCTION buildGrid(); --*/

/*------------------*/
/* FADE-IN EFFECT   */
/*------------------*/
//"FADES IN GRID", FADES OUT OPTION BOX/BLANKET OVERLAY
let fadeIn = (speed, target, opacity, maxFade, remove) => {
  const elem = document.getElementById(target);
  let x = maxFade;
  let i = opacity + "0";

  i = +i; //CONVERT STRING TO NUMBER
  elem.style.opacity = `0.${i}`;

  let fadeInFX = setInterval(function () {
    if (i <= maxFade) {
      if (remove === true) {
        elem.remove();
      }
      clearInterval(fadeInFX);
      elem.style.zIndex = "-1";
    } else {
      if (i <= 9) {
        elem.style.opacity = `0.0${i}`;
      }
      if (i >= 10) {
        elem.style.opacity = `0.${i}`;
      }
    }
    i = i - 1;
  }, speed);
};
/* END FADE-IN EFFECT --*/

/*------------------*/
/* FADE-OUT EFFECT  */
/*------------------*/
//"FADES OUT GRID", FADES-IN OPTION BOX/BLANKET OVERLAY
let fadeout = (speed, target, initOpacity, maxOpacity, zindex, reload) => {
  const elem = document.getElementById(target);
  let i = initOpacity + "0";
  i = +i; //CONVERT STRING TO NUMBER
  elem.style.opacity = `0.${i}`;
  elem.style.zIndex = zindex;

  let fadeoutFX = setInterval(function () {
    if (i >= maxOpacity) {
      clearInterval(fadeoutFX);
      if (reload === true) {
        //RELOAD PAGE AFTER FADE-OUT
        let reloadPage = setTimeout(function () {
          location.reload();
        }, 250);
      }
    } else {
      if (i <= 9) {
        elem.style.opacity = `0.0${i}`;
      }
      if (i >= 10) {
        elem.style.opacity = `0.${i}`;
      }
    }
    i = i + 1;
  }, speed);
};
/* END FADE-OUT EFFECT --*/

/*--------------------------------*/
/* ETCH-A-SKETCH ()ON MOUSEOVER   */
/*--------------------------------*/
let etchSketch = () => {
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
};
/* END ETCH-A-SKETCH ON MOUSEOVER --*/

/*----------------*/
/* RESET BUTTON   */
/*----------------*/
let resetButton = () => {
  const resetButton = document.getElementById("reset");
  resetButton.addEventListener("mousedown", (event) => {
    fadeIn(5, "gridbox", 9, 0, true);
    fadeout(10, "blanket", 0, 90, 50, true);
    //location.reload(); //RELOAD DOCUMENT
  });
};
/* END RESET BUTTON --*/

/*----------------------*/
/* SCROLLING TITLE BAR  */
/*----------------------*/
let scrollingTitle = (separator, speed, customTitle) => {
  let a = separator; //TITLE REPEAT SEPARATOR
  let b = speed; //SCROLL SPEED (MS)
  let c = customTitle; //TITLE TEXT
  let title = (c || document.title) + " " + (a || " ") + " ";

  setInterval(function () {
    title = title.substring(1) + title.charAt(0);
    document.title = title;
  }, b || 150);
};
/* END SCROLLING TITLE BAR  */

/*------------------*/
/* LOAD IT ALL UP   */
/*------------------*/
window.onload = () => {
  dragElement("msg_options", "msg_drag"); //DRAG THE SCORECARD
  fadeout(10, "msg_options", 0, 99, 100, false);
  optionsBox();
  randoPlacement("msg_options");
  resetButton();
  scrollingTitle(" | ", 150);
};
