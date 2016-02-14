var React = require('react');
var Record = require('./record');

var RecordList = React.createClass({

  render: function() {
    if (this.props.records.length > 0) {
      return (
        <div>
          {
            this.props.records.map(function (record) {
              return <Record record={record} key={record.id} />
            })
          }
        </div>
      );

      return <div>{recordDivs}</div>;
    } else if (this.props.loading) {
      return <div className="faded">Loading records...</div>;
    } else {
      return <div className="faded">No records to show.</div>;
    }
  }

});

module.exports = RecordList;
