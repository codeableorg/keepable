let city = geoplugin_city();
let region = geoplugin_region();
let country = geoplugin_countryName();
let welcome = "Welcome to {keepable}.";
let cityAndWeather = ` Today's Forecast for ${city}, ${region}, ${country}:`;

welcomeTag = document.createElement("span");
welcomeTag.classList.add("welcome-span");
header = document.querySelector("header");
welcomeTag.append(welcome);
welcomeWeather = document.createElement("p");
welcomeWeather.classList.add("welcome-weather");
welcomeWeather.append(welcomeTag, cityAndWeather);
header.append(welcomeWeather);

welcomeTag.style.fontWeight = "bold";
header.style.display = "flex";
welcomeWeather.style.alignSelf = "center";
welcomeWeather.style.fontSize = "17px";
welcomeWeather.style.marginTop = "10px";
welcomeWeather.style.paddingLeft = "4.7em";
