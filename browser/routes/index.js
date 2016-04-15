var Adder = require('../adder')
var API = require('../api')
var bus = require('../bus')()
var React = require('react')
var RecordList = require('../record-list')

var Index = React.createClass({

  getInitialState: function () {
    return {
      records: [],
      loadingRecords: true
    }
  },

  componentDidMount: function () {
    this.fetchRecords()

    bus.on('record-created-or-updated', function () {
      this.setState({ loadingRecords: true })
      this.fetchRecords()
    }.bind(this))
  },

  fetchRecords: function () {
    API.fetchRecords(function (err, records) {
      this.setState({ loadingRecords: false })
      if (err) return console.error(err)
      this.setState({ records: records })
    }.bind(this))
  },

  render: function () {
    return (
      <div>
        <Adder focus />
        <div className='small-section'>
          <RecordList
            records={this.state.records}
            loading={this.state.loadingRecords}
            />
        </div>
      </div>
    )
  }

})

module.exports = Index
