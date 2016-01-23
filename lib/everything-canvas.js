var React = require('react');
var ReactDOM = require('react-dom');
//var canvasRetinafy = require('../canvasRetinafy');
var canvasDpiScaler = require('canvas-dpi-scaler');
var moment = require('moment');

var util = require('./util');

// Omg this is fucking huge
var records = require('../records.json');

var rand = function(num) {
  return Math.floor(Math.random()*num);
};

var Blocks = React.createClass({

  height: 202,
  width: 732,

  blockHeight: 2,

  componentDidMount: function() {
    var canvas = ReactDOM.findDOMNode(this);
    var context = canvas.getContext('2d');
    canvasDpiScaler(canvas, context);

    this.paint(context);
  },

  componentDidUpdate: function() {
    var context = ReactDOM.findDOMNode(this).getContext('2d');
    context.clearRect(0, 0, this.height, this.width);

    this.paint(context);
  },

  paint: function(context) {
    for (var y=0; y<100; y++) {
      for (var x=0; x<366; x++) {
        context.fillStyle = "#f4f4f4";
        context.fillRect(x*2, y*2, 2, 2);
      }
    }

    var allCats = {}; 
    var catCount = 0;

    records.forEach(function (record) {
      
      var cats = util.catsFromRaw(record.raw);
      var x = Number(moment(record.target).format('DDD'));

      cats.forEach(function (cat) {
        var hue = rand(256);

        if (cat in allCats) {
          var y = allCats[cat];
        } else {
          var y = allCats[cat] = catCount;
          catCount += 1;
        } 

        context.fillStyle = "hsl("+hue+", 50%, 50%)";
        context.fillRect(x*2, y*2, 2, 2);

      });

    });

    console.log(catCount);

    //context.restore();
  },

  render: function () {
    return React.DOM.canvas({
      height: this.height,
      width: this.width,
      className: 'blocks'
    });
  }
});

module.exports = Blocks;
