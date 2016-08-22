var React = require('react')
var ReactDOM = require('react-dom')
var Router = require('react-router-component')

var Account = require('./routes/account')
var Authentication = require('./routes/authentication')
var CatPage = require('./routes/cat')
var CatRecordsPage = require('./routes/cat-records')
var Header = require('./header')
var Index = require('./routes/index')
var RecordPage = require('./routes/record')
var NotFoundPage = require('./routes/not-found-page')
var GraphsPage = require('./routes/graphs')

var Locations = Router.Locations
var Location = Router.Location
var NotFound = Router.NotFound

var Root = React.createClass({
  render: function () {
    return (
      <div>
        <Header />
        <Locations>
          <Location path='/' handler={Index} />
          <Location path='/login' handler={Authentication} />
          <Location path='/account' handler={Account} />
          <Location path='/cats/:name/records' handler={CatRecordsPage} />
          <Location path='/cats/:name' handler={CatPage} />
          <Location path='/records/:id' handler={RecordPage} />
          <Location path='/graphs' handler={GraphsPage} />
          <NotFound handler={NotFoundPage} />
        </Locations>
      </div>
    )
  }
})

ReactDOM.render(<Root />, document.getElementById('container'))
