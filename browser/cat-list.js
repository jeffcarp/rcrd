var React = require('react')
var Cat = require('./cat')

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
    if (this.props.raw) {
      var rawCats = this.props.raw.split(',')
    } else {
      var rawCats = this.props.cats
    }

    var cats = rawCats.map(function (name) {
      return (
      <Cat name={name} key={name} onClick={this.props.catOnClick} />
      )
    }.bind(this))

    return <div className="cat-list">
             {cats}
           </div>
  }

})

module.exports = CatList
