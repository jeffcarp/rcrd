var React = require('react')
var SessionThing = require('../things/session')
var UserThing = require('../things/user')

var Account = React.createClass({
  render: function () {
    var accessToken = {
      id: localStorage.access_token,
      expiration: localStorage.expiration,
    }

    var user = {
      id: localStorage.email,
      time_zone: localStorage.time_zone
    }

    return (
    <div className="page">
      <section>
        <h2>You</h2>
        <UserThing user={user} />
      </section>
      <section>
        <h2>Sessions</h2>
        <div>
          <SessionThing
            accessToken={accessToken}
            current={true}
            actionText='Delete current session (this will log you out)'
            actionOnClick={this.logout} />
        </div>
      </section>
    </div>
    )
  },

  logout: function (e) {
    e.preventDefault()

    console.log('logout')

    delete localStorage.email
    delete localStorage.access_token

    window.location = '/login'
  }

})

module.exports = Account
