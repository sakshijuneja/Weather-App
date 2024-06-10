import React from "react";
import "../styles/currentWeather.css";
import AirIcon from '@mui/icons-material/Air';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import moment from 'moment';

function getGreeting() {
  const currentHour = new Date().getHours();
  if (currentHour < 12) return "Good Morning";
  if (currentHour < 18) return "Good Afternoon";
  return "Good Evening";
}

function formatDate(date, offset) {
  return moment(date).utcOffset(offset / 60).format('LL');
}

function formatTime(date, offset) {
  return moment(date).utcOffset(offset / 60).format('hh:mm A');
}

export default function CurrentWeather({ currentWeatherData, isDarkMode }) {
  console.log("currentWeatherData", currentWeatherData);

  const currentDate = new Date();
  const offset = currentWeatherData.timezone; // assuming timezone offset is in seconds
  const weatherIcon = require(`../assests/icons/${currentWeatherData.weather[0].icon}.png`);

  return (
    <div className={`current-weather ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="current-city-details-top">
        <p className="current-city-name">{currentWeatherData.city}</p>
        <p className="current-city-greetings">{getGreeting()}</p>
        <div className="current-city-date-n-time">
          <p className="current-city-date">{formatDate(currentDate, offset)}</p>
          <p className="current-city-time">{formatTime(currentDate, offset)}</p>
        </div>
      </div>
      <div className="current-city-weather">
        <div className="current-city-weather-icon">
          <img
            alt="weather"
            className="current-city-weather-icon"
            src={weatherIcon}
          />
        </div>
        <div className="current-city-weather-info-details">
          <h1 className="current-city-weather-temp">
            {Math.round(currentWeatherData.main.temp)}°C
          </h1>
          <p className="current-city-weather-desc">
            {currentWeatherData.weather[0].description}
          </p>
          <div className="current-city-weather-humidity-n-wind-speed">
            <div className="current-city-weather-humidity-container">
              <WaterDropIcon />
              <div className="current-city-weather-humidity">
                <p>{currentWeatherData.main.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="current-city-weather-wind-speed-container">
              <AirIcon />
              <div className="current-city-weather-wind-speed">
                <p>{currentWeatherData.wind.speed} Km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
