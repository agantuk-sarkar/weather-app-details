// API key for daily weather forecast
const apiKey = "f817146fcecc4da4ac85a07568ba8c60";

// current latitude and longitude base URL
const latAndLongBaseUrl = "http://api.openweathermap.org/geo/1.0/direct";

// daily forecast weather search API
const weatherForecastBaseUrl = "https://api.openweathermap.org/data/2.5/forecast";
// const weatherForecastBaseUrl = "https://api.openweathermap.org/data/2.5/weather";



// getting the html elements into js
const cityName = document.getElementById("cityName");
const submitButton = document.querySelector(".submitButton");

// click event for submit button which is used as a callback function
submitButton.addEventListener("click",getLatAndLong);


// function to get latitude and longitude
async function getLatAndLong(){
    try{
        let city = cityName.value;
        let latAndLongSearchUrl = `${latAndLongBaseUrl}?q=${city}&appid=${apiKey}`;
         let response = await fetch(latAndLongSearchUrl);
         if(response.ok && latAndLongSearchUrl){
            let latAndLongData = await response.json();
            // console.log("latAndLongData:",latAndLongData);

            let latitude = latAndLongData[0].lat;
            let longitude = latAndLongData[0].lon;
            getWeatherForecast(latitude,longitude);
         }
    }catch(error){
        console.log("error",error);
    }
}

// function to get daily weather forecast
async function getWeatherForecast(latitude,longitude){
    try{
        let weatherForecastSearchUrl = `${weatherForecastBaseUrl}?lat=${latitude}&lon=${longitude}&units=metric&cnt=7&appid=${apiKey}`;

        if(weatherForecastSearchUrl){
            let response = await fetch(weatherForecastSearchUrl);
            let weatherData = await response.json();
            console.log("weatherData:",weatherData);
        }
    }catch(error){
        console.log("error",error);
    }

}

