var React = require('react');
var ReactDOM = require('react-dom');
var pluralize = require('pluralize');

var bus = require('./bus')();
var Link = require('react-router-component').Link;
var util = require('./util');

var Cat = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  render: function() {
    var name = this.props.name.trim();
    var bareName = util.sansMagnitude(this.props.name).trim();
    var bareNameSingular = pluralize(bareName, 1);
    var bareNameEscaped = encodeURIComponent(bareNameSingular);
    var url = '/cats/' + bareNameEscaped;
    var hue = util.catNameToHue(name);

    var onClick = this.props.onClick || function () {
      window.location = url;
    }

    if (util.hasMagnitude(name)) {
      return (
        <span
          className='split-cat' 
          onClick={onClick}
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
        </span>
      );
    } else {
      return (
        <span
          className='cat' 
          onClick={onClick}
          href={url}
          ><span
            style={{
              backgroundColor: 'hsl('+hue+', 50%, 60%)'
            }}>{name}</span></span>
      );
    }

  }

});

module.exports = Cat;
