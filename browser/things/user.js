var React = require('react')
var Thing = require('./thing')

var UserThing = React.createClass({
  render: function () {
    var fields = [
      ['Email', this.props.user.id],
      ['Time Zone', this.props.user.time_zone]
    ]

    return (
      <Thing type='User' fields={fields} />
    )
  }

})

module.exports = UserThing
