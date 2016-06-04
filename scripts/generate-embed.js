const React = require('react')
const ReactDOMServer = require('react-dom/server')
const fetching = require('./fetching')

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
  },

  render: function () {
    const days = [0, 50, 365]

    return (
      <svg
        width='100%'
        height={this.height}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
        <Bars days={days} height={this.height} />
      </svg>
    )
  }

})

fetching.allRecordsWithCat('book', (err, records) => {
  if (err) return console.error(err)

  console.log(records)

  console.log(ReactDOMServer.renderToStaticMarkup(<Embed />))
})

