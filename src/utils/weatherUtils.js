import moment from 'moment';

// Format Unix timestamp to readable date format
export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
};

// Format Unix timestamp to time only
export const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

// Get day name from timestamp (e.g., "Mon", "Tue")
export const getDayName = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

// Convert temperature from Celsius to Fahrenheit
export const celsiusToFahrenheit = (celsius) => {
  return (celsius * 9/5) + 32;
};

// Convert temperature from one unit to another
export const convertTemperature = (temp, fromUnit = 'celsius', toUnit = 'fahrenheit') => {
  if (fromUnit === toUnit) return temp;
  
  if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
    return (temp * 9/5) + 32;
  }
  
  if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
    return (temp - 32) * 5/9;
  }
  
  return temp;
};

// Group forecast data by day
export const groupForecastByDay = (forecastList) => {
  if (!forecastList || !forecastList.length) return [];
  
  const groupedForecast = {};
  
  forecastList.forEach(item => {
    // Get the date part only (without time)
    const date = new Date(item.dt * 1000);
    const dateString = date.toISOString().split('T')[0];
    
    if (!groupedForecast[dateString]) {
      groupedForecast[dateString] = [];
    }
    
    groupedForecast[dateString].push(item);
  });
  
  // Get representative forecast for each day (around noon)
  return Object.values(groupedForecast).map(dayForecasts => {
    // Try to get the forecast for around noon
    const noonForecast = dayForecasts.find(forecast => {
      const date = new Date(forecast.dt * 1000);
      const hour = date.getHours();
      return hour >= 11 && hour <= 14;
    });
    
    // If no noon forecast, use the first one
    return noonForecast || dayForecasts[0];
  });
};

// Get appropriate background gradient based on weather condition and time
export const getWeatherBackground = (condition, isDay = true) => {
  const conditionLower = condition ? condition.toLowerCase() : '';
  
  // Day backgrounds
  if (isDay) {
    switch(conditionLower) {
      case 'clear':
        return 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)';
      
      case 'clouds':
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds':
        return 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)';
      
      case 'rain':
      case 'shower rain':
        return 'linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)';
      
      case 'thunderstorm':
        return 'linear-gradient(to top, #09203f 0%, #537895 100%)';
      
      case 'snow':
        return 'linear-gradient(to top, #dfe9f3 0%, white 100%)';
      
      case 'mist':
      case 'fog':
        return 'linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)';
      
      default:
        return 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)';
    }
  } 
  // Night backgrounds
  else {
    switch(conditionLower) {
      case 'clear':
        return 'linear-gradient(to bottom, #020111 85%, #191621 100%)';
      
      case 'clouds':
      case 'few clouds':
      case 'scattered clouds':
      case 'broken clouds':
        return 'linear-gradient(to bottom, #2c3e50, #4ca1af)';
      
      case 'rain':
      case 'shower rain':
        return 'linear-gradient(to bottom, #4b6cb7, #182848)';
      
      case 'thunderstorm':
        return 'linear-gradient(to bottom, #232526, #414345)';
      
      case 'snow':
        return 'linear-gradient(to bottom, #4b6cb7, #182848)';
      
      case 'mist':
      case 'fog':
        return 'linear-gradient(to bottom, #757f9a, #d7dde8)';
      
      default:
        return 'linear-gradient(to bottom, #2c3e50, #4ca1af)';
    }
  }
};

// Check if it's day or night at the given location
export const isDayTime = (sunrise, sunset, currentTime = null) => {
  const now = currentTime ? moment.unix(currentTime) : moment();
  const sunriseTime = moment.unix(sunrise);
  const sunsetTime = moment.unix(sunset);
  
  return now.isAfter(sunriseTime) && now.isBefore(sunsetTime);
};

// Function to determine if weather is considered "bad" (for UI warnings)
export const isBadWeather = (condition) => {
  const badWeatherTypes = [
    'thunderstorm', 
    'drizzle', 
    'rain', 
    'snow', 
    'tornado', 
    'squall'
  ];
  
  return badWeatherTypes.some(type => 
    condition.toLowerCase().includes(type));
};

// Get appropriate weather advice based on conditions
export const getWeatherAdvice = (condition, temp) => {
  const conditionLower = condition ? condition.toLowerCase() : '';
  
  if (conditionLower.includes('thunderstorm')) {
    return 'Stay indoors and away from windows during thunderstorms.';
  }
  
  if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    return 'Don\'t forget your umbrella today!';
  }
  
  if (conditionLower.includes('snow')) {
    return 'Bundle up! It\'s snowing outside.';
  }
  
  if (conditionLower.includes('clear')) {
    if (temp > 30) {
      return 'It\'s hot and sunny! Stay hydrated and use sunscreen.';
    }
    return 'Clear skies today! Enjoy the sunshine!';
  }
  
  if (conditionLower.includes('clouds')) {
    return 'Partly cloudy today. Carry a light jacket just in case.';
  }
  
  if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
    return 'Drive carefully! Visibility may be reduced due to fog.';
  }
  
  return 'Have a great day, whatever the weather!';
};