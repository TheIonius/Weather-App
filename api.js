import CONFIG from './config.js';

export async function fetchWeather(city) {
    const response = await fetch(
        `${CONFIG.baseUrl}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${CONFIG.apiKey}`
    );
    return response.json();
}

export async function fetchForecast(city) {
    const response = await fetch(
        `${CONFIG.baseUrl}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${CONFIG.apiKey}`
    );
    return response.json();
} 