'use strict'
const assignRecordID = require('../lambda/assign-record-id')
const dynamoDocStub = require('test-lambda').dynamo
const randomWords = require('random-words')
const util = require('../browser/util')

function seed (num) {
  let record, day
  for (var i = 0; i < num; i++) {
    day = ('00' + util.rand(25)).substr(-4, 4)
    record = {
      raw: randomWords({ min: 3, max: 10 }).join(', '),
      time: `2016-04-${day}T19:02:24Z`,

      time_zone: 'America/Los_Angeles'
    }
    assignRecordID(record)
    dynamoDocStub._set('rcrd-records', record)
  }

  dynamoDocStub._set('rcrd-access-tokens', {
    id: '9EvgVGYuxdOUiYJQqw4qokHjj8nGsIA6hmt+IhXv3eY=',
    owner: 'gcarpenterv@gmail.com'
  })

  dynamoDocStub._set('rcrd-view-data', {
    id: 'nothing right now'
  })
}

module.exports = seed
