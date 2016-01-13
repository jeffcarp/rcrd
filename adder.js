var React = require('react');
var request = require('browser-request');
var bus = require('./bus')();

var apiURL = 'https://08j98anr5k.execute-api.us-east-1.amazonaws.com/Production/';

var Adder = React.createClass({

  onSubmit: function (e) {
    e.preventDefault();

    var rawInput = this.refs.raw;
    var rawValue = rawInput.value;

    rawInput.setAttribute('disabled', 'disabled');

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
      self.refs.raw.value = '';
      rawInput.removeAttribute('disabled');

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
          autoCorrect="off"
          autoCapitalize="none"
          placeholder="rcrd, comma, separated" 
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
