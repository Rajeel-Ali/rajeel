document.addEventListener('DOMContentLoaded', () => {
    const wpmDisplay = document.getElementById('wpm');
    const accuracyDisplay = document.getElementById('accuracy');
    const timeDisplay = document.getElementById('time');
    const textDisplay = document.getElementById('text-display');
    const textInput = document.getElementById('text-input');
    const resetButton = document.getElementById('reset-button');

    const sentences = [
        'The quick brown fox jumps over the lazy dog.',
        'A journey of a thousand miles begins with a single step.',
        'To be or not to be, that is the question.',
        'All that glitters is not gold.',
        'The only thing we have to fear is fear itself.'
    ];

    let timer;
    let time = 60;
    let isTyping = false;
    let charactersTyped = 0;
    let correctCharacters = 0;

    function startGame() {
        isTyping = true;
        time = 60;
        charactersTyped = 0;
        correctCharacters = 0;
        textInput.value = '';
        textInput.focus();
        timeDisplay.textContent = time;
        wpmDisplay.textContent = 0;
        accuracyDisplay.textContent = '100%';
        loadNewSentence();
        timer = setInterval(updateTime, 1000);
    }

    function updateTime() {
        time--;
        timeDisplay.textContent = time;
        if (time === 0) {
            endGame();
        }
    }

    function endGame() {
        clearInterval(timer);
        isTyping = false;
        calculateWPM();
        calculateAccuracy();
    }

    function loadNewSentence() {
        const randomIndex = Math.floor(Math.random() * sentences.length);
        const sentence = sentences[randomIndex];
        textDisplay.innerHTML = '';
        sentence.split('').forEach(char => {
            const span = document.createElement('span');
            span.innerText = char;
            textDisplay.appendChild(span);
        });
    }

    textInput.addEventListener('input', () => {
        if (!isTyping) {
            startGame();
        }
        
        const typedText = textInput.value;
        const textSpans = textDisplay.querySelectorAll('span');
        let correct = true;

        typedText.split('').forEach((char, index) => {
            const textChar = textSpans[index].innerText;
            if (char === textChar) {
                textSpans[index].classList.add('correct');
                textSpans[index].classList.remove('wrong');
            } else {
                textSpans[index].classList.add('wrong');
                textSpans[index].classList.remove('correct');
                correct = false;
            }
        });

        charactersTyped = typedText.length;
        correctCharacters = document.querySelectorAll('.correct').length;

        calculateAccuracy();
    });

    function calculateWPM() {
        const wordsTyped = charactersTyped / 5;
        const wpm = Math.round(wordsTyped / (60 / time));
        wpmDisplay.textContent = wpm;
    }
    
    function calculateAccuracy() {
        const accuracy = Math.round((correctCharacters / charactersTyped) * 100);
        accuracyDisplay.textContent = `${accuracy}%`;
    }

    resetButton.addEventListener('click', startGame);

    // Particles.js
    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: "none", random: true, out_mode: "out" }
        },
        interactivity: {
            events: { onhover: { enable: true, mode: "repulse" } }
        }
    });
});