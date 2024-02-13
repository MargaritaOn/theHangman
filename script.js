const words = ["castle", "centre", "artist", "dinner", "eleven", "doctor"];
const guessWord = document.getElementById("word");
const random = words[Math.floor(Math.random() * words.length)];
const remainingLettersContainer = document.getElementById("remainingLetters");


console.log(random);

const playButton = document.getElementById("letPlay");
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

playButton.addEventListener("click", () => {
    if (encryptedWord.toString() != wordArray.toString()) {
        guessWord.append(encryptedWord);
    }
});

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

window.addEventListener("keypress", (e) => {
    if (letterPicked(e.key) == true) {
        return;
    }

    let chosenLetter;
    chosenLetterArray.push(e.key);
    console.log(chosenLetterArray);
    for (let i = 0; i < wordArray.length; i++) {
        if (e.key == wordArray[i] && remainingLetters > 0) {
            encryptedWord[i] = e.key;
            guessWord.innerText = encryptedWord;
            chosenLetter = document.getElementById(e.key);
            chosenLetter.style.backgroundColor = "grey";

        }
    }
    if (wrongGuess(e.key) == true && remainingLetters > 0) {
        chosenLetter = document.getElementById(e.key);
        chosenLetter.style.backgroundColor = "grey";
        remainingLetters = remainingLetters - 1;
        remainingLettersContainer.innerText = remainingLetters;
        if (remainingLetters == 5) {
            hangingPost.src = "Hangman_Picture2.png";
        } else if (remainingLetters == 4) {
            hangingPost.src = "Hangman_Picture3.png";
        } else if (remainingLetters == 3) {
            hangingPost.src = "Hangman_Picture4.png";
        } else if (remainingLetters == 2) {
            hangingPost.src = "Hangman_Picture5.png";
        } else if (remainingLetters == 1) {
            hangingPost.src = "Hangman_Picture6.png";
        } else if (remainingLetters == 0) {
            hangingPost.src = "Hangman_Picture7.png";
        }



    } else if (wrongGuess(e.key) == false) {
        remainingLettersContainer.innerText = remainingLetters;
    }

    if (encryptedWord.toString() == wordArray.toString()) {
        guessWord.innerText = `You won! The word was ${random}`;
    } else if (remainingLetters == 0) {
        guessWord.innerText = `You lost! The word was ${random}`;
    }
}
)

function wrongGuess(guess) {
    for (let i = 0; i < wordArray.length; i++) {
        if (guess == wordArray[i]) {
            return false;
        }
    }
    return true;
}

