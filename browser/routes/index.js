'use strict'
var API = require('../api')
var bus = require('../bus')()
var CatList = require('../cat-list')
var Charts = require('../charts')
var Editor = require('../editor')
var React = require('react')
var RecordList = require('../record-list')
var moment = require('moment')
var util = require('../util')

var Index = React.createClass({

  getInitialState: function () {
    return {
      loadingRecords: true,
      commonCats: [],
      last90Days: []
    }
  },

  componentDidMount: function () {
    API.last90DaysCachedOptimistically((err, records) => {
      if (err) return new Error(err)
      if (records && records.length) {
        this.setState({
          last90Days: records,
          loadingRecords: false
        })
      }
    })

    /*
    TODO: restore with last90
    API.viewDataCached('top-20-cats', function (err, data) {
      if (err) return new Error(err)
      if (data.Item && data.Item.cats && data.Item.cats.length) {
        this.setState({ commonCats: data.Item.cats })
      }
    }.bind(this))
    */

    bus.on('record-created-or-updated', () => {
      this.setState({ loadingRecords: true })
      API.last90Days((err, records) => {
        if (err) return new Error(err)
        if (records && records.length) {
          this.setState({
            last90Days: records,
            loadingRecords: false
          })
        }
      })
    })
  },

  render: function () {
    var daysAgo14 = moment().subtract(14, 'days')
    var last14Days = this.state.last90Days.filter((record) => (
      util.timeFromRecord(record).isAfter(daysAgo14)
    )).sort((a, b) => {
      if (util.timeFromRecord(a).isAfter(util.timeFromRecord(b))) {
        return -1
      } else if (util.timeFromRecord(a).isBefore(util.timeFromRecord(b))) {
        return 1
      } else {
        return 0
      }
    })

    return (
      <div>
        <div className='small-section'>
          <div className='adder'>
            <Editor focus />
          </div>
        </div>
        <Charts last90Days={this.state.last90Days} />
        <div className='small-section'>
          <RecordList
            records={last14Days}
            loading={this.state.loadingRecords}
            />
        </div>
      </div>
    )
  }

})

module.exports = Index
