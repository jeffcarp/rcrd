'use strict'

const assignRecordID = require('../lambda/assign-record-id')
const app = require('./app')
const dynamoDocStub = require('test-lambda').dynamo
const randomWords = require('random-words')
const util = require('../browser/util')

seed()

app.listen(8000, function () {
  console.log('Listening on port 8000');
});

function seed() {

  let record, day;
  for (var i = 0; i < 5; i++) {
    day = ("00" + util.rand(25)).substr(-4,4)
    record = {
      raw: randomWords({ min: 3, max: 10 }).join(', '),
      time: `2016-02-23T${day}:02:36+00:00`,
      time_zone: 'America/Los_Angeles'
    }
    assignRecordID(record)
    dynamoDocStub._set('rcrd-records', record)
  }

  dynamoDocStub._set('rcrd-access-tokens', {
    id: '9EvgVGYuxdOUiYJQqw4qokHjj8nGsIA6hmt+IhXv3eY=',
    owner: 'gcarpenterv@gmail.com',
  })

  dynamoDocStub._set('rcrd-view-data', {
    id: 'nothing right now',
  })
}
