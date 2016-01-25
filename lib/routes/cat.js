var React = require('react');
var request = require('browser-request');

var API = require('../api');
var bus = require('../bus')();
var Cat = require('../cat');
var Record = require('../record');
var util = require('../util');
var MonthBlocks = require('../month-blocks');

var CatPage = React.createClass({

  getInitialState: function() {
    return {
      records: [],
      contemporaneousCatNames: [],
      name: ''
    };
  },

  componentWillMount: function() {
    this.refreshRecords();
    this.getContemporaneousCats();

    this.setState({ 
      name: this.props.name 
    });
  },

  componentDidUpdate: function() {
    // This occurs when you click on a cat on this page
    if (this.props.name !== this.state.name) {
      this.setState({ 
        name: this.props.name,
        records: []
      });

      this.refreshRecords();
      this.getContemporaneousCats();
    }
  },

  refreshRecords: function() {
    var self = this;

    API.fetchRecordsWithCat(this.props.name, function (err, records) {
      if (err) {
        return console.error(err);
      }

      self.setState({ records: records });
    });
  },

  getContemporaneousCats: function () {
    var self = this;

    API.fetchRecords(function (err, records) {
      if (err) {
        return console.error(err);
      }

      records = records.filter(function (record) {
        return util.catsFromRaw(record.raw).indexOf(self.props.name) !== -1;
      });

      var catNumbers = {};

      util.allCats(records).forEach(function (name) {
        if (name === self.props.name) {
          return;
        } else if (catNumbers[name]) {
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

      self.setState({ contemporaneousCatNames: catNumberArray });
    });
  },

  render: function() {
    var records = this.state.records;
    var cats = this.state.contemporaneousCatNames;
    var name = this.props.name;
    var recordDivs = [];
    var catElems = [];
    var oneYear;

    if (records.length > 0) {
      recordDivs = records.map(function(record) {
        return <Record record={record} key={record.id} />;
      });
    } else {
      recordDivs = <div className="faded">'Loading records..'</div>;
    }

    if (cats.length > 0) {
      catElems = cats.map(function(catNum) {
        return <Cat name={catNum.num + ' ' + catNum.name} key={catNum.name} />;
      });
    } else {
      catElems = <div className="faded">'Loading cats..'</div>;
    }

    return (
      <div>
        <MonthBlocks records={records} numDays={90} />
        <section>
          <h2>Last 10 records with <Cat name={name} /></h2>
          {recordDivs}
        </section>
        <section>
          <h2>Commonly concomitant cats</h2>
          <div style={{margin: '1em 0 0'}}>
            {catElems}
          </div>
        </section>
      </div>
    );
  }
});

module.exports = CatPage;
