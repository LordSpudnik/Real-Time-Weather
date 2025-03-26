const apiKey = "18a9856d5813180842d879c20ebcf98d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const ipKey = "2855899c50a501";

const searchBox = document.querySelector('.search-bar input');
searchBox.addEventListener('keypress', async function(event) {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

const phoneBox = document.querySelector('.phone-input input');
phoneBox.addEventListener('keypress', async function(event) {
    if (event.key === "Enter") {
        submitPhoneNumber();
    }
});

async function getLocation() {
    fetch('https://ipinfo.io/json?token=' + ipKey)
        .then(response => response.json())
        .then(data => {
            document.querySelector('.search-bar input').value = data.city;
            checkWeather(data.city);
        })
        .catch(error => {
            console.log(error);
        });
}

async function checkWeather(city) {
    if (city === "") {
        document.querySelector('.error-msg').style.display = "none";
        resetUI();
        return;
    }

    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        if (!response.ok) {
            showError();
            return;
        }
        document.querySelector('.error-msg').style.display = "none";
        var data = await response.json();

        document.querySelector('.weather-type').innerHTML = data.weather[0].main;
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector('.weather-container').style.backgroundColor = "rgba(54, 47, 47, 0.8)";
        document.querySelector('.form-container').style.backgroundColor = "rgba(54, 47, 47, 0.8)";
        document.querySelector('.favorites-container').style.backgroundColor = "rgba(54, 47, 47, 0.8)";
        document.getElementById('favCity').style.display = "inline";

        if (data.weather[0].main === "Clear") {
            document.querySelector('.weather-icon').src = "./Icons/Sunny.png";
            document.body.style.backgroundImage = "url('./Backgrounds/Sunny.jpg')";
        } else if (data.weather[0].main === "Clouds") {
            document.querySelector('.weather-icon').src = "./Icons/Cloudy.png";
            document.body.style.backgroundImage = "url('./Backgrounds/Cloudy.jpg')";
        } else if (data.weather[0].main === "Rain") {
            document.querySelector('.weather-icon').src = "./Icons/Rains.png";
            document.body.style.backgroundImage = "url('./Backgrounds/Rainy.jpg')";
        } else if (data.weather[0].main === "Snow") {
            document.querySelector('.weather-icon').src = "./Icons/Snowy.png";
            document.body.style.backgroundImage = "url('./Backgrounds/Snowy.jpg')";
        } else if (data.weather[0].main === "Mist") {
            document.querySelector('.weather-icon').src = "./Icons/Mist.png";
            document.body.style.backgroundImage = "url('./Backgrounds/Misty.jpg')";
        } else if (data.weather[0].main === "Drizzle") {
            document.querySelector('.weather-icon').src = "./Icons/Drizzle.png";
            document.body.style.backgroundImage = "url('./Backgrounds/Drizzle.jpg')";
        } else if (data.weather[0].main === "Haze") {
            document.querySelector('.weather-icon').src = "./Icons/Haze.png";
            document.body.style.backgroundImage = "url('./Backgrounds/Haze.jpg')";
        }

        const timezoneOffset = data.timezone;
        const currentUTC = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000);
        const cityTime = new Date(currentUTC.getTime() + timezoneOffset * 1000);
        const futureTimes = getNextThreeTimes(cityTime);

        const humidity = data.main.humidity;
        const pressure = data.main.pressure;
        const windSpeed = data.wind.speed;

        const res = await fetch('http://localhost:5001/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ humidity, pressure, wind_speed: windSpeed })
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('Failed to fetch predictions:', errorText);
            throw new Error('Failed to fetch predictions');
        }

        const pred = await res.json();

        const oldPred = document.getElementById("ml-times");
        if (oldPred) oldPred.remove();

        const cityElem = document.querySelector(".city");
        const predElem = document.createElement("div");
        predElem.id = "ml-times";
        predElem.style.marginTop = "10px";
        predElem.style.fontSize = "16px";

        predElem.innerHTML = `
            <h4 style="margin-bottom: 8px;  font-size: 14px; color: #fff;">Predicted Temperatures</h4>
            <p><strong>${futureTimes[0]}</strong>: ${Math.round(pred.predicted_temperature_3h)}°C</p>
            <p><strong>${futureTimes[1]}</strong>: ${Math.round(pred.predicted_temperature_6h)}°C</p>
            <p><strong>${futureTimes[2]}</strong>: ${Math.round(pred.predicted_temperature_9h)}°C</p>
        `;

        cityElem.insertAdjacentElement("afterend", predElem);
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching the weather data. Ensure app.py is running.');
    }
}

function getNextThreeTimes(baseTime) {
    const hours = [3, 6, 9];
    return hours.map(h => {
        const future = new Date(baseTime.getTime() + h * 3600000);
        return future.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).replace('am', 'AM').replace('pm', 'PM');
    });
}


function resetUI() {
    document.querySelector('.weather-icon').src = "";
    document.querySelector('.city').innerHTML = "";
    document.querySelector('.temp').innerHTML = "";
    document.querySelector('.weather-type').innerHTML = "";
    document.body.style.backgroundImage = "url('./Backgrounds/FirstBg.png')";
    document.querySelector('.weather-container').style.background = "rgb(255, 255, 255, 0.2)";
    document.querySelector('.form-container').style.background = "rgb(255, 255, 255, 0.2)";
    document.querySelector('.favorites-container').style.background = "rgb(255, 255, 255, 0.2)";
    document.getElementById('favCity').style.display = "none";
    document.getElementById('ml-times').remove();
}

function showError() {
    document.querySelector('.error-msg').style.display = "block";
    resetUI();
}

async function submitPhoneNumber() {
    var phoneNumber = document.getElementById("phone").value;

    if (phoneNumber.length != 10 || isNaN(phoneNumber)) {
        alert("Please enter a valid phone number.");
        return;
    }
    document.querySelector('.weather-container').style.transform = 'translateX(-100%)';
    document.querySelector('.weather-container').style.marginLeft = "130px";
    document.querySelector('.form-container').classList.add('active');
}

document.getElementById('alertForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const city = document.querySelector('.search-bar input').value;
    const tempThreshold = document.getElementById('tempThreshold').value;
    const weatherType = document.getElementById('weatherType').value;
    const alertTime = document.getElementById('alertTime').value;
    const phoneNumber = document.getElementById('phone').value;

    if (!city || !tempThreshold || !weatherType || !alertTime || !phoneNumber) {
        alert("Please fill in all the fields.");
        return;
    }

    try {
        let response = await fetch('http://localhost:5000/api/setAlert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                city,
                tempThreshold,
                weatherType,
                alertTime,
                phoneNumber,
                update: false
            }),
        });

        console.log(response);
        if (response.status === 409) {
            const userConfirmed = confirm('Alert already exists for this phone number. Do you want to update it?');
            if (userConfirmed) {
                response = await fetch('http://localhost:5000/api/setAlert', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        city,
                        tempThreshold,
                        weatherType,
                        alertTime,
                        phoneNumber,
                        update: true
                    }),
                });
            } else {
                alert("Alert was not modified.");
                return;
            }
        }

        if (response.ok) {
            const { message } = await response.json();
            alert(message);
            document.querySelector('.form-container').classList.remove('active');
            document.querySelector('.weather-container').style.transform = 'translateX(0)';
            document.querySelector('.weather-container').style.marginLeft = "0px";
            document.getElementById('tempThreshold').value = "";
            document.getElementById('weatherType').value = "";
            document.getElementById('alertTime').value = "";
            document.getElementById("phone").value = "";
        } else {
            alert('Failed to save alert. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('The server is not running.');
    }
});

document.getElementById('cancel').addEventListener('click', function() {
    document.querySelector('.form-container').classList.remove('active');
    document.querySelector('.weather-container').style.transform = 'translateX(0)';
    document.querySelector('.weather-container').style.marginLeft = "0px";
    document.getElementById('tempThreshold').value = "";
    document.getElementById('weatherType').value = "";
    document.getElementById('alertTime').value = "";
    document.getElementById("phone").value = "";
});

document.getElementById('deleteAlert').addEventListener('click', deleteAlert);

async function deleteAlert() {
    const phoneNumber = document.getElementById("phone").value;

    if (phoneNumber.length != 10 || isNaN(phoneNumber)) {
        alert("Please enter a valid phone number.");
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/api/deleteAlert', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phoneNumber }),
        });

        if (response.ok) {
            const { message } = await response.json();
            alert(message);
            document.querySelector('.form-container').classList.remove('active');
            document.querySelector('.weather-container').style.transform = 'translateX(0)';
            document.getElementById('tempThreshold').value = "";
            document.getElementById('weatherType').value = "";
            document.getElementById('alertTime').value = "";
            document.getElementById("phone").value = "";
        } else {
            alert("Entered Phone Number doesn't have an alert");
        }
    } catch (error) {
        console.error('Error:', error);
        alert('The server is not running.');
    }
}

document.getElementById('favCity').addEventListener('click', addCity);

async function addCity() {
    const city = document.querySelector('.city').innerHTML;
    const item = document.createElement('li');
    item.textContent = city;
    const button = document.createElement('button');
    button.textContent = 'X';
    button.addEventListener('click', async function() {
        removeCity(city);
    });
    item.appendChild(button);
    document.querySelector('.favorites').appendChild(item);
}

async function removeCity(city) {
    const favoritesList = document.querySelector('.favorites');
    const cityItem = Array.from(favoritesList.children).find(item => item.textContent.includes(city));
    if (cityItem) {
      favoritesList.removeChild(cityItem);
    }
}