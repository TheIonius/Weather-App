const apiKey = '8d2de98e089f1c28e1a22fc19a24ef04';

async function getWeather() {
    const cityInput = document.getElementById('city-input').value;
    if (!cityInput) return;

    try {
        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityInput)}&units=metric&appid=${apiKey}`
        );
        const weatherData = await weatherResponse.json();

        if (weatherData.cod === '404') {
            alert('City not found. Please try again.');
            return;
        }

        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityInput)}&units=metric&appid=${apiKey}`
        );
        const forecastData = await forecastResponse.json();

        displayWeather(weatherData);
        displayForecast(forecastData);
    } catch (error) {
        alert('Error fetching weather data. Please try again.');
    }
}

function displayWeather(data) {
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const weatherIcon = document.getElementById('weather-icon');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');

    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${Math.round(data.wind.speed * 3.6)} km/h`;

    [cityName, temperature, description, weatherIcon, humidity, windSpeed].forEach(element => {
        element.style.opacity = 0;
        element.style.animation = 'fadeIn 0.5s ease forwards';
    });
}

function displayForecast(data) {
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = '';

    for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        const date = new Date(forecast.dt * 1000);
        
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.style.animation = `fadeIn 0.5s ease ${i * 0.1}s forwards`;
        forecastItem.innerHTML = `
            <p>${date.toLocaleDateString('en-US', { weekday: 'short' })}</p>
            <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="Weather icon">
            <p>${Math.round(forecast.main.temp)}°C</p>
            <p>${forecast.weather[0].description}</p>
        `;
        forecastDiv.appendChild(forecastItem);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('city-input').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            getWeather();
        }
    });
});
