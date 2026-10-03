const citySelect = document.getElementById("city-select");
const viewCityBtn = document.getElementById("view-city-btn");
const cityButtons = document.querySelectorAll(".city-btn");

const weatherCity = document.getElementById("weather-city");
const temperature = document.getElementById("temperature");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");

const loading = document.getElementById("loading");
const errorMessage = document.getElementById("error-message");


// Top 10 city buttons
cityButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const city = button.getAttribute("data-city");
        getWeather(city);
    });
});


// Get weather for a city
async function getWeather(city) {

    try {

        errorMessage.textContent = "";
        loading.textContent = "Loading weather...";

        const geoResponse = await fetch(
            "https://geocoding-api.open-meteo.com/v1/search?name=" +
            encodeURIComponent(city) +
            "&count=1&countryCode=CA"
        );

        if (!geoResponse.ok) {
            throw new Error("Could not find the city.");
        }

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found.");
        }

        const latitude = geoData.results[0].latitude;
        const longitude = geoData.results[0].longitude;
        const cityName = geoData.results[0].name;

        const weatherResponse = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=" +
            latitude +
            "&longitude=" +
            longitude +
            "&current=temperature_2m,wind_speed_10m,relative_humidity_2m"
        );

        if (!weatherResponse.ok) {
            throw new Error("Could not load the weather.");
        }

        const weatherData = await weatherResponse.json();

        renderWeather(cityName, weatherData.current);

    } catch (error) {

        errorMessage.textContent = error.message;

    } finally {

        loading.textContent = "";

    }
}


// Display weather
function renderWeather(city, weather) {

    weatherCity.textContent = city;

    temperature.textContent =
        weather.temperature_2m + " °C";

    wind.textContent =
        weather.wind_speed_10m + " km/h";

    humidity.textContent =
        weather.relative_humidity_2m + "%";
}