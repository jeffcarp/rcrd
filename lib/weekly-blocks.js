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

  weekHack: function (time) {
    var week = time.week()
    // Unbelievably catastrophically bad hack
    if (time.dayOfYear() > 340 && time.week() < 10) {
      week = 53
    }
    return week
  },

  render: function(context) {
    var records = this.props.records;
    var padding = 2;
    var blockHeight = 10;
    var height = blockHeight * 8;
    var time = moment().year(this.props.year).startOf('year');
    var blockDimension = Math.floor(this.width / 53)
    var blockWidth = blockDimension - padding;
    var dayEls = [];

    var standInWeek = 52;

    while (time.year() === this.props.year) {
      var light = time.month() % 2 == 0

      var week = this.weekHack(time)

      var x = (week - 1) * blockDimension
      var y = height - ((time.day() + 1) * blockHeight)

      var fill = light ? '#f3f3f3' : '#e3e3e3'

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

      var week = this.weekHack(time)
      var x = (week - 1) * blockDimension
      var y = height - ((time.day() + 1) * blockHeight)

      return (
        <rect 
          x={x} 
          y={y} 
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

        var week = this.weekHack(today)
        var x = (week - 1) * blockDimension
        var y = height - ((today.day() + 1) * blockHeight)

        todayEl = (
          <rect 
            x={x} 
            y={y} 
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
