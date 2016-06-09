const React = require('react')
// const ReactDOMServer = require('react-dom/server')
const util = require('../browser/util')

const Bars = (props) => (
  <g>
    {props.days.map((dayOfYear) => (
      <rect
        key={dayOfYear}
        x={String(100 / 366 * dayOfYear) + '%'}
        y={0}
        width={String(100 / 366) + '%'}
        height={props.height} />
    ))}
  </g>
)

var Embed = React.createClass({
  height: 30,

  propTypes: {
    records: React.PropTypes.array.isRequired
  },

  render: function () {
    const days = this.props.records.map((record) => (
      util.timeFromRecord(record).dayOfYear()
    ))

    return (
      <svg
        width='100%'
        height={this.height}
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
        <Bars days={days} height={this.height} />
      </svg>
    )
  }

})

module.exports = Embed
