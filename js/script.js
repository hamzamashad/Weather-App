const todayTag = document.querySelector('#today .day h6'),
todayDateTag = document.querySelector('#today .day .date'),
locationTag = document.querySelector('#today .forecast h6'),
dayZeroDegreeTag = document.querySelector('#today .forecast .degree h1'),
dayZeroIconTag = document.querySelector('#today .forecast .degree img'),
dayZeroConditionTag = document.querySelector('#today .forecast p'),
dayZeroHumidTag = document.querySelector('#today .forecast .humid p'),
dayZeroSpeedTag = document.querySelector('#today .forecast .wind-speed p'),
dayZeroDirectionTag = document.querySelector('#today .forecast .wind-direction p')

const tomorrowTag = document.querySelector('#tomorrow .day h6'),
tomorrowIconTag = document.querySelector('#tomorrow .forecast img'),
tomorrowHighTag = document.querySelector('#tomorrow .forecast .degree h3'),
tomorrowLowTag = document.querySelector('#tomorrow .forecast .degree h5'),
tomorrowConditionTag = document.querySelector('#tomorrow .forecast p');

const afterTomorrowTag = document.querySelector('#aftertomorrow .day h6'),
afterTomorrowIconTag = document.querySelector('#aftertomorrow .forecast img'),
afterTomorrowHighTag = document.querySelector('#aftertomorrow .forecast .degree h3'),
afterTomorrowLowTag = document.querySelector('#aftertomorrow .forecast .degree h5'),
afterTomorrowConditionTag = document.querySelector('#aftertomorrow .forecast p');

const citySearchTag = document.querySelector('.hero input');

let currentCity = 'london';
const apiKey = 'c0a7a0e73f3c42f2b1a115636230408';
let baseURL = ``;

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let today, tomorrow, afterTomorrow;

let data, date;


function getDays() {
    today = new Date(date).getDay();
    today = dayNames[today];
    tomorrow = new Date(data.forecast.forecastday[1].date).getDay();
    tomorrow = dayNames[tomorrow];
    afterTomorrow = new Date(data.forecast.forecastday[2].date).getDay();
    afterTomorrow = dayNames[afterTomorrow];
}

function updateToday() {
    const dayDate = new Date(date);
    todayTag.innerHTML = today;
    todayDateTag.innerHTML = `${dayDate.getDate()} ${monthNames[dayDate.getMonth()]}`
    locationTag.innerHTML = data.location.name;
    dayZeroDegreeTag.innerHTML = `${data.current.temp_c}°C`;
    dayZeroIconTag.src = `https:${data.current.condition.icon}`;
    dayZeroConditionTag.innerHTML = data.current.condition.text;
    dayZeroHumidTag.innerHTML = `${data.current.humidity}%`;
    dayZeroSpeedTag.innerHTML = `${data.current.wind_kph}km/h`;
    dayZeroDirectionTag.innerHTML = data.current.wind_dir;
}

function updateTomorrow() {
    tomorrowTag.innerHTML = tomorrow;
    const thisDay = data.forecast.forecastday[1].day;
    tomorrowIconTag.src = `https:${thisDay.condition.icon}`;
    tomorrowHighTag.innerHTML = `${thisDay.maxtemp_c}°C`;
    tomorrowLowTag.innerHTML = `${thisDay.mintemp_c}°C`;
    tomorrowConditionTag.innerHTML = thisDay.condition.text;
}

function updateAfterTomorrow() {
    afterTomorrowTag.innerHTML = tomorrow;
    const thisDay = data.forecast.forecastday[2].day;
    afterTomorrowIconTag.src = `https:${thisDay.condition.icon}`;
    afterTomorrowHighTag.innerHTML = `${thisDay.maxtemp_c}°C`;
    afterTomorrowLowTag.innerHTML = `${thisDay.mintemp_c}°C`;
    afterTomorrowConditionTag.innerHTML = thisDay.condition.text;
}


async function getData() {
    baseURL = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${currentCity}&days=3`;
    let response = await fetch(baseURL);
    response = await response.json();
    return response
}


async function refresh() {
    data = await getData();
    date = data.location.localtime;
    getDays();
    updateToday();
    updateTomorrow();
    updateAfterTomorrow();
};

(async function(){
    getLocation();
    await refresh();
    citySearchTag.addEventListener('input', ()=> {
        currentCity = citySearchTag.value;
        refresh();
    });
})();

async function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(addPosition);
    } else { 
      window.alert('Error with Geolcating, please enter city manually');
    }
  }
  
function addPosition(position) {
    currentCity = `${position.coords.latitude},${position.coords.longitude}`;
    refresh();
  }