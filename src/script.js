let steps,
  numberToFind,
  won = false;

const numberInputHtmlElement = document.getElementById("number-input");
const alreadyTriedHeaderHtmlElement = document.getElementById(
  "already-tried-header"
);
const alreadyTriedHtmlElement = document.getElementById("already-tried");
const messageHtmlElement = document.getElementById("message");
const remainingTries = document.getElementById("remaining-tries");

const resetButton = document.getElementById("reset-button");
resetButton.onclick = () => initGuessTheNumber();

const formInputHtmlElement = document.getElementById("number-form");
formInputHtmlElement.onsubmit = (e) => {
  handleSubmit(e);
};

initGuessTheNumber();

//
// Functions
//

function handleSubmit(e) {
  e.preventDefault();
  const inputValue = parseInt(e.target[0].value);
  e.target[0].value = null;

  if (checkValue(inputValue) === false) return;

  // This executes only if inputValue is valid
  steps++;
  remainingTries.innerHTML = "Remaining tries : " + (5 - steps);

  if (!alreadyTriedHeaderHtmlElement.innerText)
    alreadyTriedHeaderHtmlElement.innerText = "Already tried :";

  const li = document.createElement("li");
  li.classList.add("w-100", "list-group-item", "text-white", "bg-dark");

  li.innerText =
    inputValue > numberToFind
      ? inputValue + " (-)"
      : inputValue < numberToFind
      ? inputValue + " (+)"
      : inputValue + " (=)";
  alreadyTriedHtmlElement.appendChild(li);

  // You lost
  if (steps > 4 && !won) {
    messageHtmlElement.innerText =
      "You lost ! The number was : " + numberToFind;
    messageHtmlElement.classList.add("text-danger");
    numberInputHtmlElement.setAttribute("disabled", "");
  }
}

/**
 * Checks if given value is valid
 * @param {number} val Value to check
 */
function checkValue(val) {
  if (!val && val !== 0) {
    // Invalid data
    messageHtmlElement.innerText = "";
    return false;
  } else if (val > 50 || val < 0) {
    // Value not in range
    messageHtmlElement.innerText =
      "The number must be between 0 and 50 (included).";
    return false;
  } else if (val === numberToFind) {
    // You won
    messageHtmlElement.innerText = "You won !";
    messageHtmlElement.classList.add("text-success");
    numberInputHtmlElement.setAttribute("disabled", "");
    won = true;
  } else if (val > numberToFind) messageHtmlElement.innerText = "It's less !";
  else if (val < numberToFind) messageHtmlElement.innerText = "It's more !";
}

/**
 * Resets the app and regenerates a number to play again
 */
function initGuessTheNumber() {
  steps = 0;
  won = false;
  setNumberToFind(getRandomNumInRange());

  messageHtmlElement.classList.remove("text-success", "text-danger");
  numberInputHtmlElement.removeAttribute("disabled");

  messageHtmlElement.innerHTML = "";
  alreadyTriedHeaderHtmlElement.innerHTML = "";
  alreadyTriedHtmlElement.innerHTML = "";
  remainingTries.innerHTML = "Remaining tries : 5";
}

function setNumberToFind(num) {
  numberToFind = num;
}

function getNumberToFind() {
  return numberToFind;
}

/**
 * Generates a random number in given range
 * @param {number} min Min value
 * @param {number} max Max value
 * @returns
 */
function getRandomNumInRange(min = 0, max = 50) {
  return Math.ceil(Math.random() * (max - min) + min);
}

// "export function;" is from ES6 specification,
// we need to use Node CommonJS module system :
if (typeof exports !== "undefined") {
  module.exports = {
    setNumberToFind,
    getNumberToFind,
    messageHtmlElement,
    checkValue,
    initGuessTheNumber,
    getRandomNumInRange,
  };
}
