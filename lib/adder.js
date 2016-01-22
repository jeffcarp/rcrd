var React = require('react');
var request = require('browser-request');
var bus = require('./bus')();
var moment = require('moment');
var Editor = require('./editor');

var Adder = React.createClass({

  render: function() {
    return (
      <div className="adder">
        <Editor />
      </div>
    );
  }

});

module.exports = Adder;
