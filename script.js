document.addEventListener("DOMContentLoaded", function() {
    const nextButton = document.getElementById('next-btn');
  
    const cities = [
        { name: 'Mumbai', lat: '19.0760', lon: '72.8777' },
        { name: 'Pune', lat: '18.5204', lon: '73.8567' },
        { name: 'Kolkata', lat: '22.5726', lon: '88.3639' },
        { name: 'Delhi', lat: '28.7041', lon: '77.1025' },
        { name: 'London', lat: '51.5074', lon: '-0.1278' },
        { name: 'Boston', lat: '42.3601', lon: '-71.0589' },
        { name: 'Moscow', lat: '55.7558', lon: '37.6173' },
        { name: 'Tokyo', lat: '35.6895', lon: '139.6917' },
        { name: 'Los Angeles', lat: '34.0522', lon: '-118.2437' }
    ];
    
    let currentIndex = 0;
  
    async function updateWeatherData() {
        const apiKey = 'd2c6c7582bffa5be14b625b995eb89c3';
        const city = cities[currentIndex];
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`;
  
        try {
            const response = await fetch(url);
            const weatherData = await response.json();
  
            const locationName = `${weatherData.name}, ${weatherData.sys.country}`;
            const localtime = new Date(weatherData.dt * 1000).toLocaleString();
            const temp = `${weatherData.main.temp}°C (${(weatherData.main.temp * 9/5 + 32).toFixed(1)}°F)`;
            const condition = weatherData.weather[0].description;
            const conditionIcon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`;
            const humidity = `Humidity: ${weatherData.main.humidity}%`;
            const uv = 'UV Index: N/A'; // OpenWeatherMap API free tier does not provide UV index
            const wind = `Wind: ${weatherData.wind.speed} m/s ${weatherData.wind.deg}°`;
  
            document.getElementById('location-name').textContent = locationName;
            document.getElementById('localtime').textContent = localtime;
            document.getElementById('temp').textContent = temp;
            document.getElementById('condition').textContent = condition;
            document.getElementById('condition-icon').src = conditionIcon;
            document.getElementById('humidity').textContent = humidity;
            document.getElementById('uv').textContent = uv;
            document.getElementById('wind').textContent = wind;
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }
  
    nextButton.addEventListener('click', function() {
        // Update the city index for the next city
        currentIndex = (currentIndex + 1) % cities.length;
        updateWeatherData();
    });
  
    // Initial call to update the weather data
    updateWeatherData();
  });
  