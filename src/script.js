window.onload = () => {
  let steps, numberToFind;

  // const numberToFindHtmlElement = document.getElementById("numberToFind");
  const numberInputHtmlElement = document.getElementById("number-input");
  const alreadyTriedHeaderHtmlElement = document.getElementById(
    "already-tried-header"
  );
  const alreadyTriedHtmlElement = document.getElementById("already-tried");
  const messageHtmlElement = document.getElementById("message");

  const resetButton = document.getElementById("reset-button");
  resetButton.onclick = () => initGuessTheNumber();

  const formInputHtmlElement = document.getElementById("number-form");
  formInputHtmlElement.onsubmit = (e) => {
    e.preventDefault();
    const inputValue = parseInt(e.target[0].value);
    e.target[0].value = null;

    let won = false;

    if (!inputValue) return;
    else if (inputValue === numberToFind) {
      youWon();
      won = true;
    } else if (inputValue > numberToFind) yourInputWasGreater();
    else if (inputValue < numberToFind) yourInputWasSmaller();

    steps++;

    if (!alreadyTriedHeaderHtmlElement.innerHTML)
      alreadyTriedHeaderHtmlElement.innerHTML = "Already tried :";

    const li = document.createElement("li");
    li.innerHTML = inputValue;
    alreadyTriedHtmlElement.appendChild(li);

    if (steps > 4 && !won) {
      youLost();
    }
  };

  function youWon() {
    messageHtmlElement.innerHTML = "You won !";
    numberInputHtmlElement.setAttribute("disabled", "");
  }

  function yourInputWasGreater() {
    messageHtmlElement.innerHTML = "It's less !";
  }

  function yourInputWasSmaller() {
    messageHtmlElement.innerHTML = "It's more !";
  }

  function youLost() {
    messageHtmlElement.innerHTML =
      "You lost ! The number was : " + numberToFind;
    numberInputHtmlElement.setAttribute("disabled", "");
  }

  function initGuessTheNumber() {
    steps = 0;
    numberToFind = getRandomNumInRange(0, 50);

    numberInputHtmlElement.removeAttribute("disabled");
    messageHtmlElement.innerHTML = "";
    alreadyTriedHeaderHtmlElement.innerHTML = "";
    alreadyTriedHtmlElement.innerHTML = "";
  }

  initGuessTheNumber();
};

/**
 * Generates a random number in range
 * @param {number} min Min value
 * @param {number} max Max value
 * @returns
 */
function getRandomNumInRange(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}
