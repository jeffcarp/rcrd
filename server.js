'use strict'

const assignRecordID = require('./lambda/assign-record-id')
const bodyParser = require('body-parser')
const context = require('./test/lambda/context-stub')
const cors = require('cors')
const express = require('express')
const dynamoDocStub = require('./test/lambda/dynamodb-doc-stub')
const fs = require('fs')
const randomWords = require('random-words')
const proxyquire = require('proxyquire').noCallThru()
const util = require('./lib/util')

const app = express()
const index = fs.readFileSync('index.html', 'utf-8');
const FAKE_LATENCY = 1e3
const lambda = proxyquire('./lambda/index', {
  'dynamodb-doc': dynamoDocStub
})

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('.'))

seed()

app.post('/api/*', function (req, res) {

  console.log(req.body)

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
});

app.listen(8000, function () {
  console.log('Listening on port 8000');
});

function seed() {
  
  dynamoDocStub._createTable('rcrd-records')

  let record, day;
  for (var i = 0; i < 50; i++) {
    day = ("00" + util.rand(25)).substr(-4,4)
    record = {
      raw: randomWords({ min: 3, max: 10 }).join(', '),
      time: `2016-02-23T${day}:02:36+00:00`,
      time_zone: 'America/Los_Angeles'
    }
    assignRecordID(record)
    dynamoDocStub._set('rcrd-records', record)
  }

  dynamoDocStub._createTable('rcrd-access-tokens')

  dynamoDocStub._set('rcrd-access-tokens', {
    id: 'some_bs_access_token',
    owner: 'gcarpenterv@gmail.com',
  })
}
