// RecordList
var React = require('react');
var Record = require('./record');
var request = require('browser-request');
var bus = require('./bus')();
var apiURL = 'https://08j98anr5k.execute-api.us-east-1.amazonaws.com/Production/';

var RecordList = React.createClass({

  getInitialState: function() {
    return {
      records: [{raw: 'yo yo ma', id: '234'}]
    };
  },

  componentWillMount: function() {
    var self = this;

    this.refreshRecords();

    bus.on('refresh-records', function () {
      self.refreshRecords();
    });
  },

  refreshRecords: function() {
    var self = this;

    request({
      method: 'POST', 
      url: apiURL + 'records', 
      body: JSON.stringify({
        operation: 'list' 
      }),
      json: true
    }, function (err, response) {
      if (err) {
        return;
      }
      var records = response.body.Items;
      records.sort(function (a, b) {
        return Number(b.id) - Number(a.id);
      });
      self.setState({ records: records });
    });
  },

  render: function() {
    var recordDivs = this.state.records.map(function(record) {
      return <Record record={record} key={record.id} />;
    });

    return React.DOM.div(null, recordDivs);
  }
});

module.exports = RecordList;
