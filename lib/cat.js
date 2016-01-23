var React = require('react');

var bus = require('./bus')();
var u = require('./util');

var Cat = React.createClass({

  render: function() {
    var name = this.props.name.trim();

    if (u.hasMagnitude(name)) {
      return (
        <span className='split-cat' onClick={this.goToCat}>
          <span className='magnitude'>{u.magnitudePortion(name)}</span>
          <span className='name'>{u.sansMagnitude(name)}</span>
        </span>
      );
    } else {
      return <span className='cat' onClick={this.goToCat}>{name}</span>;
    }

  },

  goToCat: function () {
    bus.emit('page-change', 'cat-page', {
      data: { catName: u.sansMagnitude(this.props.name) }
    });
  }

});

module.exports = Cat;
