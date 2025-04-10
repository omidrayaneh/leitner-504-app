// Import words data (assuming words.js is loaded before script.js in HTML)
// If using modules, you'd use: import { lessons } from './words.js';

const wordEl = document.getElementById('word');
const meaningEl = document.getElementById('meaning');
const pronunciationEl = document.getElementById('pronunciation');
const exampleEl = document.getElementById('example');
const cardContainer = document.getElementById('card-container');
const card = cardContainer.querySelector('.card');
const revealBtn = document.getElementById('reveal-btn');
const answerButtons = document.getElementById('answer-buttons');
const correctBtn = document.getElementById('correct-btn');
const incorrectBtn = document.getElementById('incorrect-btn');
const lessonNumberEl = document.getElementById('lesson-number');
const boxCountEls = {
    1: document.getElementById('box1-count'),
    2: document.getElementById('box2-count'),
    3: document.getElementById('box3-count'),
    4: document.getElementById('box4-count'),
    5: document.getElementById('box5-count'),
};
const learnedCountEl = document.getElementById('learned-count');
const prevLessonBtn = document.getElementById('prev-lesson-btn');
const nextLessonBtn = document.getElementById('next-lesson-btn');

const MAX_LESSON = 10;
const BOX_COUNT = 5;
const LOCAL_STORAGE_KEY = 'leitner504_progress';

let currentLessonIndex = 0;
let leitnerBoxes = []; // Array of sets, one for each box
let learnedWords = new Set(); // Words that have passed box 5
let currentWord = null;
let wordState = {}; // Tracks box and lesson for each word: { word: { box: number, lesson: number } }

// --- Initialization ---

function initializeState() {
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedState) {
        const parsedState = JSON.parse(savedState);
        currentLessonIndex = parsedState.currentLessonIndex || 0;
        // Revive Sets from arrays
        leitnerBoxes = parsedState.leitnerBoxes.map(box => new Set(box));
        learnedWords = new Set(parsedState.learnedWords);
        wordState = parsedState.wordState || {}; // Load word state
    } else {
        resetState();
    }
    // Ensure wordState contains all words from loaded lessons
    syncWordState();
    loadLesson(currentLessonIndex);
}

function resetState() {
    leitnerBoxes = Array.from({ length: BOX_COUNT }, () => new Set());
    learnedWords = new Set();
    wordState = {};
    // Don't reset currentLessonIndex here, allow starting from saved lesson
}

function syncWordState() {
    // Add any new words from the lessons data into box 1 if not already tracked
    lessons.forEach((lesson, lessonIdx) => {
        lesson.forEach(wordData => {
            if (!(wordData.word in wordState)) {
                wordState[wordData.word] = { box: 1, lesson: lessonIdx };
                leitnerBoxes[0].add(wordData.word); // Add to box 1
            }
        });
    });
    // Remove words from state if they are no longer in the lessons data (optional)
    // ... (implementation depends on whether words might be removed from words.js)
}


function saveState() {
    const stateToSave = {
        currentLessonIndex,
        // Convert Sets to arrays for JSON serialization
        leitnerBoxes: leitnerBoxes.map(box => Array.from(box)),
        learnedWords: Array.from(learnedWords),
        wordState
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
}

// --- Leitner Logic ---

function getNextWord() {
    // Prioritize words in lower boxes for the current lesson
    for (let i = 0; i < BOX_COUNT; i++) {
        for (const word of leitnerBoxes[i]) {
            if (wordState[word] && wordState[word].lesson === currentLessonIndex) {
                 // Simple selection: just the first one found. Could be randomized.
                return findWordData(word, currentLessonIndex);
            }
        }
    }
    // If no words for the current lesson need review, return null or handle differently
    return null;
}

function findWordData(wordText, lessonIdx) {
    if (lessonIdx >= 0 && lessonIdx < lessons.length) {
        return lessons[lessonIdx].find(w => w.word === wordText);
    }
    return null; // Should not happen if wordState is correct
}


function displayWord(wordData) {
    if (wordData) {
        currentWord = wordData;
        wordEl.textContent = currentWord.word;
        meaningEl.textContent = currentWord.meaning;
        pronunciationEl.textContent = currentWord.pronunciation;
        exampleEl.textContent = currentWord.example;

        card.classList.remove('flipped');
        revealBtn.style.display = 'block';
        answerButtons.style.display = 'none';
    } else {
        // No more words to review in this lesson
        currentWord = null;
        wordEl.textContent = 'پایان کلمات این درس!';
        meaningEl.textContent = '';
        pronunciationEl.textContent = '';
        exampleEl.textContent = '';
        card.classList.remove('flipped'); // Ensure card is not flipped
        revealBtn.style.display = 'none';
        answerButtons.style.display = 'none';
    }
    updateStats();
}

function moveWord(wordText, correct) {
    if (!wordText || !wordState[wordText]) return;

    const currentBoxIndex = wordState[wordText].box - 1; // 0-based index

    // Remove from current box
    if (currentBoxIndex >= 0 && currentBoxIndex < BOX_COUNT) {
        leitnerBoxes[currentBoxIndex].delete(wordText);
    } else if (learnedWords.has(wordText)) {
         learnedWords.delete(wordText); // If bringing back from learned
    }


    if (correct) {
        if (currentBoxIndex === BOX_COUNT - 1) {
            // Move to learned
            learnedWords.add(wordText);
            wordState[wordText].box = 'learned'; // Mark as learned
        } else {
            // Move to the next box
            const nextBoxIndex = currentBoxIndex + 1;
            leitnerBoxes[nextBoxIndex].add(wordText);
            wordState[wordText].box = nextBoxIndex + 1;
        }
    } else {
        // Move back to box 1
        leitnerBoxes[0].add(wordText);
        wordState[wordText].box = 1;
    }

    saveState();
    displayWord(getNextWord()); // Display the next word for the current lesson
}

// --- UI Updates ---

function updateStats() {
    lessonNumberEl.textContent = currentLessonIndex + 1;
    let totalLearned = 0;

    // Update box counts based on wordState for the current lesson
    for (let i = 0; i < BOX_COUNT; i++) {
        let count = 0;
        for (const word of leitnerBoxes[i]) {
            if (wordState[word] && wordState[word].lesson === currentLessonIndex) {
                count++;
            }
        }
        boxCountEls[i + 1].textContent = count;
    }

     // Update learned count based on wordState for the current lesson
    let lessonLearnedCount = 0;
    for (const word of learnedWords) {
         if (wordState[word] && wordState[word].lesson === currentLessonIndex) {
            lessonLearnedCount++;
        }
    }
     learnedCountEl.textContent = lessonLearnedCount;


    // Update navigation buttons
    prevLessonBtn.disabled = currentLessonIndex === 0;
    nextLessonBtn.disabled = currentLessonIndex === MAX_LESSON - 1;
}

function loadLesson(lessonIndex) {
    currentLessonIndex = lessonIndex;
    // No need to explicitly load words here as getNextWord handles it
    displayWord(getNextWord()); // Display the first word of the new lesson
    updateStats();
    saveState(); // Save the new lesson index
}

// --- Event Listeners ---

revealBtn.addEventListener('click', () => {
    card.classList.add('flipped');
    revealBtn.style.display = 'none';
    answerButtons.style.display = 'block';
});

// Allow flipping by clicking the card itself
card.addEventListener('click', () => {
    if (currentWord && !card.classList.contains('flipped')) { // Only flip if not already flipped
       card.classList.add('flipped');
       revealBtn.style.display = 'none';
       answerButtons.style.display = 'block';
    }
});


correctBtn.addEventListener('click', () => {
    if (currentWord) {
        moveWord(currentWord.word, true);
    }
});

incorrectBtn.addEventListener('click', () => {
    if (currentWord) {
        moveWord(currentWord.word, false);
    }
});

prevLessonBtn.addEventListener('click', () => {
    if (currentLessonIndex > 0) {
        loadLesson(currentLessonIndex - 1);
    }
});

nextLessonBtn.addEventListener('click', () => {
    if (currentLessonIndex < MAX_LESSON - 1) {
        loadLesson(currentLessonIndex + 1);
    }
});

// --- Initial Load ---
initializeState();

// --- Service Worker Registration (for PWA) ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js') // Fixed path to be relative
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}
