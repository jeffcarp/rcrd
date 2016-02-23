var assert = require('assert'); 
var React = require('react');
var ReactDOM = require('react-dom');
var moment = require('moment');
var util = require('./util');

var WeeklyBlocks = React.createClass({

  width: 732,

  propTypes: {
    hue: React.PropTypes.number,
    records: React.PropTypes.array.isRequired,
    year: React.PropTypes.number
  },

  render: function(context) {
    var records = this.props.records;
    var blockDimension = this.width / 52;
    var padding = 2;
    var blockWidth = blockDimension - padding;
    var blockHeight = 8;
    var height = blockHeight * 7;

    var light = false;
    var dayEls = [];
    for (var n = 0; n < 52; n++) {
      for (var day = 0; day < 7; day++) {
        dayEls.push(
          <rect 
            x={blockDimension * n} 
            y={day * blockHeight} 
            width={blockWidth} 
            height={blockHeight - padding} 
            fill={'#eee'}
            key={String(n) + '-' + String(day)}
            />
        ); 
      }
    }

    var recordEls = records.map(function (record) {
      var time = util.recordIDToTime(record.id);
      var weekOfYear = time.week();
      var dayOfWeek = time.day();

      return (
        <rect 
          x={blockDimension * weekOfYear} 
          y={dayOfWeek * blockHeight} 
          width={blockWidth} 
          height={blockHeight - padding} 
          fill={'hsl('+this.props.hue+', 50%, 60%)'}
          key={record.id}
          />
      );
    }.bind(this));

    var todayEl;
    if (this.props.year) {
      var today = moment();
      console.log(today.year(), this.props.year)
      if (today.year() === this.props.year) {
        var weekOfYear = today.week();
        var dayOfWeek = today.day();

        todayEl = (
          <rect 
            x={blockDimension * weekOfYear} 
            y={dayOfWeek * blockHeight} 
            width={blockWidth} 
            height={blockHeight - padding} 
            fill='none'
            stroke={'#ec6e61'}
            strokeWidth='1px'
            />
        );
      }
    }

    return (
      <div>
          <svg 
            viewBox={'0 0 '+this.width+' '+height}
            width="100%"
            height={height}
            >
            <g>
              {dayEls}
            </g>
            <g>
              {recordEls}
            </g>
            <g>
              {todayEl}
            </g>
          </svg>
      </div>
    );
  }
});

module.exports = WeeklyBlocks;
