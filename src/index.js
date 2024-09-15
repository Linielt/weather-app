const fetchWeatherData = async (location) => {
  try {
    const API_KEY = "46DYZ9Z79VTXUY8RQUZTLPAXN";
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`
    );
    const weatherData = await response.json();

    console.log(weatherData);
    console.log(getRequiredData(weatherData));
  } catch (error) {
    alert(`Location not found: ${location}`);
  }
};

const convertFahrenheitToCelcius = (fahrenheitTemp) => {
  return (fahrenheitTemp - 32) / (9 / 5);
};

const getRequiredData = (weatherData) => {
  return {
    address: weatherData.address,
    description: weatherData.description,
    temperature: weatherData.currentConditions.temp,
    icon: weatherData.currentConditions.icon,
  };
};

fetchWeatherData("london");
