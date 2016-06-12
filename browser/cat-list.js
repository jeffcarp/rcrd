var React = require('react')
var LinkedCat = require('./linked-cat')

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

    var cats = rawCats.map((name) => <LinkedCat key={name} name={name} />)

    return <div className='cat-list'>{cats}</div>
  }

})

module.exports = CatList
