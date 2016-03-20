var API = require('./api')
var React = require('react')
var ReactDOM = require('react-dom')
var util = require('./util')

var timeZones = [
  'Pacific/Honolulu',
  'America/Los_Angeles',
  'America/Denver',
  'America/Chicago',
  'America/New_York'
]

var SelectTimeZone = React.createClass({

  getInitialState: function () {
    return {
      loading: false
    }
  },

  render: function () {
    var timeStr = util.timeFromRecord(this.props.record)
    var timeZone = this.props.record.time_zone
    var zoneNotFound = timeZones.indexOf(timeZone) === -1
    if (zoneNotFound) {
      timeZones.unshift(timeZone)
    }

    return (
      <div className='m1-0b'>
        <select
          value={timeZone}
          name='select-time-zone'
          ref='selectTimeZone'
          onChange={this.onChange}
          disabled={zoneNotFound || this.state.loading}>
          {timeZones.map(function (zone) {
            return <option value={zone} key={zone}>{zone}</option>
          })}
        </select>
      </div>
    )
  },

  onChange: function () {
    console.log(this.refs.selectTimeZone.value)
    var newZone = this.refs.selectTimeZone.value

    this.setState({ loading: true })

    API.createRecord({
      id: this.props.record.id,
      raw: this.props.record.raw,
      time_zone: newZone
    }, function (err, data) {
      if (err) return console.error(err)

      this.setState({ loading: false });

      console.log(err, data)
    }.bind(this))
  }
});

module.exports = SelectTimeZone;
