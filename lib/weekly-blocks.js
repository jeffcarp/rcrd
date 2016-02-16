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
    year: React.PropTypes.number.isRequired
  },

  render: function(context) {
    var records = this.props.records;
    var blockDimension = this.width / 55;
    var padding = 2;
    var blockWidth = blockDimension - padding;
    var blockHeight = 8;
    var height = blockHeight * 7;
    var time = moment().year(this.props.year).startOf('year');
    var light = false;
    var dayEls = [];

    for (var day = 1; day <= 366; day++) {
      if (time.year() != this.props.year) {
        console.log('over', time.format())
        continue;
      }

      var x = (time.isoWeek() - 1) * blockDimension;
      var y = time.day() * blockHeight;

      var fill = '#eee';
      if (time.day() === 0 || time.day() === 6) {
        fill = '#ddd';
      }

      if (x == 0 && y == 0) {
        console.log(time.week(), time.day(), time.format(), x, y, day, time.isoWeek());
      }

      dayEls.push(
        <rect 
          x={x} 
          y={y} 
          width={blockWidth} 
          height={blockHeight - padding} 
          fill={fill}
          key={time.dayOfYear()}
          />
      ); 

      time.add(1, 'day');
    }

    var recordEls = records.map(function (record) {
      var time = util.timeFromRecord(record)
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
