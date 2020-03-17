const halloweenArray = ["pumpkin", "witch", "skeleton", "ghost", "dracula", "frankenstein"];
const hints = ["I like to be carved.", "I like to fly on a broom.", "I don't have a lot of guts", "I like to haunt your houses.",
    "I am the king of vampires", "I was hunted a killed by the people living in my town"];

// The array that stores the current word that is being guessed
var currentWordArray = [];
var halloweenArrayIndex;
var win = 0;
var lettersGuessed = [];
var correctWord = "";
var letterCount = 0;
var guessCount = 5;
var gameOver = false;

window.addEventListener("load", init, false);
document.addEventListener('keydown', keyPress);

// This function selects a random word and returns it to the index page when the page loads
function init() {
    findRandomWord();
    setFinalResultVariable();
}

// This function reads in a key press and adds the key value to the finalResult
// string if the key is located in the mystery word that the user is trying to
// figure out
function keyPress(event) {
    if (gameOver == false) {
        const key = event.key;
        let tempResultSplit = correctWord.split(" ");
        let tempResults = "";
        let letterUsed = false;
        let duplicateCount = 0;

        for (let i = 0; i < currentWordArray.length; i++) {
            if (key == currentWordArray[i]) {
                //Checks to word contains the same letter more than once.
                duplicateCount++;
                //
                if (tempResultSplit.length != 0) {
                    for (let j = 0; j < tempResultSplit.length; j++) {
                        if (tempResultSplit[i] == key) {
                            letterUsed = true;
                        }
                    }
                    if (letterUsed == false) {
                        letterCount++;
                    }
                }
                if (duplicateCount >= 2) {
                    letterCount++
                }
                tempResultSplit[i] = key;
                letterUsed = true;
            }
        }


        if (guessCount > 0) {
            // If a user selects a word that is not in the mystery word then that letter is added
            // to the word guessed array and the guessCount is subtracted
            if (letterUsed == false && key >= "a" && key <= "z") {
                if (lettersGuessed.length == 0) {
                    lettersGuessed.push(key);
                    guessCount--;
                }
                for (let i = 0; i < lettersGuessed.length; i++) {
                    if (lettersGuessed[i] == key) {
                        letterUsed = true;
                    }
                }
                if (letterUsed == false) {
                    lettersGuessed.push(key)
                    guessCount--;
                }
            }
            document.getElementById("guess-count").innerHTML = String(guessCount);

        } else {
            // If a User loses
            document.getElementById("guess-count").innerHTML = "You ran out of guesses. You Lose!";
            gameOver = true;

        }


// This loop is setting the String that will be sent to the HTML
        for (let i = 0; i < tempResultSplit.length; i++) {
            tempResults = tempResults + tempResultSplit[i] + " ";
        }

        correctWord = tempResults;


        document.getElementById("word").innerHTML = correctWord;
        document.getElementById("letters-guessed").innerHTML = lettersGuessed.toString();

        // Checks to see if the user wins
        if (letterCount == currentWordArray.length) {
            win++;
            correctWord = "";
            letterCount = 0;
            lettersGuessed = [];
            guessCount = 5;

            if (halloweenArray.length > 0) {
                findRandomWord();
                setFinalResultVariable();
                document.getElementById("win-count").innerHTML = String(win);

                document.getElementById("guess-count").innerHTML = String(guessCount);
                document.getElementById("letters-guessed").innerHTML = lettersGuessed.toString();
            } else {
                document.getElementById("win-count").innerHTML = String(win);
                document.getElementById("word").innerHTML = "You guessed all the words! You win!"
                gameOver = true
            }

        }
    }
}

// Sets the mystery word sting to all "_" characters.
function setFinalResultVariable() {
    for (let i = 0; i < currentWordArray.length; i++) {
        correctWord = correctWord + "_ ";
    }
    // Sets the word
    document.getElementById("word").innerHTML = correctWord;

}

// This searches for a random word to choose in the array of words
function findRandomWord() {
    let range = halloweenArray.length;

    // selects a random index from array from the halloween words
    halloweenArrayIndex = Math.round(Math.random() * (range - 1));

    // stores that random picked word inside the currentWordArray
    currentWordArray = halloweenArray[halloweenArrayIndex].split("");

    // removes the randomly selected word from the halloween array so it cant be used again
    halloweenArray.splice(halloweenArrayIndex, 1);

    // selects the hint that goes along with the randomly selected word and sends it to the HTML page
    document.getElementById("hint").innerHTML = hints[halloweenArrayIndex];

    // Removes the hint from the array so it can't be selected again
    hints.splice(halloweenArrayIndex, 1);

}
