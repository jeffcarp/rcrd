var React = require('react');
var request = require('browser-request');
var bus = require('./bus')();

var apiURL = 'https://08j98anr5k.execute-api.us-east-1.amazonaws.com/Production/';

var Adder = React.createClass({

  onSubmit: function (e) {
    e.preventDefault();

    var rawValue = this.refs.raw.value;
    var self = this;
    console.log(rawValue);
    // TODO: disable input

    request({
      method:'POST', 
      url: apiURL + 'records', 
      body: JSON.stringify({
        id: (new Date).getTime(),
        raw: rawValue
      }),
      json:true
    }, function (err, response) {
      if (err) {
        return;
      }
      console.log(response);
      self.refs.raw.value = '';

      bus.emit('refresh-records');
    });

  },

  render: function() {
    return (
      <form 
        onSubmit={this.onSubmit}
        className='adder'>
        <input 
          type="text" 
          name="raw"
          ref="raw"
          placeholder="record, comma, separated" 
          /> 
        <input
          type="submit"
          value="Create record"
          />
      </form>
    );
  }

});

module.exports = Adder;
