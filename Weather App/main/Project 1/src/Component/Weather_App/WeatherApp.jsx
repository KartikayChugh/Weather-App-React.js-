import React, { useState } from "react";
import "./styles.css";

import search_icon from "../Asset/search.png";
import sunny_icon from "../Asset/sun.png";
import cloudy_icon from "../Asset/cloudy.png";
import drizzle_icon from "../Asset/Drizzle.png";
import humid_icon from "../Asset/humidity.png";
import rain_icon from "../Asset/rainy.png";
import snow_icon from "../Asset/snowy.png";
import thunder_icon from "../Asset/Thunder storm.png";
import wind_icon from "../Asset/wind.png";

const WeatherApp = () => {
  const API_key = "d04933aafdcd68a89bb1ea420bfdf75a";
  const [inputVal, setInputVal] = useState("");
  const [wicon, setWicon] = useState(cloudy_icon);
  const [weatherData, setWeatherData] = useState({
    location: "Search a location",
    temperature: "N/A",
    humidity: "N/A",
    windSpeed: "N/A",
  });

  const search = async () => {
    if (!inputVal) {
      alert("Please enter a location.");
      return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&units=metric&appid=${API_key}`;

    try {
      let response = await fetch(url);
      if (!response.ok) throw new Error("Weather data not found.");
      let data = await response.json();

      setWeatherData({
        location: data.name,
        temperature: `${data.main.temp} °C`,
        humidity: `${data.main.humidity}%`,
        windSpeed: `${data.wind.speed} km/h`,
      });

      const iconCode = data.weather[0].icon;
      const iconMap = {
        "01d": sunny_icon,
        "01n": sunny_icon,
        "02d": cloudy_icon,
        "02n": cloudy_icon,
        "03d": cloudy_icon,
        "03n": cloudy_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
        "11d": thunder_icon,
        "11n": thunder_icon,
      };
      setWicon(iconMap[iconCode] || cloudy_icon);
    } catch (error) {
      alert("Failed to fetch weather data: " + error.message);
    }
  };

  return (
    <div className="main">
      <div className="container">
        <nav className="top-bar">
          <input
            type="text"
            className="cityInput"
            placeholder="Search Country"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <div className="searchIcon" onClick={search}>
            <img className="xyz" src={search_icon} alt="Search" />
          </div>
        </nav>

        <div className="country">
          <article className="Weather-location">{weatherData.location}</article>
        </div>

        <section className="element">
          <img src={wicon} alt="Weather Icon" className="icon" />
          <section className="data">
            <article className="weather-temperature">
              {weatherData.temperature}
            </article>
            <article className="text">Temperature</article>
          </section>
        </section>

        <section className="element">
          <img src={humid_icon} alt="Humidity Icon" className="icon" />
          <section className="data">
            <article className="Humidity-percentage">
              {weatherData.humidity}
            </article>
            <article className="text">Humidity</article>
          </section>
        </section>

        <section className="element">
          <img src={wind_icon} alt="Wind Icon" className="icon" />
          <section className="data">
            <article className="Wind-speed">{weatherData.windSpeed}</article>
            <article className="text">Wind speed</article>
          </section>
        </section>
      </div>
    </div>
  );
};

export default WeatherApp;
