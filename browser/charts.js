var React = require('react')

var GraphTimeSince = require('./graphs/time-since')
var GraphWeekAverages = require('./graphs/week-averages')

var Charts = React.createClass({
  render: function () {
    return (
      <div>
        <GraphWeekAverages
          catName='floss'
          last90Days={this.props.last90Days} />
        <GraphWeekAverages
          catName='workout'
          last90Days={this.props.last90Days} />
        <GraphTimeSince
          catName='run'
          last90Days={this.props.last90Days} />
        <GraphTimeSince
          catName='haircut'
          timeDivision='weeks'
          last90Days={this.props.last90Days} />
      </div>
    )
  }
})

module.exports = Charts
