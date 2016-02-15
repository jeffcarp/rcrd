var CatList = require('./cat-list');
var Editor = require('./editor');
var Link = require('react-router-component').Link;
var moment = require('moment');
var React = require('react');
var TimeBar = require('./time-bar');
var util = require('./util');

var Record = React.createClass({

  getInitialState: function () {
    return {
      editing: false,
      rawEdit: ''
    };
  },

  componentWillMount: function () {
    this.setState({
      rawEdit: this.props.record.raw
    });
  },

  render: function () {
    var record = this.props.record;
    var url = '/records/' + record.id;

    var timestamp = moment(Number(record.id)).format('MMMM Do YYYY, h:mm:ss a');

    if (this.state.editing) {
      return (
        <div className="record">
          <Editor record={this.props.record} />
          <div className="time"><span onClick={this.toggleEdit}>stop editing</span></div>
        </div>
      );
    } else {
      return (
        <div className="record">
          <TimeBar time={this.props.record.id} />
          <Link className="time" href={url}>{timestamp}</Link>
          <CatList raw={record.raw} />
        </div>
      );
    }
  },

  onChange: function (e) {
    this.setState({
      rawEdit: e.target.value
    });
  },

  toggleEdit: function () {
    this.setState({
      editing: !this.state.editing
    });
  }
});

module.exports = Record;
