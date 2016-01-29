var moment = require('moment');
var React = require('react');
var request = require('browser-request');

var API = require('./API');
var bus = require('./bus')();

var Editor = React.createClass({

  getInitialState: function() {
    return {
      timestamp: moment(),
      raw: '',
      savedState: 'saved',
      newRecord: true,
      loading: false
    };  
  },

  componentWillMount: function () {
    if (this.props.record) {
      this.setState({
        raw: this.props.record.raw,
        timestamp: moment(Number(this.props.record.id)),
        newRecord: false
      });
    }
  },

  render: function() {
    var timestamp = this.state.timestamp.format('MMMM Do YYYY, h:mm:ss a');
    return (
      <form 
        className="small-section"
        onSubmit={this.onSubmit}>
        <input 
          type="text" 
          name="raw"
          ref="raw"
          autoCorrect="off"
          autoCapitalize="none"
          placeholder="rcrd, comma, separated" 
          onChange={this.onRawChange}
          value={this.state.raw}
          disabled={this.state.loading}
          /> 
        <div className="time">{timestamp}</div>
        <div>
          <a onClick={this.augmentTime} data-num={-1} data-unit={'day'} className='button'>-1 day</a>
          <a onClick={this.augmentTime} data-num={1} data-unit={'day'} className='button'>+1 day</a>
          {' '}
          <a onClick={this.augmentTime} data-num={-1} data-unit={'hours'} className='button'>-1 hours</a>
          <a onClick={this.augmentTime} data-num={1} data-unit={'hours'} className='button'>+1 hour</a>
          {' '}
          <a onClick={this.augmentTime} data-num={-10} data-unit={'minutes'} className='button'>-10 min</a>
          <a onClick={this.augmentTime} data-num={10} data-unit={'minutes'} className='button'>+10 min</a>
        </div>
        <input
          type="submit"
          value="Create record"
          disabled={this.state.loading}
          />
      </form>
    );
  },

  onRawChange: function (e) {
    this.setState({
      raw: e.target.value,
      savedState: 'unsaved'
    });
  },

  onSubmit: function (e) {
    e.preventDefault();
    var self = this;

    this.setState({
      loading: true
    });
 
    if (this.state.newRecord) {
      API.createRecord({
        id: this.state.timestamp.format('x'), 
        raw: this.state.raw
      }, function (err, data) {
        self.setState({
          loading: false
        });

        if (err) {
          console.error(err);
          return;
        }

        console.log(data);
        bus.emit('record-added');

        self.setState({
          raw: '',
          newRecord: true,
        });
      });
    } else {
      console.log('update (replace) record');
    }
  },

  augmentTime: function (e) {
    e.preventDefault();
    var num = e.target.getAttribute('data-num');
    var unit = e.target.getAttribute('data-unit');
    this.setState({
      timestamp: this.state.timestamp.add(num, unit)
    });
    return false;
  }

});

module.exports = Editor;
