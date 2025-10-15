document.addEventListener('DOMContentLoaded', () => {
    const passwordDisplay = document.getElementById('password-display');
    const lengthRange = document.getElementById('length');
    const lengthValue = document.getElementById('length-value');
    const uppercaseCheck = document.getElementById('uppercase');
    const lowercaseCheck = document.getElementById('lowercase');
    const numbersCheck = document.getElementById('numbers');
    const symbolsCheck = document.getElementById('symbols');
    const generateButton = document.getElementById('generate-button');
    const copyButton = document.getElementById('copy-button');
    const strengthIndicator = document.getElementById('strength-indicator');

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    lengthRange.addEventListener('input', (e) => {
        lengthValue.textContent = e.target.value;
    });

    generateButton.addEventListener('click', generatePassword);
    copyButton.addEventListener('click', copyPassword);

    function generatePassword() {
        const length = lengthRange.value;
        let charset = '';
        let password = '';

        if (uppercaseCheck.checked) charset += uppercaseChars;
        if (lowercaseCheck.checked) charset += lowercaseChars;
        if (numbersCheck.checked) charset += numberChars;
        if (symbolsCheck.checked) charset += symbolChars;

        if (charset === '') {
            passwordDisplay.value = 'Select options';
            updateStrengthIndicator(0);
            return;
        }

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }

        passwordDisplay.value = password;
        updateStrengthIndicator(calculateStrength(password));
        animatePasswordGeneration();
    }

    function calculateStrength(password) {
        let strength = 0;
        if (password.length >= 12) strength += 25;
        else if (password.length >= 8) strength += 15;

        if (/[A-Z]/.test(password)) strength += 25;
        if (/[a-z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 15;
        if (/[^A-Za-z0-9]/.test(password)) strength += 10;
        
        return Math.min(100, strength);
    }

    function updateStrengthIndicator(strength) {
        strengthIndicator.style.width = strength + '%';
        if (strength > 80) {
            strengthIndicator.style.backgroundColor = 'var(--primary-color)';
        } else if (strength > 50) {
            strengthIndicator.style.backgroundColor = 'var(--accent-color)';
        } else {
            strengthIndicator.style.backgroundColor = 'var(--secondary-color)';
        }
    }

    function copyPassword() {
        passwordDisplay.select();
        document.execCommand('copy');
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = 'Copy';
        }, 1500);
    }

    function animatePasswordGeneration() {
        gsap.fromTo(passwordDisplay, 
            { scale: 1.05, textShadow: '0 0 10px rgba(0, 255, 255, 0.7)' },
            { scale: 1, textShadow: 'none', duration: 0.3, ease: 'power2.out' }
        );
    }

    // Particles.js
    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle", stroke: { width: 0, color: "#000000" }, polygon: { nb_sides: 5 } },
            opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
            size: { value: 3, random: true, anim: { enable: true, speed: 40, size_min: 0.1, sync: false } },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: "none", random: true, straight: false, out_mode: "out", bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
        },
        retina_detect: true
    });
});
