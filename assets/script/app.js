'use strict';

// Define global variables
let timer;
let timeLeft = 20;
let hits = 0;
let gameOver = false;

// Array of words
const words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 
'building', 'population','weather', 'bottle', 'history', 'dream', 'character',
'money', 'absolute', 'discipline', 'machine', 'accurate', 'connection', 
'rainbow', 'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 
'developer', 'philosophy', 'database', 'periodic', 'capitalism', 'abominable', 
'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada', 
'coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology', 'alphabet', 
'knowledge', 'magician', 'professor', 'triangle', 'earthquake', 'baseball', 
'beyond', 'evolution', 'banana', 'perfumer', 'computer', 'management', 
'discovery', 'ambition', 'music', 'eagle', 'crown', 'chess', 'laptop', 
'bedroom', 'delivery', 'enemy', 'button', 'superman', 'library', 'unboxing', 
'bookstore', 'language', 'homework', 'fantastic', 'economy', 'interview', 
'awesome', 'challenge', 'science', 'mystery', 'famous', 'league', 'memory', 
'leather', 'planet', 'software', 'update', 'yellow','keyboard', 'window'];

// Get DOM elements
const wordInput = document.getElementById('word-input');
const wordDisplay = document.getElementById('word-display');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const hitsDisplay = document.getElementById('hits');
const timeDisplay = document.getElementById('time');
const backgroundMusic = document.getElementById('background-music');

// Add event listeners
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
wordInput.addEventListener('input', handleInput);

// Start game function
function startGame() {
  hits = 0;
  hitsDisplay.textContent = 'Hits: 0';
  timeLeft = 20; // Set the initial time to 20 seconds
  timeDisplay.textContent = `Time: ${timeLeft}s`;
  wordInput.value = '';
  wordInput.focus();
  startBtn.style.display = 'none';
  resetBtn.style.display = 'inline';
  gameOver = false;
  backgroundMusic.play(); // Add this line to play the background music
  timer = setInterval(updateTimer, 1000);
  displayNextWord();
  wordDisplay.style.display = 'block';
}


// Reset game function
function resetGame() {
  clearInterval(timer);
  hits = 0;
  hitsDisplay.textContent = 'Hits: 0';
  timeLeft = 99;
  timeDisplay.textContent = `Time: ${timeLeft}s`;
  wordInput.value = '';
  startBtn.style.display = 'inline';
  resetBtn.style.display = 'none';
  backgroundMusic.pause();
  gameOver = true;
  document.getElementById('end-message').style.display = 'none';
  wordDisplay.style.display = 'none';
}

// Update timer function
function updateTimer() {
  timeLeft--;
  timeDisplay.textContent = `Time: ${timeLeft}s`;
  if (timeLeft === 0) {
    endGame();
  }
}

// Display next word function
function displayNextWord() {
  if (words.length === 0) {
    endGame();
    return;
  }
  const randomIndex = Math.floor(Math.random() * words.length);
  const word = words[randomIndex];
  wordDisplay.textContent = word;
  wordInput.setAttribute('data-word', word);
  words.splice(randomIndex, 1);
}

// Handle input function
function handleInput() {
  if (gameOver) return;
  const enteredWord = this.value.trim().toLowerCase();
  const expectedWord = this.getAttribute('data-word');
  if (enteredWord === expectedWord) {
    hits++;
    hitsDisplay.textContent = `Hits: ${hits}`;
    this.value = '';
    displayNextWord();
    playCorrectSound();
  }
}

// Play correct sound function
function playCorrectSound() {
  const correctSound = document.getElementById('correct-sound');
  correctSound.currentTime = 0;
  correctSound.play();
}

// End game function
function endGame() {
  clearInterval(timer);
  gameOver = true;
  backgroundMusic.pause();
  let scoreSoundId = '';
  if (hits >= 0 && hits <= 9) {
    scoreSoundId = 'score-0-9-sound';
  } else if (hits >= 10 && hits <= 19) {
    scoreSoundId = 'score-10-19-sound';
  } else if (hits >= 20 && hits <= 29) {
    scoreSoundId = 'score-20-29-sound';
  } else if (hits >= 30 && hits <= 39) {
    scoreSoundId = 'score-30-39-sound';
  } else if (hits >= 40 && hits <= 49) {
    scoreSoundId = 'score-40-49-sound';
  } else if (hits >= 50 && hits <= 59) {
    scoreSoundId = 'score-50-59-sound';
  } else if (hits >= 60 && hits <= 69) {
    scoreSoundId = 'score-60-69-sound';
  } else if (hits >= 70 && hits <= 79) {
    scoreSoundId = 'score-70-79-sound';
  } else if (hits >= 80 && hits <= 89) {
    scoreSoundId = 'score-80-89-sound';
  }
  
  playScoreSound(scoreSoundId);
  const score = new Score(new Date(), hits);
  const endMessage = hits === words.length ? 'Congratulations!' : `Game Over! Your final score is ${hits}`;
  wordDisplay.textContent = endMessage;
  wordDisplay.style.display = 'block';
}

// Play score sound function
function playScoreSound(soundId) {
  const scoreSound = document.getElementById(soundId);
  scoreSound.play();
}

// Score class
class Score {
  constructor(date, hits) {
    this._date = date;
    this._hits = hits;
    this._percentage = ((hits / 90) * 100).toFixed(2);
  }

  get date() {
    return this._date;
  }

  get hits() {
    return this._hits;
  }

  get percentage() {
    return this._percentage;
  }
}

// Calculate percentage function
function calculatePercentage(hits) {
  return ((hits / words.length) * 100).toFixed(2);
}
