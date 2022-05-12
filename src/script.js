window.onload = () => {
  let steps, numberToFind;

  // const numberToFindHtmlElement = document.getElementById("numberToFind");
  const numberInputHtmlElement = document.getElementById("number-input");
  const alreadyTriedHeaderHtmlElement = document.getElementById(
    "already-tried-header"
  );
  const alreadyTriedHtmlElement = document.getElementById("already-tried");
  const messageHtmlElement = document.getElementById("message");
  const tryRemaining = document.getElementById("try-remaining");

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
    const remain = 5 - steps;
    tryRemaining.innerHTML = "Try Remaining : " + remain;

    if (!alreadyTriedHeaderHtmlElement.innerHTML)
      alreadyTriedHeaderHtmlElement.innerHTML = "Already tried :";

    const li = document.createElement("li");
    li.classList.add("w-100")
    li.classList.add("list-group-item")
    li.classList.add("text-white")
    li.classList.add("bg-dark")
    if (inputValue > numberToFind) {
      li.innerHTML = inputValue + " -";
    } else if (inputValue < numberToFind) {
      li.innerHTML = inputValue + " +";
    } else {
      li.innerHTML = inputValue + " =";
    }
    alreadyTriedHtmlElement.appendChild(li);

    if (steps > 4 && !won) {
      youLost();
    }
  };

  function youWon() {
    messageHtmlElement.classList.add("text-success");
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
    messageHtmlElement.classList.add("text-danger");
    messageHtmlElement.innerHTML =
      "You lost ! The number was : " + numberToFind;
    numberInputHtmlElement.setAttribute("disabled", "");
  }

  function initGuessTheNumber() {
    steps = 0;
    numberToFind = getRandomNumInRange(0, 50);

    messageHtmlElement.classList.remove("text-success");
    messageHtmlElement.classList.remove("text-danger");
    numberInputHtmlElement.removeAttribute("disabled");
    messageHtmlElement.innerHTML = "";
    alreadyTriedHeaderHtmlElement.innerHTML = "";
    alreadyTriedHtmlElement.innerHTML = "";
    tryRemaining.innerHTML = "Try Remaining : 5";
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
