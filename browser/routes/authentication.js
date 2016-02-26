var React = require('react');
var ReactDOM = require('react-dom');

var API = require('../api');
var bus = require('../bus')();

var Authentication = React.createClass({

  getInitialState: function () {
    return {
      loading: false
    };
  },

  render: function() {
    return (
      <section>
        <h1>Login</h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="email"
            ref="email"
            placeholder="email@email.com"
            disabled={this.state.loading}
            autoCapitalize="off"
            autoCorrect="off"
            required
            />
          <input
            type="password"
            name="password"
            placeholder="password"
            ref="password"
            disabled={this.state.loading}
            required
            />
          <div>
            <input
              type="submit"
              value="Authenticate"
              disabled={this.state.loading}
              />
          </div>
        </form>
      </section>
    );
  },

  onSubmit: function (e) {
    e.preventDefault();
    var email = this.refs.email.value;
    var password = this.refs.password.value;

    this.setState({ loading: true });

    API.login(email, password, function (err, response) {

      this.setState({ loading: false });

      if (err) {
        bus.emit('notification', 'There was a problem logging you in.');
      } else {
        localStorage.email = response.user.id
        localStorage.time_zone = response.user.time_zone
        localStorage.access_token = response.access_token.id
        localStorage.expiration = response.access_token.expiration
        
        window.location = '/'
      }
    }.bind(this));
  }

});

module.exports = Authentication;
