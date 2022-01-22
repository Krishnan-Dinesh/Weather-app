const api = {
    key: "7dcf46cef743e8c283f02f43f947010f",
    baseurl: "https://api.openweathermap.org/data/2.5/",
}

var loc = function(data){

    let lat = data.coords.latitude;
    let lon = data.coords.longitude;

    let query= 'lat='+lat+'&lon='+lon;

    getResult(query);
}

var error = function(err){
    console.log(err);
}

navigator.geolocation.getCurrentPosition(loc, error);


const searchbox= document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){

    if(evt.keyCode==13){
        getResult("q="+searchbox.value);
    }

}

function getResult(query){
    fetch(`${api.baseurl}weather?${query}&units=metric&APPID=${api.key}`)
    .then(weather=> {
        return weather.json();
    }).then (displayResults);


}

function displayResults(weather){

    let city = document.querySelector('.location .city');
    city.innerHTML=`${weather.name}, ${weather.sys.country} `
    
    let now = new Date();
    let date = document.querySelector('.location .date');
    dateBuilder(date, now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML=`${Math.round(weather.main.temp).toFixed(0)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.current .hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`; 
    
}

function dateBuilder(element, today){

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    element.innerHTML = today.toLocaleDateString("en-IN", options);

}

