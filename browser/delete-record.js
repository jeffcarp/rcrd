var API = require('./api')
var bus = require('./bus')()
var React = require('react')
var util = require('./util')

var DeleteRecord = React.createClass({
  propTypes: {
    id: React.PropTypes.string.isRequired,
  },

  getInitialState: function () {
    return {
      loading: false
    }
  },

  render: function () {
    var id = this.props.id

    return (
    <button className={'button' + (this.state.loading ? ' loading' : '')} onClick={this.onClick}>
      Delete
    </button>
    )
  },

  onClick: function () {
    if (this.state.loading) return

    if (!this.props.id) {
      bus.emit('notification', "Error, didn't find an id to delete.")
      return
    }

    if (!confirm('Currently records are permanently deleted. You cannot undo this.')) return

    this.setState({ loading: true })

    API.deleteRecord(this.props.id, function (err) {
      this.setState({ loading: false })
      if (err) return console.error(err)
      bus.emit('notification', 'Successfully deleted.')
    }.bind(this))
  }
})

module.exports = DeleteRecord
