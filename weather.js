
const API_KEY = "20c4ad82c5c44c53a11130251262805";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const weatherIcon = document.getElementById("weatherIcon");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  getWeather(city);
});

async function getWeather(city) {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    displayWeather(data);

  } catch (error) {
    alert(error.message);
  }
}

function displayWeather(data) {
  cityName.textContent = `${data.location.name}, ${data.location.country}`;

  temperature.textContent = `${Math.round(data.current.temp_c)}°C`;

  description.textContent = data.current.condition.text;

  humidity.textContent = `Humidity: ${data.current.humidity}%`;

  windSpeed.textContent = `Wind Speed: ${data.current.wind_kph} km/h`;

  weatherIcon.src = `https:${data.current.condition.icon}`;
  weatherIcon.style.display = "block";
}