var React = require('react');
var ReactDOM = require('react-dom');

var Everything = React.createClass({

  render: function() {

    var rects = [];

    for (var y = 0; y < 10; y++) {
      for (var i = 0; i < 365; i++) {
        rects.push(<rect x={i*2} y={y*4} width="1" height="3" fill="#ddd" />);
      }
    }

    return (
      <div>
        <svg xmlns="http://www.w3.org/svg/2000"
          viewBox="0 0 730 300"
          width="100%"
          height="300px" >
          {rects}
        </svg>
      </div>
    );
  }

});

module.exports = Everything;
