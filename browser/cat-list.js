var React = require('react')
var LinkedCat = require('./linked-cat')
var pluralize = require('pluralize')
var util = require('./util')
var Link = require('react-router-component').Link

var CatList = React.createClass({
  propTypes: {
    raw: React.PropTypes.string,
    cats: React.PropTypes.array
  },

  componentWillMount: function () {
    if (!this.props.raw && !this.props.cats) {
      console.error('CatList requires either raw or cats.')
    }
  },

  render: function () {
    var rawCats
    if (this.props.raw) {
      rawCats = this.props.raw.split(',')
    } else {
      rawCats = this.props.cats
    }

    var cats = rawCats.map(function (name) {
      return (
        <LinkedCat key={name} name={name} />
      )
    }.bind(this))

    return <div className='cat-list'>{cats}</div>
  }

})

module.exports = CatList
