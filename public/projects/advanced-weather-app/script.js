document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const searchButton = document.getElementById('search-button');
    const cityName = document.getElementById('city-name');
    const currentTemp = document.getElementById('current-temp');
    const currentDesc = document.getElementById('current-desc');
    const forecastContainer = document.getElementById('forecast-container');
    const weatherInfoSection = document.querySelector('.weather-info'); // This now correctly matches the <section> tag

    // IMPORTANT: Replace with your actual OpenWeatherMap API key
    const apiKey = 'f0bc088ec1ee3803b0e172dd42bdd41e'; 

    // Initialize GSAP for animations (ensure GSAP is loaded in your HTML)
    // Set initial state for elements that will be animated to avoid FOUC (Flash Of Unstyled Content)
    gsap.set(".current-weather, .forecast-item", { opacity: 0, y: -20 });

    searchButton.addEventListener('click', () => {
        const city = cityInput.value.trim(); // Trim whitespace from input
        if (city) {
            getWeatherData(city);
        } else {
            alert('Please enter a city name.');
        }
    });

    // Allow searching by pressing Enter key in the input field
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });

    async function getWeatherData(city) {
        // Show loading state
        weatherInfoSection.classList.add('loading');
        // Clear previous forecast and show a loading spinner
        forecastContainer.innerHTML = '<div class="loading-spinner"></div>'; 
        // Clear current weather data during loading
        cityName.textContent = 'Loading...';
        currentTemp.textContent = '-';
        currentDesc.textContent = '';


        try {
            // Get current weather
            const currentResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            const currentData = await currentResponse.json();

            // Get 5-day forecast
            const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
            const forecastData = await forecastResponse.json();

            if (currentData.cod === 200 && forecastData.cod === "200") {
                updateCurrentWeather(currentData);
                updateForecast(forecastData);
                animateWeatherInfo();
            } else {
                // More specific error messages
                let errorMessage = 'City not found or invalid response from API.';
                if (currentData.message) {
                    errorMessage = currentData.message;
                } else if (forecastData.message) {
                    errorMessage = forecastData.message;
                }
                alert(errorMessage);
                // Clear previous weather info if city not found
                cityName.textContent = 'N/A';
                currentTemp.textContent = 'N/A';
                currentDesc.textContent = 'N/A';
                forecastContainer.innerHTML = ''; // Clear forecast spinner
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('An error occurred while fetching weather data. Please try again.');
            // Ensure UI is cleared on critical error
            cityName.textContent = 'Error';
            currentTemp.textContent = '-';
            currentDesc.textContent = '';
            forecastContainer.innerHTML = '';
        } finally {
            // Hide loading state
            weatherInfoSection.classList.remove('loading');
        }
    }

    function updateCurrentWeather(data) {
        cityName.textContent = data.name;
        currentTemp.textContent = `${Math.round(data.main.temp)}°C`;
        currentDesc.textContent = data.weather[0].description;
        // If you added an img tag for current weather, uncomment and use this:
        // const currentWeatherIcon = document.getElementById('current-weather-icon');
        // if (currentWeatherIcon) {
        //     currentWeatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        //     currentWeatherIcon.alt = data.weather[0].description;
        // }
    }

    function updateForecast(data) {
        forecastContainer.innerHTML = ''; // Clear existing forecast items (or loading spinner)
        const dailyForecasts = {};

        // Group forecasts by day
        data.list.forEach(forecast => {
            const date = new Date(forecast.dt * 1000);
            const dayKey = date.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' });

            // Only consider future days, and only one entry per day
            // Also, ensure we don't pick a forecast from the current day itself for the 5-day outlook
            if (!dailyForecasts[dayKey] && date.getDate() !== new Date().getDate()) { 
                // We're taking the first forecast available for that day, usually around morning.
                dailyForecasts[dayKey] = forecast;
            }
        });

        // Display up to 5 days of forecast
        let count = 0;
        for (const dayKey in dailyForecasts) {
            if (count >= 5) break; // Limit to 5 days
            const forecast = dailyForecasts[dayKey];
            const forecastItem = document.createElement('div');
            forecastItem.classList.add('forecast-item');

            const day = new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
            const temp = `${Math.round(forecast.main.temp)}°C`;
            const description = forecast.weather[0].description;
            const iconCode = forecast.weather[0].icon;

            forecastItem.innerHTML = `
                <p class="forecast-day">${day}</p>
                <img src="http://openweathermap.org/img/wn/${iconCode}.png" alt="${description}" title="${description}" class="forecast-icon">
                <p class="forecast-temp">${temp}</p>
            `;
            forecastContainer.appendChild(forecastItem);
            count++;
        }
    }

    function animateWeatherInfo() {
        // Only animate if GSAP is defined
        if (typeof gsap !== 'undefined') {
            gsap.from(".current-weather, .forecast-item", {
                duration: 0.5,
                y: -20,
                opacity: 0,
                stagger: 0.1,
                ease: "power2.out",
                clearProps: "all" // Clears inline styles after animation, important for re-running
            });
        }
    }

    // Particles.js initialization
    if (typeof particlesJS !== 'undefined') {
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
    } else {
        console.warn("particles.js library not loaded. Particles effect will not be active.");
    }

    // Optional: Fetch weather for a default city on load
    getWeatherData('London'); // Or any default city you prefer
});