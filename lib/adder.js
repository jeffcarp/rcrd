var React = require('react');
var request = require('browser-request');
var moment = require('moment');

var API = require('./api');
var bus = require('./bus')();
var CatList = require('./cat-list');
var Editor = require('./editor');
var util = require('./util');

var Adder = React.createClass({

  getInitialState: function () {
    return {
      records: [],
      commonCats: []
    };
  },

  componentDidMount: function () {
    this.getCommonCats();
  },

  render: function() {
    var records = this.state.records;

    var cats = this.state.commonCats.map(function (catObj) {
      var name = catObj.name;
      var frequency = catObj.num;
      return name;
    });

    return (
      <div className="adder">
        <Editor focus={this.props.focus} />
        <CatList cats={cats} catOnClick={this.catOnClick} />
      </div>
    );
  },

  catOnClick: function (e) {
    e.preventDefault();
    bus.emit('add-cat-to-adder', e.target.innerText);
    bus.emit('focus-editor');
  },

  getCommonCats: function () {
    var self = this;

    API.fetchRecords(function (err, records) {
      if (err) {
        return console.error(err);
      }

      var catNumbers = {};

      util.allCats(records).forEach(function (name) {
        name = util.sansMagnitude(name);
        if (catNumbers[name]) {
          catNumbers[name] += 1;
        } else {
          catNumbers[name] = 1;
        }
      });

      var catNumberArray = [];
      for (var name in catNumbers) {
        catNumberArray.push({name: name, num: catNumbers[name]});
      }

      catNumberArray.sort(function (a, b) {
        return b.num - a.num;
      });

      catNumberArray = catNumberArray.slice(0, 30);

      self.setState({ commonCats: catNumberArray });
    });
  }

});

module.exports = Adder;
