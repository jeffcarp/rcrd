var React = require('react')

var GraphTimeSince = require('./graphs/graph-time-since')

var Charts = React.createClass({
  render: function () {
    return (
      <div>
        <GraphTimeSince
          catName='haircut'
          timeDivision='weeks'
          last90Days={this.props.last90Days} />
        <GraphTimeSince
          catName='run'
          last90Days={this.props.last90Days} />
      </div>
    )
  }
})

module.exports = Charts
