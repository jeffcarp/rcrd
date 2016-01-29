var React = require('react');
var Link = require('react-router-component').Link;

var AccountService = require('./account-service');
var bus = require('./bus')();

var Header = React.createClass({
  render: function() {
    if (AccountService.isLoggedIn()) {
      return (
        <nav className="small-section">
          <span className="right">
            <Link href="/account">{localStorage.email}</Link>
          </span>
          <Link href="/"><b>rcrd</b></Link>
          <Link href="/everything">everything</Link>
        </nav>
      );
    } else {
      return (
        <nav className="small-section">
          <Link href="/"><b>rcrd</b></Link>
          <span className="right">
            <Link href="/login">login</Link>
          </span>
        </nav>
      );
    }
  }
});

module.exports = Header;
