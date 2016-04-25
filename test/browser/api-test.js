'use strict'

const app = require('../../server/app')
const dynamoDocStub = require('test-lambda').dynamo
const proxyquire = require('proxyquire').noCallThru()
const request = require('request')
import test from 'ava'

const API = proxyquire('../../browser/api', {
  './constants': { localAPI: true },
  'browser-request': request
})
const expectedID = '7056e94d4dd347c0408f8f6b661397af029363c54cf81af465c1d469f435f1b0'

test.skip('does stuff I guess', function (t) {
  // XMLHttpRequest is not defined

  let server = app.listen(8000, function () {
    console.log('Listening on port 8000')

    const expectedRecord = {
      id: expectedID,
      raw: 'yas',
      time: '2016-05-22T18:19:19Z',
      time_zone: 'America/Los_Angeles'
    }
    dynamoDocStub._set('rcrd-records', expectedRecord)

    API.fetchRecord(expectedID, function (err, record) {
      if (err) return console.error(err)
      t.ok(record)
      t.pass()
      server.close()
    })
  })
})
