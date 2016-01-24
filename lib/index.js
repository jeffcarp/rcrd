var React = require('react');
var ReactDOM = require('react-dom');
var request = require('browser-request');
var Router = require('react-router-component');

var bus = require('./bus')();
var Header = require('./header');

// Routes
var Authentication = require('./authentication');
var CatPage = require('./cat-page');
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
          <Location path="/authenticate" handler={Authentication} />
          <NotFound handler={NotFoundPage} />
        </Locations>
      </div>
    );
  }
});

ReactDOM.render(<Root />, document.getElementById('records'));
