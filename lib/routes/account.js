var React = require('react')

var Account = React.createClass({

  render: function() {
    return (
      <div className="page">

        <section>
          <h2>Account</h2>
          <div><b>Email:</b> {localStorage.email}</div>
        </section>

        <section>
          <h2>Sessions</h2>
          
          <p><b>Current Session</b>: Access Token: <code>{localStorage.access_token}</code></p>
          <div><a href="#" onClick={this.logout}>Delete current session (this will log you out)</a></div>
        </section>

      </div>
    );
  },

  logout: function (e) {
    e.preventDefault();
    
    console.log('logout'); 

    delete localStorage.email;
    delete localStorage.access_token;

    window.location = '/login'; 
  }

});

module.exports = Account;
