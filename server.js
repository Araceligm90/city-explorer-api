'use strict';

// we bring in dotenv
require('dotenv').config();

//we bring in express
const express = require('express');

// initializing express library
const app = express();

// we bring in cors
const cors = require('cors');

// anyone can make a request
app.use(cors());

const PORT = process.env.PORT || 3002;

// allows us to access weater.json
const weatherInfo = require('./data/weather.json');

app.get('/', (request, response) => {
  response.send('Your default endpoint is working');
});

app.get('/weatherInfo', (req, res) => {
  res.send(weatherInfo);
});


app.get('/weather', (req, res) =>{
  let searchQuery = req.query.searchQuery;

  // create a new forecast clas //
  let weatherForecast = new Forecast(searchQuery);
  let cityData = weatherForecast.getCityData();

  res.status(200).send(cityData);
});

class Forecast {

// create a constructor 






app.listen(PORT, () => console.log(`listening on ${PORT}`));

