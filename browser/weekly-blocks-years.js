var assert = require('assert'); 
var React = require('react');
var ReactDOM = require('react-dom');
var moment = require('moment');
var util = require('./util');
var WeeklyBlocks = require('./weekly-blocks');

var WeeklyBlocksYears = React.createClass({

  width: 732,
  height: 40,

  propTypes: {
    hue: React.PropTypes.number,
    records: React.PropTypes.array.isRequired
  },

  render: function(context) {
    var records = this.props.records;
    
    var recordYears = util.splitRecordsByYears(records);  
    var years = Object.keys(recordYears).sort().reverse() || [];

    var yearElems = years.map(function (year) {
      return (
        <div key={year}>
          <h4>{year}</h4>
          <WeeklyBlocks 
            records={recordYears[year]} 
            hue={this.props.hue} 
            year={Number(year)}
            />
        </div>
      );
    }.bind(this));

    return (
      <div>
        {yearElems}
      </div>
    );
  }
});

module.exports = WeeklyBlocksYears;
