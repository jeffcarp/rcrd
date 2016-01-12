var React = require('react');

var apiURL = 'https://08j98anr5k.execute-api.us-east-1.amazonaws.com/Production/';

var Adder = React.createClass({

  onSubmit: function (e) {
    e.preventDefault();

    var rawValue = this.refs.raw.value;
    var self = this;
    console.log(rawValue);

    fetch(apiURL + 'records', {
      method: 'POST',
      body: JSON.stringify({
        id: (new Date).getTime(),
        raw: rawValue
      })
    }).then(function (response) {
      console.log(response);
      self.refs.raw.value = '';
    });

  },

  render: function() {
    return (
      <form onSubmit={this.onSubmit}>
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
