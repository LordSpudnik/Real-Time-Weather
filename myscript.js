const apiKey = "18a9856d5813180842d879c20ebcf98d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.search-bar input');
searchBox.addEventListener('keypress', 
    function (event){
        if(event.key === "Enter") {
            checkWeather(searchBox.value);
        }
});

async function checkWeather(city) {
    if(city === "") {
        document.querySelector('.error-msg').style.display = "none";
        document.querySelector('.weather-icon').src = "";
        document.querySelector('.city').innerHTML = "";
        document.querySelector('.temp').innerHTML = "";
        document.body.style.backgroundImage = "url('./Backgrounds/FirstBg.png')";
        document.querySelector('.weather-container').style.background = "rgb(255, 255, 255, 0.2)";
        return;
    }

    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    if(!response.ok) {
        document.querySelector('.error-msg').style.display = "block";
        document.querySelector('.weather-icon').src = "";
        document.querySelector('.city').innerHTML = "";
        document.querySelector('.temp').innerHTML = "";
        document.body.style.backgroundImage = "url('./Backgrounds/FirstBg.png')";
        document.querySelector('.weather-container').style.background = "rgb(255, 255, 255, 0.2)";
        return;
    }

    document.querySelector('.error-msg').style.display = "none";
    var data = await response.json();

    console.log(data);
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector('.weather-container').style.backgroundColor = "rgba(54, 47, 47, 0.8)";

    if(data.weather[0].main === "Clear") {
        document.querySelector('.weather-icon').src = "./Icons/Sunny.png";
        document.body.style.backgroundImage = "url('./Backgrounds/Sunny.jpg')";
    } else if(data.weather[0].main === "Clouds") {
        document.querySelector('.weather-icon').src = "./Icons/Cloudy.png";
        document.body.style.backgroundImage = "url('./Backgrounds/cloudy.jpg')";
    } else if(data.weather[0].main === "Rain") {
        document.querySelector('.weather-icon').src = "./Icons/Rains.png";
        document.body.style.backgroundImage = "url('./Backgrounds/rainy.jpg')";
    } else if(data.weather[0].main === "Snow") {
        document.querySelector('.weather-icon').src = "./Icons/Snowy.png";
        document.body.style.backgroundImage = "url('./Backgrounds/snowy.jpg')";
    } else if(data.weather[0].main === "Mist") {
        document.querySelector('.weather-icon').src = "./Icons/Mist.png";
        document.body.style.backgroundImage = "url('./Backgrounds/Misty.jpg')";
    } else if(data.weather[0].main === "Drizzle") {
        document.querySelector('.weather-icon').src = "./Icons/Drizzle.png";
        document.body.style.backgroundImage = "url('./Backgrounds/Drizzle.jpg')";
    } else if(data.weather[0].main === "Haze") {
        document.querySelector('.weather-icon').src = "./Icons/Haze.png";
        document.body.style.backgroundImage = "url('./Backgrounds/Haze.jpg')";
    }
}