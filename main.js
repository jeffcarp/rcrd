console.log('ok');

var React = require('react');
var ReactDOM = require('react-dom');

var Adder = require('./adder');
var RecordList = require('./record-list');

var Root = (
  <div>
    <Adder />
    <RecordList />
  </div>
);

var container = document.getElementById("records"); 
ReactDOM.render(Root, container);
