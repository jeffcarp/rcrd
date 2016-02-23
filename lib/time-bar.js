var constants = require('./constants');
var moment = require('moment');
var React = require('react');
var util = require('./util');

var TimeBar = React.createClass({

  width: 366,
  height: 10,

  propTypes: {
    id: React.PropTypes.string.isRequired
  },

  render: function () {
    var time = util.recordIDToTime(this.props.id)
    var dayOfYear = time.dayOfYear();
    var blockSize = 366 / this.width;
    var x = blockSize * dayOfYear;

    return (
      <div>
          <svg 
            viewBox={'0 0 '+this.width+' '+this.height}
            width="100%"
            height={this.height}
            style={{ backgroundColor: '#eee' }}
            >
            <rect 
              x={x} 
              y={0} 
              width={blockSize} 
              height={this.height} 
              fill={constants.mainBackgroundColor}
              />
          </svg>
      </div>
    );
  }

});

module.exports = TimeBar;
