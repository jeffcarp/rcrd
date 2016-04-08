var API = require('../api')
var bus = require('../bus')()
var constants = require('../constants')
var React = require('react')

var Authentication = React.createClass({
  getInitialState: function () {
    return {
      loading: false
    }
  },

  render: function () {
    var autoLogin

    if (constants.localAPI) {
      autoLogin = (
        <div><a onClick={this.autoLogin}>Auto login as dev@rcrd.org</a></div>
      )
    }

    return (
      <section>
        <h1>Login</h1>
        {autoLogin}
        <form onSubmit={this.onSubmit}>
          <input
            type='text'
            name='email'
            ref='email'
            placeholder='email@email.com'
            disabled={this.state.loading}
            autoCapitalize='off'
            autoCorrect='off'
            required />
          <input
            type='password'
            name='password'
            placeholder='password'
            ref='password'
            disabled={this.state.loading}
            required />
          <div>
            <input type='submit' value='Authenticate' disabled={this.state.loading} />
          </div>
        </form>
      </section>
    )
  },

  onSubmit: function (e) {
    e.preventDefault()
    this.login()
  },

  login: function () {
    var email = this.refs.email.value
    var password = this.refs.password.value

    if (this.state.loading) return

    this.setState({ loading: true })

    API.login(email, password, function (err, response) {
      this.setState({ loading: false })

      if (err) {
        bus.emit('notification', 'There was a problem logging you in.')
      } else {
        window.localStorage.email = response.user.id
        window.localStorage.time_zone = response.user.time_zone
        window.localStorage.access_token = response.access_token.id
        window.localStorage.expiration = response.access_token.expiration

        window.location = '/'
      }
    }.bind(this))
  },

  autoLogin: function (e) {
    e.preventDefault()
    this.refs.email.value = 'dev@rcrd.org'
    this.refs.password.value = 'dev'
    this.login()
  }

})

module.exports = Authentication
