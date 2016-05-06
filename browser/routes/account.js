var API = require('../api')
var React = require('react')
var SessionThing = require('../things/session')
var User = require('../services/user')
var UserThing = require('../things/user')

var Account = React.createClass({

  getInitialState: function () {
    return {
      sessions: []
    }
  },

  componentWillMount: function () {
    API.getSessions(function (err, sessions) {
      if (err) return console.error(err)
      if (sessions) {
        this.setState({ sessions: sessions })
      }
    }.bind(this))
  },

  render: function () {
    var user = {
      id: User.email(),
      time_zone: User.time_zone()
    }

    return (
      <div className='page'>
        <section>
          <h2>You</h2>
          <UserThing user={user} />
        </section>
        <section>
          <h2>Sessions</h2>
          <div className='pfv'>
            <a onClick={User.logout} href='#'>Log out current session</a>
          </div>
          <div>
            {this.state.sessions.map(function (session, i) {
              return (
                <SessionThing
                  session={session}
                  key={i}
                  current={User.access_token() === session.id}
                  />
              )
            })}
          </div>
        </section>
      </div>
    )
  }

})

module.exports = Account
