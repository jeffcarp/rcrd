'use strict'
import test from 'ava'
const dynamoDocStub = require('test-lambda').dynamo
import lambdaTest from '../support/lambda'
import moment from 'moment'

test('fails with no access token', function (t) {
  lambdaTest({
    operation: 'record.get-last-90-days'
  }, function (status, arg) {
    t.is(status, 'fail', 'status is fail')
    t.is(arg, 'access_token denied', 'error is "access_token denied"')
    t.pass()
  })
})

test('fails with incorrect access token', function (t) {
  lambdaTest({
    operation: 'record.get-last-90-days',
    access_token: 'some_incorrect_access_token'
  }, function (status, arg) {
    t.is(status, 'fail', 'status is fail')
    t.is(arg, 'access_token denied', 'error is "access_token denied"')
    t.pass()
  })
})

test('returns only records youger than 90 days', function (t) {
  dynamoDocStub._set('rcrd-records', {
    id: '1',
    time: moment().subtract(80, 'days').format(),
    time_zone: 'America/Los_Angeles',
    user_id: 'hi@jeff.is'
  })
  dynamoDocStub._set('rcrd-records', {
    id: '2',
    time: moment().subtract(91, 'days').format(),
    time_zone: 'America/Los_Angeles',
    user_id: 'hi@jeff.is'
  })
  dynamoDocStub._set('rcrd-records', {
    id: '3',
    time: moment().subtract(3, 'days').format(),
    time_zone: 'America/Los_Angeles',
    user_id: 'hi2@jeff.is'
  })
  dynamoDocStub._set('rcrd-records', {
    id: '4',
    time: moment().subtract(3, 'days').format(),
    time_zone: 'America/Los_Angeles',
    user_id: 'hi@jeff.is'
  })

  lambdaTest({
    operation: 'record.get-last-90-days',
    access_token: 'some_bs_access_token'
  }, function (status, records) {
    t.is(status, 'succeed', 'status is succeed')

    t.is(records.length, 2)

    records.every((r) => t.is(r.user_id, 'hi@jeff.is'))

    t.pass()
  })
})
