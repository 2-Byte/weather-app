var React = require('react');
var Link = require('react-router-dom').Link;
var PropTypes = require('prop-types');
var Weather = require('./Weather');

class LocationInput extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      location: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    var value = event.target.value;

    this.setState(function () {
      return {
        location: value
      }
    })
  }

  render() {
    return (
      <div className='center'>
        <h1>{this.props.prompt}</h1>
        <input
          placeholder={this.props.placeholder}
          type='text'
          autoComplete='off'
          onChange={this.handleChange}
        />
        <br/>
        <Link
          to={{
            pathname: '/weather',
            search: `?location=` + this.state.location
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
