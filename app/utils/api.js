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

function getDayOfWeek (date) {
  switch (new Date(date).getDay()) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tues";
    case 3:
      return "Wed";
    case 4:
      return "Thurs";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
  }
}

function getMonth (month) {
  switch (month) {
    case '01':
      return "Jan";
    case '02':
      return "Feb";
    case '03':
      return "Mar";
    case '04':
      return "Apr";
    case '05':
      return "May";
    case '06':
      return "Jun";
    case '07':
      return "Jul";
    case '08':
      return "Aug";
    case '09':
      return "Sept";
    case '10':
      return "Oct";
    case '11':
      return "Nov";
    case '12':
      return "Dec";
    default:
      return month;
  }
}

module.exports = {
  getCurrentWeather: getCurrentWeather,
  getForecast: getForecast,
  getDayOfWeek: getDayOfWeek,
  getMonth: getMonth
};
