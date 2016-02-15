var CatList = require('./cat-list');
var Editor = require('./editor');
var Link = require('react-router-component').Link;
var moment = require('moment');
var React = require('react');

var TimeBar = React.createClass({

  width: 400,
  height: 10,

  propTypes: {
    time: React.PropTypes.string.isRequired
  },

  render: function () {
    var time = moment(this.props.time);
    console.log(time);
    return <div></div>;

    return (
      <div>
          <svg 
            viewBox={'0 0 '+this.width+' '+this.height}
            width="100%"
            height={this.height}
            style={{ backgroundColor: '#ddd' }}
            >
            <rect 
              x={moment(this.props.time).format('dddd')} 
              y={0} 
              width={5} 
              height={this.height} 
              fill='green'
              />
          </svg>
      </div>
    );
  }

});

var Record = React.createClass({

  getInitialState: function () {
    return {
      editing: false,
      rawEdit: ''
    };
  },

  componentWillMount: function () {
    this.setState({
      rawEdit: this.props.record.raw
    });
  },

  render: function () {
    var record = this.props.record;
    var url = '/records/' + record.id;

    var timestamp = moment(Number(record.id)).format('MMMM Do YYYY, h:mm:ss a');

    if (this.state.editing) {
      return (
        <div className="record">
          <Editor record={this.props.record} />
          <div className="time"><span onClick={this.toggleEdit}>stop editing</span></div>
        </div>
      );
    } else {
      return (
        <div className="record">
          <TimeBar time={this.props.record.id} />
          <Link className="time" href={url}>{timestamp}</Link>
          <CatList raw={record.raw} />
        </div>
      );
    }
  },

  onChange: function (e) {
    this.setState({
      rawEdit: e.target.value
    });
  },

  toggleEdit: function () {
    this.setState({
      editing: !this.state.editing
    });
  }
});

module.exports = Record;
