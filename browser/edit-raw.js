var API = require('./api')
var classNames = require('classnames')
var React = require('react')
var ReactDOM = require('react-dom')
var util = require('./util')

var EditRaw = React.createClass({

  getInitialState: function () {
    return {
      raw: '',
      loading: false
    }
  },

  render: function () {
    console.log(this.props)
    return (
      <form
        onSubmit={this.update}
        className={classNames(
          'm1-0b',
          { 'disabled': this.state.loading }
        )}>
        <input 
          type="text" 
          name="raw"
          ref="raw"
          autoCorrect="off"
          autoCapitalize="none"
          placeholder="rcrd, comma, separated" 
          defaultValue={this.props.record.raw}
          disabled={this.state.loading}
          />
        <button
          onClick={this.resetRaw}
          className='button'>Reset raw changes</button>
        <button
          onClick={this.update}
          className='button'>Update raw</button>
      </form>
    );
  },

  resetRaw: function () {
    this.refs.raw.value = this.props.record.raw
  },

  update: function (e) {
    e.preventDefault()

    this.setState({ loading: true })

    API.createRecord({
      id: this.props.record.id,
      raw: this.refs.raw.value,
    }, function (err, data) {
      if (err) return console.error(err)

      this.setState({ loading: false });

      console.log(err, data)
    }.bind(this))
  }
});

module.exports = EditRaw 
