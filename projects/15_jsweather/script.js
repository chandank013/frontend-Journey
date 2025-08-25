const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');
const notFoundSection = document.querySelector('.not-found');
const searchCitySection = document.querySelector('.search-city');
const weatherInfo = document.querySelector('.weather-info');
const countryTxt = document.querySelector('.country-txt');
const tempTxt = document.querySelector('.temp-txt');
const conditionTxt = document.querySelector('.condition-txt');
const humidityValueTxt = document.querySelector('.humidity-value-txt');
const windValueTxt = document.querySelector('.wind-value-txt');
const weatherSummuryImg = document.querySelector('.weather-summury-img');
const currentDataTxt = document.querySelector('.current-date-txt');
const forcastItemsContainer = document.querySelector('.forcast-item-container'); // Assuming this is a template or a container for forecast items


const apiKey = '994e4ab08c164e0c21153aea1ec8255e';

searchBtn.addEventListener('click', () => {
    if(cityInput.value.trim() != '') {
    updateWeatherInfo(cityInput.value);
    cityInput.value = ''; // Clear input after search
    cityInput.blur();
    }
});


cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && cityInput.value.trim() !== '') {
        updateWeatherInfo(cityInput.value);
        cityInput.value = ''; // Clear input after search
        cityInput.blur();
    }
});


async function getFetchData(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric` 

    const response = await fetch(apiUrl)
    
    return response.json();
}

function getWeatherIcon(id){
    if(id <= 232) return 'thunderstorm.svg'
    if(id <= 321) return 'drizzle.svg'
    if(id <= 531) return 'rain.svg'
    if(id <= 622) return 'snow.svg'
    if(id <= 781) return 'atmosphere.svg'
    if(id <= 800) return 'clear.svg'
    else return 'clouds.svg'
}

function getCurrentDate(){
    const currentDate = new Date()
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }

    return currentDate.toLocaleDateString('en-GB',options)
}

async function updateWeatherInfo(city) {
    const weatherData = await getFetchData('weather', city);
    if(weatherData.cod != 200)
    {
        showDisplaySection(notFoundSection)
        return;
    }

    const {
        name: country,
        main: { temp, humidity},
        weather: [{ id, main}],
        wind: {speed}
    } = weatherData

    countryTxt.textContent = country;
    tempTxt.textContent = Math.round(temp) + ' °C';
    conditionTxt.textContent = main;
    humidityValueTxt.textContent = humidity + '%';
    windValueTxt.textContent = speed + 'M/s';

    currentDataTxt.textContent = getCurrentDate()
    weatherSummuryImg.src = `assets/weather/${getWeatherIcon(id)}`

    await updateForcastInfo(city)
    showDisplaySection(weatherInfo)
}

async function updateForcastInfo(city) {
    const forecastsData = await getFetchData('forecast',city)
    const timeToken = '12:00:00'; // 12 hours in seconds
    const todayDate = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    forcastItemsContainer.innerHTML = ''; // Clear previous forecast items

    forecastsData.list.forEach(forcastWeather => {
        if(forcastWeather.dt_txt.includes(timeToken) && !forcastWeather.dt_txt.includes(todayDate)) {
            updateForcastItems(forcastWeather);
        }
    });

}

function updateForcastItems(forcastData) {
    console.log(forcastData);
    const {
        dt_txt: date,
        weather: [{ id }],
        main: { temp }
    } = forcastData;

    const dateToken = new Date(date);
    const dateOptions = {
        day: '2-digit',
        month: 'short'
    };

    const dateResult = dateToken.toLocaleDateString('en-US', dateOptions);

    const forcastItem =`
        <div class="forcast-item">
            <h5 class="forcast-item-date regular-txt">${dateResult}</h5>
            <img src="assets/weather/${getWeatherIcon(id)}" class="forcast-item-img">
            <h5 class="forcast-item-temp">${Math.round(temp)} °C</h5>
        </div>
    `
    forcastItemsContainer.insertAdjacentHTML('beforeend', forcastItem);
}

function showDisplaySection(section){
    [weatherInfo,searchCitySection,notFoundSection].forEach(section => {section.style.display = 'none'});

    section.style.display = 'flex'
}