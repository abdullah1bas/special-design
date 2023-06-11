// bn7dd moda 3shan n3mel 3leha kol 7aga 3shan mnft7sh more cards
let duration = 1000;

let wrongTries,
  topRink = { inputName: "", timeStope: "", rankTries: 0 },
  minutes,
  seconds,
  arrOfRanking = [],
  countdownInterval;

// Select Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks");
let triesElement = document.querySelector(".tries span");
let timer = document.querySelector(".time-end span");
let rank = document.querySelector(".rank");

if (window.localStorage.getItem("ranking")) {
  arrOfRanking = JSON.parse(localStorage.getItem("ranking"));
  if (arrOfRanking.length >= 9) arrOfRanking.length = 9;
  arrOfRanking = arrOfRanking.sort(
    (a, b) => parseInt(a.rankTries) - parseInt(b.rankTries)
  );
}

getDataFromLocalStorage();

// console.log(arrOfRanking);

// Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children);

// Create Range Of Keys
let orderRange = Array.from(Array(blocks.length).keys());

// Select The Start Game Button
document.querySelector(".control-buttons span").onclick = function () {
  // btrg3le value b3mel beha 2amr mo3in mn al user
  let yourName = prompt("Whats Your Name?");
  yourName == null || yourName == ""
    ? (document.querySelector(".name span").innerHTML = "Unknown")
    : (document.querySelector(".name span").innerHTML = yourName);

  document.querySelector(".control-buttons").remove();
  document.getElementById("background-audio").play();
  showBlocksInFirst();
  startTime();
};

// console.log(orderRange);
// return arr mt8yra
shuffle(orderRange);
// console.log(orderRange);

// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {
  // al order by8yr amakn al cards be tarteeb order, kol card bamshe 3leh bdelo random.order mn 20
  block.style.order = orderRange[index];

  // Add Click Event
  block.addEventListener("click", function () {
    // Trigger The Flip Block Function
    flipBlock(block);
  });
});

// Flip Block Function
function flipBlock(selectedBlock) {
  // al class dh bs le yft7 2 block we bytshal ba3d moqarna
  selectedBlock.classList.add("is-flipped");

  // hyrg3 kol al elements 2le dost 3lehom fe arr
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  // If Theres Two Selected Blocks
  if (allFlippedBlocks.length === 2) {
    // console.log('Two Flipped Blocks Selected');

    // Stop Clicking Function
    stopClicking();

    // Check Matched Block Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// Stop Clicking Function
function stopClicking() {
  blocksContainer.classList.add("no-clicking");

  // Wait Duration
  setTimeout(() => {
    // ba3d 1s hyshel al class pointer-events none 3shan clicking
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {
  setTimeout(() => {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
  }, duration);

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
    document.getElementById("success").play();
  } else {
    // de hygeeb al value 2le gwaha yt2kd anha int we yzwd 1 lma y8lt fe al 2 blocks
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    document.getElementById("fail").play();
  }

  if (
    blocks.filter((flippedBlock) =>
      flippedBlock.classList.contains("has-match")
    ).length === blocks.length
  ) {
    clearInterval(countdownInterval);
    finishGame("Congratulation");
    document.getElementById("background-audio").pause();
    document.getElementById("end").play();
    topRink.inputName = document.querySelector(".name span").innerHTML;
    topRink.timeStope = timer.innerHTML;
    topRink.rankTries = triesElement.innerHTML;

    addRankToArray(topRink);
  }
}

// Shuffle Function
function shuffle(array) {
  let temp, random;

  for (let i = array.length - 1; i >= 0; i--) {
    random = Math.floor(Math.random() * array.length);
    temp = array[i];
    array[i] = array[random];
    array[random] = temp;
  }
  // return y3ne hyrg3 al arr mt8yra
  return array;
}

// Show Blocks to first play
function showBlocksInFirst() {
  blocks.forEach((block) => {
    block.classList.add("is-flipped");
  });
  setTimeout(() => {
    blocks.forEach((block) => {
      block.classList.remove("is-flipped");
    });
  }, duration + 1000);
}

// Start Time Game
function startTime() {
  let time = 120;
  let minutes, seconds;
  countdownInterval = setInterval(() => {
    minutes = parseInt(time / 60);
    seconds = parseInt(time % 60);

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    timer.innerHTML = `${minutes}:${seconds}`;
    if (--time < 0) {
      clearInterval(countdownInterval);
      finishGame("Game Over");
      document.getElementById("background-audio").pause();
      document.getElementById("end").play();
    }
  }, duration);
}

function finishGame(dataText) {
  blocksContainer.classList.add("no-clicking");
  showRestartGame(dataText);
}

function showRestartGame(dataText) {
  let gameOver = document.createElement("div");
  let para = document.createElement("p");
  let cancelContainer = document.createElement("div");
  let restartBtn = document.createElement("span");
  let cancelBtn = document.createElement("span");
  gameOver.className = "game-over";
  para.className = "para";
  cancelContainer.className = "cancel-container";
  restartBtn.className = "restart";
  cancelBtn.className = "cancel";

  para.appendChild(document.createTextNode(dataText));
  restartBtn.appendChild(document.createTextNode("Restart"));
  cancelBtn.appendChild(document.createTextNode("Cancel"));

  gameOver.appendChild(para);
  cancelContainer.appendChild(restartBtn);
  cancelContainer.appendChild(cancelBtn);
  gameOver.appendChild(cancelContainer);
  document.body.appendChild(gameOver);

  restartBtn.onclick = () => location.reload();
  cancelBtn.onclick = () => (gameOver.style.display = "none");
}

function addRankToArray(obj) {
  let newArr = arrOfRanking.filter((ele) => obj.rankTries <= ele.rankTries);
  if (newArr.length <= 10) {
    arrOfRanking.push(obj);
    // al fekra 2n by3mel tar7 mn awl index we tany index we y3mel al sort 3la al 2sas dh
    // we lw alsort dh fe + , - hn7tag n3mel sortfunc tany
    arrOfRanking = arrOfRanking.sort(
      (a, b) => parseInt(a.rankTries) - parseInt(b.rankTries)
    );
    addDataToLocalStorageFrom(arrOfRanking);
    addElementsToPageFrom(arrOfRanking);
  }
}

function addDataToLocalStorageFrom(arrOfRanking) {
  window.localStorage.setItem("ranking", JSON.stringify(arrOfRanking));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("ranking");
  if (data) {
    let ranking = JSON.parse(data);
    addElementsToPageFrom(ranking);
  }
}

function addElementsToPageFrom(arrOfRanking) {
  rank.innerHTML = "";
  arrOfRanking.forEach((deg, index) => {
    let headerRank = document.createElement("div");
    let spanNum = document.createElement("span");
    let spanName = document.createElement("span");
    let spanTime = document.createElement("span");
    let spanTries = document.createElement("span");

    headerRank.className = "rank-header";
    spanNum.className = "rank-num";
    spanName.className = "rank-name";
    spanTime.className = "rank-time";
    spanTries.className = "rank-tries";

    spanNum.appendChild(document.createTextNode(index + 1));
    spanName.appendChild(document.createTextNode(deg["inputName"]));
    spanTime.appendChild(document.createTextNode(deg["timeStope"]));
    spanTries.appendChild(document.createTextNode(deg["rankTries"]));

    headerRank.appendChild(spanNum);
    headerRank.appendChild(spanName);
    headerRank.appendChild(spanTime);
    headerRank.appendChild(spanTries);
    rank.appendChild(headerRank);
  });
}

// Create Range Of Keys
// Array(num =>{bt3mel arr fadya length = num}).(keys() => y3ne index fe al arr)
// kol 2le foo2 dh hytfss be num or index hyt7to fe arr be => [...]
// let orderRange = [...Array(blocks.length).keys()];

// document.querySelector(".toza1").onclick = () => {
//   console.log(
//     (document.querySelector(".toza").style.transform = "rotateY(180deg)")
//   );
// };

