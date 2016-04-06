var React = require('react')
var API = require('./api')
var bus = require('./bus')()
var CatList = require('./cat-list')
var Editor = require('./editor')

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
      <div className='adder'>
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
      if (err) new Error(err)
      if (data.Item && data.Item.cats && data.Item.cats.length) {
        this.setState({ commonCats: data.Item.cats })
      }
    }.bind(this))
  }

})

module.exports = Adder
