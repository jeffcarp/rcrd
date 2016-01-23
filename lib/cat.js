var React = require('react');

var bus = require('./bus')();

function hasMagnitude(str) {
  return !isNaN(str[0]);
}

function magnitudePortion(str) {
  var matches = str.match(/^[\d\.]+/i);
  if (matches) {
    return matches.shift();
  } else {
    return '';
  }
}

function sansMagnitude(str) {
  return str.replace(/^\s*\d+\.*\d*\s*/, '');
}

var Cat = React.createClass({

  render: function() {
    var name = this.props.name.trim();

    if (hasMagnitude(name)) {
      return (
        <span className='split-cat' onClick={this.goToCat}>
          <span className='magnitude'>{magnitudePortion(name)}</span>
          <span className='name'>{sansMagnitude(name)}</span>
        </span>
      );
    } else {
      return <span className='cat' onClick={this.goToCat}>{name}</span>;
    }

  },

  goToCat: function () {
    bus.emit('page-change', 'cat-page', {
      data: { catName: sansMagnitude(this.props.name) }
    });
  }

});

module.exports = Cat;
