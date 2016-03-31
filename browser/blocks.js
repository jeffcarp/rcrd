var React = require('react')
var ReactDOM = require('react-dom')
// var canvasRetinafy = require('../canvasRetinafy')

var rand = function (num) {
  return Math.floor(Math.random() * num)
}

var Blocks = React.createClass({
  //
  height: 50,
  width: 460,

  componentDidMount: function () {
    var canvas = ReactDOM.findDOMNode(this)
    // canvasRetinafy(canvas)
    var context = canvas.getContext('2d')
    this.paint(context)
  },

  componentDidUpdate: function () {
    var context = ReactDOM.findDOMNode(this).getContext('2d')
    context.clearRect(0, 0, this.height, this.width)
    this.paint(context)
  },

  paint: function (context) {
    // context.save()
    for (var y = 0; y < this.height / 10; y++) {
      var hue = rand(256)
      for (var x = 0; x < 46; x++) {
        if (rand(5) === 0) {
          context.fillStyle = 'hsl(' + hue + ', 50%, 50%)'
          context.fillRect(x * 10, y * 10, 10, 10)
        } else {
          context.fillStyle = '#f4f4f4'
          context.fillRect(x * 10 + 2, y * 10 + 2, 6, 6)
        }
      }
    }
  // context.restore()
  },

  render: function () {
    return React.DOM.canvas({
      height: this.height,
      width: this.width,
      className: 'blocks'
    })
  }
})

module.exports = Blocks
