"use strict";
// init
let debug = false;
let done = false;
let highscore = 0;
let curr_score = 20;

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

let secretNum = getRndInteger(1, 20);

// init with debug mode on
if (debug) document.querySelector(".number").textContent = secretNum;

function reset() {
	// reset content
	secretNum = getRndInteger(1, 20);
	curr_score = 20;
	document.querySelector(".number").textContent = "?";

	// update score
	document.querySelector(".guess").value = "";
	document.querySelector(".score").textContent = 20;

	// init with debug mode on
	if (debug)
		document.querySelector(".number").textContent = secretNum;

	// reset debug button
	document.querySelector(".debug").style.backgroundColor = "#222";
	document.querySelector(".debug").style.color = "#222";

	// reset format
	document.querySelector("body").style.backgroundColor = "#222";
	document.querySelector("body").style.backgroundColor = "15rem";
	document.querySelector(".number").style.width = "15rem";

	// reset done status
	done = false;
}

document.querySelector(".check").addEventListener("click", function () {
	if (!done) {
		// check if got any more chances to try
		if (curr_score == 0) {
			document.querySelector(".message").textContent =
				"You lost the game. Click Again to continue.";
			done = true;
		}

		// guess_count++;
		curr_score--;
		document.querySelector(".score").textContent = curr_score;

		// value always string type
		const guess = Number(document.querySelector(".guess").value);
		// console.log(guess, typeof guess);

		if (!guess) {
			// no input
			document.querySelector(".message").textContent =
				"No number.";
		} else if (guess === secretNum) {
			// player wins

			// format content
			document.querySelector(
				".message"
			).textContent = `Correct Number!`;
			document.querySelector(".number").textContent = secretNum;

			// format css
			document.querySelector("body").style.backgroundColor =
				"green";
			document.querySelector(".number").style.width = "30rem";

			// format hidden debug button
			document.querySelector(".debug").style.backgroundColor =
				"green";
			document.querySelector(".debug").style.color = "green";

			// keep score unchanged
			curr_score++;
			document.querySelector(".score").textContent = curr_score;

			// handle high score
			if (curr_score > highscore) {
				highscore = curr_score;
				document.querySelector(
					".highscore"
				).textContent = highscore;
			}

			// set status to done
			done = true;
		} else if (guess > secretNum) {
			// guess too high
			document.querySelector(
				".message"
			).textContent = `Too high!`;
		} else if (guess < secretNum) {
			// guess too low
			document.querySelector(".message").textContent = `Too low!`;
		}
	}
});

document.querySelector(".again").addEventListener("click", function () {
	reset();
});

document.querySelector(".debug").addEventListener("click", function () {
	debug = !debug;
	reset();
});
