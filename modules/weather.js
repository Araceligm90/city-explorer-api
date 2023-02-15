'use strict';

const axios = require('axios');

function getWeather(req, res, next) {
  let city = req.query.searchQuery;
  const weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_API_KEY}&days=10`;

  axios.get(weatherUrl)
    .then(response => {
      let liveInfo = response.data.data.map(day => new Forecast(day));
      res.status(200).send(liveInfo);
    })
    .catch(error => next(error));
}

// create a weather class so we can store the information in it. //
class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
  }
}

// OLD WAY BEFORE REFACTORING 

// app.get('/weather', async (req, res) => {
//   let city = req.query.searchQuery;

//   let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_API_KEY}&days=10`;
//   console.log(response.data);
//   // response to get the live weather data //
//   let response = await axios.get(weatherUrl);
//   // we feed the weather data to our Forecast class //
//   let liveInfo = response.data.data.map(day => new Forecast(day));
//   // we send out the data
//   res.status(200).send(liveInfo);
// });


module.exports = getWeather;
