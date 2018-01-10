var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Home = require('./Home');
var Weather = require('./Weather');

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/weather' component={Weather} />
            <Route render={function () {
              return <p>Page not found</p>
            }} />
          </Switch>
        </div>
      </Router>
    )
  }
}

module.exports = App;
