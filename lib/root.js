var React = require('react');
var request = require('browser-request');

var Router = require('react-router-component');
var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;

var Authentication = require('./authentication');
var CatPage = require('./cat-page');
var Index = require('./routes/index');
var NotFoundPage = require('./routes/not-found-page');
var bus = require('./bus')();
var Everything = require('./everything-canvas');
var Header = require('./header');

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

module.exports = Root;
