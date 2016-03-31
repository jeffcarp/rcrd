var React = require('react')

var Thing = React.createClass({
  render: function () {
    var fields
    if (this.props.fields) {
      fields = this.props.fields.map(function (f, i) {
        if (f[2] && f[2] === 'code') {
          return <div className='field' key={i}>
                   <b className='attribute'>{f[0]}:</b> <span className='code'>{f[1]}</span>
                 </div>
        } else {
          return <div className='field' key={i}>
                   <b className='attribute'>{f[0]}:</b>
                   {f[1]}
                 </div>
        }
      })
    }

    var under
    if (this.props.actionText) {
      under = (
        <div className="under">
          <span onClick={this.props.actionOnClick}>{this.props.actionText}</span>
        </div>
      )
    }

    return (
    <div className="thing">
      <div className="type">
        {this.props.type}
      </div>
      <div className="fields">
        {fields}
      </div>
      {under}
    </div>
    )
  }

})

module.exports = Thing
