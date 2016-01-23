var React = require('react');
var bus = require('./bus')();

function navigate(page) {
  return function () {
    bus.emit('page-change', page);
  }
}

var Header = React.createClass({
  render: function() {
    return (
      <nav>
        <span onClick={navigate('index')}><b>rcrd</b></span>
        <span onClick={navigate('everything')}>everything</span>
      </nav>
    );
  }
});

module.exports = Header;
