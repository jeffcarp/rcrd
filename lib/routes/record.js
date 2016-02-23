var API = require('../api');
var DeleteRecord = require('../delete-record');
var React = require('react');
var Record = require('../record');
var request = require('browser-request');
var SelectTimeZone = require('../select-time-zone');
var util = require('../util');

var RecordPage = React.createClass({

  getInitialState: function() {
    return {
      record: undefined
    };
  },

  componentWillMount: function () {
    var id = this.props._[0]
    this.fetchRecord(id);
  },

  fetchRecord: function (id) {
    API.fetchRecord(id, function (err, record) {
      console.log(err, record);
      if (err) return console.error(err)
      this.setState({ record: record }); 
    }.bind(this));
  },

  render: function() {
    var record = this.state.record

    if (record) {
      return (
        <section>
          <Record record={record} />
          <SelectTimeZone record={record} />
          <DeleteRecord id={record.id} />
        </section>
      )
    } else if (record === null) {
      return (
        <section>
          <div className="faded">Error loading record.</div>
        </section>
      )
    } else {
      return (
        <section>
          <div className="faded">Loading record...</div>
        </section>
      )
    }
  }
});

module.exports = RecordPage;
