var React = require('react');
var ReactDOM = require('react-dom');

var Adder = require('./adder');
var Blocks = require('./blocks');
var CatPage = require('./cat-page');
var RecordList = require('./record-list');

var Root = (
  <div>
    <Adder />
    <Blocks />
    <CatPage name="test" />
  </div>
);

var container = document.getElementById("records"); 
ReactDOM.render(Root, container);
