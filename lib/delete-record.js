var React = require('react');
var util = require('./util');

var DeleteRecord = React.createClass({

  propTypes: {
    id: React.PropTypes.string.isRequired
  },

  render: function() {
    var id = this.props.id;

    return (
      <button 
        className='button'
        onClick={this.onClick}
        >Delete</button>
    );
  },

  onClick: function () {
    console.log('yas')
  }
});

module.exports = DeleteRecord;
