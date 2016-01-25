var React = require('react');
var ReactDOM = require('react-dom');
var request = require('browser-request');
var Router = require('react-router-component');

var AccountService = require('./account-service');
var bus = require('./bus')();
var Header = require('./header');

// Routes
var Account = require('./routes/account');
var Authentication = require('./authentication');
var CatPage = require('./routes/cat');
var Everything = require('./routes/everything');
var Index = require('./routes/index');
var NotFoundPage = require('./routes/not-found-page');

var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;

var Root = React.createClass({

  render: function() {
    // <div className="notification">oops</div>
    return (
      <div>
        <Header />
        <Locations>
          <Location path="/" handler={Index} />
          <Location path="/everything" handler={Everything} />
          <Location path="/login" handler={Authentication} />
          <Location path="/account" handler={Account} />
          <Location path="/cats/:name" handler={CatPage} />
          <NotFound handler={NotFoundPage} />
        </Locations>
      </div>
    );
  }
});

// Begin execution

if (!AccountService.isLoggedIn() && window.location.pathname !== '/login') {
  window.location = '/login';
} else {
  ReactDOM.render(<Root />, document.getElementById('records'));
}

