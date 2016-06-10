'use strict'
var API = require('../api')
var bus = require('../bus')()
var CatList = require('../cat-list')
var Charts = require('../charts')
var Editor = require('../editor')
var React = require('react')
var RecordList = require('../record-list')

var Index = React.createClass({

  getInitialState: function () {
    return {
      records: [],
      loadingRecords: true,
      commonCats: [],
      last90Days: []
    }
  },

  componentDidMount: function () {
    this.fetchRecords()


    API.last90DaysCached(function (err, records) {
      if (err) return new Error(err)
      if (records && records.length) {
        this.setState({ last90Days: records })
      }
    }.bind(this))

    API.viewDataCached('top-20-cats', function (err, data) {
      if (err) return new Error(err)
      if (data.Item && data.Item.cats && data.Item.cats.length) {
        this.setState({ commonCats: data.Item.cats })
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
          <div className='adder'>
            <Editor focus />
            <CatList
              cats={this.state.commonCats}
              catOnClick={function (e) {
                bus.emit('add-cat-to-adder', e.target.innerText)
                bus.emit('focus-editor')
              }} />
          </div>
        </div>
        <Charts last90Days={this.state.last90Days} />
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
