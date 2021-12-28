"use strict";
let board = document.getElementById("board");
let color;
let theMap = Array();
let theInf = Array();
let move_color = "white";
let move_from_x;
let move_from_y;

function init_inf() {
  theInf = [
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  ];
}

function init_map() {
  theMap = [
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", "R", "P", " ", " ", " ", " ", "p", "r"],
    [" ", "N", "P", " ", " ", " ", " ", "p", "n"],
    [" ", "B", "P", " ", " ", " ", " ", "p", "b"],
    [" ", "Q", "P", " ", " ", " ", " ", "p", "q"],
    [" ", "K", "P", " ", " ", " ", " ", "p", "k"],
    [" ", "B", "P", " ", " ", " ", " ", "p", "b"],
    [" ", "N", "P", " ", " ", " ", " ", "p", "n"],
    [" ", "R", "P", " ", " ", " ", " ", "p", "r"],
  ];
}

function mark_moves_from() {
  init_inf();

  for (let x = 0; x <= 8; x++) {
    for (let y = 0; y <= 8; y++) {
      if (x > 0 && y > 0) {
        if (can_move_from(x, y)) {
          theInf[x][y] = "1";
        }
      }
    }
  }
}

function mark_moves_to() {
  init_inf();

  for (let x = 0; x <= 8; x++) {
    for (let y = 0; y <= 8; y++) {
      if (x > 0 && y > 0) {
        if (can_move_to(x, y)) {
          theInf[x][y] = "2";
        }
      }
    }
  }
}

function can_move_from(x, y) {
  return get_color(x, y) == move_color;
}

function can_move_to(x, y) {
  if(theMap[x][y] == ' '){
    return true
  }
  return get_color(x, y) != move_color;
}

function get_color(x, y) {
  let figure = theMap[x][y];
  if (figure == " ") {
    return " ";
  }
  return figure.toUpperCase() == figure ? "white" : "black";
}

function figure_to_html(figure) {
  switch (figure) {
    case "K":
      return "&#9812";
    case "k":
      return "&#9818";

    case "Q":
      return "&#9813";
    case "q":
      return "&#9819";

    case "R":
      return "&#9814";
    case "r":
      return "&#9820";

    case "B":
      return "&#9815";
    case "b":
      return "&#9821";

    case "N":
      return "&#9816";
    case "n":
      return "&#9823";

    case "P":
      return "&#9817";
    case "p":
      return "&#9823";

    default:
      return "&nbsp";
  }
}

function show_map(board) {
  let table = document.createElement("table");
  board.innerHTML = ''

  for (let y = 8; y >= 0; y--) {
    let tr = document.createElement("tr");

    for (let x = 0; x <= 8; x++) {
      let td = document.createElement("td");

      if (x == 0 || y == 0) {
        td.removeAttribute("class");
        x == 0 ? (td.innerHTML = "y" + y) : (td.innerHTML = "x" + x);
        td.classList.add("coordinate");
      }
      if (x > 0 && y > 0) {
        if (theInf[x][y] == " ") {
          td.removeAttribute("class");
          color =
            (x + y) % 2 ? td.classList.add("white") : td.classList.add("black");
        } else {
          td.removeAttribute("class");
          color =
            theInf[x][y] == "1"
              ? td.classList.add("from")
              : td.classList.add("where");
        }
        td.innerHTML = figure_to_html(theMap[x][y]);

        click_box(td, x, y)
      }

      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  board.appendChild(table);
}

function click_box(td, x, y){
  td.addEventListener("click", function () {

    if(theInf[x][y] == '1'){
      click_box_from(x, y)
    }
    if(theInf[x][y] == '2'){
      click_box_to(x, y)
    }
  });
}

function click_box_from(x, y){
  move_from_x = x;
  move_from_y = y;

  mark_moves_to()
  show_map(board)
}

function click_box_to(x, y){
  theMap[x][y] = theMap[move_from_x][move_from_y]
  theMap[move_from_x][move_from_y] = ' '
  
  turn_move()
  mark_moves_from()
  show_map(board)
}

function turn_move(){
  if(move_color == 'white'){
    move_color = 'black'
  } else {
    move_color = 'white'
  }
}

init_map();
init_inf();
mark_moves_from();
show_map(board);