var React = require('react')

var TimeBar = React.createClass({
  height: 30,

  propTypes: {
  },

  render: function () {
    var bars = [0, 50, 365].map(function (dayOfYear) {
      return (
        <rect
          key={dayOfYear}
          x={String(100 / 366 * dayOfYear) + '%'}
          y={0}
          width={String(100 / 366) + '%'}
          height={this.height} />
      )
    }.bind(this))

    return (
      <div>
        <p
          style={{ marginBottom: 8 }}>
          Books read in 2016
        </p>
        <svg
          width='100%'
          height={this.height}
          style={{ backgroundColor: '#eee' }}>
          {bars}
        </svg>
      </div>
    )
  }

})

var GraphsPage = React.createClass({
  render: function () {
    return (
      <div className='page'>
        <section>
          <h2>Yes</h2>
          <TimeBar />
        </section>
      </div>
    )
  }
})

module.exports = GraphsPage
