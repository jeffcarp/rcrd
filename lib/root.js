var React = require('react');
var request = require('browser-request');
var bus = require('./bus')();

var Adder = require('./adder');
var Authentication = require('./authentication');
var Blocks = require('./blocks');
var CatPage = require('./cat-page');
var Everything = require('./everything');
var Header = require('./header');
var RecordList = require('./record-list');

var apiURL = 'https://08j98anr5k.execute-api.us-east-1.amazonaws.com/Production/';

var Root = React.createClass({

  getInitialState: function() {
    return {
      page: 'index',
      data: {}
    };
  },

  onPageChange: function (page, options) {
    options = options || {};
    options.data = options.data || {};
    this.setState({
      page: page,
      data: options.data
    });
  },

  componentWillMount: function() {
    var self = this;

    if (!localStorage.access_token) {
      this.setState({
        page: 'login'
      });
    }

    bus.on('page-change', this.onPageChange); 
  },

  componentWillUnmount: function () {
    bus.removeListener('page-change', this.onPageChange); 
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
      case 'cat-page':
        content = (
          <div>
            <CatPage name={this.state.data.catName} />
          </div>
        );
        break;
      case 'everything':
        content = (
          <div>
            <Everything />
          </div>
        );
        break;
      case 'login':
        content = <Authentication />;
        break;
    }

    return (
      <div>
        <div className="notification">{this.state.data.notification}</div>
        <Header />
        {content}
      </div>
    );
  }
});

module.exports = Root;
