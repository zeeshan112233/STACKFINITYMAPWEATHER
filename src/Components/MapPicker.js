/*global google*/
import React, { useState } from 'react';
import MapPicker from 'react-google-map-picker';
import WeatherBox from './weatherBox';
const API_KEY = '9e0fc039c25d7f2fda6bf08e';
const DefaultLocation = { lat: 33.6844, lng: 73.0479 };
const DefaultCity = 'Islamabad';
const DefaultZoom = 10;

const MapPick = () => {
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
  const [location, setLocation] = useState(defaultLocation);
  const [city, setCity] = useState(DefaultCity);
  const [zoom, setZoom] = useState(DefaultZoom);
  const [weatherByDate, setWeatherByDate] = useState(null);
  const [weatherByTime, setWeatherByTime] = useState(null);

  function handleChangeLocation(lat, lng) {
    setLocation({ lat: lat, lng: lng });
    var latlng = {
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    };
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK') {
        var result = results[0].address_components.filter(
          (address_components) =>
            address_components.types.some(
              (type) => type === 'administrative_area_level_3'
            )
        );
        console.log(result);
        if (result.length > 0) {
          handleCity(result[0].long_name);
        }
      } else {
        console.log(status);
      }
    });
  }
  async function handleCity(city) {
    setCity(city);
    await handleWeather(city);
    console.log(city);
  }
  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  function handleResetLocation() {
    setDefaultLocation({ ...DefaultLocation });
    setZoom(DefaultZoom);
  }

  async function handleWeather(city) {
    const api_url = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city},pk&appid=${API_KEY}&units=metric`
    );
    const data = await api_url.json();
    if (city && data.cod === '200') {
      console.log(data);
      let weatherByDatee = [];
      let weatherByTimee = [];
      let dates = new Set(data.list.map((data) => data.dt_txt.slice(0, 10)));
      let newWeather = [...weatherByDatee];

      dates.forEach((element) => {
        let obj = {};
        obj.date = element;
        obj.data = data.list.filter((lis) => lis.dt_txt.includes(element));
        newWeather.push(obj);
        setWeatherByDate(newWeather);
      });
      console.log(newWeather);

      let times = newWeather.map((data) => data.data[0]);
      let newWeatherByTime = [...times];
      setWeatherByTime(newWeatherByTime);
      console.log(newWeatherByTime);
      // setWeatherByTime(weatherByTimee);
      // setWeatherByDate([...weatherByDatee]);
    } else {
      setWeatherByTime([]);
      setWeatherByDate([]);
      // toast.error('Location Not found, enter the name of cities only');
      // this.setState({
      //   weatherByDate: undefined,
      //   weatherByTime: undefined,
      //   error: 'Location Not found, enter the name of cities only',
      // });
    }
  }
  return (
    <div >
      <div >
        <label >Latitute:</label>
        <input style={{ margin: "2%" }} type="text" value={location.lat} disabled />
        <label>Longitute:</label>
        <input type="text" value={location.lng} disabled />
        <label>Zoom:</label>
        <input type="text" value={zoom} disabled />
        <label>City:</label>
        <input type="text" value={city} disabled />
        <br />
        <button onClick={handleResetLocation}>Reset Location</button>
        <MapPicker
          defaultLocation={defaultLocation}
          zoom={zoom}
          style={{ height: '400px' }}
          onChangeLocation={handleChangeLocation}
          onChangeZoom={handleChangeZoom}
          apiKey="AIzaSwKL9zAZIpj7CKQeNoFUIE6Ss"
        />
      </div>
      <div>
        <WeatherBox weather={weatherByTime} city={city} />
      </div>
    </div>
  );
};

export default MapPick;
