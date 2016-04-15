var Adder = require('../adder')
var API = require('../api')
var bus = require('../bus')()
var ChartWeekAverages = require('../chart-week-averages')
var React = require('react')
var RecordList = require('../record-list')

var Index = React.createClass({

  getInitialState: function () {
    return {
      records: [],
      loadingRecords: true,
      charts: []
    }
  },

  componentDidMount: function () {
    this.fetchRecords()

    API.viewData('quick-charts', function (err, data) {
      if (err) return console.error(err)
      if (data.Item && data.Item.charts && data.Item.charts.length) {
        this.setState({ charts: data.Item.charts })
      }
    }.bind(this))

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
        <div className='small-section'>
          <Adder focus />
        </div>
        { this.state.charts.length ? (
          <div className='small-section'>
            <ChartWeekAverages charts={this.state.charts} />
          </div>
        ) : null }
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
