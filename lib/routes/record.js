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
    });
  },

  render: function() {
    var record = this.state.record || {id: 'asdf', raw: 'test, yeah'};

    return (
      <div>
        <section>
          <Record record={record} />
        </section>
      </div>
    );
  }
});

module.exports = RecordPage;
