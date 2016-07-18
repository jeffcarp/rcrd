'use strict'
import test from 'ava'
const dynamoDocStub = require('test-lambda').dynamo
import lambdaTest from '../support/lambda-test'

const expectedID = '7056e94d4dd347c0408f8f6b661397af029363c54cf81af465c1d469f435f1b0'

test('getRecord fails with no access token', function (t) {
  lambdaTest({
    operation: 'record.get',
    id: expectedID,
    raw: 'test, raw'
  }, (status, arg) => {
    t.is(status, 'fail', 'status is fail')
    t.is(arg, 'access_token denied', 'error is "access_token denied"')
    t.pass()
  })
})

test('getRecord gets a record', function (t) {
  const expectedRecord = {
    id: expectedID,
    raw: 'yas',
    user_id: 'hi@jeff.is',
    time: '2016-05-22T18:19:19Z',
    time_zone: 'America/Los_Angeles'
  }
  dynamoDocStub._set('rcrd-records', expectedRecord)

  lambdaTest({
    operation: 'record.get',
    id: expectedID,
    access_token: 'some_bs_access_token'
  }, (status, data) => {
    t.is(status, 'succeed')
    let record = data.Item
    t.truthy(record)
    t.is(record.id, expectedRecord.id)
    t.is(record.raw, expectedRecord.raw)
    t.is(record.time, expectedRecord.time)
    t.is(record.time_zone, expectedRecord.time_zone)
    t.pass()
  })
})

test('record.get will not get a record you do not own', function (t) {
  const expectedRecord = {
    id: expectedID,
    raw: 'yas',
    user_id: 'hi2@jeff.is',
    time: '2016-05-22T18:19:19Z',
    time_zone: 'America/Los_Angeles'
  }
  dynamoDocStub._set('rcrd-records', expectedRecord)

  lambdaTest({
    operation: 'record.get',
    id: expectedID,
    access_token: 'some_bs_access_token'
  }, (status, data) => {
    console.log(data)
    t.is(status, 'fail')
    t.pass()
  })
})
