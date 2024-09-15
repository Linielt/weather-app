import clearDayIcon from "./icons/clear-day.png";
import clearNightIcon from "./icons/clear-night.png";
import cloudyIcon from "./icons/cloudy.png";
import fogIcon from "./icons/fog.png";
import partlyCloudyDayIcon from "./icons/partly-cloudy-day.png";
import partlyCloudyNightIcon from "./icons/partly-cloudy-night.png";
import rainIcon from "./icons/rain.png";
import snowIcon from "./icons/snow.png";
import windIcon from "./icons/wind.png";

const fetchWeatherData = async (location) => {
  try {
    const API_KEY = "46DYZ9Z79VTXUY8RQUZTLPAXN";
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`
    );
    const weatherData = await response.json();

    const requiredWeatherData = getRequiredWeatherData(weatherData);
    writeWeatherDataToPage(requiredWeatherData);
    writeWeatherIconToPage(requiredWeatherData);
  } catch (error) {
    alert(`Location not found: ${location}`);
  }
};

const convertFahrenheitToCelcius = (fahrenheitTemp) => {
  return (fahrenheitTemp - 32) / (9 / 5);
};

const getRequiredWeatherData = (weatherData) => {
  return {
    address: weatherData.address,
    description: weatherData.description,
    temperature: weatherData.currentConditions.temp,
    icon: weatherData.currentConditions.icon,
  };
};

const city = document.getElementById("weather-city");
const description = document.getElementById("weather-description");
const temperature = document.getElementById("weather-temperature");
const iconContainer = document.getElementById("weather-icon-container");

const writeWeatherDataToPage = (requiredWeatherData) => {
  const celciusTemp = Math.floor(
    convertFahrenheitToCelcius(requiredWeatherData.temperature)
  );

  city.textContent = requiredWeatherData.address;
  description.textContent = requiredWeatherData.description;
  temperature.textContent = celciusTemp;
};

const writeWeatherIconToPage = (requiredWeatherData) => {
  const iconName = requiredWeatherData.icon;
  iconContainer.textContent = "";
  const weatherIcon = document.createElement("img");

  if (iconName === "snow") {
    weatherIcon.src = snowIcon;
  } else if (iconName === "rain") {
    weatherIcon.src = rainIcon;
  } else if (iconName === "fog") {
    weatherIcon.src = fogIcon;
  } else if (iconName === "wind") {
    weatherIcon.src = windIcon;
  } else if (iconName === "cloudy") {
    weatherIcon.src = cloudyIcon;
  } else if (iconName === "partly-cloudy-day") {
    weatherIcon.src = partlyCloudyDayIcon;
  } else if (iconName === "partly-cloudy-night") {
    weatherIcon.src = partlyCloudyNightIcon;
  } else if (iconName === "clear-day") {
    weatherIcon.src = clearDayIcon;
  } else if (iconName === "clear-night") {
    weatherIcon.src = clearNightIcon;
  }
  iconContainer.appendChild(weatherIcon);
};

fetchWeatherData("london");
