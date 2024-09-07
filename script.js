const words = ["ASIANCOLLEGE", "ACSAT", "AC", "DIIT", "INFOTECH"];
let selectedWord = "";
let displayedWord = "";
let guessedLetters = [];
let remainingGuesses = 6;
let level = 1;
let score = 0;

function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayedWord = "_ ".repeat(selectedWord.length);
    guessedLetters = [];
    remainingGuesses = 6;
    createAlphabetButtons(); // Create buttons dynamically
    updateDisplay();
}

function createAlphabetButtons() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alphabetContainer = document.getElementById("alphabet");
    alphabetContainer.innerHTML = ""; // Clear previous buttons

    for (let letter of alphabet) {
        const button = document.createElement("button");
        button.innerText = letter;
        button.className = "letter";
        button.onclick = () => guessLetter(letter);
        alphabetContainer.appendChild(button);
    }
}

function guessLetter(letter) {
    if (guessedLetters.includes(letter) || remainingGuesses <= 0) return;

    guessedLetters.push(letter);
    if (selectedWord.includes(letter)) {
        updateDisplayedWord();
        if (!displayedWord.includes("_")) {
            levelUp();
        }
    } else {
        remainingGuesses--;
        animateHangman();
        if (remainingGuesses === 0) endGame();
    }
}

function updateDisplayedWord() {
    let newDisplayedWord = "";
    for (let i = 0; i < selectedWord.length; i++) {
        if (guessedLetters.includes(selectedWord[i])) {
            newDisplayedWord += selectedWord[i] + " ";
        } else {
            newDisplayedWord += "_ ";
        }
    }
    displayedWord = newDisplayedWord;
    updateDisplay();
}

function levelUp() {
    level++;
    score += 100;
    document.getElementById("level").innerText = "Level: " + level;
    document.getElementById("score").innerText = "Score: " + score;
    document.body.style.animation = "levelUp 1s";
    startGame();
}

function endGame() {
    alert("Game Over! Your final score is: " + score);
    resetGame();
}

function resetGame() {
    level = 1;
    score = 0;
    document.getElementById("level").innerText = "Level: " + level;
    document.getElementById("score").innerText = "Score: " + score;
    startGame();
}

function updateDisplay() {
    document.getElementById("wordDisplay").innerText = displayedWord;
    document.getElementById("hangmanDrawing").innerHTML = "Guesses remaining: " + remainingGuesses;
}

function animateHangman() {
    document.getElementById("hangmanDrawing").style.transition = "transform 0.5s";
    document.getElementById("hangmanDrawing").style.transform = "rotate(10deg)";
    setTimeout(() => {
        document.getElementById("hangmanDrawing").style.transform = "rotate(-10deg)";
    }, 500);
}

window.onload = startGame;
