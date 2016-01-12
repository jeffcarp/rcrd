var React = require('react');

function hasMagnitude(str) {
  return !isNaN(str[0]);
}

var Cat = React.createClass({

  render: function() {
    var name = this.props.name.trim();

    if (hasMagnitude(name)) {
      return (
        <span className='split-cat'>
          <span className='magnitude'>{name}</span>
          <span className='name'>{name}</span>
        </span>
      );
    } else {
      return <span className='cat'>{name}</span>;
    }

  }

});

module.exports = Cat;
