var React = require('react');
var request = require('browser-request');

var API = require('./API');
var bus = require('./bus')();
var Record = require('./record');

var RecordList = React.createClass({

  getInitialState: function() {
    return {
      records: []
    };
  },

  componentWillMount: function() {
    this.refreshRecords();

    bus.on('record-added', this.refreshRecords);
  },

  componentWillUnmount: function () {
    bus.off('record-added', this.refreshRecords);
  },

  refreshRecords: function () {
    var self = this;

    API.fetchRecords(function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      self.setState({ records: records });
    });
  },

  render: function() {
    var records = this.state.records;
    if (records.length > 0) {
      var recordDivs = this.state.records.map(function(record) {
        return <Record record={record} key={record.id} />;
      });

      return <div>{recordDivs}</div>;
    } else {
      return <div className="faded">Loading records...</div>;
    }
  }
});

module.exports = RecordList;
