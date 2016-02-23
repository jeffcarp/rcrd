var React = require('react');
var ReactDOM = require('react-dom');

var API = require('../api');
var MonthBlocks = require('../month-blocks');
var AllBlocksEver = require('../all-blocks-ever');
var RecordList = require('../record-list');

var Watching = React.createClass({

  cat: 'workout',

  getInitialState: function () {
    return {
      records: []
    };
  },

  componentDidMount: function () {
    API.fetchRecordsWithCat(this.cat, function (err, records) {
      if (err) return console.error(err);
      this.setState({ records: records });
    }.bind(this));
  },

  render: function () {
    return (
      <div>
        <MonthBlocks records={this.state.records} numDays={90} />
        <AllBlocksEver records={this.state.records} cat={this.cat} />
      </div>
    );
  }
});

module.exports = Watching;
