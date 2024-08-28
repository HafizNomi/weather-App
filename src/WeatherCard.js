import React from "react";
import "./WeatherCard.css";

export const WeatherCard = ({ date, temperature, description, icon }) => {
  const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;

  return (
    <div className="weatherCard">
      <img src={iconUrl} alt={description} />
      <div className="weatherInfo">
        <h3>{date}</h3>
        <p>Temperature: {temperature}°C</p>
        <p>Description: {description}</p>
      </div>
    </div>
  );
};
