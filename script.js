let gameSound = new Audio("music.mp3");
let clickSound = new Audio("ting.mp3");
let gameOverSound = new Audio("gameover.mp3");

let boxes = document.querySelectorAll(".grid");
let turn = "X";
let canPlay = 1;


const changeTurn = () => {
  turn = turn === "X" ? "O" : "X";
  document.getElementById("turn").innerText = "It's " + turn + " turn";
};
const checkWin = () => {
  const winLocations = [
    [0, 1, 2, 0, 5, 0],
    [3, 4, 5, 0, 15, 0],
    [6, 7, 8, 0, 25, 0],
    [0, 3, 6, -10, 15, 90],
    [1, 4, 7, 0, 15, 90],
    [2, 5, 8, 10, 15, 90],
    [0, 4, 8, 0, 15, 45],
    [2, 4, 6, 0, 15, -45],
  ];
  winLocations.forEach((e) => {
    if (
      boxes[e[0]].innerText === boxes[e[1]].innerText &&
      boxes[e[2]].innerText === boxes[e[1]].innerText &&
      boxes[e[0]].innerText !== ""
    ) {
      document.getElementById("turn").innerText = "Game Over";
      gameSound.pause();
      gameOverSound.play();
      canPlay = 0;
      document.getElementById('line').style.transform="translate("+e[3]+"vw, "+e[4]+"vw) rotate("+e[5]+"deg)";
      document.getElementById('line').style.width="30vw";
    }
  });
};

Array.from(boxes).forEach((e) => {
  e.addEventListener("click", (grid) => {
    if (grid.target.innerText == "" && canPlay == 1) {
      gameSound.play();
      grid.target.innerText = turn;
      changeTurn();
      checkWin();
      clickSound.play();
    }
  });
});
const resetAllBoxes = () => {
  Array.from(boxes).forEach((e) => {
    e.innerText = "";
  });
};
document.getElementById("resetButton").addEventListener("click", (reset) => {
  canPlay = 1;
  resetAllBoxes();
  gameSound.pause();
  turn = "X";
  document.getElementById("turn").innerText = "It's " + turn + " turn";
  document.getElementById('line').style.width="0vw";
});
