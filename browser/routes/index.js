var Adder = require('../adder')
var API = require('../api')
var React = require('react')
var RecordList = require('../record-list')

var Index = React.createClass({

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
        <Adder focus />
        <div className='small-section'>
          <RecordList records={this.state.records} />
        </div>
      </div>
    )
  }

})

module.exports = Index
