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
app.use(cors());

const PORT = process.env.PORT || 3002;

const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies');

// allows us to access weater.json //
// const weatherInfo = require('./data/weather.json');

app.get('/', (request, response) => {
  response.send('Your default endpoint is working');
});


app.get('/weather', getWeather);
app.get('/movies', getMovies);


app.listen(PORT, () => console.log(`listening on ${PORT}`));
