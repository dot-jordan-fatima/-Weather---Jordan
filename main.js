const citySelect = document.getElementById("citySelect");
console.log(citySelect);
citySelect.addEventListener("change", () => {
    if (citySelect.value === "") {
        return;
    }

    cityName.textContent = citySelect.value;
    getWeather(citySelect.value);
});
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const feelsLike = document.getElementById("feelsLike");
const description = document.getElementById("description");
const modeButton = document.getElementById("modeButton");
modeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        modeButton.textContent = "☀️";
    } else {
        modeButton.textContent = "🌙";
    }
});


const weatherIcon = document.getElementById("weatherIcon");

const getWeather = async (city) => {
    try{

    const apiKey = "67fd501bc7e1657266d5b0afa8d0d061";

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
    throw new Error("Failed to fetch weather data");
}

    const data = await response.json();  


    console.log(data.main.temp);
    temperature.textContent = `${data.main.temp}°C`;
    feelsLike.textContent = `${data.main.feels_like}°C`;
    humidity.textContent = `${data.main.humidity}%`;
wind.textContent = `${data.wind.speed} km/h`;
   pressure.textContent = `${data.main.pressure} hPa`;
   description.textContent = data.weather[0].description;
  
const icons = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Thunderstorm: "⛈️",
    Snow: "❄️"
};

weatherIcon.textContent = icons[data.weather[0].main] || "🌤️";


    console.log(data);

    } catch (error) {
        console.log("Something went wrong:", error);
        description.textContent = "Unable to load weather. Please try again.";
    }
};

