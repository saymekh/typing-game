'use strict';

document.addEventListener('DOMContentLoaded', function() {
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
  let timer;
  let timeLeft;
  let hits = 0;
  let gameOver = false; // Variable to track if the game is over
  let countdown = 3;

  const wordInput = document.getElementById('word-input');
  const wordDisplay = document.getElementById('word-display'); // Reference to the word display element
  const startBtn = document.getElementById('start-btn');
  const resetBtn = document.getElementById('reset-btn');
  const hitsDisplay = document.getElementById('hits');
  const timeDisplay = document.getElementById('time');
  const backgroundMusic = document.getElementById('background-music');

  startBtn.addEventListener('click', startGame);
  resetBtn.addEventListener('click', resetGame);

  function startGame() {
    hits = 0;
    hitsDisplay.textContent = 'Hits: 0';
    timeLeft = 99;
    timeDisplay.textContent = `Time: ${timeLeft}s`; // Add 's' beside the initial time value
    wordInput.value = '';
    wordInput.focus();
    startBtn.style.display = 'none'; // Hide the start button
    resetBtn.style.display = 'inline'; // Display the reset button
    gameOver = false; // Reset the game over flag
    backgroundMusic.play();
    timer = setInterval(updateTimer, 1000);
    displayNextWord();
    wordDisplay.style.display = 'block'; // Show the word display
  }
  
  function resetGame() {
    clearInterval(timer);
    hits = 0;
    hitsDisplay.textContent = 'Hits: 0';
    timeLeft = 99; // Change timer to 99 seconds
    timeDisplay.textContent = `Time: ${timeLeft}`;
    wordInput.value = '';
    startBtn.style.display = 'inline'; // Display the start button
    resetBtn.style.display = 'none'; // Hide the reset button
    backgroundMusic.pause();
    gameOver = true; // Set game over flag to prevent input
    document.getElementById('end-message').style.display = 'none'; // Hide the end message if it's displayed
    wordDisplay.style.display = 'none'; // Hide the word display
  }


  function updateTimer() {
    timeLeft--;
    timeDisplay.textContent = `Time: ${timeLeft}s`; // Add 's' beside the time value
    if (timeLeft === 0) {
      endGame();
    }
  }

  function displayNextWord() {
    if (words.length === 0) {
      // If all words have been displayed, end the game
      endGame();
      return;
    }
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];
    wordDisplay.textContent = word; // Update the word display element
    wordInput.setAttribute('data-word', word);
    words.splice(randomIndex, 1); // Remove the displayed word from the array
  }

  wordInput.addEventListener('input', function() {
    if (gameOver) return; // Stop processing input if the game is over
    const enteredWord = this.value.trim().toLowerCase();
    const expectedWord = this.getAttribute('data-word');
    if (enteredWord === expectedWord) {
      hits++;
      hitsDisplay.textContent = `Hits: ${hits}`;
      this.value = ''; // Clear the input field
      displayNextWord(); // Change the displayed word
      playCorrectSound(); // Play the correct sound
    }
  });
  
  function playCorrectSound() {
    const correctSound = document.getElementById('correct-sound');
    correctSound.currentTime = 0; // Reset the playback position to the beginning
    correctSound.play();
  }

  function endGame() {
    clearInterval(timer);
    gameOver = true;
    backgroundMusic.pause();
    let scoreSoundId = ''; // sound played for certain score
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
  const endMessage = hits === 
  words.length ? 'Congratulations!' : `Game Over! Your final score is ${hits}`;
  wordDisplay.textContent = endMessage; // Replace the displayed word with the end message
  wordDisplay.style.display = 'block'; // Show the end message
  }
  
  function playScoreSound(soundId) {
    const scoreSound = document.getElementById(soundId);
    scoreSound.play();
  }
  
  class Score {
    constructor(date, hits) {
      this._date = date;
      this._hits = hits;
      this._percentage = ((hits / 90) * 100).toFixed(2); // Assuming 90 words in total
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

  function calculatePercentage(hits) {
    return ((hits / words.length) * 100).toFixed(2);
  }
});