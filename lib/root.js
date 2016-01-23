var React = require('react');
var request = require('browser-request');
var bus = require('./bus')();

var Adder = require('./adder');
var Authentication = require('./authentication');
var Blocks = require('./blocks');
var CatPage = require('./cat-page');
var RecordList = require('./record-list');

var apiURL = 'https://08j98anr5k.execute-api.us-east-1.amazonaws.com/Production/';

var Root = React.createClass({

  getInitialState: function() {
    return {
      page: 'index',
      notification: ''
    };
  },

  componentWillMount: function() {
    var self = this;

    if (!localStorage.access_token) {
      this.setState({
        page: 'login'
      });
    }

    bus.on('page-change', function (data, notification) {
      self.setState({
        page: data,
        notifcation: notification
      });
    });
  },

  render: function() {
    var content;

    switch (this.state.page) {
      case 'index':
        content = (
          <div>
            <Adder />
            <Blocks />
            <RecordList />
          </div>
        );
        break;
      case 'login':
        content = <Authentication />;
        break;
    }

    return (
      <div>
        <div className="notification">{this.state.notification}</div>
        {content}
      </div>
    );
  }
});

module.exports = Root;
