let now = new Date();
let p = document.querySelector("p");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
];
let day = days[now.getDay()];
let months = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];
let month = months[now.getMonth()];
p.innerHTML = `${day} <br /> ${month} ${date}, ${year} <br /> ${hours}:${minutes}`;

function searchCity(city) {
  let apiKey = "6b45fead1f572a2847620f61855bb862";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
  } else {
    alert(`Please enter the location`);
  }
  let city = `${searchInput.value}`;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "6b45fead1f572a2847620f61855bb862";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#city-name");
  h1.innerHTML = response.data.name;
  let h3 = document.querySelector("#temperature");
  h3.innerHTML = `${temperature}°C`;
  let humidity = document.querySelector("#humidity-level");
  humidity.innerHTML = `Humidity ${response.data.main.humidity}%`;
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `Wind ${Math.round(response.data.wind.speed)} km/h`;
  document.querySelector(
    "#weather-symbol"
  ).innerHTML = `${response.data.weather[0].main}`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Kyiv");
