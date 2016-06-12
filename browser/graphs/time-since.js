var LinkedCat = require('../linked-cat')
var moment = require('moment')
var React = require('react')
var util = require('../util')

var GraphTimeSince = React.createClass({

  propTypes: {
    last90Days: React.PropTypes.array.isRequired,
    catName: React.PropTypes.string.isRequired
  },

  render: function () {
    var records = this.props.last90Days
    var latestRecord

    records.forEach((record) => {
      var cats = util.baseCatsFromRaw(record.raw)
      if (cats.indexOf(this.props.catName) !== -1) {
        var time = util.timeFromRecord(record)

        if (!latestRecord || time.isAfter(util.timeFromRecord(latestRecord))) {
          latestRecord = record
        }
      }
    })

    var msg
    if (latestRecord) {
      var now = moment()
      var timeDivision = this.props.timeDivision
      var recordTime = util.timeFromRecord(latestRecord)
      var timeSince
      if (timeDivision) {
        timeSince = now.diff(recordTime, timeDivision)

        msg = <span><b>{timeSince} {timeDivision}</b> since last <LinkedCat name={this.props.catName} /></span>
      } else {
        timeSince = recordTime.fromNow(true)
        msg = <span><b>{timeSince}</b> since last <LinkedCat name={this.props.catName} /></span>
      }
    } else {
      msg = <span>No <LinkedCat name={this.props.catName} /> in the last 90 days</span>
    }

    return (
      <div className='chart'>
        {msg}
      </div>
    )
  }
})

module.exports = GraphTimeSince
