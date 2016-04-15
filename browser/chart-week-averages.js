var Cat = require('./cat')
var React = require('react')

var CatChart = React.createClass({
  width: 732,
  height: 50,

  propTypes: {
  },

  render: function (context) {
    var chart = this.props.chart
    if (!chart) {
      return <div></div>
    }

    return (
      <table>
        <tbody>
          <tr>
            <td>
              <Cat name={chart.catName} />
            </td>
            <td>
              <div>{chart.sixteenWeeks}<small>/day</small></div>
              <div><small>last 16 weeks</small></div>
            </td>
            <td>
              <div>{chart.eightWeeks}<small>/day</small></div>
              <div><small>last 8 weeks</small></div>
            </td>
            <td>
              <div>{chart.fourWeeks}<small>/day</small></div>
              <div><small>last 4 weeks</small></div>
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
})

var ChartWeekAverages = React.createClass({

  propTypes: {
  },

  render: function (context) {
    var charts = this.props.charts
console.log(charts)
    if (!charts || !charts.length) {
      return <div></div>
    }

    return (
      <div>
        {charts.map(function (chart, i) {
          return <CatChart chart={chart} key={i} />
        })}
      </div>
    )
  }
})

module.exports = ChartWeekAverages
