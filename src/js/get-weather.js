let weatherSpan = document.getElementById('weather-span');

function getUrl(latitude, longitude) {
    return `${apiUrl}latitude=${latitude}&longitude=${longitude}&oneobservation=true&${apiKey}`
}

function upperFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function showWeather(position) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let jsonData = JSON.parse(this.responseText)['observations']['location'][0]['observation'][0]
            let city = upperFirst(jsonData['city'])
            let state = upperFirst(jsonData['state'])
            let country = upperFirst(jsonData['country'])
            let weather = upperFirst(jsonData['iconName'])
            let skyInfo = upperFirst(jsonData['skyInfo'])
            weatherSpan.innerHTML = `${city}, ${state} Province, ${country}: ${skyInfo}°, ${weather}.`;
        }
    };
    xhttp.open("GET", getUrl(position.coords.latitude, position.coords.longitude), true);
    xhttp.send();
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showWeather);
    } else {
        weatherSpan.innerHTML = "Geolocation is not supported by this browser.";
    }
}

// getLocation()
