import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import WeatherIcon from './WeatherIcon';
import moment from 'moment';

const CurrentWeather = ({ data, unit = 'metric' }) => {
  if (!data) return null;

  const temp = Math.round(data.main?.temp);
  const condition = data.weather[0]?.main;
  const weatherDescription = data.weather[0]?.description;
  const feelsLike = Math.round(data.main?.feels_like);
  const humidity = data.main?.humidity;
  const wind = Math.round(data.wind?.speed);
  const windUnit = unit === 'metric' ? 'm/s' : 'mph';
  const tempUnit = unit === 'metric' ? '°C' : '°F';

  return (
    <CurrentWeatherContainer
      className="current-weather"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <WeatherInfo>
        <div>
          <CityName>{data.name}, {data.sys?.country}</CityName>
          <DateText>{moment().format('dddd, MMMM Do YYYY')}</DateText>
          <WeatherDescription>{weatherDescription}</WeatherDescription>
        </div>
        
        <TempContainer>
          <IconWrapper>
            <WeatherIcon condition={condition} size={80} />
          </IconWrapper>
          <Temperature>{temp}{tempUnit}</Temperature>
        </TempContainer>
      </WeatherInfo>

      <WeatherDetails>
        <DetailItem>
          <DetailLabel>Feels Like</DetailLabel>
          <DetailValue>{feelsLike}{tempUnit}</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Humidity</DetailLabel>
          <DetailValue>{humidity}%</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Wind</DetailLabel>
          <DetailValue>{wind} {windUnit}</DetailValue>
        </DetailItem>
      </WeatherDetails>
    </CurrentWeatherContainer>
  );
};

const CurrentWeatherContainer = styled(motion.div)`
  background: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  border-radius: 20px;
  padding: 2rem;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  margin-bottom: 2rem;
  overflow: hidden;
  position: relative;
`;

const WeatherInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const CityName = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const DateText = styled.div`
  font-size: 1.1rem;
  opacity: 0.8;
  margin: 0.5rem 0;
`;

const WeatherDescription = styled.div`
  font-size: 1.3rem;
  margin-top: 0.5rem;
  text-transform: capitalize;
`;

const TempContainer = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
`;

const IconWrapper = styled.div`
  margin-right: 1rem;
`;

const Temperature = styled.div`
  font-size: 3.5rem;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const WeatherDetails = styled.div`
  display: flex;
  justify-content: space-around;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1rem 0.5rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DetailLabel = styled.span`
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 0.3rem;
`;

const DetailValue = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
`;

export default CurrentWeather;