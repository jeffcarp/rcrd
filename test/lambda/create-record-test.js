'use strict'

import test from 'ava'
const dynamoDocStub = require('test-lambda').dynamo
import lambdaTest from '../support/lambda-test'

const expectedID = '7056e94d4dd347c0408f8f6b661397af029363c54cf81af465c1d469f435f1b0'

// Validation

test('cannot create a record without an id', function (t) {
  lambdaTest({
    operation: 'create',
    raw: 'test, raw, test',
    access_token: 'some_bs_access_token'
  }, (status, arg) => {
    t.is(status, 'fail')
    t.falsy(dynamoDocStub._get('rcrd-records', expectedID), 'a record was not created')
    t.pass()
  })
})

// Authentication

test('createRecord fails with no access token', function (t) {
  lambdaTest({
    operation: 'create',
    raw: 'test, raw'
  }, function (status, arg) {
    t.is(status, 'fail', 'status is fail')
    t.falsy(dynamoDocStub._get('rcrd-records', expectedID), 'a record does not exist')
    t.pass()
  })
})

// Correctness

test('createRecord adds a record', (t) => {
  lambdaTest({
    operation: 'create',
    raw: 'test, raw',
    time: '2016-05-22T18:19:19Z',
    time_zone: 'America/Los_Angeles',
    access_token: 'some_bs_access_token'
  }, (status, record) => {
    t.is(status, 'succeed')
    t.truthy(record, 'a record now exists')
    t.truthy(record.id)
    t.is(record.raw, 'test, raw')
    t.pass()
  })
})

test('can create a record with UTF-8 characters', (t) => {
  const raw = 'test, テスト, 你别放屁'

  lambdaTest({
    operation: 'create',
    raw: raw,
    time: '2016-05-22T18:19:19Z',
    time_zone: 'America/Los_Angeles',
    access_token: 'some_bs_access_token'
  }, (status, record) => {
    t.is(status, 'succeed')
    t.truthy(record, 'a record now exists')
    t.truthy(record.id)
    t.is(record.raw, raw)
    t.pass()
  })
})

test('updates a record', (t) => {
  dynamoDocStub._set('rcrd-records', {
    id: expectedID,
    raw: 'yas',
    time: '2016-05-22T18:19:19Z',
    time_zone: 'America/Los_Angeles',
    user_id: 'hi@jeff.is'
  })

  lambdaTest({
    operation: 'create',
    id: expectedID,
    raw: 'run, great, 13 miles, phew',
    access_token: 'some_bs_access_token'
  }, (status, record) => {
    t.is(status, 'succeed')
    t.is(record.id, expectedID)
    t.is(record.raw, 'run, great, 13 miles, phew')

    const dbRecord = dynamoDocStub._get('rcrd-records', expectedID)
    t.is(dbRecord.id, expectedID)
    t.is(dbRecord.raw, 'run, great, 13 miles, phew')

    t.pass()
  })
})

test('cannot update records that you do not own', (t) => {
  dynamoDocStub._set('rcrd-records', {
    id: expectedID,
    raw: 'yas',
    time: '2016-05-22T18:19:19Z',
    user_id: 'hi2@jeff.is',
    time_zone: 'America/Los_Angeles'
  })

  lambdaTest({
    operation: 'create',
    id: expectedID,
    raw: 'run, great, 13 miles, phew, 3 miles',
    access_token: 'some_bs_access_token'
  }, (status, arg) => {
    t.is(status, 'fail')
    const record = dynamoDocStub._get('rcrd-records', expectedID)
    t.is(record.id, expectedID)
    t.is(record.raw, 'yas')
    t.pass()
  })
})

test('cannot update user_id of a record', (t) => {
  dynamoDocStub._set('rcrd-records', {
    id: expectedID,
    raw: 'yas',
    user_id: 'hi@jeff.is',
    time: '2016-05-22T18:19:19Z',
    time_zone: 'America/Los_Angeles'
  })

  lambdaTest({
    operation: 'create',
    id: expectedID,
    raw: 'run, great, 13 miles, phew',
    user_id: 'hi2@jeff.is',
    access_token: 'some_bs_access_token'
  }, (status, data) => {
    t.is(status, 'fail')
    const dbRecord = dynamoDocStub._get('rcrd-records', expectedID)
    t.is(dbRecord.id, expectedID)
    t.is(dbRecord.raw, 'yas')
    t.is(dbRecord.user_id, 'hi@jeff.is')
    t.pass()
  })
})
