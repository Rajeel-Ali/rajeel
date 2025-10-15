document.addEventListener('DOMContentLoaded', () => {
    const ipInput = document.getElementById('ip-input');
    const trackButton = document.getElementById('track-button');
    const ipAddressDisplay = document.getElementById('ip-address');
    const locationDisplay = document.getElementById('location');
    const ispDisplay = document.getElementById('isp');
    const mapDiv = document.getElementById('map');

    let map = L.map(mapDiv).setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    let marker;

    // Automatically track user's IP on page load
    trackIp('');

    trackButton.addEventListener('click', () => {
        const ip = ipInput.value;
        trackIp(ip);
    });

    async function trackIp(ip) {
        try {
            const response = await fetch(`https://ip-api.com/json/${ip}`);
            const data = await response.json();
            console.log(data); // Log the response for debugging

            if (data.status === 'success') {
                updateInfo(data);
                updateMap(data.lat, data.lon);
                animateInfo();
            } else {
                alert('Could not track the IP address.');
            }
        } catch (error) {
            console.error('Error tracking IP:', error);
            alert('An error occurred while tracking the IP.');
        }
    }

    function updateInfo(data) {
        ipAddressDisplay.textContent = data.query;
        locationDisplay.textContent = `${data.city}, ${data.country}`;
        ispDisplay.textContent = data.isp;
    }

    function updateMap(lat, lon) {
        map.setView([lat, lon], 13);
        if (marker) {
            marker.setLatLng([lat, lon]);
        } else {
            marker = L.marker([lat, lon]).addTo(map);
        }
    }
    
    function animateInfo() {
        gsap.from(".info-box", { 
            duration: 0.5, 
            y: -20, 
            opacity: 0, 
            stagger: 0.2, 
            ease: "power2.out" 
        });
    }

    // Particles.js
    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: "none", random: true, straight: false, out_mode: "out" }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } }
        }
    });
});