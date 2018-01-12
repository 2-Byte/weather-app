var React = require('react');
var PropTypes = require('prop-types');
var queryString = require('query-string');
var api = require('../utils/api');

function ForecastGrid (props) {
  var forecast = props.forecast;

  return (
    <div>
      <h2>5-Day Forecast</h2>
      <ul>
        {forecast.map(function (weather) {
          return (
            <li key={weather.ts}>
              <h3>{weather.datetime}</h3>
              <ul>
                <li>Description: {weather.weather.description}</li>
                <li>Precipitation: {weather.pop}%</li>
                <li>High: {weather.max_temp}</li>
                <li>Low: {weather.min_temp}</li>
              </ul>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function CurrentGrid (props) {
  var current = props.current;
  var day = props.day;

  return (
    <div>
      <h2>Today's Weather</h2>
      <ul>
        <li>Temperature: {current.temp}</li>
        <li>Feels like: {current.app_temp}</li>
        <li>Description: {day.weather.description}</li>
        <li>Precipitation: {day.pop}%</li>
        <li>High: {day.max_temp}</li>
        <li>Low: {day.min_temp}</li>
      </ul>
    </div>
  )
}

ForecastGrid.propTypes = {
  forecast: PropTypes.array.isRequired
}

CurrentGrid.propTypes = {
  current: PropTypes.object.isRequired,
  day: PropTypes.object.isRequired
}

class Weather extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      location: null,
      current: null,
      forecast: null,
      loading: true,
      error: null
    }
  }
  componentDidMount () {
    var location = queryString.parse(this.props.location.search).location;
    api.getCurrentWeather(location)
      .then(function (result) {
        if(result === null) {
          return this.setState(function () {
            return {
              error: 'Looks like there was an error. Check that the location is valid.',
              loading: false
            }
          });
        }

        api.getForecast(location)
          .then(function (res) {
            if(res === null) {
              return this.setState(function () {
                return {
                  error: 'Looks like there was an error. Check that the location is valid.',
                  loading: false
                }
              });
            }

            this.setState(function () {
              return {
                location: location,
                current: result,
                forecast: res,
                loading: false,
                error: null
              }
            });
          }.bind(this));
      }.bind(this));
  }

  render () {
    var error = this.state.error;
    var loading = this.state.loading;
    var location = this.state.location;
    var current = this.state.current;
    var forecast = this.state.forecast;

    if(loading === true) {
      return <p>Loading...</p>
    }

    if(error) {
      return (
        <div>
          <p>{error}</p>
        </div>
      )
    }

    return (
      <div>
        <h1>{location}</h1>
        <CurrentGrid
          current={current}
          day={forecast[0]}
        />
        <ForecastGrid
          forecast={forecast.slice(1)}
        />
      </div>
    )
  }
}

module.exports = Weather;
