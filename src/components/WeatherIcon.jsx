import React from 'react';
import { motion } from 'framer-motion';
import { 
  WiDaySunny, 
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloud,
  WiCloudy,
  WiRain,
  WiDayRain,
  WiNightRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
  WiDust,
  WiDayShowers,
  WiNightAltShowers
} from 'react-icons/wi';

const WeatherIcon = ({ weatherCode, condition, isDay = true, size = 60 }) => {
  // Get color based on weather condition
  const getIconColor = () => {
    if (weatherCode) {
      const code = parseInt(weatherCode, 10);
      
      // Clear sky - sunny yellow during day, soft blue at night
      if (code === 800) return isDay ? '#FFD700' : '#7EB6FF';
      
      // Clouds - light gray to blue-gray
      if (code >= 801 && code <= 804) return '#A9B9C9';
      
      // Rain - blue
      if ((code >= 300 && code < 400) || (code >= 500 && code < 600)) return '#4B92DB';
      
      // Thunderstorm - purple
      if (code >= 200 && code < 300) return '#9370DB';
      
      // Snow - white
      if (code >= 600 && code < 700) return '#FFFFFF';
      
      // Mist, fog, etc - light gray
      if (code >= 700 && code < 800) return '#C4C4C4';
    }
    
    // Fallback colors based on condition string if code not available
    const conditionLower = condition ? condition.toLowerCase() : '';
    if (conditionLower.includes('clear')) return isDay ? '#FFD700' : '#7EB6FF';
    if (conditionLower.includes('cloud')) return '#A9B9C9';
    if (conditionLower.includes('rain')) return '#4B92DB';
    if (conditionLower.includes('thunder')) return '#9370DB';
    if (conditionLower.includes('snow')) return '#FFFFFF';
    if (conditionLower.includes('mist') || conditionLower.includes('fog')) return '#C4C4C4';
    
    return isDay ? '#FFD700' : '#7EB6FF'; // Default
  };

  const getIcon = () => {
    // If numeric weather code is provided, use that (from OpenWeatherMap API)
    if (weatherCode) {
      const code = parseInt(weatherCode, 10);
      
      // Clear sky
      if (code === 800) return isDay ? <WiDaySunny className="sun-animation" /> : <WiNightClear />;
      
      // Few clouds, scattered clouds
      if (code === 801 || code === 802) return isDay ? <WiDayCloudy /> : <WiNightAltCloudy />;
      
      // Broken clouds, overcast
      if (code === 803 || code === 804) return <WiCloudy className="cloud-animation" />;
      
      // Rain, drizzle
      if ((code >= 300 && code < 400) || (code >= 500 && code < 600)) {
        return isDay ? <WiDayRain className="rain-animation" /> : <WiNightRain className="rain-animation" />;
      }
      
      // Thunderstorm
      if (code >= 200 && code < 300) return <WiThunderstorm />;
      
      // Snow
      if (code >= 600 && code < 700) return <WiSnow />;
      
      // Atmosphere (mist, fog, etc)
      if (code >= 700 && code < 800) return <WiFog />;
      
      return isDay ? <WiDaySunny /> : <WiNightClear />;
    }
    
    // Fallback to string-based condition if no weatherCode provided
    const conditionLower = condition ? condition.toLowerCase() : '';
    
    switch(conditionLower) {
      case 'clear':
        return isDay ? <WiDaySunny className="sun-animation" /> : <WiNightClear />;
      
      case 'few clouds':
        return isDay ? <WiDayCloudy /> : <WiNightAltCloudy />;
      
      case 'scattered clouds':
        return <WiCloud className="cloud-animation" />;
      
      case 'broken clouds':
      case 'clouds':
        return <WiCloudy className="cloud-animation" />;
      
      case 'shower rain':
        return isDay ? <WiDayShowers className="rain-animation" /> : <WiNightAltShowers className="rain-animation" />;
      
      case 'rain':
        return isDay ? <WiDayRain className="rain-animation" /> : <WiNightRain className="rain-animation" />;
      
      case 'thunderstorm':
        return <WiThunderstorm />;
      
      case 'snow':
        return <WiSnow />;
      
      case 'mist':
      case 'fog':
        return <WiFog />;
      
      case 'dust':
      case 'sand':
      case 'haze':
        return <WiDust />;
      
      default:
        return isDay ? <WiDaySunny /> : <WiNightClear />;
    }
  };

  // Animation variants
  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: (weatherCode === 800 || condition === 'clear') && isDay ? 20 : 0,
      transition: {
        duration: 0.3
      }
    }
  };

  // Determine if we should show rain effect
  const showRainEffect = () => {
    if (weatherCode) {
      const code = parseInt(weatherCode, 10);
      return (code >= 300 && code < 400) || (code >= 500 && code < 600);
    }
    return condition === 'rain' || condition === 'shower rain';
  };
  
  // Determine if we should show sun effect
  const showSunEffect = () => {
    if (weatherCode) {
      return weatherCode === 800 && isDay;
    }
    return condition === 'clear' && isDay;
  };

  // Determine if we should show snow effect
  const showSnowEffect = () => {
    if (weatherCode) {
      const code = parseInt(weatherCode, 10);
      return code >= 600 && code < 700;
    }
    return condition === 'snow';
  };

  // Determine if we should show thunder effect
  const showThunderEffect = () => {
    if (weatherCode) {
      const code = parseInt(weatherCode, 10);
      return code >= 200 && code < 300;
    }
    return condition === 'thunderstorm';
  };

  const iconColor = getIconColor();

  return (
    <div className="weather-icon-wrapper" style={{ 
      position: 'relative',
      display: 'inline-block',
      filter: 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.2))'
    }}>
      <motion.div
        className="weather-icon"
        whileHover="hover"
        variants={iconVariants}
        style={{ 
          fontSize: `${size}px`,
          color: iconColor
        }}
      >
        {getIcon()}
      </motion.div>
      
      {showSunEffect() && (
        <div className="sun-effect" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: `${size * 1.3}px`,
          height: `${size * 1.3}px`,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, rgba(255, 215, 0, 0) 70%)`,
          zIndex: -1
        }}></div>
      )}
      
      {showRainEffect() && (
        <div className="rain-effect">
          {[...Array(8)].map((_, i) => (
            <span 
              key={i}
              className="rain-drop"
              style={{
                position: 'absolute',
                width: '2px',
                backgroundColor: 'rgba(75, 146, 219, 0.7)',
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: '-10px',
                height: `${5 + Math.random() * 10}px`,
                animationDuration: `${0.5 + Math.random() * 0.7}s`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationName: 'rain-fall',
                animationIterationCount: 'infinite',
                animationTimingFunction: 'linear'
              }}
            />
          ))}
        </div>
      )}

      {showSnowEffect() && (
        <div className="snow-effect">
          {[...Array(5)].map((_, i) => (
            <span 
              key={i}
              className="snowflake"
              style={{
                position: 'absolute',
                width: `${3 + Math.random() * 3}px`,
                height: `${3 + Math.random() * 3}px`,
                backgroundColor: 'white',
                borderRadius: '50%',
                left: `${Math.random() * 100}%`,
                top: '-10px',
                animationDuration: `${1.5 + Math.random() * 2}s`,
                animationDelay: `${Math.random() * 1}s`,
                animationName: 'snow-fall',
                animationIterationCount: 'infinite',
                animationTimingFunction: 'ease-in-out'
              }}
            />
          ))}
        </div>
      )}

      {showThunderEffect() && (
        <motion.div 
          className="thunder-effect"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.8, 0.2, 1, 0],
            transition: { 
              repeat: Infinity,
              duration: 2.5,
              repeatDelay: 3,
              ease: "easeInOut" 
            }
          }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            top: 0,
            left: 0,
            zIndex: -1
          }}
        />
      )}
    </div>
  );
};

export default WeatherIcon;