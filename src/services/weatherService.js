import axios from 'axios';
import moment from 'moment';

// OpenWeatherMap API key - Replace with your own for production use
const API_KEY = '9de243494c0b295cca9337e1e96b00e2'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Get current weather for a location
export const getCurrentWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

// Get 5-day forecast for a location
export const getForecast = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

// Process forecast data and group by day
export const processForecastData = (forecastData) => {
  if (!forecastData || !forecastData.list) return [];
  
  const dailyForecasts = {};
  
  forecastData.list.forEach(item => {
    const date = moment(item.dt * 1000).format('YYYY-MM-DD');
    
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = {
        date,
        dayOfWeek: moment(date).format('ddd'),
        formattedDate: moment(date).format('MMM D'),
        temperatures: [],
        conditions: [],
        humidity: [],
        wind: [],
        items: []
      };
    }
    
    dailyForecasts[date].temperatures.push(item.main.temp);
    dailyForecasts[date].conditions.push(item.weather[0].main);
    dailyForecasts[date].humidity.push(item.main.humidity);
    dailyForecasts[date].wind.push(item.wind.speed);
    dailyForecasts[date].items.push(item);
  });
  
  // Calculate averages and determine main condition
  return Object.values(dailyForecasts).map(day => {
    // Calculate average temperature
    const avgTemp = day.temperatures.reduce((sum, temp) => sum + temp, 0) / day.temperatures.length;
    
    // Get most common weather condition
    const conditionCount = {};
    let maxCount = 0;
    let mainCondition = '';
    
    day.conditions.forEach(condition => {
      conditionCount[condition] = (conditionCount[condition] || 0) + 1;
      if (conditionCount[condition] > maxCount) {
        maxCount = conditionCount[condition];
        mainCondition = condition;
      }
    });
    
    // Calculate average humidity and wind
    const avgHumidity = day.humidity.reduce((sum, h) => sum + h, 0) / day.humidity.length;
    const avgWind = day.wind.reduce((sum, w) => sum + w, 0) / day.wind.length;
    
    return {
      day: day.date,
      dayOfWeek: day.dayOfWeek,
      date: day.formattedDate,
      avgTemp: Math.round(avgTemp),
      minTemp: Math.round(Math.min(...day.temperatures)),
      maxTemp: Math.round(Math.max(...day.temperatures)),
      condition: mainCondition,
      humidity: Math.round(avgHumidity),
      wind: Math.round(avgWind * 10) / 10,
      items: day.items
    };
  }).slice(0, 7); // Only return 7 days
};

// Get geo coordinates from city name
export const getGeoCoordinates = async (city) => {
  try {
    const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct`, {
      params: {
        q: city,
        limit: 1,
        appid: API_KEY
      }
    });
    
    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { lat, lon };
    }
    
    throw new Error('City not found');
  } catch (error) {
    console.error('Error fetching geo coordinates:', error);
    throw error;
  }
};