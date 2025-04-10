// app.js - Additional functionality for the enhanced Leitner 504 app

// DOM Elements
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const menuToggleBtn = document.getElementById('menu-toggle-btn');
const mainMenu = document.getElementById('main-menu');
const menuItems = mainMenu.querySelectorAll('li');
const views = document.querySelectorAll('.view');
const pronunciationBtn = document.getElementById('pronunciation-btn');
const addNoteBtn = document.getElementById('add-note-btn');
const noteModal = document.getElementById('note-modal');
const closeModalBtn = document.querySelector('.close-modal');
const noteText = document.getElementById('note-text');
const saveNoteBtn = document.getElementById('save-note-btn');
const searchInput = document.getElementById('search-input');
const lessonFilter = document.getElementById('lesson-filter');
const boxFilter = document.getElementById('box-filter');
const searchBtn = document.getElementById('search-btn');
const searchResults = document.getElementById('search-results');
const progressBar = document.getElementById('total-progress-bar');
const progressText = document.getElementById('total-progress-text');
const learnedWordsCount = document.getElementById('learned-words-count');
const completedLessonsCount = document.getElementById('completed-lessons-count');
const progressChart = document.getElementById('progress-chart');
const currentStreakEl = document.getElementById('current-streak');
const maxStreakEl = document.getElementById('max-streak');
const streakDays = document.querySelectorAll('.streak-day');
const newWordInput = document.getElementById('new-word');
const newMeaningInput = document.getElementById('new-meaning');
const newPronunciationInput = document.getElementById('new-pronunciation');
const newExampleInput = document.getElementById('new-example');
const customLessonSelect = document.getElementById('custom-lesson');
const addWordBtn = document.getElementById('add-word-btn');
const customWordsContainer = document.getElementById('custom-words-container');
const fontSizeSelect = document.getElementById('font-size');
const cardAnimationSelect = document.getElementById('card-animation');
const dailyGoalSelect = document.getElementById('daily-goal');
const reminderTimeInput = document.getElementById('reminder-time');
const enableNotificationsCheckbox = document.getElementById('enable-notifications');
const exportDataBtn = document.getElementById('export-data-btn');
const importDataBtn = document.getElementById('import-data-btn');
const importFileInput = document.getElementById('import-file');
const resetOnErrorCheckbox = document.getElementById('reset-on-error');
const resetProgressBtn = document.getElementById('reset-progress-btn');
const resetAllBtn = document.getElementById('reset-all-btn');

// App State
let currentView = 'study';
let currentWordForNote = null;
let userNotes = {}; // { word: note }
let customWords = []; // Array of custom word objects
let studyHistory = []; // Array of study session dates
let appSettings = {
    theme: 'light',
    fontSize: 'medium',
    cardAnimation: 'flip',
    dailyGoal: 20,
    reminderTime: '20:00',
    enableNotifications: true,
    resetOnError: false
};
let chart = null; // Chart.js instance

// Initialize App
function initApp() {
    loadAppSettings();
    populateLessonFilter();
    populateCustomLessonSelect();
    setupEventListeners();
    updateStats();
    updateStudyStreak();
    initializeChart();
    applySettings();
}

// Load app settings from localStorage
function loadAppSettings() {
    const savedSettings = localStorage.getItem('leitner504_app_settings');
    if (savedSettings) {
        appSettings = JSON.parse(savedSettings);
        
        // Apply saved settings to UI elements
        if (appSettings.theme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        fontSizeSelect.value = appSettings.fontSize;
        cardAnimationSelect.value = appSettings.cardAnimation;
        dailyGoalSelect.value = appSettings.dailyGoal;
        reminderTimeInput.value = appSettings.reminderTime;
        enableNotificationsCheckbox.checked = appSettings.enableNotifications;
        resetOnErrorCheckbox.checked = appSettings.resetOnError;
    }
    
    // Load user notes
    const savedNotes = localStorage.getItem('leitner504_user_notes');
    if (savedNotes) {
        userNotes = JSON.parse(savedNotes);
    }
    
    // Load custom words
    const savedCustomWords = localStorage.getItem('leitner504_custom_words');
    if (savedCustomWords) {
        customWords = JSON.parse(savedCustomWords);
    }
    
    // Load study history
    const savedHistory = localStorage.getItem('leitner504_study_history');
    if (savedHistory) {
        studyHistory = JSON.parse(savedHistory);
    } else {
        // Initialize with today if first time
        studyHistory.push(new Date().toISOString().split('T')[0]);
        saveStudyHistory();
    }
}

// Save app settings to localStorage
function saveAppSettings() {
    localStorage.setItem('leitner504_app_settings', JSON.stringify(appSettings));
}

// Save user notes to localStorage
function saveUserNotes() {
    localStorage.setItem('leitner504_user_notes', JSON.stringify(userNotes));
}

// Save custom words to localStorage
function saveCustomWords() {
    localStorage.setItem('leitner504_custom_words', JSON.stringify(customWords));
}

// Save study history to localStorage
function saveStudyHistory() {
    localStorage.setItem('leitner504_study_history', JSON.stringify(studyHistory));
}

// Apply settings to the app
function applySettings() {
    // Apply font size
    document.documentElement.style.setProperty('--font-size', 
        appSettings.fontSize === 'small' ? '0.9em' : 
        appSettings.fontSize === 'large' ? '1.2em' : '1em');
    
    // Apply card animation
    const card = document.querySelector('.card');
    card.style.transition = appSettings.cardAnimation === 'none' ? 'none' : 
                           appSettings.cardAnimation === 'fade' ? 'opacity 0.6s' :
                           appSettings.cardAnimation === 'slide' ? 'transform 0.6s ease-in-out' : 'transform 0.6s';
}

// Populate lesson filter dropdown
function populateLessonFilter() {
    for (let i = 0; i < lessons.length; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `درس ${i + 1}`;
        lessonFilter.appendChild(option);
        
        // Also add to custom lesson select
        if (customLessonSelect) {
            const customOption = document.createElement('option');
            customOption.value = i;
            customOption.textContent = `درس ${i + 1}`;
            customLessonSelect.appendChild(customOption);
        }
    }
}

// Populate custom lesson select dropdown
function populateCustomLessonSelect() {
    // Already populated in populateLessonFilter
}

// Setup Event Listeners
function setupEventListeners() {
    // Theme toggle
    themeToggleBtn.addEventListener('click', toggleTheme);
    
    // Menu toggle
    menuToggleBtn.addEventListener('click', toggleMenu);
    
    // Menu item clicks
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const viewName = item.getAttribute('data-view');
            switchView(viewName);
        });
    });
    
    // Pronunciation button
    if (pronunciationBtn) {
        pronunciationBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card flip
            playPronunciation();
        });
    }
    
    // Note button
    if (addNoteBtn) {
        addNoteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card flip
            openNoteModal();
        });
    }
    
    // Modal close button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeNoteModal);
    }
    
    // Save note button
    if (saveNoteBtn) {
        saveNoteBtn.addEventListener('click', saveNote);
    }
    
    // Search button
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }
    
    // Add word button
    if (addWordBtn) {
        addWordBtn.addEventListener('click', addCustomWord);
    }
    
    // Settings change events
    if (fontSizeSelect) {
        fontSizeSelect.addEventListener('change', updateFontSize);
    }
    
    if (cardAnimationSelect) {
        cardAnimationSelect.addEventListener('change', updateCardAnimation);
    }
    
    if (dailyGoalSelect) {
        dailyGoalSelect.addEventListener('change', updateDailyGoal);
    }
    
    if (reminderTimeInput) {
        reminderTimeInput.addEventListener('change', updateReminderTime);
    }
    
    if (enableNotificationsCheckbox) {
        enableNotificationsCheckbox.addEventListener('change', toggleNotifications);
    }
    
    if (resetOnErrorCheckbox) {
        resetOnErrorCheckbox.addEventListener('change', toggleResetOnError);
    }
    
    // Export/Import data
    if (exportDataBtn) {
        exportDataBtn.addEventListener('click', exportData);
    }
    
    if (importDataBtn) {
        importDataBtn.addEventListener('click', () => {
            importFileInput.click();
        });
    }
    
    if (importFileInput) {
        importFileInput.addEventListener('change', importData);
    }
    
    // Reset buttons
    if (resetProgressBtn) {
        resetProgressBtn.addEventListener('click', resetProgress);
    }
    
    if (resetAllBtn) {
        resetAllBtn.addEventListener('click', resetAll);
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === noteModal) {
            closeNoteModal();
        }
    });
    
    // Override the original moveWord function to support resetOnError setting
    const originalMoveWord = window.moveWord;
    if (originalMoveWord) {
        window.moveWord = function(wordText, correct) {
            if (!correct && appSettings.resetOnError) {
                // Always move to box 1 on error if the setting is enabled
                if (!wordText || !wordState[wordText]) return;
                
                const currentBoxIndex = wordState[wordText].box - 1;
                
                // Remove from current box
                if (currentBoxIndex >= 0 && currentBoxIndex < BOX_COUNT) {
                    leitnerBoxes[currentBoxIndex].delete(wordText);
                } else if (learnedWords.has(wordText)) {
                    learnedWords.delete(wordText);
                }
                
                // Move to box 1
                leitnerBoxes[0].add(wordText);
                wordState[wordText].box = 1;
                
                saveState();
                displayWord(getNextWord());
            } else {
                // Use original implementation
                originalMoveWord(wordText, correct);
            }
        };
    }
    
    // Record study session
    const originalDisplayWord = window.displayWord;
    if (originalDisplayWord) {
        window.displayWord = function(wordData) {
            // Call original function
            originalDisplayWord(wordData);
            
            // Record today's study session if not already recorded
            const today = new Date().toISOString().split('T')[0];
            if (!studyHistory.includes(today)) {
                studyHistory.push(today);
                saveStudyHistory();
                updateStudyStreak();
            }
        };
    }
}

// Toggle between light and dark theme
function toggleTheme() {
    if (document.body.classList.contains('dark-theme')) {
        document.body.classList.remove('dark-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        appSettings.theme = 'light';
    } else {
        document.body.classList.add('dark-theme');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        appSettings.theme = 'dark';
    }
    saveAppSettings();
}

// Toggle menu visibility
function toggleMenu() {
    mainMenu.classList.toggle('active');
}

// Switch between views
function switchView(viewName) {
    // Hide all views
    views.forEach(view => {
        view.style.display = 'none';
    });
    
    // Show selected view
    document.getElementById(`${viewName}-view`).style.display = 'block';
    
    // Update active menu item
    menuItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-view') === viewName) {
            item.classList.add('active');
        }
    });
    
    currentView = viewName;
    
    // Clean up chart when leaving stats view
    if (viewName !== 'stats' && chart) {
        chart.destroy();
        chart = null;
    }
    
    // Initialize chart when entering stats view
    if (viewName === 'stats') {
        initializeChart();
        updateChart();
    }
    
    // Update specific view content
    if (viewName === 'stats') {
        updateStats();
        updateStudyStreak();
        updateChart();
    } else if (viewName === 'custom-words') {
        displayCustomWords();
    }
}

// Play pronunciation using Web Speech API
function playPronunciation() {
    if (!currentWord) return;
    
    const utterance = new SpeechSynthesisUtterance(currentWord.word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
}

// Open note modal
function openNoteModal() {
    if (!currentWord) return;
    
    currentWordForNote = currentWord;
    noteText.value = userNotes[currentWord.word] || '';
    noteModal.style.display = 'flex';
}

// Close note modal
function closeNoteModal() {
    noteModal.style.display = 'none';
    currentWordForNote = null;
}

// Save note
function saveNote() {
    if (!currentWordForNote) return;
    
    if (noteText.value.trim()) {
        userNotes[currentWordForNote.word] = noteText.value.trim();
    } else {
        delete userNotes[currentWordForNote.word];
    }
    
    saveUserNotes();
    closeNoteModal();
}

// Perform search
function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const lessonIdx = lessonFilter.value === 'all' ? -1 : parseInt(lessonFilter.value);
    const boxNum = boxFilter.value === 'all' ? -1 : boxFilter.value;
    
    searchResults.innerHTML = '';
    
    if (!searchTerm && lessonIdx === -1 && boxNum === -1) {
        searchResults.innerHTML = '<p>لطفاً معیارهای جستجو را وارد کنید.</p>';
        return;
    }
    
    let results = [];
    
    // Search in all lessons
    lessons.forEach((lesson, lessonIndex) => {
        // Skip if filtering by lesson and this isn't the selected lesson
        if (lessonIdx !== -1 && lessonIdx !== lessonIndex) return;
        
        lesson.forEach(wordData => {
            // Check if word matches search term
            const wordMatches = searchTerm === '' || 
                                wordData.word.toLowerCase().includes(searchTerm) || 
                                wordData.meaning.toLowerCase().includes(searchTerm);
            
            // Check if word is in the selected box
            let inSelectedBox = true;
            if (boxNum !== -1) {
                const wordBoxNum = wordState[wordData.word]?.box || 1;
                if (boxNum === 'learned') {
                    inSelectedBox = wordBoxNum === 'learned';
                } else {
                    inSelectedBox = wordBoxNum === parseInt(boxNum);
                }
            }
            
            if (wordMatches && inSelectedBox) {
                results.push({
                    ...wordData,
                    lesson: lessonIndex + 1,
                    box: wordState[wordData.word]?.box || 1
                });
            }
        });
    });
    
    // Search in custom words
    customWords.forEach(wordData => {
        // Skip if filtering by lesson and this isn't the selected lesson
        if (lessonIdx !== -1 && lessonIdx !== parseInt(wordData.lesson)) return;
        
        // Check if word matches search term
        const wordMatches = searchTerm === '' || 
                            wordData.word.toLowerCase().includes(searchTerm) || 
                            wordData.meaning.toLowerCase().includes(searchTerm);
        
        // Check if word is in the selected box
        let inSelectedBox = true;
        if (boxNum !== -1) {
            const wordBoxNum = wordState[wordData.word]?.box || 1;
            if (boxNum === 'learned') {
                inSelectedBox = wordBoxNum === 'learned';
            } else {
                inSelectedBox = wordBoxNum === parseInt(boxNum);
            }
        }
        
        if (wordMatches && inSelectedBox) {
            results.push({
                ...wordData,
                lesson: wordData.lesson === 'custom' ? 'شخصی' : parseInt(wordData.lesson) + 1,
                box: wordState[wordData.word]?.box || 1,
                isCustom: true
            });
        }
    });
    
    // Display results
    if (results.length === 0) {
        searchResults.innerHTML = '<p>هیچ نتیجه‌ای یافت نشد.</p>';
    } else {
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            
            const boxLabel = result.box === 'learned' ? 'یادگرفته شده' : `جعبه ${result.box}`;
            
            resultItem.innerHTML = `
                <h3>${result.word}</h3>
                <p><strong>معنی:</strong> ${result.meaning}</p>
                <p><strong>تلفظ:</strong> ${result.pronunciation}</p>
                <p><strong>مثال:</strong> ${result.example}</p>
                <p><strong>درس:</strong> ${result.lesson}</p>
                <p><strong>وضعیت:</strong> ${boxLabel}</p>
                ${userNotes[result.word] ? `<p><strong>یادداشت شخصی:</strong> ${userNotes[result.word]}</p>` : ''}
            `;
            
            searchResults.appendChild(resultItem);
        });
    }
}

// Add custom word
function addCustomWord() {
    const word = newWordInput.value.trim();
    const meaning = newMeaningInput.value.trim();
    const pronunciation = newPronunciationInput.value.trim() || '';
    const example = newExampleInput.value.trim() || '';
    const lesson = customLessonSelect.value;
    
    if (!word || !meaning) {
        alert('لطفاً کلمه و معنی آن را وارد کنید.');
        return;
    }
    
    // Check if word already exists
    const wordExists = lessons.some(lessonWords => 
        lessonWords.some(w => w.word.toLowerCase() === word.toLowerCase())
    ) || customWords.some(w => w.word.toLowerCase() === word.toLowerCase());
    
    if (wordExists) {
        alert('این کلمه قبلاً اضافه شده است.');
        return;
    }
    
    // Create new word object
    const newWord = {
        word,
        meaning,
        pronunciation,
        example,
        lesson,
        isCustom: true
    };
    
    // Add to custom words
    customWords.push(newWord);
    saveCustomWords();
    
    // Add to Leitner system
    if (!(newWord.word in wordState)) {
        wordState[newWord.word] = { box: 1, lesson: lesson === 'custom' ? 'custom' : parseInt(lesson) };
        leitnerBoxes[0].add(newWord.word);
        saveState();
    }
    
    // Clear form
    newWordInput.value = '';
    newMeaningInput.value = '';
    newPronunciationInput.value = '';
    newExampleInput.value = '';
    
    // Update display
    displayCustomWords();
    alert('کلمه با موفقیت اضافه شد.');
}

// Display custom words
function displayCustomWords() {
    customWordsContainer.innerHTML = '';
    
    if (customWords.length === 0) {
        customWordsContainer.innerHTML = '<p>هیچ کلمه شخصی اضافه نشده است.</p>';
        return;
    }
    
    customWords.forEach((wordData, index) => {
        const wordItem = document.createElement('div');
        wordItem.className = 'custom-word-item';
        
        const lessonLabel = wordData.lesson === 'custom' ? 'شخصی' : `درس ${parseInt(wordData.lesson) + 1}`;
        const boxNum = wordState[wordData.word]?.box || 1;
        const boxLabel = boxNum === 'learned' ? 'یادگرفته شده' : `جعبه ${boxNum}`;
        
        wordItem.innerHTML = `
            <h3>${wordData.word}</h3>
            <p><strong>معنی:</strong> ${wordData.meaning}</p>
            <p><strong>تلفظ:</strong> ${wordData.pronunciation}</p>
            <p><strong>مثال:</strong> ${wordData.example}</p>
            <p><strong>درس:</strong> ${lessonLabel}</p>
            <p><strong>وضعیت:</strong> ${boxLabel}</p>
            <div class="word-actions">
                <button class="edit-word" data-index="${index}"><i class="fas fa-edit"></i></button>
                <button class="delete-word" data-index="${index}"><i class="fas fa-trash"></i></button>
            </div>
        `;
        
        customWordsContainer.appendChild(wordItem);
    });
    
    // Add event listeners for edit and delete buttons
    document.querySelectorAll('.edit-word').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'));
            editCustomWord(index);
        });
    });
    
    document.querySelectorAll('.delete-word').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'));
            deleteCustomWord(index);
        });
    });
}

// Edit custom word
function editCustomWord(index) {
    const wordData = customWords[index];
    
    newWordInput.value = wordData.word;
    newMeaningInput.value = wordData.meaning;
    newPronunciationInput.value = wordData.pronunciation || '';
    newExampleInput.value = wordData.example || '';
    customLessonSelect.value = wordData.lesson;
    
    // Remove the word from the list
    deleteCustomWord(index, true);
    
    // Focus on the form
    newWordInput.focus();
}

// Delete custom word
function deleteCustomWord(index, skipConfirm = false) {
    if (!skipConfirm && !confirm('آیا از حذف این کلمه اطمینان دارید؟')) {
        return;
    }
    
    const wordData = customWords[index];
    
    // Remove from Leitner system
    if (wordData.word in wordState) {
        const boxIndex = typeof wordState[wordData.word].box === 'number' ? 
                        wordState[wordData.word].box - 1 : -1;
        
        if (boxIndex >= 0 && boxIndex < BOX_COUNT) {
            leitnerBoxes[boxIndex].delete(wordData.word);
        } else if (learnedWords.has(wordData.word)) {
            learnedWords.delete(wordData.word);
        }
        
        delete wordState[wordData.word];
        saveState();
    }
    
    // Remove from custom words
    customWords.splice(index, 1);
    saveCustomWords();
    
    // Remove from notes if exists
    if (userNotes[wordData.word]) {
        delete userNotes[wordData.word];
        saveUserNotes();
    }
    
    // Update display
    if (!skipConfirm) {
        displayCustomWords();
    }
}

// Update font size setting
function updateFontSize() {
    appSettings.fontSize = fontSizeSelect.value;
    saveAppSettings();
    applySettings();
}

// Update card animation setting
function updateCardAnimation() {
    appSettings.cardAnimation = cardAnimationSelect.value;
    saveAppSettings();
    applySettings();
}

// Update daily goal setting
function updateDailyGoal() {
    appSettings.dailyGoal = parseInt(dailyGoalSelect.value);
    saveAppSettings();
}

// Update reminder time setting
function updateReminderTime() {
    appSettings.reminderTime = reminderTimeInput.value;
    saveAppSettings();
    
    // Schedule notification if enabled
    if (appSettings.enableNotifications) {
        scheduleReminder();
    }
}

// Toggle notifications setting
function toggleNotifications() {
    appSettings.enableNotifications = enableNotificationsCheckbox.checked;
    saveAppSettings();
    
    if (appSettings.enableNotifications) {
        requestNotificationPermission();
    }
}

// Toggle reset on error setting
function toggleResetOnError() {
    appSettings.resetOnError = resetOnErrorCheckbox.checked;
    saveAppSettings();
}

// Request notification permission
function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                scheduleReminder();
            }
        });
    }
}

// Schedule daily reminder
function scheduleReminder() {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
        return;
    }
    
    // Clear any existing scheduled reminders
    if (window.reminderTimeout) {
        clearTimeout(window.reminderTimeout);
    }
    
    // Calculate time until reminder
    const [hours, minutes] = appSettings.reminderTime.split(':').map(Number);
    const now = new Date();
    const reminderTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hours,
        minutes
    );
    
    // If reminder time has passed today, schedule for tomorrow
    if (reminderTime < now) {
        reminderTime.setDate(reminderTime.getDate() + 1);
    }
    
    const timeUntilReminder = reminderTime.getTime() - now.getTime();
    
    // Schedule reminder
    window.reminderTimeout = setTimeout(() => {
        new Notification('یادآوری مطالعه', {
            body: 'زمان مطالعه کلمات امروز فرا رسیده است!',
            icon: 'images/icons/icon-192x192.png'
        });
        
        // Schedule next reminder for tomorrow
        scheduleReminder();
    }, timeUntilReminder);
}

// Export app data
function exportData() {
    const exportData = {
        leitnerState: {
            currentLessonIndex,
            leitnerBoxes: leitnerBoxes.map(box => Array.from(box)),
            learnedWords: Array.from(learnedWords),
            wordState
        },
        userNotes,
        customWords,
        studyHistory,
        appSettings
    };
    
    const dataStr = JSON.stringify(exportData);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'leitner504_backup.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Import app data
function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            
            // Validate imported data
            if (!importedData.leitnerState || !importedData.appSettings) {
                throw new Error('فایل پشتیبان نامعتبر است.');
            }
            
            // Confirm import
            if (!confirm('این عملیات تمام داده‌های فعلی را با داده‌های وارد شده جایگزین می‌کند. آیا مطمئن هستید؟')) {
                return;
            }
            
            // Import Leitner state
            currentLessonIndex = importedData.leitnerState.currentLessonIndex || 0;
            leitnerBoxes = importedData.leitnerState.leitnerBoxes.map(box => new Set(box));
            learnedWords = new Set(importedData.leitnerState.learnedWords);
            wordState = importedData.leitnerState.wordState || {};
            saveState();
            
            // Import user notes
            userNotes = importedData.userNotes || {};
            saveUserNotes();
            
            // Import custom words
            customWords = importedData.customWords || [];
            saveCustomWords();
            
            // Import study history
            studyHistory = importedData.studyHistory || [];
            saveStudyHistory();
            
            // Import app settings
            appSettings = importedData.appSettings;
            saveAppSettings();
            
            // Apply imported settings
            if (appSettings.theme === 'dark') {
                document.body.classList.add('dark-theme');
                themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                document.body.classList.remove('dark-theme');
                themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            }
            
            fontSizeSelect.value = appSettings.fontSize;
            cardAnimationSelect.value = appSettings.cardAnimation;
            dailyGoalSelect.value = appSettings.dailyGoal;
            reminderTimeInput.value = appSettings.reminderTime;
            enableNotificationsCheckbox.checked = appSettings.enableNotifications;
            resetOnErrorCheckbox.checked = appSettings.resetOnError;
            
            // Update UI
            loadLesson(currentLessonIndex);
            updateStats();
            updateStudyStreak();
            updateChart();
            displayCustomWords();
            applySettings();
            
            alert('داده‌ها با موفقیت وارد شدند.');
        } catch (error) {
            alert('خطا در وارد کردن داده‌ها: ' + error.message);
        }
        
        // Reset file input
        importFileInput.value = '';
    };
    reader.readAsText(file);
}

// Reset progress
function resetProgress() {
    Swal.fire({
        title: 'آیا مطمئن هستید؟',
        text: 'پیشرفت شما به حالت اول برمیگردد و این عملیات قابل بازگشت نیست!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله، پاک شود',
        cancelButtonText: 'انصراف'
    }).then((result) => {
        if (result.isConfirmed) {
            // Reset Leitner boxes
            leitnerBoxes = Array(BOX_COUNT).fill().map(() => new Set());
            learnedWords = new Set();
            
            // Reset word states
            wordState = {};
            words.forEach(word => {
                wordState[word.word] = { box: 1, lastReview: null };
                leitnerBoxes[0].add(word.word);
            });
            
            // Reset study history but keep today
            studyHistory = [new Date().toISOString().split('T')[0]];
            
            // Save all reset states
            saveState();
            saveStudyHistory();
            
            // Reset current lesson
            currentLessonIndex = 0;
            
            // Update UI
            loadLesson(currentLessonIndex);
            updateStats();
            updateStudyStreak();
            updateChart();
            
            Swal.fire(
                'بازنشانی شد!',
                'پیشرفت شما با موفقیت به حالت اول برگشت.',
                'success'
            );
        }
    });
}

// Reset all data
function resetAll() {
    Swal.fire({
        title: 'آیا مطمئن هستید؟',
        text: 'تمام اطلاعات شما از جمله یادداشت‌ها، کلمات شخصی و تنظیمات پاک خواهد شد و این عملیات قابل بازگشت نیست!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله، همه چیز پاک شود',
        cancelButtonText: 'انصراف'
    }).then((result) => {
        if (result.isConfirmed) {
            // Clear all localStorage
            localStorage.clear();
            
            // Reset Leitner boxes
            leitnerBoxes = Array(BOX_COUNT).fill().map(() => new Set());
            learnedWords = new Set();
            
            // Reset word states
            wordState = {};
            words.forEach(word => {
                wordState[word.word] = { box: 1, lastReview: null };
                leitnerBoxes[0].add(word.word);
            });
            
            // Reset all other data
            userNotes = {};
            customWords = [];
            studyHistory = [new Date().toISOString().split('T')[0]];
            currentLessonIndex = 0;
            
            // Reset settings to defaults
            appSettings = {
                theme: 'light',
                fontSize: 'medium',
                cardAnimation: 'flip',
                dailyGoal: 20,
                reminderTime: '20:00',
                enableNotifications: true,
                resetOnError: false
            };
            
            // Apply default theme
            document.body.classList.remove('dark-theme');
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            
            // Save all reset states
            saveState();
            saveUserNotes();
            saveCustomWords();
            saveStudyHistory();
            saveAppSettings();
            
            // Update UI
            loadLesson(currentLessonIndex);
            updateStats();
            updateStudyStreak();
            updateChart();
            applySettings();
            
            Swal.fire({
                title: 'بازنشانی کامل!',
                text: 'تمام اطلاعات با موفقیت پاک شد.',
                icon: 'success',
                confirmButtonText: 'باشه'
            }).then(() => {
                // Reload the page to ensure everything is fresh
                window.location.reload();
            });
        }
    });
}

// Update statistics display
function updateStats() {
    // Calculate total progress
    let totalWords = 0;
    let learnedWordsCount = 0;
    
    for (const word in wordState) {
        totalWords++;
        if (wordState[word].box === 'learned') {
            learnedWordsCount++;
        }
    }
    
    const progressPercentage = totalWords > 0 ? Math.round((learnedWordsCount / totalWords) * 100) : 0;
    
    // Update progress bar and text
    if (progressBar && progressText) {
        progressBar.style.width = `${progressPercentage}%`;
        progressText.textContent = `${progressPercentage}%`;
    }
    
    // Update learned words count
    if (learnedWordsCount) {
        document.getElementById('learned-words-count').textContent = `${learnedWordsCount}/${totalWords}`;
    }
    
    // Count completed lessons
    let completedLessons = 0;
    for (let i = 0; i < lessons.length; i++) {
        let allLearned = true;
        for (const wordData of lessons[i]) {
            if (!wordState[wordData.word] || wordState[wordData.word].box !== 'learned') {
                allLearned = false;
                break;
            }
        }
        if (allLearned) {
            completedLessons++;
        }
    }
    
    // Update completed lessons count
    if (completedLessonsCount) {
        completedLessonsCount.textContent = `${completedLessons}/${lessons.length}`;
    }
}

// Update study streak display
function updateStudyStreak() {
    if (!studyHistory.length) return;
    
    // Sort dates
    const sortedDates = [...studyHistory].sort();
    
    // Get current streak
    let currentStreak = 0;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    // Check if studied today
    const studiedToday = studyHistory.includes(today);
    
    if (studiedToday) {
        currentStreak = 1;
        
        // Count backwards from yesterday
        let checkDate = yesterday;
        while (studyHistory.includes(checkDate)) {
            currentStreak++;
            const prevDate = new Date(new Date(checkDate).getTime() - 86400000);
            checkDate = prevDate.toISOString().split('T')[0];
        }
    } else if (studyHistory.includes(yesterday)) {
        // If not studied today but studied yesterday, count streak from yesterday
        currentStreak = 1;
        
        // Count backwards from day before yesterday
        let checkDate = new Date(new Date(yesterday).getTime() - 86400000).toISOString().split('T')[0];
        while (studyHistory.includes(checkDate)) {
            currentStreak++;
            const prevDate = new Date(new Date(checkDate).getTime() - 86400000);
            checkDate = prevDate.toISOString().split('T')[0];
        }
    }
    
    // Calculate max streak
    let maxStreak = 0;
    let tempStreak = 1;
    
    for (let i = 1; i < sortedDates.length; i++) {
        const prevDate = new Date(sortedDates[i-1]);
        const currDate = new Date(sortedDates[i]);
        
        // Check if dates are consecutive
        const diffTime = Math.abs(currDate - prevDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            tempStreak++;
        } else {
            tempStreak = 1;
        }
        
        maxStreak = Math.max(maxStreak, tempStreak);
    }
    
    // Update streak display
    if (currentStreakEl) {
        currentStreakEl.textContent = currentStreak;
    }
    
    if (maxStreakEl) {
        maxStreakEl.textContent = maxStreak;
    }
    
    // Update streak days visualization
    if (streakDays.length) {
        // Get the last 7 days
        const last7Days = [];
        const today = new Date();
        
        for (let i = 6; i >= 0; i--) {
            const day = new Date(today);
            day.setDate(today.getDate() - i);
            last7Days.push(day.toISOString().split('T')[0]);
        }
        
        // Mark active days
        streakDays.forEach((dayEl, index) => {
            if (studyHistory.includes(last7Days[index])) {
                dayEl.classList.add('active');
            } else {
                dayEl.classList.remove('active');
            }
        });
    }
}

// Initialize Chart
function initializeChart() {
    const ctx = document.getElementById('progress-chart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (chart) {
        chart.destroy();
    }
    
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'کلمات یادگرفته شده',
                data: [],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 504,
                    ticks: {
                        stepSize: 50
                    }
                }
            }
        }
    });
}

// Update Chart
function updateChart() {
    if (!chart) {
        initializeChart();
    }
    
    const dates = Object.keys(studyHistory).sort();
    const data = dates.map(date => studyHistory[date]);
    
    chart.data.labels = dates;
    chart.data.datasets[0].data = data;
    chart.update();
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initApp);
