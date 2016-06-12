var React = require('react')
var pluralize = require('pluralize')
var util = require('./util')
var Link = require('react-router-component').Link

var Cat = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  render: function () {
    var name = this.props.name.trim()
    var bareName = util.sansMagnitude(this.props.name).trim()
    var bareNameSingular = pluralize(bareName, 1)
    var bareNameEscaped = encodeURIComponent(bareNameSingular)
    var url = '/cats/' + bareNameEscaped
    var hue = util.catNameToHue(name)
    var style = {backgroundColor: 'hsl(' + hue + ', 50%, 60%)'}
    var outerStyle = {backgroundColor: 'hsl(' + hue + ', 50%, 40%)'}

    var Elem = this.props.noLink ? React.DOM.span : Link

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
