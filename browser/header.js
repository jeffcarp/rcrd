var AccountService = require('./account-service');
var bus = require('./bus')();
var classNames = require('classnames')
var constants = require('./constants');
var React = require('react');
var Link = require('react-router-component').Link;

var Header = React.createClass({

  getInitialState: function () {
    return {
      notification: null
    };
  },

  componentWillMount: function () {
    bus.on('notification', function (message) {
      this.setState({ notification: message });
     
      setTimeout(function () {
        this.setState({ notification: null });
      }.bind(this), 4e3);
    }.bind(this));
  },

  render: function () {
    var message = this.state.notification;
    var inner;
    var classes = classNames('small-section', {
      'localAPI': constants.localAPI
    })

    if (message) {

        return (
          <nav 
            className={classes}
            style={{
              backgroundColor: constants.mainBackgroundColor,
              color: 'white'
            }}>
            <span>{message}</span>
          </nav>
        );

    } else {

      if (AccountService.isLoggedIn()) {
        return (
          <nav className={classes}>
            <span className="right">
              <Link href="/account">{localStorage.email}</Link>
            </span>
            <Link href="/"><b>rcrd</b></Link>
            <Link href="/everything">everything</Link>
          </nav>
        );
      } else {
        return (
          <nav className={classes}>
            <b>rcrd</b>
            <span className="right">
              <Link href="/login">login</Link>
            </span>
          </nav>
        );
      }
    }

  }
});

module.exports = Header;