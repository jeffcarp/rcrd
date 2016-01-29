var React = require('react');

var Adder = require('../adder');
var Blocks = require('../blocks');

var Index = React.createClass({

  render: function() {
    return (
      <div>
        <Adder />
      </div>
    );
  }

});

module.exports = Index;
