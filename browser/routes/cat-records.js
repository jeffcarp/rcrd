var API = require('../api')
var Cat = require('../cat')
var React = require('react')
var RecordList = require('../record-list')

var CatRecordsPage = React.createClass({
  getInitialState: function () {
    return {
      records: null,
      name: ''
    }
  },

  componentWillMount: function () {
    var name = decodeURIComponent(this.props.name)
    this.setState({ name: name })
    this.refreshRecords(name)
  },

  refreshRecords: function (name) {
    API.fetchRecordsWithCat(name, function (err, records) {
      if (err) return console.error(err)
      this.setState({ records: records })
    }.bind(this))
  },

  render: function () {
    return (
      <div>
        <section>
          <h2>All records with <Cat name={this.state.name} /></h2>
        </section>
        <section>
          <RecordList records={this.state.records} />
        </section>
      </div>
    )
  }
})

module.exports = CatRecordsPage
