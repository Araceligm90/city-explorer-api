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


  //grabbing the city from static data. find to grab the Seattle object and store it into city
  const city = weatherInfo.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase())
//   console.log(city);

  // create a new forecast clas. we are maping over data and every object is a day. we pass that say into new forecast//
  let weatherForecast = city.data.map(day => new Forecast(day));


  res.status(200).send(weatherForecast);
});

// storing information into new object. 
class Forecast {
  constructor(day) {
    this.date = day.valid_date,
    this.description = day.weather.description,
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
