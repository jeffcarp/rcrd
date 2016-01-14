var React = require('react');
var request = require('browser-request');
var bus = require('./bus')();
var moment = require('moment');

var apiURL = 'https://08j98anr5k.execute-api.us-east-1.amazonaws.com/Production/';

var Editor = React.createClass({

  getInitialState: function() {
    return {
      timestamp: moment(),
      raw: '',
      savedState: 'saved'
    };  
  },

  componentWillMount: function () {
    if (this.props.record) {
      this.setState({
        raw: this.props.record.raw,
        timestamp: moment(Number(this.props.record.id))
      });
    }
  },

  render: function() {
    var timestamp = this.state.timestamp.format('MMMM Do YYYY, h:mm:ss a');
    return (
      <form 
        onSubmit={this.onSubmit}>
        <input 
          type="text" 
          name="raw"
          ref="raw"
          autoCorrect="off"
          autoCapitalize="none"
          placeholder="rcrd, comma, separated" 
          onChange={this.onRawChange}
          value={this.state.raw}
          /> 
        <div className="time">{timestamp}</div>
        <div className="time">
          <a onClick={this.augmentTime} data-num={-1} data-unit={'day'}>-1 day</a>
          <a onClick={this.augmentTime} data-num={1} data-unit={'day'}>+1 day</a>
          {' '}
          <a onClick={this.augmentTime} data-num={-1} data-unit={'hours'}>-1 hours</a>
          <a onClick={this.augmentTime} data-num={1} data-unit={'hours'}>+1 hour</a>
          {' '}
          <a onClick={this.augmentTime} data-num={-10} data-unit={'minutes'}>-10 min</a>
          <a onClick={this.augmentTime} data-num={10} data-unit={'minutes'}>+10 min</a>
        </div>
        <input
          type="submit"
          value="Create record"
          />
        <div>{this.state.savedState}</div>
      </form>
    );
  },

  onRawChange: function (e) {
    this.setState({
      raw: e.target.value,
      savedState: 'unsaved'
    });
  },

  onSubmit: function (e) {
    e.preventDefault();
    console.log('onSubmit');
  },

  augmentTime: function (e) {
    e.preventDefault();
    var num = e.target.getAttribute('data-num');
    var unit = e.target.getAttribute('data-unit');
    this.setState({
      timestamp: this.state.timestamp.add(num, unit)
    });
    return false;
  }

});

module.exports = Editor;
