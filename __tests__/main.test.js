/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
const htmlPage = fs.readFileSync(
  path.resolve(__dirname, "../src/index.html"),
  "utf8"
);

const { screen } = require("@testing-library/dom");

// const doc = new JSDOM(htmlPage);
// console.log(doc);

document.documentElement.innerHTML = htmlPage.toString();

const script = require("../src/script");

describe("Conditions effects on DOM", () => {
  beforeAll(() => {
    document.documentElement.innerHTML = htmlPage.toString();
  });

  test("message should be empty at start", () => {
    script.initGuessTheNumber();
    expect(document.getElementById("message").innerHTML).toBe("");
  });

  it.only("should display the corresponding message on game won", () => {
    script.youWon();
    console.log("LOG document :", document);
    expect(document.getElementById("message").innerHTML).toContain("won");
  });

  it("should display the corresponding message on game lost", () => {
    script.youLost();
    expect(document.getElementById("message").innerHTML).toContain("lost");
  });
});
