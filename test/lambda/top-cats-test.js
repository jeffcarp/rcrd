'use strict'
import test from 'ava'
const dynamoDocStub = require('test-lambda').dynamo
import lambdaTest from '../support/lambda-test'

test('top-cats returns the top cats', function (t) {
  dynamoDocStub._set('rcrd-records', {
    id: '1',
    raw: 'first, second, third',
    time: '2016-01-22T18:19:19Z',
    time_zone: 'America/Los_Angeles'
  })
  dynamoDocStub._set('rcrd-records', {
    id: '2',
    raw: 'first, second',
    time: '2015-05-22T18:19:19Z',
    time_zone: 'America/Los_Angeles'
  })
  dynamoDocStub._set('rcrd-records', {
    id: '3',
    raw: 'first',
    time: '2016-02-22T18:19:19Z',
    time_zone: 'America/Los_Angeles'
  })

  lambdaTest({
    operation: 'list',
    access_token: 'some_bs_access_token'
  }, function (status, data) {
    t.is(status, 'succeed', 'status is succeed')

    t.is(data.length, 3)
    t.is(data[0].id, '3')
    t.is(data[1].id, '1')
    t.is(data[2].id, '2')

    t.pass()
  })
})
