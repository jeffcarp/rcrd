var React = require('react');

var Cat = React.createClass({

  render: function() {
    return (
      <span
        className='cat'
        >{this.props.name}</span>
    );
  }

});

module.exports = Cat;
