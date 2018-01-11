var axios = require('axios');

var _baseURL = 'http://api.openweathermap.org/data/2.5/';
var _APIKEY = 'API_KEY_HERE';

function prepRouteParams (queryStringData) {
  return Object.keys(queryStringData)
    .map(function (key) {
      return key + '=' + encodeURIComponent(queryStringData[key]);
    }).join('&')
}

function prepUrl (type, queryStringData) {
  return _baseURL + type + '?' + prepRouteParams(queryStringData);
}

function getQueryStringData (location) {
  return {
    q: location,
    type: 'accurate',
    APPID: _APIKEY,
    cnt: 5
  }
}

function getWeather (location) {
  var queryStringData = getQueryStringData(location);
  var url = prepUrl('forecast/daily', queryStringData)

  return axios.get(url)
    .then(function (weatherData) {
      return weatherData.data
    })
}

module.exports = {
  getWeather: getWeather
};
