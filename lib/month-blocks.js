var assert = require('assert'); 
var React = require('react');
var ReactDOM = require('react-dom');
var canvasDpiScaler = require('canvas-dpi-scaler');
var moment = require('moment');
var util = require('./util');

var MonthBlocks = React.createClass({

  width: 732,
  height: 20,

  propTypes: {
    numDays: React.PropTypes.number.isRequired,
    hue: React.PropTypes.number,
    records: React.PropTypes.array.isRequired,
  },

  getInitialState: function () {
    return { 
      svgOpacity: 0,
      recordsOpacity: 0 
    };
  },

  componentDidMount: function () {
    setTimeout(function () {
      this.setState({ svgOpacity: 1 });
    }.bind(this), 200);
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.records.length && this.state.recordsOpacity === 0) {
      this.setState({ recordsOpacity: 1 });
    }
  },

  render: function(context) {
    var records = this.props.records;
    var blockWidth = this.width / this.props.numDays;

    // Paint days
    var light = false;
    var dayEls = [];
    for (var n = 0; n < this.props.numDays; n++) {

      var daysAgo = this.props.numDays - n;
      var thatDay = moment().subtract(daysAgo, 'days').format('dddd');
      var fill, height, y;
      if (thatDay === 'Saturday') {
        fill = "#dcdcdc";
        height = 20;
        y = 0;
      } else if (thatDay === 'Sunday') {
        fill = "#d4d4d4";
        height = 20;
        y = 0;
        light = true;
      } else if (light) {
        fill = "#c0c0c0";
        height = 2;
        y = 18;
        light = !light;
      } else {
        fill = "#cfcfcf";
        height = 2;
        y = 18;
        light = !light;
      }

      dayEls.push(
        <rect 
          x={blockWidth * n} 
          y={y} 
          width={blockWidth} 
          height={height} 
          fill={fill}
          key={n}
          />
      ); 
    }
   
    var todayX = (this.props.numDays - 1) * blockWidth;
    var todayDate = moment().startOf('day');
    var padding = 5;

    var recordEls = records.map(function (record, i) {
      // Get number of days between record and now
      var recordDay = moment.unix(Number(record.id) / 1e3).startOf('day');
      var daysFromToday = todayDate.diff(recordDay, 'days');

      var hue = this.props.hue;
      if (!hue) {
        hue = util.rand(256);
      }

      return (
        <rect 
          x={(this.props.numDays - daysFromToday - 1) * blockWidth} 
          y={padding} 
          width={blockWidth} 
          height={this.height - padding * 2} 
          fill={'hsl('+hue+', 50%, 60%)'}
          key={i}
          />
      );
    }.bind(this));

    return (
      <div>
        <div style={{ fontSize: '0.8em' }}>Last {this.props.numDays} days</div>
          <svg 
            viewBox={'0 0 '+this.width+' '+this.height}
            width="100%"
            height={this.height}
            style={{opacity: this.state.svgOpacity}}
            >
            <g>
              {dayEls}
            </g>
            <g style={{opacity: this.state.recordsOpacity}}>
              {recordEls}
            </g>
            <g>
              <rect 
                x={todayX} 
                y={0} 
                width={blockWidth} 
                height={2} 
                fill="hsl(1, 75%, 50%)"
                key={0}
                />
              <rect 
                x={todayX} 
                y={18} 
                width={blockWidth} 
                height={2} 
                fill="hsl(1, 75%, 50%)"
                key={1}
                />
            </g>
          </svg>
      </div>
    );
  }
});

module.exports = MonthBlocks;
