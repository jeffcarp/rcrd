var React = require('react');

var bus = require('./bus')();
var Link = require('react-router-component').Link;
var u = require('./util');

var Cat = React.createClass({

  render: function() {
    var name = this.props.name.trim();
    var url = '/cats/' + u.sansMagnitude(this.props.name).trim();

    if (u.hasMagnitude(name)) {
      return (
        <Link className='split-cat' href={url}>
          <span className='magnitude'>{u.magnitudePortion(name)}</span>
          <span className='name'>{u.sansMagnitude(name)}</span>
        </Link>
      );
    } else {
      return <Link className='cat' href={url}><span>{name}</span></Link>;
    }

  }

});

module.exports = Cat;
