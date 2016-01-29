var debounce = require('debounce');
var React = require('react');
var ReactDOM = require('react-dom');
var canvasDpiScaler = require('canvas-dpi-scaler');
var moment = require('moment');
var assert = require('assert'); 

var util = require('./util');

var MonthBlocks = React.createClass({

  height: 20,
  initialWidth: 732,

  blockHeight: 2,

  propTypes: {
    numDays: React.PropTypes.number.isRequired,
  },

  getInitialState: function () {
    if (window.innerWidth < this.initialWidth) {
      return {
        width: window.innerWidth
      };
    } else {
      return {
        width: this.initialWidth
      };
    }
  },

  onResize: function () {
    if (window.innerWidth < this.initialWidth) {
      this.setState({
        width: window.innerWidth
      });
    }
  },

  componentWillMount: function() {
    window.addEventListener('resize', this.onResize);
    window.addEventListener('orientationchange', this.onResize);
  },

  componentDidMount: function() {
    var self = this;

    var canvasElem = this.refs.viz;
    var context = canvasElem.getContext('2d');
    // TODO: reinstate
    //var ratio = canvasDpiScaler(canvasElem, context);

    this.paint(context);
  },

  componentDidUpdate: function() {
    var context = this.refs.viz.getContext('2d');
    context.clearRect(0, 0, this.height, this.state.width);

    this.paint(context);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('orientationchange', this.onResize);
  },

  paint: function(context) {
    var records = this.props.records;
    var blockWidth = this.state.width / this.props.numDays;

    // Paint days
    var light = false;
    for (var n = 0; n < this.props.numDays; n++) {
      var x = blockWidth * n;  

      if (light = !light) {
        context.fillStyle = "#fdfdfd";
      } else {
        context.fillStyle = "#dcdcdc";
      }

      context.fillRect(x, 0, blockWidth, 20);
    }

    // Paint today
    var todayX = (this.props.numDays - 1) * blockWidth;
    context.fillStyle = "hsl(1, 75%, 50%)";
    context.fillRect(todayX, 0, blockWidth, 2);
    context.fillRect(todayX, 18, blockWidth, 2);

    var todayDate = moment();

    // Paint records
    records.forEach(function (record) {
      // Get number of days between record and now
      var recordDate = moment.unix(Number(record.id) / 1e3);
      var daysFromToday = todayDate.diff(recordDate, 'days');

      var x = (this.props.numDays - daysFromToday) * blockWidth;
      assert(!isNaN(x));

      context.fillStyle = "hsl(150, 50%, 50%)";
      context.fillRect(x, 5, blockWidth, 10);
    }.bind(this));
  },

  render: function () {
    return (
      <div>
        <div style={{ fontSize: '0.8em' }}>Last {this.props.numDays} days</div>
        <canvas 
          height={this.height}
          width={this.state.width}
          className='blocks'
          ref='viz'
          ></canvas>
      </div>
    );
  }
});

module.exports = MonthBlocks;