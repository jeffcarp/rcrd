var moment = require('moment')
var React = require('react')
var Thing = require('./thing')

var UserThing = React.createClass({

  render: function() {

    var fields = [
      ['Email', this.props.user.id],
    ] 

    return (
      <Thing
        type='User'
        fields={fields}
        />
    )
  }

})

module.exports = UserThing
