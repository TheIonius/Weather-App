export function formatTemperature(temp) {
    return `${Math.round(temp)}°C`;
}

export function formatWindSpeed(speed) {
    return `${Math.round(speed * 3.6)} km/h`;
} 