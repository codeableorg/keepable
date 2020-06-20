class API {
  getWeather() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Lima&appid=0acef0ea07666e6ab5a43bb2adea85ec')
    .then(resolve => resolve.json())
    .then(data => {
      renderWeather(data.weather[0].description, data.main.temp)
    } )
  }
}

const api = new API()
console.log(api.getWeather())

const degrees = document.querySelector("#degrees")
const weather = document.querySelector("#weather")

function renderWeather(location, grados){
  let textnodeGrados = document.createTextNode(Math.round(grados) - 273);
  let textnodeLocation = document.createTextNode(location);

  degrees.replaceChild(textnodeGrados, degrees.childNodes[0])
  weather.replaceChild(textnodeLocation, weather.childNodes[0])
}
