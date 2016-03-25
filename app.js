'use strict'

const bodyParser = require('body-parser')
const context = require('./test/lambda/context-stub')
const cors = require('cors')
const express = require('express')
const dynamoDocStub = require('test-lambda').dynamo
const fs = require('fs')
const proxyquire = require('proxyquire').noCallThru()

const app = express()
const index = fs.readFileSync('index.html', 'utf-8');
const lambda = proxyquire('./lambda/index', {
  'dynamodb-doc': dynamoDocStub
})

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('.'))

app.post('/api/*', function (req, res) {

  context.callback = function (status, data) {
    if (status !== 'fail') {
      res.json(data)
    } else {
      console.error(status, data)
    }
  };

  lambda.handler(req.body, context);
})

app.get('*', function (req, res) {
  res.send(index);
})

module.exports = app
