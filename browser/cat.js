var React = require('react')
var util = require('./util')

var Cat = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  render: function () {
    var name = this.props.name.trim()
    var hue = util.catNameToHue(name)
    var style = {backgroundColor: 'hsl(' + hue + ', 50%, 60%)'}
    var outerStyle = {backgroundColor: 'hsl(' + hue + ', 50%, 40%)'}

    if (util.hasMagnitude(name)) {
      return (
        <span
          className='split-cat'>
          <span
            style={outerStyle}
            className='magnitude'>
            {util.magnitudePortion(name)}
          </span>
          <span
            style={style}
            className='name'>
            {util.sansMagnitude(name)}
          </span>
        </span>
      )
    } else {
      return (
        <span
          className='cat'>
          <span
            style={style}>
            {name}
          </span>
        </span>
      )
    }
  }

})

module.exports = Cat
