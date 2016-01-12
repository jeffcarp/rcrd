var React = require('react');
var Cat = require('./cat');

var Record = React.createClass({
  render: function() {
    var record = this.props.record;
    var rawCats = record.raw.split(',');
    var cats = rawCats.map(function (name) {
      return <Cat name={name} key={name} />
    });

    return (
      <div 
        className="record"
        >{cats}</div>
    );
/*
    if (raw) {
      var rawCats = raw.split(',').map(aux.trim);
    }
    else if (rec && rec.raw) {
      var rawCats = rec.raw.split(',').map(aux.trim);
    }
    else {
      var rawCats = [];
    }

    var catSpans = rawCats.map(function(cat) {
      // This logic should take place inside Cat
      // TODO: Merge Cat and SplitCat
      if (aux.hasMag(cat)) {
        return SplitCat({catName: cat});
      }
      else {
        return Cat({catName: cat});
      }
    });

    return React.DOM.div({className: 'record'}, [
      React.DOM.div({className: 'time'}, React.DOM.span(null, 'Saturday May 17, 2014 2:34 AM')),
      React.DOM.div(null, catSpans)
    ]);
*/
  }
});

module.exports = Record;
