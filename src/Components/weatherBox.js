import React from 'react';
import { Carousel } from 'antd';

const weekday = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
function RenderWeather({ Weather, city }) {
  if (Weather != null && city != null) {
    return (
      <div className="weatherbox">
        <div style={{ background: 'white', color: 'black' }}>
          <h2>Weather Details</h2>
        </div>
        <hr />
        {Weather.map((weather, key) => {
          return (
            <div>
              <h2 key={key} id="day">
                {weekday[new Date(Date.parse(weather.dt_txt)).getDay()]}
              </h2>
              <h2 id="date">
                {new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                }).format(new Date(Date.parse(weather.dt_txt)))}
              </h2>
              <h1 id="temp">{Math.round(weather.main.temp)}°C</h1>
              <h2 id="place">{city}</h2>
              <h2 id="detail">{weather.weather[0].description}</h2>
              <h2 id="icon">
                <img
                  alt="Weather icon"
                  src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                />
              </h2>
              <hr />
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div></div>;
  }
}

const weatherBox = (props) => {
  if (props.weather != null) {
    return (
      <div>
        <RenderWeather Weather={props.weather} city={props.city} />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default weatherBox;
