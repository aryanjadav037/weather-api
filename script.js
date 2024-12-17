const locationButton = document.getElementById('location-button');

const cityName = document.getElementById('city-name');
const cityTime = document.getElementById('city-time');
const cityTemp = document.getElementById('city-temp');
const errorMessage = document.getElementById('error-message');

// Function to fetch weather data
async function getData(query) {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=704c6c94e058491e94560029241712&q=${query}&aqi=yes`
        );
        if (!response.ok) {
            throw new Error("Unable to fetch weather data.");
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
}

// Function to update DOM with weather data
function updateWeatherUI(data) {
    cityName.innerText = `${data.location.name}, ${data.location.country}`;
    cityTime.innerText = `Local Time: ${data.location.localtime}`;
    cityTemp.innerText = `Temperature: ${data.current.temp_c}°C`;
}

// Function to get weather based on location
function getWeatherByLocation() {
    errorMessage.innerText = ""; // Clear previous error message

    if (!navigator.geolocation) {
        errorMessage.innerText = "Geolocation is not supported by your browser.";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            const query = `${latitude},${longitude}`; // Format for Weather API
            try {
                const result = await getData(query);
                updateWeatherUI(result);
            } catch (error) {
                errorMessage.innerText = error.message;
            }
        },
        (error) => {
            errorMessage.innerText = "Unable to retrieve your location.";
        }
    );
}

// Automatically fetch weather on page load
window.onload = getWeatherByLocation;

// Refresh weather with button
locationButton.addEventListener("click", getWeatherByLocation);
