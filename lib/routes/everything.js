var React = require('react');
var ReactDOM = require('react-dom');
var canvasDpiScaler = require('canvas-dpi-scaler');
var moment = require('moment');

var API = require('../api');
var util = require('../util');

var rand = function(num) {
  return Math.floor(Math.random()*num);
};

var Blocks = React.createClass({

  height: 202,
  width: 732,

  blockHeight: 2,

  getInitialState: function () {
    return {
      records: []
    };
  },

  componentDidMount: function() {
    var self = this;

    var canvasElem = this.refs.viz;
    var context = canvasElem.getContext('2d');
    canvasDpiScaler(canvasElem, context);

    this.paint(context);

    API.fetchRecords(function (err, records) {
      if (err) {
        return console.error(err);
      }
      self.setState({ records: records });
    });
  },

  componentDidUpdate: function() {
    var context = this.refs.viz.getContext('2d');
    context.clearRect(0, 0, this.height, this.width);

    this.paint(context);
  },

  paint: function(context) {
    var records = this.state.records;

    for (var x=0; x<366; x++) {
      var dayOfWeek = moment().startOf('year').add(x, 'days').format('dddd');
      if (dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday') {
        context.fillStyle = "#dcdcdc";
      } else {
        context.fillStyle = "#fdfdfd";
      }

      context.fillRect(x*2, 0, 2, 20);
    }

    var hue = rand(256);

    records.forEach(function (record) {
      var x = Number(moment.unix(Number(record.id) / 1000).format('DDD'));

      context.fillStyle = "hsl("+hue+", 50%, 50%)";
      context.fillRect(x*2, 5, 2, 10);
    });
  },

  render: function () {
    return (
      <div>
        <div style={{ fontSize: '0.8em' }}>2016</div>
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

module.exports = Blocks;
