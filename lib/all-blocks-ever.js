var assert = require('assert'); 
var React = require('react');
var ReactDOM = require('react-dom');
var moment = require('moment');
var util = require('./util');

var AllBlocksEver = React.createClass({

  height: 40,

  propTypes: {
    hue: React.PropTypes.number,
    records: React.PropTypes.array.isRequired,
  },

  getInitialState: function () {
    return { 
      svgOpacity: 0,
      recordsOpacity: 0 
    };
  },

  componentDidMount: function () {
    setTimeout(function () {
      this.setState({ svgOpacity: 1 });
    }.bind(this), 200);
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.records.length && this.state.recordsOpacity === 0) {
      this.setState({ recordsOpacity: 1 });
    }
  },

  render: function(context) {
    var records = this.props.records;

    var hue = util.catNameToHue('workout');
    var totalDays = 366;
    var blockWidth = 1;
    var blockPadding = 1;
    var blockDimension = blockWidth + blockPadding;
    var width = (totalDays * blockDimension) + blockPadding;

    var oneYear = [];
    for (var i = 0; i < 366; i++) {
      oneYear.push(
        <rect 
          x={(i * blockDimension) + blockPadding} 
          y={0} 
          width={blockWidth} 
          height={40} 
          fill={'hsl('+hue+', 55%, 65%)'}
          key={i}
          />
      );
    }

    var recordEls = records.map(function (record, i) {
      // Get number of days between record and now
      var numDay = Number(moment.unix(Number(record.id) / 1000).format('DDD'));
      return (
        <rect 
          x={(numDay * blockDimension) + blockPadding} 
          y={0} 
          width={blockWidth} 
          height={40} 
          fill={'hsl('+hue+', 50%, 30%)'}
          key={i}
          />
      );
    }.bind(this));

    return (
      <div 
        style={{
          borderLeft: 'solid 8px hsl('+hue+', 50%, 40%)',
          backgroundColor: 'hsl('+hue+', 60%, 70%)'
        }}>
        <div
          style={{ 
            fontSize: '0.7em',
            color: 'white',
            padding: '0.5em' 
          }}
          >All records for x</div>
          <svg 
            viewBox={'0 0 '+width+' '+this.height}
            width="100%"
            height={this.height}
            style={{
              opacity: this.state.svgOpacity
            }}>
            {oneYear}
            {recordEls}
          </svg>
      </div>
    );
  }
});

module.exports = AllBlocksEver;
