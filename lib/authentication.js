var React = require('react');
var ReactDOM = require('react-dom');

var API = require('./api');
var bus = require('./bus')();

var Authentication = React.createClass({

  getInitialState: function () {
    return {
      loading: false
    };
  },

  render: function() {
    return (
      <div 
        style={{
          margin: '0 0 1em',
          padding: '0 0 1em',
          borderBottom: 'solid 1px #ccc'
        }}>
        <h3>Login</h3>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="email"
            ref="email"
            placeholder="email@email.com"
            disabled={this.state.loading}
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
              />
          </div>
        </form>
      </div>
    );
  },

  onSubmit: function (e) {
    e.preventDefault();
    var self = this;
    var email = this.refs.email.value;
    var password = this.refs.password.value;

    this.setState({
      loading: true
    });

    API.login(email, password, function (err, response) {

      self.setState({
        loading: false
      });

      if (err) {
        console.log('there was a problem', err);
      } else {
        console.log(response);
        localStorage.email = response.email;
        localStorage.access_token = response.access_token;

        bus.emit('page-change', 'index', 'Login successful.');
      }
    });
  }

});

module.exports = Authentication;
