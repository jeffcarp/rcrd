var Cat = require('./cat')
var React = require('react')

var TogetherCats = React.createClass({
  propTypes: {
    rootCatName: React.PropTypes.string.isRequired,
    cats: React.PropTypes.array.isRequired,
    totalRootRecords: React.PropTypes.number.isRequired
  },

  render: function () {
    var rootCatName = this.props.rootCatName
    var cats = this.props.cats
    var catLis

    if (cats.length) {
      catLis = cats.map(function (cat, index) {
        return (
          <li key={index}>
            <div className='m7b'>
              <Cat name={cat.name} />
            </div>
            <div>
              <span>Seen together {roundToTwo(cat.num / this.props.totalRootRecords * 100)}% of the time. <a href={'/cats/' + rootCatName + '?also=' + cat.name}>See records with {rootCatName} and {cat.name}.</a></span>
            </div>
          </li>
        )
      }.bind(this))
    } else {
      catLis = <li>No cats to display.</li>
    }

    return (
      <ul>
        {catLis}
      </ul>
    )
  }

})

function roundToTwo (num) {
  return +(Math.round(num + 'e+2') + 'e-2')
}

module.exports = TogetherCats
