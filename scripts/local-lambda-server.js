const express = require('express');
const app = express();
const fs = require('fs');
const lambda = require('../lambda/index');
const bodyParser = require('body-parser');
const contextStub = require('../test/lambda/context-stub');

app.use(bodyParser.json());

app.options('*', function (req, res) {
  res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Origin', '*');
  res.end();
});

app.post('*', function (req, res) {
  res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Origin', '*');
  console.log(req.body)

  contextStub.callback = function (status, arg) {
    res.json({
      status: status,
      arg: arg
    });
  };

  lambda.handler(req.body, contextStub);
});

app.listen(4000, function () {
  console.log('Listening on port 4000');
});

