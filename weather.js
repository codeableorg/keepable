/* https://www.weatherapi.com/api-explorer.aspx */
const API_KEY = "cf981e4b895749c39ea42222201906";

function getCurrentWeather() {
  function LocationPermissionError(error) {
    switch (error.code) {
      case 1:
        return console.log("permission denied");
      case 2:
        return console.log("position unavailable");
      case 3:
        console.log("timed out");
        console.log("retrying...");
        return setTimeout(getCurrentWeather, 3000);
    }
  }

  function LoadWeatherData({ location, current }) {
    const { name, region, country } = location;
    const {
      temp_c,
      condition: { text, icon },
    } = current;
    const weather_text = `${name}, ${region}, ${country}: ${temp_c}°, ${text}`;
    console.log(weather_text);
    console.log(icon);
  }

  function getWeatherInfo({ coords }) {
    const { latitude, longitude } = coords;

    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`;
    return fetch(url)
      .then((r) => r.json())
      .then(LoadWeatherData);
  }

  navigator.geolocation.getCurrentPosition(
    getWeatherInfo,
    LocationPermissionError,
    {
      timeout: 5000,
      enableHighAccuracy: true,
    }
  );
}

/* getCurrentWeather(); */
