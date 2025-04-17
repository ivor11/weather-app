# Weather App

A modern, responsive weather application built with React and Vite that provides current weather data and weekly forecasts with a beautiful UI.

## Features

- 🌤️ Real-time weather data display
- 🔍 Search for weather by city name
- 📱 Fully responsive design
- 🌡️ Support for both metric and imperial units
- 📊 Weekly forecast with day-by-day breakdown
- 🌈 Beautiful UI with weather-appropriate animations
- ⚡ Fast performance with Vite

## Technology Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 6
- **Styling**: Styled Components
- **Animation**: Framer Motion
- **Date Handling**: Moment.js
- **Icons**: React Icons
- **API Client**: Axios

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/ivor11/weather-app.git
   cd weather-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create an `.env` file in the root directory and add your weather API key:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## Usage

- Enter a city name in the search bar to get current weather data
- Toggle between metric and imperial units
- View the current weather conditions including temperature, "feels like" temperature, humidity, and wind speed
- Check the weekly forecast for upcoming weather conditions

## Project Structure

```
weather-app/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── CurrentWeather.jsx
│   │   ├── SearchBar.jsx
│   │   ├── WeatherIcon.jsx
│   │   └── WeeklyForecast.jsx
│   ├── services/
│   │   └── weatherService.js
│   ├── utils/
│   │   └── weatherUtils.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .eslintrc.js
├── package.json
└── vite.config.js
```

## Building for Production

```
npm run build
```

This will generate a production-ready build in the `dist` folder.

## Preview Production Build

```
npm run preview
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Weather data provided by [OpenWeather API](https://openweathermap.org/api)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)