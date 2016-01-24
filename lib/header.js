var React = require('react');
var Link = require('react-router-component').Link;

var bus = require('./bus')();

var Header = React.createClass({
  render: function() {
    return (
      <nav>
        <span className="right">
          <Link href="/account">{localStorage.email}</Link>
        </span>
        <Link href="/"><b>rcrd</b></Link>
        <Link href="/everything">everything</Link>
      </nav>
    );
  }
});

module.exports = Header;
