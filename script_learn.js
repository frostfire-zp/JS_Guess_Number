'use strict';

let debug = true;

/*
// same way to select element such as css
// let text = document.querySelector(".message").textContent;
// console.log(text);

// document.querySelector(".message").textContent = "haha";

// text = document.querySelector(".message").textContent;
// console.log(text);

// DOM - Document Object Model
// Structured Represetation of HTML document.
// Allows Javascript to access HTML elements and styles to manipulate them. =)
// not part of JS, but part of Web API
*/

/*
let text = document.querySelector(".message").textContent;
console.log(text);

// change the text of .message
document.querySelector(".message").textContent = "Correct Number!";
// 🎉 emojis can be entered using "Win + ." or "CMD + Ctrl + Space"

text = document.querySelector(".message").textContent;
console.log(text);

document.querySelector(".number").textContent = 13;
document.querySelector(".score").textContent = 20;

document.querySelector(".guess").value = 0;
console.log(document.querySelector(".guess").value);
*/
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let secretNum = getRndInteger(1, 20);
if (debug) document.querySelector('.number').textContent = secretNum;

// let guess_count = 0;
let done = false;
let highscore = 0;
let curr_score = 20;

function reset() {
  secretNum = getRndInteger(1, 20);
  curr_score = 20;
  document.querySelector('.number').textContent = '?';
  if (debug) document.querySelector('.number').textContent = secretNum;

  document.querySelector('.guess').value = '';
  document.querySelector('.score').textContent = 20;

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('body').style.backgroundColor = '15rem';
  done = false;
}

document.querySelector('.check').addEventListener('click', function () {
  if (!done) {
    if (curr_score == 0) {
      document.querySelector('.message').textContent =
        'You lost the game. Click Again to continue.';
      done = true;
    }

    // guess_count++;
    curr_score--;

    // value always string type
    const guess = Number(document.querySelector('.guess').value);
    // console.log(guess, typeof guess);

    if (!guess) {
      // no input
      document.querySelector('.message').textContent = 'No number.';
    } else if (guess === secretNum) {
      // player wins
      document.querySelector('.message').textContent = `Correct Number!`;
      document.querySelector('.number').textContent = secretNum;

      // format css
      document.querySelector('body').style.backgroundColor = 'green';
      document.querySelector('.number').style.width = '30rem';

      if (curr_score > highscore) {
        highscore = curr_score;
        document.querySelector('.highscore').textContent = highscore;
      }

      done = true;
    } else if (guess > secretNum) {
      // guess too high
      document.querySelector('.message').textContent = `Too high!`;
    } else if (guess < secretNum) {
      // guess too low
      document.querySelector('.message').textContent = `Too low!`;
    }

    document.querySelector('.score').textContent = curr_score;
  }
});

document.querySelector('.again').addEventListener('click', function () {
  reset();
});

document.querySelector('.debug').addEventListener('click', function () {
  debug = !debug;
  reset();
});
