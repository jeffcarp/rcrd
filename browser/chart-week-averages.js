var Cat = require('./cat')
var React = require('react')
var util = require('./util')

var ChartTimeSince = React.createClass({
  render: function () {
    var timeSince = util.timeFromRecord(this.props.chart.record).fromNow(true)
    return (
      <div className='chart'>
        <b>{timeSince}</b> since last <Cat name={this.props.chart.catName} />
      </div>
    )
  }
})

var CatChart = React.createClass({
  render: function () {
    var chart = this.props.chart
    return (
      <table className='chart'>
        <tbody>
          <tr>
            <td>
              <Cat name={chart.catName} />
            </td>
            <td>
              <div><b>{chart.sixteenWeeks}</b><small>/day last <b>16</b> weeks</small></div>
            </td>
            <td>
              <div><b>{chart.eightWeeks}</b><small>/day last <b>8</b> weeks</small></div>
            </td>
            <td>
              <div><b>{chart.fourWeeks}</b><small>/day last <b>4</b> weeks</small></div>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
})

var ChartWeekAverages = React.createClass({

  propTypes: {
    charts: React.PropTypes.array.isRequired
  },

  render: function () {
    var charts = this.props.charts

    return (
      <div>
        {charts.map(function (chart, i) {
          if (chart.type === 'averages') {
            return <CatChart chart={chart} key={i} />
          } else if (chart.type === 'time-since') {
            return <ChartTimeSince chart={chart} key={i} />
          }
        })}
      </div>
    )
  }
})

module.exports = ChartWeekAverages
