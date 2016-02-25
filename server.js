'use strict'

const assignRecordID = require('./lambda/assign-record-id')
const app = require('./app')
const dynamoDocStub = require('./test/lambda/dynamodb-doc-stub')
const randomWords = require('random-words')
const util = require('./browser/util')

seed()

app.listen(8000, function () {
  console.log('Listening on port 8000');
});

function seed() {

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

  dynamoDocStub._set('rcrd-access-tokens', {
    id: 'some_bs_access_token',
    owner: 'gcarpenterv@gmail.com',
  })
}
