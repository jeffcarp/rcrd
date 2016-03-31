var React = require('react')
var request = require('browser-request')
var moment = require('moment')

var API = require('./api')
var bus = require('./bus')()
var CatList = require('./cat-list')
var Editor = require('./editor')
var util = require('./util')

var Adder = React.createClass({
  getInitialState: function () {
    return {
      commonCats: []
    }
  },

  componentDidMount: function () {
    this.getCommonCats()
  },

  render: function () {
    return (
    <div className="adder">
      <Editor focus={this.props.focus} />
      <CatList cats={this.state.commonCats} catOnClick={this.catOnClick} />
    </div>
    )
  },

  catOnClick: function (e) {
    e.preventDefault()
    bus.emit('add-cat-to-adder', e.target.innerText)
    bus.emit('focus-editor')
  },

  getCommonCats: function () {
    API.viewData('top-20-cats', function (err, data) {
      if (err) return console.error(err)
      if (data && data.cats && data.cats.length) {
        this.setState({ commonCats: data.cats })
      }
    }.bind(this))
  }

})

module.exports = Adder
