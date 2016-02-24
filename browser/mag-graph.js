var assert = require('assert');
var moment = require('moment');
var React = require('react');
var ReactDOM = require('react-dom');
var util = require('./util');

var MagGraph = React.createClass({

  width: 732,

  propTypes: {
    numDays: React.PropTypes.number.isRequired,
    records: React.PropTypes.array.isRequired,
  },

  render: function () {
    var records = this.props.records;

    var blockWidth = this.width / this.props.numDays;
    var todayDate = moment();

    var recordEls = records.map(function (record, i) {
      // Get number of days between record and now
      var recordDate = moment.unix(Number(record.id) / 1e3);
      var daysFromToday = todayDate.diff(recordDate, 'days');

      var x = (this.props.numDays - daysFromToday) * blockWidth;
      assert(!isNaN(x));

      return (
        <rect 
          x={x} 
          y={10} 
          width={blockWidth} 
          height={10} 
          fill="grey" 
          key={i}
          />
      );
    }.bind(this));

    return (
      <div>
        <svg 
          viewBox={'0 0 '+this.width+' 100'}
          width="100%"
          height="100px">
          {recordEls}
        </svg>
      </div>
    );
  }

});

module.exports = MagGraph;
