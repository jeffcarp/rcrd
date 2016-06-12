var React = require('react')
var pluralize = require('pluralize')
var util = require('./util')
var Link = require('react-router-component').Link
var Cat = require('./cat')

var LinkedCat = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  render: function () {
    var name = this.props.name.trim()
    var bareName = util.sansMagnitude(this.props.name).trim()
    var bareNameSingular = pluralize(bareName, 1)
    var bareNameEscaped = encodeURIComponent(bareNameSingular)
    var url = '/cats/' + bareNameEscaped

    return (
      <Link href={url}>
        <Cat name={name} />
      </Link>
    )
  }
})

module.exports = LinkedCat
