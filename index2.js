const apiKey = "f817146fcecc4da4ac85a07568ba8c60";
// const cityName = "Kolkata";

// current latitude and longitude base URL
const latAndLongBaseUrl = "http://api.openweathermap.org/geo/1.0/direct";

// current weather search API
const currentWeatherBaseUrl = "https://api.openweathermap.org/data/2.5/weather";

// getting html elements into js
let cityName = document.getElementById("cityName");
const submitButton = document.querySelector(".submitButton");
const weatherSubContainer = document.querySelector(".weather-subContainer");

// click event for submit button
submitButton.addEventListener("click",function(){
    setCityName(cityName);
})

// function to set the city name
function setCityName(cityName){
    if(cityName.value){
        let cityNameSearch = cityName.value;
        let latAndLongSearchUrl = `${latAndLongBaseUrl}?q=${cityNameSearch}&appid=${apiKey}`;
        
        if(latAndLongSearchUrl){
            getLatAndLong(latAndLongSearchUrl);
        }
    }
}

// function to fetch data from latitude and longitude API
function getLatAndLong(latAndLongAPI){
    fetch(latAndLongAPI).then(function(response){
        if(response.ok){
            return response.json();
        } else {
            throw new Error("404 error");
        }
    }).then(function(weatherData){
        // console.log(weatherData);
        // console.log(weatherData[0].lat);
        // console.log(weatherData[0].lon);
        let cityLatitude = weatherData[0].lat;
        let cityLongitude = weatherData[0].lon;
        setLatAndLong(cityLatitude,cityLongitude);
        
    }).catch(function(error){
        console.log("error",error);
    })
}

//function to set latitude and longitude to the current weather API
function setLatAndLong(latitude,longitude){
    
    let currentWeatherSearchUrl = `${currentWeatherBaseUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    if(currentWeatherSearchUrl){
        getWeatherData(currentWeatherSearchUrl);
    }
} 

// function to fetch the weather data from the provided latiude and longitude using the currentWeatherSearchUrl
function getWeatherData(currentWeatherSearchAPI){

    fetch(currentWeatherSearchAPI).then(function(response){
        if(response.ok){
            return response.json();
        } else {
            throw new Error("Invalid URL");
        }
    }).then(function(currentWeatherData){
        console.log("currentWeatherData:",currentWeatherData);
        // console.log(currentWeatherData.base);
        displayWeatherDetails(currentWeatherData);
    }).catch(function(error){
        console.log("error",error);
    })
}

// const date = new Date().toLocaleDateString("en-us", {
//     weekday:"long",
//     year:"numeric",
//     month:"short",
//     day:"numeric"
// })

// function to display current weather details in UI
function displayWeatherDetails(currentWeatherData){
    // console.log(currentWeatherData);
    weatherSubContainer.innerHTML = "";

    //  <!-- date, time, cityName and country code main container -->
    const dateTimeCountryCodeCityName = document.createElement("div");
    dateTimeCountryCodeCityName.classList.add("border-2","border-pink-600","h-[5rem]");

    const PTagForDate = document.createElement("p");
    PTagForDate.textContent = new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    PTagForDate.classList.add("text-2xl","text-red-600","italic","font-semibold");

    // text for city name and country code
    const spanTagForCity = document.createElement("span");
    spanTagForCity.textContent = cityName.value + ", ";
    spanTagForCity.classList.add("font-semibold","text-4xl");

    const spanTagForCountryCode = document.createElement("span");
    spanTagForCountryCode.textContent = currentWeatherData.sys.country;
    spanTagForCountryCode.classList.add("font-semibold","text-4xl");

    // appending inside date, time, cityName and country code div
    dateTimeCountryCodeCityName.append(PTagForDate,spanTagForCity,spanTagForCountryCode);

    // temperature main container containing temperature in celcius and cloud icon
    const temperatureDiv = document.createElement("div");
    temperatureDiv.classList.add("border-2","border-blue-600","h-[4rem]","flex");

    // icon div showing cloud icon
    const iconDiv = document.createElement("div");
    iconDiv.classList.add("border-2","border-green-600","h-full","w-[10%]", "mr-[0.5rem]");

    // creating icon element
    const iconTag = document.createElement("i");
    // iconTag.classList.add("lni lni-cloudy-sun","text-3xl");
    iconTag.setAttribute("class", "lni lni-cloudy-sun text-6xl");

    // temperature details sub container
    const tempDiv = document.createElement("div");
    tempDiv.classList.add("border-2","border-teal-600","h-full","w-[20%]");

    // temperature text in celcius
    const tempText = document.createElement("p");
    const tempNumber = Math.ceil(currentWeatherData.main.temp) - 273;
    tempText.textContent = `${tempNumber}C`;
    // console.log(tempText);
    tempText.classList.add("text-5xl");

    // appending to temperature details sub container
    tempDiv.append(tempText);

    // appending icon tag into icon div
    iconDiv.append(iconTag);

    // appending icon div and temp div into temperature main container
    temperatureDiv.append(iconDiv,tempDiv);

    // feels like temperature main container
    const feelsLikeDiv = document.createElement("div");
    feelsLikeDiv.classList.add("border-2", "border-pink-600", "h-[3rem]");

    // text for feels like temperature and weather condition
    const pTagForFeelsLike = document.createElement("p");
    const PTagForFeelsLikeNumber = Math.ceil(currentWeatherData.main.feels_like) - 273;

    pTagForFeelsLike.textContent = `Feels like ${PTagForFeelsLikeNumber}C.${currentWeatherData.weather[0].main}. ${currentWeatherData.weather[0].description}`;
    pTagForFeelsLike.classList.add("text-2xl","italic","font-semibold");

    // appending feels like temperature into feels like main container
    feelsLikeDiv.append(pTagForFeelsLike);
    // console.log(pTagForFeelsLike);

    // appending inside the weather sub container
    weatherSubContainer.append(dateTimeCountryCodeCityName,temperatureDiv,feelsLikeDiv);
}
