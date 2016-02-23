var API = require('../api');
var DeleteRecord = require('../delete-record');
var React = require('react');
var Record = require('../record');
var request = require('browser-request');
var util = require('../util');

var RecordPage = React.createClass({

  getInitialState: function() {
    return {
      record: null
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
    var record = this.state.record;

    if (record) {
      var topSection = <Record record={record} />;
      var deleteButton = <DeleteRecord id={record.id} />;
    } else {
      var topSection = <div className="faded">Loading record...</div>;
      var deleteButton;
    }

    return (
      <div>
        <section>{topSection}</section>
        <section>
          {deleteButton}
        </section>
      </div>
    );
  }
});

module.exports = RecordPage;
