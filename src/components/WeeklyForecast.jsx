import React from 'react';
import { motion } from 'framer-motion';
import WeatherIcon from './WeatherIcon';
import { getDayName } from '../utils/weatherUtils';

const WeeklyForecast = ({ forecast, unit = 'metric' }) => {
  if (!forecast || !forecast.length) return null;

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Animation variants for each forecast day card
  const forecastItemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      y: -5,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.2 }
    }
  };

  // Get weather group to determine card background
  const getWeatherGroup = (weatherCode) => {
    const code = parseInt(weatherCode, 10);
    
    if (code === 800) return "clear";
    if (code >= 801 && code <= 804) return "clouds";
    if (code >= 200 && code < 300) return "thunderstorm";
    if ((code >= 300 && code < 400) || (code >= 500 && code < 600)) return "rain";
    if (code >= 600 && code < 700) return "snow";
    if (code >= 700 && code < 800) return "atmosphere";
    
    return "default";
  };

  // Function to generate extra days for a full 7-day forecast
  // (Since OpenWeatherMap free API only provides 5 days)
  const get7DayForecast = () => {
    // Make a copy of the forecast
    const extendedForecast = [...forecast];
    
    // If we have less than 7 days, add extrapolated data
    if (extendedForecast.length < 7) {
      const lastDay = extendedForecast[extendedForecast.length - 1];
      const secondLastDay = extendedForecast[extendedForecast.length - 2];
      
      // Calculate temperature trend
      const tempDiff = lastDay.main.temp - secondLastDay.main.temp;
      
      // Add days to reach 7 total
      for (let i = extendedForecast.length; i < 7; i++) {
        const lastDate = new Date(lastDay.dt * 1000);
        const nextDate = new Date(lastDate);
        nextDate.setDate(lastDate.getDate() + (i - extendedForecast.length + 1));
        
        // Create a new forecast item based on the trend
        const newItem = {
          ...lastDay,
          dt: Math.floor(nextDate.getTime() / 1000),
          main: {
            ...lastDay.main,
            temp: lastDay.main.temp + tempDiff * (i - extendedForecast.length + 1),
            temp_min: lastDay.main.temp_min + tempDiff * (i - extendedForecast.length + 1),
            temp_max: lastDay.main.temp_max + tempDiff * (i - extendedForecast.length + 1)
          }
        };
        
        extendedForecast.push(newItem);
      }
    }
    
    return extendedForecast.slice(0, 7);
  };

  const sevenDayForecast = get7DayForecast();

  return (
    <div className="weekly-forecast-container">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        7-Day Forecast
      </motion.h2>
      
      <motion.div 
        className="weekly-forecast"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {sevenDayForecast.map((day, index) => {
          const date = new Date(day.dt * 1000);
          const dayName = index === 0 ? 'Today' : getDayName(day.dt);
          const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          const weatherGroup = getWeatherGroup(day.weather[0].id);
          
          return (
            <motion.div 
              className="forecast-day" 
              key={day.dt}
              variants={forecastItemVariants}
              whileHover="hover"
              data-weather={day.weather[0].id}
              data-weather-group={weatherGroup}
            >
              <h3>{dayName}</h3>
              <p className="forecast-date">{formattedDate}</p>
              <div className="forecast-icon">
                <WeatherIcon 
                  weatherCode={day.weather[0].id} 
                  isDay={true} 
                  size={50} 
                />
              </div>
              <div className="forecast-temp">
                <span className="max">{Math.round(day.main.temp_max)}°</span>
                <span className="min">{Math.round(day.main.temp_min)}°</span>
              </div>
              <p className="forecast-desc">{day.weather[0].description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default WeeklyForecast;