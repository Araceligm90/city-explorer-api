'use strict';

// we bring in dotenv //
require('dotenv').config();

//we bring in express //
const express = require('express');

// initializing express library //
const app = express();

// we bring in cors //
const cors = require('cors');

// anyone can make a request //

// bringing in axios //
const axios = require('axios');

const PORT = process.env.PORT || 3002;

// allows us to access weater.json //
const weatherInfo = require('./data/weather.json');

app.get('/', (request, response) => {
  response.send('Your default endpoint is working');
});

app.get('/weather', async (req, res) => {
  let city = req.query.searchQuery;

  let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_API_KEY}&days=10`;
  console.log(response.data);
  // response to get the live weather data //
  let response = await axios.get(weatherUrl);
  // we feed the weather data to our Forecast class //
  let liveInfo = response.data.data.map(day => new Forecast(day));
  // we send out the data
  res.status(200).send(liveInfo);
});



app.get('/movies', async (req, res) => {
  let movie = req.query.searchQuery;

  let moviesUrl = `https://api.themoviedb.org/3/search/movie/?api_key=${process.env.MOVIE_APY_KEY}&query=${movie}`;
  let response = await axios.get(moviesUrl);
  console.log(response.data);
  let liveInfo = response.data.results.map(movie => new Movies(movie));
  res.status(200).send(liveInfo);
});


// create a weather class so we can store the information in it. //
class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
  }
}

// create a movies class so we can store info in it
class Movies {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.average_votes = movie.average_votes;
    this.poster = movie.poster_path;
    this.popularity = movie.popularity;
    this.released_on = movie.release_date
  }
}



app.listen(PORT, () => console.log(`listening on ${PORT}`));
