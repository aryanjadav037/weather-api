const button = document.getElementById('search-button');
const input = document.getElementById('city-input');

const cityName = document.getElementById('city-name');
const cityTime = document.getElementById('city-time');
const cityTemp = document.getElementById('city-temp');
const errorMessage = document.getElementById('error-message');

// Function to fetch weather data
async function getData(city) {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=704c6c94e058491e94560029241712&q=${city}&aqi=yes`
        );
        if (!response.ok) {
            throw new Error("City not found or API error.");
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
}

// Event listener for the search button
button.addEventListener("click", async () => {
    const value = input.value.trim(); // Get input value
    errorMessage.innerText = ""; // Clear previous error message

    if (!value) {
        errorMessage.innerText = "Please enter a city name.";
        return;
    }

    try {
        const result = await getData(value);

        // Update the DOM with fetched data
        cityName.innerText = `${result.location.name}, ${result.location.country}`;
        cityTime.innerText = `Local Time: ${result.location.localtime}`;
        cityTemp.innerText = `Temperature: ${result.current.temp_c}°C`;
    } catch (error) {
        // Display error message
        errorMessage.innerText = error.message;
    }
});
