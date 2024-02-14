const words = ["castle", "centre", "artist", "dinner", "eleven", "doctor"];

const a = await fetch("https://raw.githubusercontent.com/kkrypt0nn/wordlists/main/wordlists/discovery/most_common.txt")
    .then(response => {
        return response.text()
    });

const libraryRaw = a.split(/\r?\n/);
// console.log(checkWord(library));

const library = []

for (let i = 0; i < libraryRaw.length; i++) {
    if (checkWord(libraryRaw[i])) {
        library.push(libraryRaw[i]);
    }
}

function checkWord(someWord) {
    if (someWord.length < 6 || someWord.length > 7 || /\d/.test(someWord)) {
        return false;
    } 
    return true;
}

// console.log(library);

const guessWord = document.getElementById("word");
const random = library[Math.floor(Math.random() * library.length)];
const remainingLettersContainer = document.getElementById("remainingLetters");


console.log(random);


const restartButton = document.getElementById("restart");

restartButton.addEventListener("click", () => {
    location.reload();
})

const wordArray = [];

let encryptedWord = [];
for (let i = 0; i < random.length; i++) {
    encryptedWord[i] = "_";
    wordArray[i] = random.charAt(i);
}
if (encryptedWord.toString() != wordArray.toString()) {
    guessWord.append(encryptedWord);
}


let remainingLetters = random.length;
remainingLettersContainer.innerText = remainingLetters;

let chosenLetterArray = [];

function letterPicked(pressedKey) {
    for (let i = 0; i < chosenLetterArray.length; i++) {
        if (chosenLetterArray[i] == pressedKey) {
            return true;
        }
    }
    return false;
}

let hangingPost = document.getElementById("post");

// function to get button from html

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

for (let i = 0; i < alphabet.length; i++) {
    const button = document.getElementById(alphabet[i]);
    button.addEventListener("click", (e) => {
        gameOn(alphabet[i]);
    });
}


window.addEventListener("keypress", (e) => {

    gameOn(e.key);
}
)

function gameOn(letter) {
    if (letterPicked(letter) == true) {
        return;
    }
    let chosenLetter;
    chosenLetterArray.push(letter);
    console.log(chosenLetterArray);
    for (let i = 0; i < wordArray.length; i++) {
        if (letter == wordArray[i] && remainingLetters > 0) {
            encryptedWord[i] = letter;
            guessWord.innerText = encryptedWord;
            chosenLetter = document.getElementById(letter);
            chosenLetter.classList.add("gradient");

        }
    }
    if (wrongGuess(letter) == true && remainingLetters > 0) {
        chosenLetter = document.getElementById(letter);
        chosenLetter.style.backgroundColor = "grey";
        chosenLetter.classList.add("gradient");
        remainingLetters = remainingLetters - 1;
        remainingLettersContainer.innerText = remainingLetters;

        if (remainingLetters == 6) {
            hangingPost.src = "Hangman_Picture2.png";
        } else if (remainingLetters == 5) {
            hangingPost.src = "Hangman_Picture3.png";
        } else if (remainingLetters == 4) {
            hangingPost.src = "Hangman_Picture4.png";
        } else if (remainingLetters == 3) {
            hangingPost.src = "Hangman_Picture5.png";
        } else if (remainingLetters == 2) {
            hangingPost.src = "Hangman_Picture6.png";
        } else if (remainingLetters == 1) {
            hangingPost.src = "Hangman_Picture7.png";
        } else if (remainingLetters == 0) {
            hangingPost.src = "Hangman_Picture8.png";
        }



    } else if (wrongGuess(letter) == false) {
        remainingLettersContainer.innerText = remainingLetters;
    }

    if (encryptedWord.toString() == wordArray.toString()) {
        guessWord.innerText = `You won! The word was ${random}`;
    } else if (remainingLetters == 0) {
        guessWord.innerText = `You lost! The word was ${random}`;
    }
}

function wrongGuess(guess) {
    for (let i = 0; i < wordArray.length; i++) {
        if (guess == wordArray[i]) {
            return false;
        }
    }
    return true;
}

