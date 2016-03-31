var moment = require('moment')
var React = require('react')
var Thing = require('./thing')

var SessionThing = React.createClass({
  render: function () {
    // Time zone?
    var expiration = moment(this.props.accessToken.expiration)

    var fields = [
      ['Device', 'Browser'],
      ['Access token', this.props.accessToken.id, 'code'],
      ['Expires', expiration.format('dddd, MMMM Do YYYY, h:mm:ss a')],
    ]

    return (
    <Thing
      type='Session'
      fields={fields}
      actionText={this.props.actionText}
      actionOnClick={this.props.actionOnClick} />
    )
  },

})

module.exports = SessionThing
