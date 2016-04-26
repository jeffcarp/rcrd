var moment = require('moment')
var React = require('react')
var Thing = require('./thing')
var User = require('../services/user')

var SessionThing = React.createClass({
  render: function () {
    // Time zone?
    var expiration = moment(this.props.session.expiration)

    var fields = [
      ['Device', 'Browser'],
      ['Access token', this.props.session.id, 'code'],
      ['Expires', expiration.format('dddd, MMMM Do YYYY, h:mm:ss a')]
    ]

    if (this.props.current) {
      return (
        <Thing
          type='Session'
          fields={fields}
          actionText='Delete current session (this will log you out)'
          actionOnClick={this.logout} />
      )
    } else {
      return (
        <Thing
          type='Session'
          fields={fields} />
      )
    }
  },
  logout: function (e) {
    e.preventDefault()
    User.logout()
  }
})

module.exports = SessionThing
