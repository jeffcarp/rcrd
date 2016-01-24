var React = require('react');
var ReactDOM = require('react-dom');
var canvasDpiScaler = require('canvas-dpi-scaler');
var moment = require('moment');

var util = require('./util');

var MonthBlocks = React.createClass({

  height: 20,
  width: 732,

  blockHeight: 2,
  numDays: 90,

  componentDidMount: function() {
    var self = this;

    var canvasElem = this.refs.viz;
    var context = canvasElem.getContext('2d');
    canvasDpiScaler(canvasElem, context);

    this.paint(context);
  },

  componentDidUpdate: function() {
    var context = this.refs.viz.getContext('2d');
    context.clearRect(0, 0, this.height, this.width);

    this.paint(context);
  },

  paint: function(context) {
    var records = this.props.records;
    var blockWidth = this.width / this.numDays;

    // Paint days
    var light = false;
    for (var n = 0; n < this.numDays; n++) {
      var x = blockWidth * n;  

      if (light = !light) {
        context.fillStyle = "#fdfdfd";
      } else {
        context.fillStyle = "#dcdcdc";
      }

      context.fillRect(x, 0, blockWidth, 20);
    }

    // Paint today
    var todayX = (this.numDays - 1) * blockWidth;
    context.fillStyle = "hsl(1, 75%, 50%)";
    context.fillRect(todayX, 0, blockWidth, 2);
    context.fillRect(todayX, 18, blockWidth, 2);

    var todayDate = moment();

    // Paint records
    records.forEach(function (record) {
      // Get number of days between record and now
      var recordDate = moment.unix(Number(record.id) / 1e3);
      var daysFromToday = todayDate.diff(recordDate, 'days');

      var x = (this.numDays - daysFromToday) * blockWidth;
      console.log(x);

      context.fillStyle = "hsl(150, 50%, 50%)";
      context.fillRect(x, 5, blockWidth, 10);
    }.bind(this));
  },

  render: function () {
    return (
      <div>
        <div style={{ fontSize: '0.8em' }}>Last {this.numDays} days</div>
        <canvas 
          height={this.height}
          width={this.width}
          className='blocks'
          ref='viz'
          ></canvas>
      </div>
    );
  }
});

module.exports = MonthBlocks;
