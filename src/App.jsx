import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import CurrentWeather from './components/CurrentWeather';
import WeeklyForecast from './components/WeeklyForecast';
import SearchBar from './components/SearchBar';
import { getCurrentWeather, getForecast } from './services/weatherService';
import { groupForecastByDay } from './utils/weatherUtils';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('San Francisco'); // Default city

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch current weather
      const weatherData = await getCurrentWeather(cityName);
      setCurrentWeather(weatherData);
      
      // Fetch forecast
      const forecastData = await getForecast(cityName);
      
      // Group forecast by day
      const groupedForecast = groupForecastByDay(forecastData.list);
      setForecast(groupedForecast);
      
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Failed to fetch weather data. Please check the city name and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  const handleSearch = (cityName) => {
    setCity(cityName);
    fetchWeatherData(cityName);
  };

  // Weather app background based on time of day and weather condition
  const getBackgroundClass = () => {
    if (!currentWeather) return 'bg-default';
    
    const weatherCode = currentWeather.weather[0].id;
    const isDay = currentWeather.dt > currentWeather.sys.sunrise && 
                  currentWeather.dt < currentWeather.sys.sunset;
    
    if (weatherCode === 800) return isDay ? 'bg-clear-day' : 'bg-clear-night';
    if (weatherCode >= 801 && weatherCode <= 804) return isDay ? 'bg-cloudy-day' : 'bg-cloudy-night';
    if (weatherCode >= 500 && weatherCode < 600) return 'bg-rain';
    if (weatherCode >= 200 && weatherCode < 300) return 'bg-thunderstorm';
    if (weatherCode >= 600 && weatherCode < 700) return 'bg-snow';
    
    return isDay ? 'bg-default-day' : 'bg-default-night';
  };

  return (
    <div className={`app-container ${getBackgroundClass()}`}>
      <SearchBar onSearch={handleSearch} />
      
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            className="loading-container"
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="loading-spinner"></div>
            <p>Fetching weather data...</p>
          </motion.div>
        ) : error ? (
          <motion.div 
            className="error-container"
            key="error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <p>{error}</p>
            <button onClick={() => fetchWeatherData(city)}>Try Again</button>
          </motion.div>
        ) : (
          <motion.div 
            className="weather-container"
            key="weather"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {currentWeather && <CurrentWeather data={currentWeather} />}
            {forecast && <WeeklyForecast forecast={forecast} />}
          </motion.div>
        )}
      </AnimatePresence>

      <footer>
        <motion.div 
          className="attribution"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1 }}
        >
          <p>Data provided by OpenWeatherMap</p>
        </motion.div>
      </footer>
    </div>
  );
}

export default App;
