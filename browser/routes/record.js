var API = require('../api')
var bus = require('../bus')()
var DeleteRecord = require('../delete-record')
var EditRaw = require('../edit-raw')
var React = require('react')
var Record = require('../record')
var SelectTimeZone = require('../select-time-zone')

var RecordPage = React.createClass({
  getInitialState: function () {
    return {
      record: undefined
    }
  },

  componentWillMount: function () {
    this.fetchRecord(this.props.id)

    bus.on('record-created-or-updated', function (record) {
      if (record.id === this.state.record.id) {
        this.setState({ record: record })
      }
    }.bind(this))
  },

  fetchRecord: function (id) {
    API.fetchRecord(id, function (err, data) {
      if (err) throw new Error(err)
      if (!data.Item) throw new Error('no record found')
      this.setState({ record: data.Item })
    }.bind(this))
  },

  render: function () {
    var record = this.state.record

    if (record) {
      return (
        <section>
          <Record record={record} />
          <SelectTimeZone record={record} />
          <EditRaw record={record} />
          <DeleteRecord id={record.id} />
        </section>
      )
    } else if (record === null) {
      return (
        <section>
          <div className='faded'>
            Error loading record.
          </div>
        </section>
      )
    } else {
      return (
        <section>
          <div className='faded'>
            Loading record...
          </div>
        </section>
      )
    }
  }
})

module.exports = RecordPage
