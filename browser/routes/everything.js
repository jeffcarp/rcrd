var React = require('react')
var ReactDOM = require('react-dom')

var API = require('../api')
var RecordList = require('../record-list')

var Everything = React.createClass({
  getInitialState: function () {
    return {
      records: []
    }
  },

  componentDidMount: function () {
    API.fetchRecords(function (err, records) {
      if (err) return console.error(err)
      this.setState({ records: records })
    }.bind(this))
  },

  render: function () {
    return (
    <div>
      <div className="small-section">
        <RecordList records={this.state.records} />
      </div>
    </div>
    )
  }
})

module.exports = Everything
