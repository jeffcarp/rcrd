var CatList = require('./cat-list');
var Editor = require('./editor');
var Link = require('react-router-component').Link;
var moment = require('moment-timezone');
var React = require('react');
var TimeBar = require('./time-bar');
var User = require('./services/user')
var util = require('./util')

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

    var timestamp = util.timeFromRecord(record).format('MMMM Do YYYY, h:mm:ss a')

    if (record.time_zone !== User.time_zone()) {
      timestamp += ' in ' + record.time_zone
    }

    return (
      <div className="record">
        <TimeBar record={this.props.record} />
        <Link className="time" href={url}>{timestamp}</Link>
        <CatList raw={record.raw} />
      </div>
    );
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
