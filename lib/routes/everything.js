var React = require('react');
var ReactDOM = require('react-dom');

var API = require('../api');
var YearBlocks = require('../year-blocks');
var MonthBlocks = require('../month-blocks');
var RecordList = require('../record-list');

var Everything = React.createClass({

  getInitialState: function () {
    return {
      records: []
    };
  },

  componentDidMount: function () {
    API.fetchRecords(function (err, records) {
      if (err) {
        return console.error(err);
      }

      this.setState({ 
        records: records 
      });

    }.bind(this));
  },

  render: function () {
    return (
      <div>
        <YearBlocks records={this.state.records} />
        <MonthBlocks records={this.state.records} numDays={90} hue={150} />
        <div className="small-section">
          <RecordList />
        </div>
      </div>
    );
  }
});

module.exports = Everything;
