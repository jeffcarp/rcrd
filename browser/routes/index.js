var Adder = require('../adder')
var React = require('react')

var Index = React.createClass({
  render: function () {
    return (
      <div>
        <Adder focus />
      </div>
    )
  }

})

module.exports = Index
