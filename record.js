var React = require('react');
var Cat = require('./cat');

var Record = React.createClass({
  render: function() {
    var record = this.props.record;
    var rawCats = record.raw.split(',');
    var cats = rawCats.map(function (name) {
      return <Cat name={name} key={name} />
    });

    var timeStamp = (new Date(Number(record.id))).toString();

    return (
      <div className="record">
        <div className="time">{timeStamp}</div>
        <div>{cats}</div>
      </div>
    );
  }
});

module.exports = Record;
