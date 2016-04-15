var classnames = require('classnames')
var React = require('react')
var Record = require('./record')

var RecordList = React.createClass({
  propTypes: {
    records: React.PropTypes.array,
    loading: React.PropTypes.bool
  },

  render: function () {
    var records = this.props.records || []
    if (records.length > 0) {
      return (
        <div className={classNames({ loading: this.props.loading })>
          {records.map(function (record) {
            return <Record record={record} key={record.id} />
          })}
        </div>
      )
    } else if (this.props.loading) {
      return <div className='faded'>Loading records...</div>
    } else {
      return <div className='faded'>No records to show.</div>
    }
  }

})

module.exports = RecordList
