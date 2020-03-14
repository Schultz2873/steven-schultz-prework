const halloweenArray = ["pumpkin", "witch", "skeleton", "ghost", "dracula", "frankenstein"];
const hints = ["I like to be carved.", "I like to fly on a broom.", "I don't have a lot of guts", "I like to haunt your houses.",
    "I am the king of vampires", "I was hunted a killed by the people living in my town"];

var wordCharArray = [];
var halloweenArrayIndex;
var win = 0;
var lettersGuessed = [];
var finalResult = "";
var letterCount = 0;
var guessCount = 12;

window.addEventListener("load", init, false);
document.addEventListener('keydown', keyPress);

// This function runs when the page loads
function init() {
    findRandomWord();
    setFinalResultVariable();
}

// This function reads in a key press and adds the key value to the finalResult
// string if the key is located in the mystery word that the user is trying to
// figure out
function keyPress(event) {
    const key = event.key;

    let tempResultSplit = finalResult.split(" ");
    let tempResults = "";
    let letterUsed = false;
    let duplicateCount = 0;
    for (let i = 0; i < wordCharArray.length; i++) {
        if (key == wordCharArray[i]) {
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


// This loop is setting the String that will be sent to the HTML
    for (let i = 0; i < tempResultSplit.length; i++) {
        tempResults = tempResults + tempResultSplit[i] + " ";
    }

    finalResult = tempResults;

// Checks to see if the user wins
    if (letterCount == wordCharArray.length) {
        win++;
        finalResult = "";
        letterCount = 0;
        lettersGuessed = [];
        guessCount = 12;

        if (halloweenArray.length > 0) {
            findRandomWord();
            setFinalResultVariable();
            document.getElementById("win-count").innerHTML = String(win);

            document.getElementById("guess-count").innerHTML = String(guessCount);
            document.getElementById("letters-guessed").innerHTML = lettersGuessed.toString();
        } else {
            document.getElementById("win-count").innerHTML = String(win);
            document.getElementById("word").innerHTML = "You guessed all the words! You win!"
        }

    }
    document.getElementById("word").innerHTML = finalResult;
    document.getElementById("letters-guessed").innerHTML = lettersGuessed.toString();


}

// Sets the mystery word sting to all "_" characters.
function setFinalResultVariable() {
    for (let i = 0; i < wordCharArray.length; i++) {
        finalResult = finalResult + "_ ";
    }
    // Sets the word
    document.getElementById("word").innerHTML = finalResult;

}

// This searches for a random word to choose in the array of words
function findRandomWord() {
    let range = halloweenArray.length;
    halloweenArrayIndex = Math.round(Math.random() * (range - 1));

    wordCharArray = halloweenArray[halloweenArrayIndex].split("");

    halloweenArray.splice(halloweenArrayIndex, 1);

    document.getElementById("hint").innerHTML = hints[halloweenArrayIndex];

    hints.splice(halloweenArrayIndex, 1);

}
