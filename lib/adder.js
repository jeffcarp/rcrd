var React = require('react');
var request = require('browser-request');
var bus = require('./bus')();
var moment = require('moment');
var Editor = require('./editor');

var apiURL = 'https://08j98anr5k.execute-api.us-east-1.amazonaws.com/Production/';

var Adder = React.createClass({

  getInitialState: function() {
    return {
      adding: false
    };  
  },

  render: function() {
    if (this.state.adding) {
      return (
        <div className="adder">
          <Editor />
          <div onClick={this.toggleAdding}>cancel</div>
        </div>
      );
    } else {
      return (
        <div className="adder" onClick={this.toggleAdding}>
          add new rcrd
        </div>
      );
    }
  },

  toggleAdding: function() {
    this.setState({
      adding: !this.state.adding
    });
  }

});

module.exports = Adder;
