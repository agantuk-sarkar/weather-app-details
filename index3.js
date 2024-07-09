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
const weatherReportDetails = document.querySelector(".weather-report");
const weatherMapIframe = document.getElementById("gmap-canvas");
const removeSearch = document.querySelector(".removeSearch");

// click event for remove search value which is used as a callback function
removeSearch.addEventListener("click",removeSearchValue);

// click event for submit button which is used as a callback function
submitButton.addEventListener("click",getLatAndLong);


// function to get latitude and longitude
async function getLatAndLong(){
    try{
        let city = cityName.value;

        if(city){
            showMap(city);
        }

        let latAndLongSearchUrl = `${latAndLongBaseUrl}?q=${city}&appid=${apiKey}`;

         let response = await fetch(latAndLongSearchUrl);

         if(response.ok && latAndLongSearchUrl){
            let latAndLongData = await response.json();

            let latitude = latAndLongData[0].lat;
            let longitude = latAndLongData[0].lon;
            getWeatherForecast(latitude,longitude);
         }
    }catch(error){
        console.log("error:",error);
    }
}

// function to get daily weather forecast
async function getWeatherForecast(latitude,longitude){
    try{
        let weatherForecastSearchUrl = `${weatherForecastBaseUrl}?lat=${latitude}&lon=${longitude}&units=metric&cnt=7&appid=${apiKey}`;

        if(weatherForecastSearchUrl){
            let response = await fetch(weatherForecastSearchUrl);

            let weatherData = await response.json();
            // console.log("weatherData:",weatherData);

            weatherReport(weatherData);
        }
    }catch(error){
        console.log("error:",error);
    }

}

// function to display weather report in UI
function weatherReport(weatherData){

    weatherReportDetails.innerHTML = "";

    // date, time, cityName and country code main container

    const dateTimeCountryCodeCityNameDiv = document.createElement("div");
    dateTimeCountryCodeCityNameDiv.classList.add(
        "border-transparent",
        "h-[5rem]",
        "shadow-md"
      );

      const dateAndTimeText = document.createElement("h2");
      dateAndTimeText.textContent = new Date().toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      dateAndTimeText.classList.add("italic","text-red-500","font-semibold","text-xl");

    //   text for city name and country code
    const cityNameAndCountryCode = document.createElement("h2");
    cityNameAndCountryCode.classList.add("font-semibold","text-2xl");
    cityNameAndCountryCode.textContent = `${weatherData.city.name}, ${weatherData.city.country}`;

    // temperature and icon for weather report
    const tempIconAndTempDiv = document.createElement("div");
    tempIconAndTempDiv.classList.add(
        "border-transparent",
        "h-[4rem]",
        "shadow-md",
        "flex"
      );
      const tempIcon = document.createElement("img");
      tempIcon.src = "https://openweathermap.org/img/wn/10d@2x.png";
      tempIcon.classList.add("h-full","w-[20%]","rounded-md");

      const tempText = document.createElement("span");
      tempText.innerHTML = `${weatherData.list[0].main.temp}<span>&#176;C</span>`;
      tempText.classList.add("text-3xl","font-semibold","mt-[1rem]");

    //   feels like temperature text
    const feelsLikeDiv = document.createElement("div");

    const feelsLikeText = document.createElement("p");
    feelsLikeText.innerHTML = `Feels like ${weatherData.list[0].main.feels_like}<span>&#176;C</span>. ${weatherData.list[0].weather[0].main}. ${weatherData.list[0].weather[0].description}`;
    feelsLikeText.classList.add("font-semibold","text-xl");

    // wind speed, humidity, pressure and visibility
    const windHumidityPressureMainDiv = document.createElement("div");
    windHumidityPressureMainDiv.classList.add("flex","gap-4");

    //   humidity and wind speed div
    const humidityWindSpeedSubDiv = document.createElement("div");

    const windSpeedText = document.createElement("p");
    windSpeedText.innerHTML = `Wind Speed: ${weatherData.list[0].wind.speed}m/s`;
    windSpeedText.classList.add("text-base","italic");

    const humidityText = document.createElement("p");
    humidityText.innerHTML = `Humidity: ${weatherData.list[0].main.humidity}%`;
    humidityText.classList.add("text-base","italic");

    humidityWindSpeedSubDiv.append(windSpeedText,humidityText);

    // pressure and visibility div
    const pressureHumiditySubDiv = document.createElement("div");

    const pressureText = document.createElement("p");
    pressureText.innerHTML = `Pressure: ${weatherData.list[0].main.pressure}hPa`;
    pressureText.classList.add("text-base","italic");

    const visibilityText = document.createElement("p");
    visibilityText.innerHTML = `Visibility: ${weatherData.list[0].visibility/1000}km`;
    visibilityText.classList.add("text-base","italic");

    pressureHumiditySubDiv.append(pressureText,visibilityText);


    //   appending each elements into their respective boxes
    dateTimeCountryCodeCityNameDiv.append(dateAndTimeText,cityNameAndCountryCode);

    tempIconAndTempDiv.append(tempIcon,tempText);

    feelsLikeDiv.append(feelsLikeText);

    windHumidityPressureMainDiv.append(humidityWindSpeedSubDiv,pressureHumiditySubDiv);


    // appending all to weather report container
    weatherReportDetails.append(dateTimeCountryCodeCityNameDiv,tempIconAndTempDiv,feelsLikeDiv,windHumidityPressureMainDiv);

}

// function to show map
function showMap(cityValue){

    weatherMapIframe.innerHTML = "";
    
    const iFrameTag = document.createElement("iframe");

    iFrameTag.src = `https://www.google.com/maps/embed/v1/place?q=${cityValue}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`;

    iFrameTag.style = "height: 100%; width: 100%; border: 0; border-radius:10px";

    weatherMapIframe.append(iFrameTag);
}

// function to remove the search value
function removeSearchValue(){
    cityName.value = null;
}