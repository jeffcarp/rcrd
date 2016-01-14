var React = require('react');
var Cat = require('./cat');
var Editor = require('./editor');
var moment = require('moment');

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

    var timestamp = moment(Number(record.id)).format('MMMM Do YYYY, h:mm:ss a')

    if (this.state.editing) {
      return (
        <div className="record">
          <Editor record={this.props.record} />
          <div className="time"><span onClick={this.toggleEdit}>stop editing</span></div>
        </div>
      );
/*
      var rawCats = this.state.rawEdit.split(',');
      var cats = rawCats.map(function (name) {
        return <Cat name={name} key={name} />
      });

      return (
        <div className="record">
          <div className="time">{timestamp}</div>
          <div>{cats}</div>
          <form>
            <input 
              type="text"   
              placeholder="comma, separated"   
              name="raw"
              value={this.state.rawEdit}
              onChange={this.onChange}
              />
          </form>
        </div>
      );
*/
    } else {
      var rawCats = record.raw.split(',');
      var cats = rawCats.map(function (name) {
        return <Cat name={name} key={name} />
      });

      return (
        <div className="record">
          <div className="time">{timestamp}</div>
          <div className="cat-list">{cats}</div>
          <div className="time"><span onClick={this.toggleEdit}>edit</span></div>
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
