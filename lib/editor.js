var moment = require('moment');
var React = require('react');
var request = require('browser-request');

var API = require('./api');
var bus = require('./bus')();
var util = require('./util');
var User = require('./services/user');

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

  addCat: function (catName) {
    if (!catName || !catName.length) return;

    var raw = this.state.raw;
    var newRaw = '';
    if (raw.length) {
      if (raw.slice(-2) === ', ') {
        newRaw = raw + catName;
      } else if (raw.slice(-1) === ' ') {
        newRaw = raw.trim() + ', ' + catName;
      } else if (raw.slice(-1) === ',') {
        newRaw = raw + ' ' + catName;
      } else {
        newRaw = raw + ', ' + catName;
      }
    } else {
      newRaw = catName;
    }

    this.setState({ raw: newRaw });
  },

  focusEditor: function () {
    this.refs.raw.focus();
  },

  componentWillMount: function () {
    if (this.props.record) {
      this.setState({
        raw: this.props.record.raw,
        timestamp: moment(Number(this.props.record.id)),
        newRecord: false
      });
    }
    bus.on('add-cat-to-adder', this.addCat);
    bus.on('focus-editor', this.focusEditor);
  },

  componentDidMount: function () {
    if (this.props.focus) {
      this.refs.raw.focus();
    }
  },

  componentWillUnmount: function () {
    bus.off('add-cat-to-adder', this.addCat);
    bus.off('focus-editor', this.focusEditor);
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
        <div className="time m1-0b">{timestamp}</div>
        <div className='m1-0b'>
          <a onClick={this.augmentTime} data-num={-1} data-unit={'day'} className='button'>-1 day</a>
          <a onClick={this.augmentTime} data-num={1} data-unit={'day'} className='button'>+1 day</a>
          {' '}
          <a onClick={this.augmentTime} data-num={-1} data-unit={'hours'} className='button'>-1 hours</a>
          <a onClick={this.augmentTime} data-num={1} data-unit={'hours'} className='button'>+1 hour</a>
          {' '}
          <a onClick={this.augmentTime} data-num={-10} data-unit={'minutes'} className='button'>-10 min</a>
          <a onClick={this.augmentTime} data-num={10} data-unit={'minutes'} className='button'>+10 min</a>
        </div>
        <div className='m1-0b'>
          Current time zone: {User.time_zone()}
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

    var cats = util.catsFromRaw(this.state.raw); 
    if (util.hasDupes(cats)) {
      bus.emit('notification', 'Cannot create record with duplicate cats.');
      return;
    }

    this.setState({
      loading: true
    });
 
    if (this.state.newRecord) {
      API.createRecord({
        raw: this.state.raw,
        time: this.state.timestamp.format(), 
        time_zone: User.time_zone()
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
