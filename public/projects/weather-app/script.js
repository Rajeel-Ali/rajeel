
const cityInput = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather-btn');
const weatherInfo = document.getElementById('weather-info');

const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key

getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city !== '') {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    const weather = `
                        <h2>${data.name}</h2>
                        <p>Temperature: ${data.main.temp}°C</p>
                        <p>Description: ${data.weather[0].description}</p>
                    `;
                    weatherInfo.innerHTML = weather;
                } else {
                    weatherInfo.innerHTML = `<p>${data.message}</p>`;
                }
            })
            .catch(error => {
                weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
            });
    }
});
