/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
const htmlPage = fs.readFileSync(
  path.resolve(__dirname, "../src/index.html"),
  "utf8"
);

document.documentElement.innerHTML = htmlPage;

const script = require("../src/script");

const checkValueCases = [
  { desc: "on game won", numToFind: 12, numToCheck: 12, expected: "won" },
  {
    desc: "on greater number given",
    numToFind: 1,
    numToCheck: 25,
    expected: "less",
  },
  {
    desc: "on smaller number given",
    numToFind: 50,
    numToCheck: 25,
    expected: "more",
  },
  {
    desc: "if given number is not in range",
    numToFind: 20,
    numToCheck: 99,
    expected: "must be between 0 and 50",
  },
  {
    desc: "if given number is not in range",
    numToFind: 20,
    numToCheck: -45,
    expected: "must be between 0 and 50",
  },
];

describe("Message paragraph", () => {
  test("message should be empty at start", () => {
    script.initGuessTheNumber();
    expect(script.messageHtmlElement.innerText).toBeUndefined();
  });

  // Parametrize this test
  test.each(checkValueCases)(
    "message should display the right infos $desc",
    ({ numToFind, numToCheck, expected }) => {
      script.setNumberToFind(numToFind);
      script.checkValue(numToCheck);
      expect(script.messageHtmlElement.innerText).toContain(expected);
    }
  );

  test("message should be empty if no value given", () => {
    script.setNumberToFind(25);
    script.checkValue();
    expect(script.messageHtmlElement.innerText).toBe("");
  });
});

describe("Generating numbers", () => {
  test("should generate only numbers between 0 and 50", () => {
    // Generate random values
    let generatedValues = [];
    for (let i = 0; i < 1000; i++) {
      generatedValues.push(script.getRandomNumInRange());
    }

    // Register if the condition is respected for each entry
    let generatedValuesAreInRange = generatedValues.map(
      (el) => el > 0 && el <= 50
    );

    // If there is a "false", an entry was not between 0 and 50
    expect(generatedValuesAreInRange).not.toContain(false);
  });
});
