var API = require('./api')
var classNames = require('classnames')
var React = require('react')
var util = require('./util')

var EditRaw = React.createClass({
  getInitialState: function () {
    return {
      raw: '',
      loading: false,
      timestamp: null
    }
  },

  componentWillMount: function () {
    this.setState({
      timestamp: util.timeFromRecord(this.props.record)
    })
  },

  render: function () {
    var timestamp = this.state.timestamp.format('MMMM Do YYYY, h:mm:ss a')

    return (
      <form onSubmit={this.update} className={classNames('m1-0b', {'disabled': this.state.loading})}>
        <input
          type='text'
          name='raw'
          ref='raw'
          autoCorrect='off'
          autoCapitalize='none'
          placeholder='rcrd, comma, separated'
          defaultValue={this.props.record.raw}
          disabled={this.state.loading} />
        <div className='time m1-0b'>
          {timestamp}
        </div>
        <div className='m1-0b'>
          <a
            onClick={this.augmentTime}
            data-num={-1}
            data-unit={'day'}
            className='button'>-1 day</a>
          <a
            onClick={this.augmentTime}
            data-num={1}
            data-unit={'day'}
            className='button'>+1 day</a>
          {' '}
          <a
            onClick={this.augmentTime}
            data-num={-1}
            data-unit={'hours'}
            className='button'>-1 hours</a>
          <a
            onClick={this.augmentTime}
            data-num={1}
            data-unit={'hours'}
            className='button'>+1 hour</a>
          {' '}
          <a
            onClick={this.augmentTime}
            data-num={-10}
            data-unit={'minutes'}
            className='button'>-10 min</a>
          <a
            onClick={this.augmentTime}
            data-num={10}
            data-unit={'minutes'}
            className='button'>+10 min</a>
        </div>
        <button onClick={this.resetRaw} className='button'>
          Reset
        </button>
        <button onClick={this.update} className='button'>
          Update
        </button>
      </form>
    )
  },

  resetRaw: function () {
    this.refs.raw.value = this.props.record.raw
    this.setState({
      timestamp: util.timeFromRecord(this.props.record)
    })
  },

  augmentTime: function (e) {
    e.preventDefault()

    var num = e.target.getAttribute('data-num')
    var unit = e.target.getAttribute('data-unit')

    this.setState({
      timestamp: this.state.timestamp.add(num, unit)
    })

    return false
  },

  update: function (e) {
    e.preventDefault()

    this.setState({ loading: true })
    var time = this.state.timestamp.clone()

    API.createRecord({
      id: this.props.record.id,
      raw: this.refs.raw.value,
      time: time.utc().format(),
      time_zone: this.props.record.time_zone
    }, function (err, data) {
      if (err) return console.error(err)

      this.setState({ loading: false })

      console.log(err, data)
    }.bind(this))
  }
})

module.exports = EditRaw
