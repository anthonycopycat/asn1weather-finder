const citySelect = document.getElementById("city-select");
const viewCityBtn = document.getElementById("view-city-btn");
const cityButtons = document.querySelectorAll(".city-btn");

const weatherCity = document.getElementById("weather-city");
const temperature = document.getElementById("temperature");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");

const loading = document.getElementById("loading");
const errorMessage = document.getElementById("error-message");


// Weather Finder JavaScript

// View City functionality will be added
// in the feature/viewcity branch.

// Top 10 city functionality will be added
// in the feature/top10 branch.


// Weather display will be completed in the feature branches.
function renderWeather(city, weather) {
    weatherCity.textContent = city;
}