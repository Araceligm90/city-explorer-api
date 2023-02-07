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

//bringing in axios
const axios = require('axios')

const PORT = process.env.PORT || 3002;

// allows us to access weater.json
const weatherInfo = require('./data/weather.json');

app.get('/', (request, response) => {
  response.send('Your default endpoint is working');
});

app.get('/weatherInfo', (req, res) => {
  res.send(weatherInfo);
});


app.get('/weather', async (req, res) => {
  let searchQuery = req.query.searchQuery;

  let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&city=${searchQuery}&day=10`
  let response = await axios.get(weatherUrl);
  // create a new forecast class. we are maping over data and every object is a day. we pass that say into new forecast//
  let weatherForecast = response.data.data.map(day => new Forecast(day));
  res.status(200).send(weatherForecast);
}
);

//grabbing the city from static data. find to grab the Seattle object and store it into city. Commented our for server info
// const city = weatherInfo.find(city => city.city_name.toLowerCase() === searchQuery.toLowerCase())
//   console.log(city);



app.get('/movies', async (req, res) => {
  let searchQuery2 = req.query.searchQuery2;

  let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_APY_KEY}&query=${searchQuery2}`

  let response2 = await axios.get(movieUrl);
  let movieList = response2.data.results.map(obj => new Movies(obj));

  res.status(200).send(movieList);

});



// storing information into new object.
class Forecast {
  constructor(day) {
    this.date = day.valid_date,
    this.description = day.weather.description
  }
}

class Movies {
  constructor(movie) {
    this.ttile = movie.title,
    this.overview = movie.overview,
    this.average_votes = movie.vote_average,
    this.total_votes = movie.vote_count,
    this.image_url = movie.poster_path,
    this.popularity = movie.popularity,
    this.released_on = movie.released_date
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
