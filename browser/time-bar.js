var constants = require('./constants')
var React = require('react')
var util = require('./util')

var TimeBar = React.createClass({
  width: 366,
  height: 10,

  propTypes: {
    record: React.PropTypes.object.isRequired
  },

  render: function () {
    var time = util.timeFromRecord(this.props.record)
    var dayOfYear = time.dayOfYear()
    var blockSize = 366 / this.width
    var x = blockSize * dayOfYear

    return (
    <div>
      <svg
        viewBox={'0 0 ' + this.width + ' ' + this.height}
        width="100%"
        height={this.height}
        style={{ backgroundColor: '#eee' }}>
        <rect
          x={x}
          y={0}
          width={blockSize}
          height={this.height}
          fill={constants.mainBackgroundColor} />
      </svg>
    </div>
    )
  }

})

module.exports = TimeBar
