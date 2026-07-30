/* ==========================
   ELEMENTS
========================== */

const cityInput = document.getElementById("cityInput");

const searchButton = document.getElementById("searchButton");

const refreshButton = document.getElementById("refreshButton");

const cityName = document.getElementById("cityName");

const temperature = document.getElementById("temperature");

const description = document.getElementById("description");

const weatherIcon = document.getElementById("weatherIcon");


/* ==========================
   WEATHER CODE
========================== */

const weatherCodes = {

    0: {
        text: "Clear Sky",
        icon: "sun"
    },

    1: {
        text: "Mainly Clear",
        icon: "cloud-sun"
    },

    2: {
        text: "Partly Cloudy",
        icon: "cloud-sun"
    },

    3: {
        text: "Overcast",
        icon: "cloud"
    },

    45: {
        text: "Fog",
        icon: "cloud-fog"
    },

    48: {
        text: "Fog",
        icon: "cloud-fog"
    },

    51: {
        text: "Light Drizzle",
        icon: "cloud-drizzle"
    },

    53: {
        text: "Drizzle",
        icon: "cloud-drizzle"
    },

    55: {
        text: "Heavy Drizzle",
        icon: "cloud-drizzle"
    },

    61: {
        text: "Light Rain",
        icon: "cloud-rain"
    },

    63: {
        text: "Rain",
        icon: "cloud-rain"
    },

    65: {
        text: "Heavy Rain",
        icon: "cloud-rain"
    },

    71: {
        text: "Snow",
        icon: "snowflake"
    },

    80: {
        text: "Rain Showers",
        icon: "cloud-rain"
    },

    95: {
        text: "Thunderstorm",
        icon: "cloud-lightning"
    }

};


/* ==========================
   WEATHER
========================== */

async function getWeather(city) {

    try {

        temperature.textContent = "--°C";

        description.textContent = "Loading...";

        weatherIcon.innerHTML = "";



        /* Geocoding */

        const geoResponse = await fetch(

            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`

        );

        const geoData = await geoResponse.json();


        if (!geoData.results) {

            throw new Error("City not found");

        }


        const place = geoData.results[0];

        const latitude = place.latitude;

        const longitude = place.longitude;


        cityName.textContent = place.name;


        /* Weather */

        const weatherResponse = await fetch(

            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`

        );

        const weatherData = await weatherResponse.json();


        const temp = weatherData.current.temperature_2m;

        const code = weatherData.current.weather_code;


        temperature.textContent = `${Math.round(temp)}°C`;


        const info = weatherCodes[code] || {

            text: "Unknown",

            icon: "cloud"

        };


        description.textContent = info.text;


        weatherIcon.innerHTML =

            `<i data-lucide="${info.icon}"></i>`;

        lucide.createIcons();

    }

    catch (error) {

        cityName.textContent = "-";

        temperature.textContent = "--°C";

        description.textContent = "City not found";

        weatherIcon.innerHTML =

            `<i data-lucide="cloud-off"></i>`;

        lucide.createIcons();

    }

}


/* ==========================
   EVENTS
========================== */

searchButton.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (!city) return;

    getWeather(city);

});


refreshButton.addEventListener("click", () => {

    getWeather(cityInput.value.trim());

});


cityInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        searchButton.click();

    }

});


/* ==========================
   INIT
========================== */

getWeather("Bandung");

lucide.createIcons();