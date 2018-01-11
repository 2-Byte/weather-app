var React = require('react');
var PropTypes = require('prop-types');
var queryString = require('query-string');
var api = require('../utils/api');

function ForecastGrid (props) {
  var forecast = props.forecast;
  console.log(forecast);
  return (
    <ul>
      {forecast.map(function (weather) {
        return (
          <li key={weather.dt}>
            <h3>{weather.dt}</h3>
            <ul>
              <li>
                Temperature:
                {weather.temp.day}
              </li>
                <li>
                  Humidity:
                  {weather.humidity}
                </li>
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

ForecastGrid.propTypes = {
  forecast: PropTypes.array.isRequired
}

class Weather extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      location: null,
      forecast: null,
      loading: true,
      error: null
    }
  }
  componentDidMount () {
    var location = queryString.parse(this.props.location.search).location;
    api.getWeather(location)
      .then(function (results) {
        if(results === null) {
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
            forecast: results.list,
            loading: false,
            error: null
          }
        });
      }.bind(this));
  }

  render () {
    var error = this.state.error;
    var loading = this.state.loading;
    var location = this.state.location;
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
        <h2>5-Day Forecast</h2>
        <ForecastGrid
          forecast={forecast}
        />
      </div>
    )
  }
}

module.exports = Weather;
