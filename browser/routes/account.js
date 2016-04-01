var React = require('react')
var SessionThing = require('../things/session')
var User = require('../services/user')
var UserThing = require('../things/user')

var Account = React.createClass({
  render: function () {
    var accessToken = {
      id: window.localStorage.access_token,
      expiration: window.localStorage.expiration
    }

    var user = {
      id: window.localStorage.email,
      time_zone: window.localStorage.time_zone
    }

    return (
      <div className='page'>
        <section>
          <h2>You</h2>
          <UserThing user={user} />
        </section>
        <section>
          <h2>Sessions</h2>
          <div>
            <SessionThing
              accessToken={accessToken}
              current
              actionText='Delete current session (this will log you out)'
              actionOnClick={this.logout} />
          </div>
        </section>
      </div>
    )
  },

  logout: function (e) {
    e.preventDefault()
    User.logout()
  }

})

module.exports = Account
