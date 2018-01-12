var axios = require('axios');

var _weatherURL = 'http://api.weatherbit.io/v2.0/';
var _weatherAPIKEY = 'API_KEY_HERE';

function prepRouteParams (queryStringData) {
  return Object.keys(queryStringData)
    .map(function (key) {
      return key + '=' + encodeURIComponent(queryStringData[key]);
    }).join('&')
}

function prepUrl (url, type, queryStringData) {
  return url + type + '?' + prepRouteParams(queryStringData);
}

function getCurrentQueryString (location) {
  return {
    city: location,
    units: 'I',
    key: _weatherAPIKEY
  }
}

function getForecastQueryString (location) {
  return {
    city: location,
    days: 6,
    units: 'I',
    key: _weatherAPIKEY
  }
}

function getCurrentWeather (location) {
  var currentQueryString = getCurrentQueryString(location);
  var weatherURL = prepUrl(_weatherURL, 'current', currentQueryString);
  return axios.get(weatherURL)
    .then(function (result) {
      return result.data.data[0];
    });
}

function getForecast (location) {
  var forecastQueryString = getForecastQueryString(location);
  var weatherURL = prepUrl(_weatherURL, 'forecast/daily', forecastQueryString);
  return axios.get(weatherURL)
    .then(function (result) {
      return result.data.data;
    });
}

module.exports = {
  getCurrentWeather: getCurrentWeather,
  getForecast: getForecast
};
