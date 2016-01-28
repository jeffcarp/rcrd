var React = require('react');

var bus = require('./bus')();
var Link = require('react-router-component').Link;
var util = require('./util');

function strTo256(str) {
  var num = 0;
  for (var i in str) {
    num += str.charCodeAt(i);
  }

  return num % 256;
}

var Cat = React.createClass({

  render: function() {
    var name = this.props.name.trim();
    var bareName = util.sansMagnitude(this.props.name).trim();
    var url = '/cats/' + bareName;
    var hue = strTo256(bareName);

    if (util.hasMagnitude(name)) {
      return (
        <Link 
          className='split-cat' 
          href={url}>
          <span 
            style={{
              backgroundColor: 'hsl('+hue+', 50%, 40%)'
            }}
            className='magnitude'
            >{util.magnitudePortion(name)}</span>
          <span 
            style={{
              backgroundColor: 'hsl('+hue+', 50%, 60%)'
            }}
            className='name'
            >{util.sansMagnitude(name)}</span>
        </Link>
      );
    } else {
      return (
        <Link 
          className='cat' 
          href={url}
          ><span
            style={{
              backgroundColor: 'hsl('+hue+', 50%, 60%)'
            }}>{name}</span></Link>
      );
    }

  }

});

module.exports = Cat;
