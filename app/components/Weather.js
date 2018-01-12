var React = require('react');
var PropTypes = require('prop-types');
var queryString = require('query-string');
var api = require('../utils/api');

function RainSVG (props) {
  return (
    <svg viewBox="0 0 76.977 76.977" className='raindrop'>
      <path d="M38.489,76.977c-15.54,0-28.183-12.643-28.183-28.182c0-14.53,23.185-44.307,25.828-47.654C36.703,0.421,37.571,0,38.488,0   c0.917,0,1.785,0.42,2.354,1.141c2.644,3.348,25.828,33.124,25.828,47.654C66.671,64.334,54.029,76.977,38.489,76.977z    M38.489,7.917c-7.847,10.409-22.183,31.389-22.183,40.878c0,12.231,9.951,22.182,22.183,22.182s22.183-9.95,22.183-22.182   C60.671,39.306,46.335,18.326,38.489,7.917z"></path>
	    <path d="M38.489,64.981c-1.657,0-3-1.343-3-3s1.343-3,3-3c5.616,0,10.186-4.567,10.186-10.183c0-1.657,1.343-3,3-3   c1.656,0,3,1.343,3,3C54.674,57.721,47.413,64.981,38.489,64.981z"></path>
    </svg>
  )
}

function ForecastGrid (props) {
  var forecast = props.forecast;

  return (
    <div className='col-7'>
      {forecast.map(function (weather) {
        var date = weather.datetime.split('-');
        var dayOfWeek = api.getDayOfWeek(weather.datetime);
        var month = api.getMonth(date[1]);
        var day = date[2];
        
        return (
          <div key={weather.ts} className='col-12'>
            <div className='col-4'>
              <div className='font-semi-heavy left col-12'>
                {dayOfWeek}, {month} {day}
              </div>
              <div className='font-light left col-12'>
                <RainSVG /> {weather.pop}%
              </div>
            </div>
            <div className='col-8'>
              <div className='font-light right col-12'>
                {weather.weather.description}
              </div>
              <div className='font-light right col-12'>
                {weather.max_temp}° / {weather.min_temp}°  &nbsp;&nbsp;
                ({weather.app_max_temp}° / {weather.app_min_temp}°)
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function CurrentGrid (props) {
  var current = props.current;
  var day = props.day;

  return (
    <div className='col-4'>
      <div className='center'>{day.weather.description}</div>
      <div className='temperature center'>{current.temp}°</div>
      <div className='center'>Feels Like {current.app_temp}°</div>
      <br/>
      <div className='justify-text'>Precipitation {day.pop}%</div>
      <div className='justify-text'>High {day.max_temp}°</div>
      <div className='justify-text'>Low {day.min_temp}°</div>
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
        <h2 className='center'>{location}</h2>
        <div className='row'>
          <CurrentGrid
            current={current}
            day={forecast[0]}
          />
          <div className='col-1'></div>
          <ForecastGrid
            forecast={forecast.slice(1)}
          />
        </div>
      </div>
    )
  }
}

module.exports = Weather;
