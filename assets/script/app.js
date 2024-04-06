'use strict';

// Define global variables
let timer;
let timeLeft;
let hits = 0;
let gameOver = false;
let scores = [];

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
const viewScoreboardBtn = document.getElementById('view-scoreboard-btn');
const scoreboardContainer = document.getElementById('scoreboard-container');
const scoreboard = document.getElementById('scoreboard');

// Add event listeners
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
wordInput.addEventListener('input', handleInput);
viewScoreboardBtn.addEventListener('click', toggleScoreboard);

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
  viewScoreboardBtn.disabled = true; // Disable scoreboard button
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
  viewScoreboardBtn.disabled = false; // Enable scoreboard button
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
  const score = { 
    hits, percentage: ((hits / words.length) * 100).toFixed(2), date: new Date() 
  };
  scores.push(score);
  scores.sort((a, b) => b.hits - a.hits);
  scores.splice(10); // Keep only top 10 scores

  // Update scoreboard
  updateScoreboard();

  const endMessage = hits === words.length ? 
  'Congratulations!' : `Game Over! Your final score is ${hits}`;
  wordDisplay.textContent = endMessage;
  wordDisplay.style.display = 'block';
  viewScoreboardBtn.disabled = false; // Enable scoreboard button
}

// Play score sound function
function playScoreSound(soundId) {
  const scoreSound = document.getElementById(soundId);
  if (scoreSound) {
    scoreSound.play();
  }
}

// Update scoreboard function
function updateScoreboard() {
  scoreboard.innerHTML = ''; // Clear previous scoreboard
  scores.forEach((score, index) => {
    const listItem = document.createElement('div');
    listItem.textContent = `#${index + 1}   
    Hits: ${score.hits} Percentage: ${score.percentage}%`;
    scoreboard.appendChild(listItem);
  });
}

document.body.style.filter = "none";

// Update toggleScoreboard function to show/hide the container and overlay
function toggleScoreboard() {
  if (!gameOver) return; // Only toggle scoreboard if the game is over
  const scoreboardContainer = document.getElementById('scoreboard-container');
  const overlay = document.getElementById('overlay');
  if (scoreboardContainer.style.display === 'none') {
    scoreboardContainer.style.display = 'block';
    overlay.style.display = 'block'; // Show overlay
  } else {
    scoreboardContainer.style.display = 'none';
    overlay.style.display = 'none'; // Hide overlay
  }
}

// Initial update of the scoreboard
updateScoreboard();
