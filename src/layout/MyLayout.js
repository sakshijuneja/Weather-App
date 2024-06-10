import React, { useState, useEffect } from "react";
import "../styles/myLayout.css";
import Search from "../components/Search";
import CurrentWeather from "../components/CurrentWeather";
import { WEATHER_API_KEY, WEATHER_API_URL } from "../services/Api";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function MyLayout() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (!currentWeather) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const url = `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`;

        fetch(url)
          .then(response => response.json())
          .then(data => {
            setCurrentWeather({ city: data.name, ...data });
          })
          .catch(error => {
            console.error('Error fetching weather data', error);
          });
      });
    }
  }, [currentWeather]);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const url = `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setCurrentWeather({ city: searchData.label, ...data });
      })
      .catch(err => console.log(err));
  };

  const handleToggleClick = () => {
    setIsDarkMode(!isDarkMode);
  };

  const logoUrl = isDarkMode
    ? require("../assests/images/my-weather-logo-dark.png")
    : require("../assests/images/my-weather-logo.png");

  return (
    <div className={`layout-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="my-weather-logo-container">
        <div
          className="my-weather-logo"
          style={{ backgroundImage: `url(${logoUrl})` }}
        ></div>
        <div className="toggle-icon-container">
          <IconButton onClick={handleToggleClick} color="inherit">
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </div>
      </div>

      <div className="layout-content-container">
        <div className={`layout-content-container-content ${isDarkMode ? "dark-mode" : "light-mode"}`}>
          <div className="layout-content-search-bar-container">
            <div className="layout-content-search-bar-search">
              <Search onSearchChange={handleOnSearchChange} isDarkMode={isDarkMode}/>
            </div>
          </div>
          <div className="layout-content-info-container">
            <div className="layout-content-info-container-info">
              {currentWeather && <CurrentWeather currentWeatherData={currentWeather} isDarkMode={isDarkMode}/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
