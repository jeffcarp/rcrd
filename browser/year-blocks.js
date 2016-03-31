var React = require('react')
var canvasDpiScaler = require('canvas-dpi-scaler')
var moment = require('moment')

var YearBlocks = React.createClass({
  height: 20,
  width: 732,

  blockHeight: 2,

  componentWillMount: function () {
    if (window.innerWidth < this.width) {
      this.width = window.innerWidth
    }
  },

  componentDidMount: function () {
    var canvasElem = this.refs.viz
    var context = canvasElem.getContext('2d')
    canvasDpiScaler(canvasElem, context)

    this.paint(context)
  },

  componentDidUpdate: function () {
    var context = this.refs.viz.getContext('2d')
    context.clearRect(0, 0, this.height, this.width)

    this.paint(context)
  },

  paint: function (context) {
    var records = this.props.records

    // Paint weekends
    for (var x = 0; x < 366; x++) {
      var dayOfWeek = moment().startOf('year').add(x, 'days').format('dddd')
      if (dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday') {
        context.fillStyle = '#dcdcdc'
      } else {
        context.fillStyle = '#fdfdfd'
      }

      context.fillRect(x * 2, 0, 2, 20)
    }

    // Paint today
    var todayX = Number(moment().format('DDD'))
    context.fillStyle = 'hsl(1, 75%, 50%)'
    context.fillRect(todayX * 2, 0, 2, 2)
    context.fillRect(todayX * 2, 18, 2, 2)

    // Paint records
    records.forEach(function (record) {
      var x = Number(moment.unix(Number(record.id) / 1000).format('DDD'))

      context.fillStyle = 'hsl(150, 50%, 50%)'
      context.fillRect(x * 2, 5, 2, 10)
    })
  },

  render: function () {
    return (
      <div>
        <div style={{ fontSize: '0.8em' }}>
          2016
        </div>
        <canvas
          height={this.height}
          width={this.width}
          className='blocks'
          ref='viz'></canvas>
      </div>
    )
  }
})

module.exports = YearBlocks
