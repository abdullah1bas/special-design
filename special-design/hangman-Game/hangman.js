// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach(letter => {

  // Create Span
  let span = document.createElement("span");

  // Create Letter Text Node
  let theLetter = document.createTextNode(letter);

  // Append The Letter To Span
  span.appendChild(theLetter);

  // Add Class On Span
  span.className = 'letter-box';

  // Append Span To The Letters Container
  lettersContainer.appendChild(span);

});

// Object Of Words + Categories
const words = {
  programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
  movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
  people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}

// Get Random Property
// de method btdeha al obj bt7otha fe arrAllKey[]
let allKeys = Object.keys(words);
// console.log(allKeys); // (4) ['programming', 'movies', 'people', 'countries']

// Random Number Depend On Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// Category
let randomPropName = allKeys[randomPropNumber];

// Category Words
let randomPropValue = words[randomPropName];

// Random Number Depend On Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// The Chosen Word
let randomValueValue = randomPropValue[randomValueNumber];

// Set Category Info
document.querySelector(".game-info .category span").textContent = randomPropName;

// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

// console.log(randomValueValue)
// Convert Chosen Word To Array
let lettersAndSpace = [...randomValueValue];

// Create Spans Depened On Word
lettersAndSpace.forEach(letter => {

  // Create Empty Span
  let emptySpan = document.createElement("span");

  // If Letter Is Space
  if (letter === ' ') {

    // Add Class To The Span
    emptySpan.className = 'with-space';

  }

  // Append Span To The Letters Guess Container
  lettersGuessContainer.appendChild(emptySpan);

});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking On Letters
document.addEventListener("click", (e) => {

  // Set The Choose Status
  let theStatus = false;

  if (e.target.className === 'letter-box') {

    e.target.classList.add("clicked");

    // Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    // The Chosen Word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    theChosenWord.forEach((wordLetter, WordIndex) => {
      // If The Clicked Letter Equal To One Of The Chosen Word Letter
      if (theClickedLetter == wordLetter) {
        // Set Status To Correct
        theStatus = true;
        guessSpans.forEach((span, spanIndex) => {// hn7ot al 7arf
          if (WordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });
    // Outside Loop
    // console.log(theStatus)

    let rightAttempts = 0;

    // If Letter Is Wrong
    if (theStatus !== true) {
      // Increase The Wrong Attempts
      wrongAttempts++;
      // Add Class Wrong On The Draw Element
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      // Play Fail Sound
      document.getElementById("fail").play();
      // console.log(wrongAttempts);
      
      if (wrongAttempts === 8) {
        endGame();
        lettersContainer.classList.add("finished");
      }

    } else { // Play Success Sound
      guessSpans.forEach(letter => {
        if (letter.textContent != "") {
          rightAttempts++;
          if(rightAttempts == randomValueValue.length) winGame();
        };
      })
      document.getElementById("success").play();
    }
  }
});

// End Game Function
function endGame() {
  let div = document.createElement("div");
  let p = document.createElement("p");
  let divText = document.createTextNode(`Game Over, The Word Is ${randomValueValue}`);
  let returned = document.createElement("div");

  p.appendChild(divText);
  returned.appendChild(document.createTextNode("Return"));
  div.appendChild(p);
  div.appendChild(returned);
  div.className = 'popup';
  returned.className = 'return';
  document.body.appendChild(div);
  returned.onclick = function() {location.reload()}
}

function winGame() {
  let div = document.createElement("div");
  let p = document.createElement("p");
  let divText = document.createTextNode("You Are Win");
  let returned = document.createElement("div");

  p.appendChild(divText);
  returned.appendChild(document.createTextNode("Return"));
  div.appendChild(p);
  div.appendChild(returned);
  div.className = 'popup';
  returned.className = "return";
  document.body.appendChild(div);
  returned.onclick = function() {location.reload()}
}