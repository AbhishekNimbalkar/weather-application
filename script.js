const API_KEY = '331ca92302e15a439c9d10c2f72bc394';

const getWeather = async () => {
  const city = document.getElementById('city').value.trim();
  const country = document.getElementById('country').value.trim();
  const weatherText = document.getElementById('weatherText');
  const weatherIcon = document.getElementById('weatherIcon');

  if (!city || !country) {
    weatherText.innerHTML = 'Please enter both city and country code.';
    weatherIcon.style.display = 'none';
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`;

  weatherText.innerHTML = 'Fetching weather...';
  weatherIcon.style.display = 'none';

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('City not found');

    const data = await response.json();
    const { name, sys, main, weather } = data;
    const iconCode = weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherText.innerHTML = `
      <strong>Location:</strong> ${name}, ${sys.country}<br>
      <strong>Temperature:</strong> ${main.temp} °C<br>
      <strong>Humidity:</strong> ${main.humidity}%<br>
      <strong>Weather:</strong> ${weather[0].main} (${weather[0].description})
    `;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = weather[0].description;
    weatherIcon.style.display = 'block';
  } catch (error) {
    weatherText.innerHTML = `Error: ${error.message}`;
    weatherIcon.style.display = 'none';
  }
};

console.log(getWeather())