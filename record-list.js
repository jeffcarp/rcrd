// RecordList
var React = require('react');
var Record = require('./record');
var apiURL = 'https://08j98anr5k.execute-api.us-east-1.amazonaws.com/Production/';

var RecordList = React.createClass({

  getInitialState: function() {
    return {
      records: [{raw: 'yo yo ma', id: '234'}]
    };
  },

  componentWillMount: function() {
    var self = this;
    fetch(apiURL + 'records', {
      method: 'POST',
      body: JSON.stringify({
        operation: 'list' 
      })
    }).then(function (response) {
      response.json().then(function (data) {
        console.log(data.Items);
        var records = data.Items;
        records.reverse();
        self.setState({ records: records });
      });
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
