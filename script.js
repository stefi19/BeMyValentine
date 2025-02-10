const noBtn = document.getElementById('noBtn');
const yesBtn = document.getElementById('yesBtn');
const maybeBtn = document.getElementById('maybeBtn');
const mainContent = document.getElementById('mainContent');
const animationSection = document.getElementById('animationSection');
const countdownElement = document.getElementById('countdown');
const readyMessage = document.getElementById('readyMessage');
const game = document.getElementById('game');
const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
const winMessage = document.getElementById('winMessage');

let score = 0;
let heartInterval;

// "No" button stays within screen boundaries
noBtn.addEventListener('mouseover', () => {
    const maxX = window.innerWidth - noBtn.offsetWidth;
    const maxY = window.innerHeight - noBtn.offsetHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noBtn.style.position = 'absolute';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
});

// YES button logic
yesBtn.addEventListener('click', () => {
    resetGame(); // Reset the game before starting
    mainContent.classList.add('hidden');
    animationSection.classList.remove('hidden');

    setTimeout(() => {
        startCountdown(3);
    }, 2000);
});

// Countdown Function
function startCountdown(number) {
    countdownElement.classList.remove('hidden');
    countdownElement.textContent = number;

    const interval = setInterval(() => {
        number--;
        if (number > 0) {
            countdownElement.textContent = number;
        } else {
            clearInterval(interval);
            countdownElement.classList.add('hidden');
            readyMessage.classList.remove('hidden');

            setTimeout(() => {
                readyMessage.classList.add('hidden');
                animationSection.classList.add('hidden');
                game.classList.remove('hidden');
                startGame();
            }, 2000);
        }
    }, 1000);
}

// Funny reaction for "Maybe"
maybeBtn.addEventListener('click', () => {
    alert("Hmm... Are you sure? I think it's a YES! 😜");
});

function startGame() {
    game.style.display = 'flex';
    game.style.flexDirection = 'column';

    heartInterval = setInterval(() => {
        if (score >= 10) {
            clearInterval(heartInterval);
            game.classList.add('hidden');
            displayWinMessage();
            return;
        }

        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = `${Math.random() * (gameArea.offsetWidth - 40)}px`;
        heart.style.top = `-50px`;

        heart.addEventListener('click', () => {
            score++;
            scoreDisplay.textContent = score;
            heart.remove();
        });

        gameArea.appendChild(heart);

        let position = -50;
        const moveDown = setInterval(() => {
            if (position < gameArea.offsetHeight - heart.offsetHeight) {
                position += 3;
                heart.style.top = `${position}px`;
            } else {
                clearInterval(moveDown);
                heart.remove();
            }
        }, 20);
    }, 1000);
}

function displayWinMessage() {
    winMessage.innerHTML = "🎉 Yeeeey, you won my heart! 💖<br>My heart is yours forever 💘";
    winMessage.classList.remove('hidden');
    winMessage.style.display = "flex";
    winMessage.style.justifyContent = "center";
    winMessage.style.alignItems = "center";
}

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = `${Math.random() * 90}%`;
    document.getElementById('gameArea').appendChild(heart);

    heart.addEventListener('click', () => {
        heart.remove();
        score++;
        scoreDisplay.textContent = score;

        if (score >= 10) {
            document.getElementById('game').classList.add('hidden');
            displayWinMessage();
        }
    });
}

// Reset Game Function
function resetGame() {
    score = 0;
    scoreDisplay.textContent = score;
    clearInterval(heartInterval);
    gameArea.innerHTML = ''; // Clear previous hearts
    winMessage.classList.add('hidden'); // Hide winning message when game resets
}
