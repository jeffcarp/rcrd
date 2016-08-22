'use strict'
import test from 'ava'
const dynamoDocStub = require('test-lambda').dynamo
import lambdaTest from '../support/lambda'

test('listRecordsWithCat fails without params.catName', function (t) {
  dynamoDocStub._set('rcrd-records', {
    id: '1',
    raw: 'some, cat',
    time: '2016-01-22T18:19:19Z',
    time_zone: 'America/Los_Angeles'
  })

  lambdaTest({
    operation: 'list-records-with-cat',
    access_token: 'some_bs_access_token'
  }, function (status, records) {
    t.is(status, 'fail', 'status is succeed')
    t.pass()
  })
})

test('listRecordsWithCat returns sorted records (id DESC)', function (t) {
  dynamoDocStub._set('rcrd-records', {
    id: '1',
    raw: 'some, cat',
    time: '2016-01-22T18:19:19Z',
    time_zone: 'America/Los_Angeles',
    user_id: 'hi@jeff.is'
  })
  dynamoDocStub._set('rcrd-records', {
    id: '2',
    raw: 'another, cat',
    time: '2015-05-22T18:19:19Z',
    time_zone: 'America/Los_Angeles',
    user_id: 'hi@jeff.is'
  })
  dynamoDocStub._set('rcrd-records', {
    id: '3',
    raw: 'yup, a, cat',
    time: '2016-02-22T18:19:19Z',
    time_zone: 'America/Los_Angeles',
    user_id: 'hi@jeff.is'
  })
  dynamoDocStub._set('rcrd-records', {
    id: '4',
    raw: 'not, my, cat',
    time: '2016-02-21T18:19:19Z',
    time_zone: 'America/Los_Angeles',
    user_id: 'hi2@jeff.is'
  })

  lambdaTest({
    operation: 'list-records-with-cat',
    catName: 'cat',
    access_token: 'some_bs_access_token'
  }, function (status, records) {
    t.is(status, 'succeed', 'status is succeed')

    t.is(records.length, 3)
    t.is(records[0].id, '3')
    t.is(records[1].id, '1')
    t.is(records[2].id, '2')

    records.every((r) => t.is(r.user_id, 'hi@jeff.is'))

    t.pass()
  })
})
