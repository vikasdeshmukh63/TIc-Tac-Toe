// ELEMENTS SELECTION
const boxEle = document.querySelectorAll(".box");
let inputBox = document.querySelectorAll(".box-text");
const infoEle = document.querySelector(".info");
const resetButton = document.querySelector(".button");
const playerXcolor = document.querySelector("#player-X");
const player0color = document.querySelector("#player-0");
// IMAGES
const congratulationsImg = document.querySelector(".congratulations");
const gameOverImg = document.querySelector(".gameover");
// AUDIO FILES
const gameWinAudio = new Audio("./win.mp3");
const selectionAudio = new Audio("./select.mp3");
const gameOverAudio = new Audio("./gameover.wav");

let turn = "X";
let gameover = false;
let filledCells = 0;

// FUNCTION FOR CHECKING TURN 
function checkForTurn() {
  return turn === "X" ? "0" : "X";
}

// FUNCTION FOR WINNER CHECK
function checkWinner() {
  const winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  winningPattern.forEach((element) => {
    if (
      inputBox[element[0]].innerText === inputBox[element[1]].innerText &&
      inputBox[element[1]].innerText === inputBox[element[2]].innerText &&
      inputBox[element[0]].innerText !== ""
    ) {
      console.log("winner found");
      infoEle.innerText = `Winner is ${inputBox[element[0]].innerText}`;
      gameover = true;
      gameWinAudio.play();
      congratulationsImg.style.width = "300px";
      inputBox[element[0]].style.color = "red";
      inputBox[element[0]].parentElement.style.backgroundColor = "grey";
      inputBox[element[1]].style.color = "red";
      inputBox[element[1]].parentElement.style.backgroundColor = "grey";
      inputBox[element[2]].style.color = "red";
      inputBox[element[2]].parentElement.style.backgroundColor = "grey";
    }
  });
  if (filledCells === 9 && !gameover) {
    console.log("its draw");
    infoEle.innerText = "Game Over";
    gameover = true;
    gameOverImg.style.width = "300px";
    gameOverAudio.play();
  }
}

// CELL SELECTION USING LOOP

boxEle.forEach((box) => {
  box.addEventListener("click", (e) => {
    let subInputBox = e.currentTarget.querySelector(".box-text");
    if (subInputBox.innerText === "") {
      subInputBox.innerText = turn;
      turn = checkForTurn();
      selectionAudio.play();
      filledCells++;
      console.log(filledCells);
      checkWinner();
      if (!gameover) {
        infoEle.innerText = `Turn of ${turn}`;
      }
    } else if (subInputBox.innerText) {
      if (!gameover) {
        infoEle.innerText = `The cell is already checked`;
        setTimeout(() => {
          infoEle.innerText = `Turn of ${turn}`;
        }, 2000);
      }
    }
  });
});

// BUTTON TO RESET THE BOARD
resetButton.addEventListener("click", () => {
  inputBox.forEach((box) => {
    box.innerText = "";
    box.parentElement.style.backgroundColor = "black";
    box.style.color = "white";
  });
  console.log("reset done");
  congratulationsImg.style.width = "0px";
  gameOverImg.style.width = "0px";
  infoEle.innerText = "Welcome to Tic Tac Toe";
  gameover = false;
  filledCells = 0;
  turn = "X";
});
