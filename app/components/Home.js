var React = require('react');
var Link = require('react-router-dom').Link;
var PropTypes = require('prop-types');
var Weather = require('./Weather');

class LocationInput extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      location: '',
      city: '',
      state: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    var value = event.target.value;
    var cityState = value.split(',');
    var city = cityState[0] === undefined ? '' : cityState[0];
    var state = cityState[1] === undefined ? '' : cityState[1];

    this.setState(function () {
      return {
        location: value,
        city: city,
        state: state
      }
    })
  }

  render() {
    return (
      <div>
        <h1>{this.props.prompt}</h1>
        <input
          placeholder={this.props.placeholder}
          type='text'
          autoComplete='off'
          onChange={this.handleChange}
        />

        <Link
          to={{
            pathname: '/weather',
            search: `?city=` + this.state.city + `&state=` + this.state.state
          }}>
          {this.props.label}
        </Link>
      </div>
    )
  }
}

LocationInput.propTypes = {
  prompt: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

function Home () {
  return (
    <LocationInput
      prompt='Enter a Location'
      placeholder='Stony Brook, New York'
      label='Get Weather'
    />
  )
}

module.exports = Home;
