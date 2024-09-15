let numberOfPlayers = parseInt(localStorage.getItem("numberOfPlayers")) || 4;
let scores = new Array(numberOfPlayers).fill(0);
let roundScores = new Array(numberOfPlayers).fill(0).map(() => []);
let currentPlayer = 0;
let rounds = 0;
const maxRounds = 6;

document.addEventListener("DOMContentLoaded", () => {
    setupGame();
    setupModal();
});

function setupGame() {
    const diceGrid = document.getElementById("diceGrid");
    const scoreBoard = document.getElementById("scoreBoard");
    const roundScoresContainer = document.getElementById("roundScores");

    // Set up dice sections
    for (let i = 0; i < numberOfPlayers; i++) {
        const diceSection = document.createElement("div");
        diceSection.className = `dice-section Player${i + 1}`;
        diceSection.innerHTML = `
            <h3>Player ${i + 1}</h3>
            <img src="/images/dice6.png" class="dice-img" id="dice${i + 1}">
            <button class="roll" onclick="rollDice(${i})">Roll Dice</button>
        `;
        diceGrid.appendChild(diceSection);

        // Set up score board
        const scoreItem = document.createElement("div");
        scoreItem.className = `score-item Player${i + 1}`;
        scoreItem.textContent = `Player ${i + 1}: 0 points`;
        scoreBoard.appendChild(scoreItem);

        // Set up round scores
        const roundScoreItem = document.createElement("div");
        roundScoreItem.className = `round-score-item Player${i + 1}`;
        roundScoreItem.innerHTML = `<span>Player ${i + 1}: </span>`;
        for (let j = 0; j < maxRounds; j++) {
            const roundScoreBox = document.createElement("span");
            roundScoreBox.className = `roundScoreBox Player${i + 1}Round${j + 1}`;
            roundScoreBox.id = `Player${i + 1}Round${j + 1}`;
            roundScoreItem.appendChild(roundScoreBox);
        }
        roundScoresContainer.appendChild(roundScoreItem);
    }

    updateButtonStates();
}

function rollDice(playerIndex) {
    if (playerIndex !== currentPlayer || rounds >= maxRounds) return;

    let diceVal = Math.floor(Math.random() * 6) + 1;
    document.getElementById(`dice${playerIndex + 1}`).setAttribute("src", `/images/dice${diceVal}.png`);
    
    scores[playerIndex] += diceVal;
    roundScores[playerIndex].push(diceVal);

    updateScoreBoard();
    updateRoundScores();

    currentPlayer = (currentPlayer + 1) % numberOfPlayers;
    if (currentPlayer === 0) rounds++;

    if (rounds >= maxRounds) {
        displayWinner();
    } else {
        updateButtonStates();
    }
}

function updateScoreBoard() {
    for (let i = 0; i < numberOfPlayers; i++) {
        let playerScoreElement = document.querySelector(`#scoreBoard .Player${i + 1}`);
        playerScoreElement.textContent = `Player ${i + 1}: ${scores[i]} points`;
    }
}

function updateRoundScores() {
    for (let i = 0; i < numberOfPlayers; i++) {
        for (let j = 0; j < roundScores[i].length; j++) {
            let roundScoreBox = document.getElementById(`Player${i + 1}Round${j + 1}`);
            if (roundScoreBox) {
                roundScoreBox.textContent = roundScores[i][j];
            }
        }
    }
}

function updateButtonStates() {
    for (let i = 0; i < numberOfPlayers; i++) {
        let button = document.querySelector(`.Player${i + 1} .roll`);
        button.disabled = (i !== currentPlayer);
    }
}

function displayWinner() {
    let maxScore = Math.max(...scores);
    let winners = scores.reduce((acc, score, index) => 
        score === maxScore ? [...acc, `Player ${index + 1}`] : acc, []);

    let winnerText = winners.length > 1 
        ? "It's a tie between: " + winners.join(", ") 
        : "Winner is " + winners[0];

    document.getElementById('winnerMessage').textContent = winnerText;

    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    // modal.classList.add("show");

    confetti();
    confetti();
    confetti();

    updateButtonStates();
}


function setupModal() {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function reset() {
    scores.fill(0);
    roundScores = new Array(numberOfPlayers).fill(0).map(() => []);
    currentPlayer = 0;
    rounds = 0;

    for (let i = 0; i < numberOfPlayers; i++) {
        document.getElementById(`dice${i + 1}`).setAttribute("src", "/images/dice6.png");
    }

    updateScoreBoard();
    updateRoundScores();
    updateButtonStates();
}



// The rest of the JavaScript functions (rollDice, updateScoreBoard, updateRoundScores, 
// updateButtonStates, displayWinner, setupModal, reset) remain the same as in the previous version