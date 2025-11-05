// Your OpenWeatherMap API key
const apiKey = "YOUR_API_KEY_HERE"; 

// Search button click event
document.getElementById("search-btn").addEventListener("click", () => {
  const city = document.getElementById("city-input").value.trim();
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name!");
  }
});

// Fetch weather data from OpenWeatherMap API
async function getWeather(city) {
  const cityEncoded = encodeURIComponent(city);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityEncoded}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    showWeather(data);
  } catch (error) {
    alert(error.message);
    document.getElementById("weather-result").style.display = "none";
  }
}

// Display weather info on the page
function showWeather(data) {
  const weatherDiv = document.getElementById("weather-result");
  weatherDiv.style.display = "block";

  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  weatherDiv.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img src="${iconUrl}" alt="${data.weather[0].description}">
    <p>🌡️ Temperature: ${data.main.temp}°C</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
    <p>☁️ Condition: ${data.weather[0].description}</p>
  `;
}
