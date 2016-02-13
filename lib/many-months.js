var React = require('react');
var ReactDOM = require('react-dom');
var MonthBlocks = require('./month-blocks');

var ManyMonths = React.createClass({

  render: function () {
    var months = this.props.recordArrs.map(function (recordArr, index) {
      return (
        <MonthBlocks 
          records={recordArr} 
          numDays={this.props.numDays}
          hue={this.props.hues[index]}
          key={index}
          showHeader={index === 0}
          />
      );
    }.bind(this));

    return (
      <div>
        {months}
      </div>
    );
  }

});

module.exports = ManyMonths;
