var Cat = require('./cat');
var Link = require('react-router-component').Link;
var React = require('react');

var TogetherCats = React.createClass({

  propTypes: {
    rootCatName: React.PropTypes.string.isRequired,
    cats: React.PropTypes.array.isRequired
  },

  render: function() {
    var rootCatName = this.props.rootCatName;
    var cats = this.props.cats;

    if (cats.length) {
      var catLis = cats.map(function (cat, index) {
        return (
          <li key={index}>
            <div className='m7b'>
              <Cat name={cat.name} />
            </div>
            <div>
              <span>Seen {cat.num} times together. <a href={'/cats/'+rootCatName+'?also='+cat.name}>See records with {rootCatName} and {cat.name}.</a></span>
            </div>
          </li>
        );
      });
    } else {
      var catLis = <li>No cats to display.</li>;
    }

    return (
      <ul>
        {catLis}
      </ul>
    );
  }

});

module.exports = TogetherCats;
