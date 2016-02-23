var moment = require('moment-timezone')
var React = require('react')
var ReactDOM = require('react-dom')
var util = require('./util');

var TimeZoneOption = React.createClass({
  render: function () {
    return (
      <option value={this.props.value}>America/Los_Angeles</option>
    )
  }
})

var SelectTimeZone = React.createClass({
  render: function () {
    var time = util.recordIDToTimeStr
     
    console.log(moment.tz(time))
    return (
      <div>
        <select>
          <option value='America/Los_Angeles'>America/Los_Angeles</option>
          <option value='America/Denver'>America/Denver</option>
          <option value='America/Chicago'>America/Chicago</option>
          <option value='America/New_York'>America/New_York</option>
        </select>
      </div>
    );
  }
});

module.exports = SelectTimeZone;
