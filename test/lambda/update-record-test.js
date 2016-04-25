'use strict'
import test from 'ava'
const dynamoDocStub = require('test-lambda').dynamo
import lambdaTest from '../support/lambda-test'

const expectedID = '7056e94d4dd347c0408f8f6b661397af029363c54cf81af465c1d469f435f1b0'

test('updateRecord fails with no access token', function (t) {
  lambdaTest({
    operation: 'record.update'
  }, function (status, arg) {
    t.is(status, 'fail', 'status is fail')
    t.is(arg, 'access_token denied', 'error is "access_token denied"')
    t.pass()
  })
})

test('updateRecord fails with incorrect access token', function (t) {
  lambdaTest({
    operation: 'record.update',
    access_token: 'some_incorrect_access_token'
  }, function (status, arg) {
    t.is(status, 'fail', 'status is fail')
    t.is(arg, 'access_token denied', 'error is "access_token denied"')
    t.pass()
  })
})

test('updateRecord updates a record', function (t) {
  dynamoDocStub._set('rcrd-records', {
    id: expectedID,
    raw: 'yas',
    time: '2016-05-22T18:19:19Z',
    time_zone: 'America/Los_Angeles'
  })

  lambdaTest({
    operation: 'record.update',
    access_token: 'some_bs_access_token',
    id: expectedID,
    raw: 'nas'
  }, function (status, data) {
    t.is(status, 'succeed', 'status is succeed')

    const actual = dynamoDocStub._get('rcrd-records', expectedID)

    t.truthy(actual)
    t.is(actual.id, expectedID)
    t.is(actual.raw, 'nas')

    t.pass()
  })
})
