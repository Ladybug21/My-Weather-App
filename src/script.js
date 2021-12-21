let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let date = now.getDate();
let month = now.getMonth();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let h3 = document.querySelector("h3");
h3.innerHTML = `${day}, ${month}/${date}, ${hour}:${minutes}`;

//Search City
function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#submit-city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;
  console.log(cityInput.value);
  let apiKey = "dbeb222ab09a786985cd5f982518886f";
  let units = "metric";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${apiEndpoint}?q=${cityInput.value}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let form = document.querySelector("form");
form.addEventListener("submit", enterCity);

//Show Temperature
function showTemperature(response) {
  console.log(response.data);
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);

  let city = document.querySelector("h4");
  city.innerHTML = `${temperature}°`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;

  let humidity = Math.round(response.data.main.humidity);
  let humidityButton = document.querySelector("#humidity");
  humidityButton.innerHTML = `Humidity: ${humidity}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  let windButton = document.querySelector("#wind");
  windButton.innerHTML = `Wind: ${windSpeed} MPH`;

  let currentWeatherDescription = response.data.weather[0].description;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = `${currentWeatherDescription}`;

  celsiusTemperature = response.data.main.temp;
}

function searchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function showCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector("h4");
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  celsius.innerHTML = Math.round(celsiusTemperature);
}
let displayCelsius = document.querySelector("#celsius");
displayCelsius.addEventListener("click", showCelsius);

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("h4");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  fahrenheit.innerHTML = Math.round(fahrenheitTemperature);
}
let displayFahrenheit = document.querySelector("#fahrenheit");
displayFahrenheit.addEventListener("click", showFahrenheit);

let celsiusTemperature = null;

//Location

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(displayPosition);
}

function displayPosition(position) {
  let apiKey = "dbeb222ab09a786985cd5f982518886f";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

let button = document.querySelector("#current-location-button");
button.addEventListener("click", getCurrentLocation);
