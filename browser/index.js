var React = require('react')
var ReactDOM = require('react-dom')
var Router = require('react-router-component')

var User = require('./services/user')
var Header = require('./header')

var Account = require('./routes/account')
var Authentication = require('./routes/authentication')
var CatPage = require('./routes/cat')
var CatRecordsPage = require('./routes/cat-records')
var Everything = require('./routes/everything')
var Index = require('./routes/index')
var RecordPage = require('./routes/record')
var NotFoundPage = require('./routes/not-found-page')

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
          <Location path='/everything' handler={Everything} />
          <Location path='/login' handler={Authentication} />
          <Location path='/account' handler={Account} />
          <Location path='/cats/:name/records' handler={CatRecordsPage} />
          <Location path='/cats/:name' handler={CatPage} />
          <Location path='/records/:id' handler={RecordPage} />
          <NotFound handler={NotFoundPage} />
        </Locations>
      </div>
    )
  }
})

if (!User.isLoggedIn() && window.location.pathname !== '/login') {
  window.location = '/login'
} else {
  ReactDOM.render(<Root />, document.getElementById('records'))
}
