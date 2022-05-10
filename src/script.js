window.onload = () => {
  let steps, numberToFind;

  // const numberToFindHtmlElement = document.getElementById("numberToFind");
  const numberInputHtmlElement = document.getElementById("number-input");
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

    const li = document.createElement("li");
    li.innerHTML = inputValue;
    alreadyTriedHtmlElement.appendChild(li);

    // TO FIX
    if (steps >= 3 && !won) youLost(inputValue);
    else steps++;
  };

  function youWon() {
    messageHtmlElement.innerHTML = "Gagné !";
    numberInputHtmlElement.setAttribute("disabled", "");
  }

  function yourInputWasGreater() {
    messageHtmlElement.innerHTML = "C'est moins !";
  }

  function yourInputWasSmaller() {
    messageHtmlElement.innerHTML = "C'est plus !";
  }

  function youLost(num) {
    messageHtmlElement.innerHTML = "Perdu ! Le nombre à trouver était : " + num;
  }

  function initGuessTheNumber() {
    steps = 0;
    numberToFind = getRandomNumInRange(0, 50);
    console.log(numberToFind);

    numberInputHtmlElement.removeAttribute("disabled");
    // alreadyTriedHtmlElement.removeChild;
    messageHtmlElement.innerHTML = "";
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
