const weatherUrl = 'https://api.openweathermap.org/data/2.5/'
const apiKey = '3d2aea7097fe9fba10c9b582886b118a'

const inputEl = document.querySelector('#cityInput')
const getBtn = document.querySelector('#getBtn')

const cityNameEl = document.querySelector('#cityName') 
const temperatureEl = document.querySelector('#temperature') 
const humidityEl = document.querySelector('#humidity') 
const descriptionEl = document.querySelector('#description') 
const iconEl = document.querySelector('#icon') 


let weatherData = {};

getBtn.addEventListener('click', () => {
    if (inputEl) {
        updateCard(inputEl.value);
    }
});

async function fetchWeather(city){
    try {
        const response = await fetch(weatherUrl + `weather?q=${city}&units=metric&appid=${apiKey}`)
        const data = await response.json();
        console.log(data);
        weatherData = {
            city: data.name,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            description: data.weather[0].description,
            icon: data.weather[0].icon
        }
        console.log(weatherData);
    } catch(error){
        throw new Error('Can not fetch data');
    }
}

async function updateCard(city){
    await fetchWeather(city);
    cityNameEl.textContent = weatherData.city;
    temperatureEl.textContent =`${weatherData.temperature}°C`;;
    humidityEl.textContent = `Humidity ${weatherData.humidity}%`;
    descriptionEl.textContent = weatherData.description;
    iconEl.src = `http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`;
}

updateCard('barranquilla')