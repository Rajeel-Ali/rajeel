document.addEventListener('DOMContentLoaded', () => {
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const prevButton = document.getElementById('prev-button');
    const playButton = document.getElementById('play-button');
    const nextButton = document.getElementById('next-button');
    const audio = document.getElementById('audio');
    const playlistUl = document.getElementById('playlist-ul');
    const visualizer = document.getElementById('visualizer');

    const playlist = [
        {
            title: 'Example Song',
            artist: 'You',
            src: 'audio/placeholder.mp3' // Replace with your audio files
        },
        // Add more songs here
    ];

    let currentSongIndex = 0;
    let isPlaying = false;
    let audioContext, analyser, source, bufferLength, dataArray;

    function loadSong(song) {
        songTitle.textContent = song.title;
        songArtist.textContent = song.artist;
        audio.src = song.src;
    }

    function playSong() {
        isPlaying = true;
        audio.play();
        playButton.textContent = 'Pause';
        initVisualizer();
    }

    function pauseSong() {
        isPlaying = false;
        audio.pause();
        playButton.textContent = 'Play';
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(playlist[currentSongIndex]);
        playSong();
    }

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(playlist[currentSongIndex]);
        playSong();
    }

    function updatePlaylist() {
        playlistUl.innerHTML = '';
        playlist.forEach((song, index) => {
            const li = document.createElement('li');
            li.textContent = `${song.title} - ${song.artist}`;
            li.addEventListener('click', () => {
                currentSongIndex = index;
                loadSong(playlist[currentSongIndex]);
                playSong();
            });
            playlistUl.appendChild(li);
        });
    }

    playButton.addEventListener('click', () => {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    });

    prevButton.addEventListener('click', prevSong);
    nextButton.addEventListener('click', nextSong);
    audio.addEventListener('ended', nextSong);

    function initVisualizer() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            source = audioContext.createMediaElementSource(audio);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            analyser.fftSize = 256;
            bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);
        }
        drawVisualizer();
    }

    function drawVisualizer() {
        const canvasCtx = visualizer.getContext('2d');
        const WIDTH = visualizer.width;
        const HEIGHT = visualizer.height;

        requestAnimationFrame(drawVisualizer);
        analyser.getByteFrequencyData(dataArray);

        canvasCtx.fillStyle = 'rgba(0, 0, 0, 0)';
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        const barWidth = (WIDTH / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];
            
            const gradient = canvasCtx.createLinearGradient(0, 0, 0, HEIGHT);
            gradient.addColorStop(1, '#00ffff');
            gradient.addColorStop(0.5, '#ff00ff');
            gradient.addColorStop(0, '#0a0a0a');
            
            canvasCtx.fillStyle = gradient;
            canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);

            x += barWidth + 1;
        }
    }

    // Initial Load
    loadSong(playlist[currentSongIndex]);
    updatePlaylist();
    
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