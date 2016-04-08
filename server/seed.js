'use strict'
const assignRecordID = require('../lambda/assign-record-id')
const dynamoDocStub = require('test-lambda').dynamo
const randomWords = require('random-words')
const util = require('../browser/util')

function seed (num) {
  let record, day
  for (var i = 0; i < num; i++) {
    day = String(util.rand(31))
    record = {
      raw: randomWords({ min: 3, max: 10 }).join(', '),
      time: `2016-04-${day}T19:02:24Z`,
      time_zone: 'America/Los_Angeles'
    }
    assignRecordID(record)
    dynamoDocStub._set('rcrd-records', record)
  }

  dynamoDocStub._set('rcrd-users', {
    id: 'dev@rcrd.org',
    hash: '7yYOmqPGc68kDReiZgSANhqOCB0f/soqXtDjIZ/BhWc=',
    time_zone: 'America/Los_Angeles'
  })

  dynamoDocStub._set('rcrd-view-data', {
    id: 'nothing right now'
  })
}

module.exports = seed
