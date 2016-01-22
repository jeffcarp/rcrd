var React = require('react');
var Cat = require('./cat');
var Record = require('./record');
var request = require('browser-request');
var bus = require('./bus')();
var apiURL = 'https://08j98anr5k.execute-api.us-east-1.amazonaws.com/Production/';

var CatPage = React.createClass({

  getInitialState: function() {
    return {
      records: []
    };
  },

  componentWillMount: function() {
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
        operation: 'list-records-with-cat',
        catName: this.props.name,
        access_token: 'some_bs_access_token'
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
    var records = this.state.records;
    var name = this.props.name;

    if (records.length > 0) {
      var recordDivs = this.state.records.map(function(record) {
        return <Record record={record} key={record.id} />;
      });

      return (
        <div>
          <h2>Most recent records with <Cat name={name} /></h2>
          {recordDivs}
        </div>
      );
    } else {
      return <div className="faded">'Loading records..'</div>;
    }
  }
});

module.exports = CatPage;
