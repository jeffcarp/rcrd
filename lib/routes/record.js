var React = require('react');
var request = require('browser-request');

var API = require('../api');
var Record = require('../record');
var util = require('../util');

var RecordPage = React.createClass({

  getInitialState: function() {
    return {
      record: null
    };
  },

  componentWillMount: function () {
    this.fetchRecord();
  },

  fetchRecord: function () {
    API.fetchRecord(this.props.id, function (err, record) {
      console.log(err, record);
      if (err) {
        return console.error(err);
      }

      this.setState({ record: record }); 
    }.bind(this));
  },

  render: function() {
    var record = this.state.record;

    if (record) {
      var topSection = <Record record={record} />;
    } else {
      var topSection = <div className="faded">Loading record...</div>;
    }

    return (
      <div>
        <section>{topSection}</section>
      </div>
    );
  }
});

module.exports = RecordPage;
