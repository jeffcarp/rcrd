var React = require('react');

var Adder = require('../adder');
var Blocks = require('../blocks');
var RecordList = require('../record-list');

var Index = React.createClass({

  render: function() {
    return (
      <div>
        <Adder />
        <Blocks />
        <RecordList />
      </div>
    );
  }

});

module.exports = Index;
