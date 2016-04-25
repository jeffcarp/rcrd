'use strict'

import test from 'ava'
const dynamoDocStub = require('test-lambda').dynamo
import lambdaTest from '../support/lambda-test'

const expectedID = '7056e94d4dd347c0408f8f6b661397af029363c54cf81af465c1d469f435f1b0'

test('deleteRecord fails with no access token', function (t) {
  lambdaTest({
    operation: 'record.delete',
    id: expectedID
  }, (status, arg) => {
    t.is(status, 'fail', 'status is fail')
    t.is(arg, 'access_token denied', 'error is "access_token denied"')
    t.pass()
  })
})

test('deleteRecord actually deletes a record', function (t) {
  t.falsy(dynamoDocStub._get('rcrd-records', expectedID), 'a record does not exist')
  dynamoDocStub._set('rcrd-records', {
    id: expectedID,
    raw: 'yas',
    time: '2016-05-22T18:19:19Z',
    time_zone: 'America/Los_Angeles'
  })
  t.truthy(dynamoDocStub._get('rcrd-records', expectedID), 'a record now exists')

  lambdaTest({
    operation: 'record.delete',
    id: expectedID,
    access_token: 'some_bs_access_token'
  }, (status, arg) => {
    t.is(status, 'succeed')
    t.falsy(dynamoDocStub._get('rcrd-records', expectedID), 'a record was deleted')
    t.pass()
  })
})
