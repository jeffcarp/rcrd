var LinkedCat = require('../linked-cat')
var moment = require('moment')
var React = require('react')
var util = require('../util')

var GraphWeekAverages = React.createClass({

  propTypes: {
    catName: React.PropTypes.string.isRequired,
    last90Days: React.PropTypes.array.isRequired
  },

  averageSinceNumWeeksAgo: function (numWeeks) {
    const startDate = moment().subtract(numWeeks, 'weeks')
    const endDate = moment()

    var total = 0
    this.props.last90Days.forEach((record) => {
      const cats = util.baseCatsFromRaw(record.raw)
      if (cats.indexOf(this.props.catName) !== -1) {
        const time = util.timeFromRecord(record)
        if (time.isAfter(startDate) && time.isBefore(endDate)) {
          total += 1
        }
      }
    })

    return Number(total / numWeeks).toFixed(2)
  },

  render: function () {
    return (
      <table className='chart'>
        <tbody>
          <tr>
            <td>
              <LinkedCat name={this.props.catName} />
            </td>
            <td>
              <div><b>{this.averageSinceNumWeeksAgo(16)}</b><small>/week last <b>16</b> weeks</small></div>
            </td>
            <td>
              <div><b>{this.averageSinceNumWeeksAgo(8)}</b><small>/week last <b>8</b> weeks</small></div>
            </td>
            <td>
              <div><b>{this.averageSinceNumWeeksAgo(4)}</b><small>/week last <b>4</b> weeks</small></div>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
})

module.exports = GraphWeekAverages
