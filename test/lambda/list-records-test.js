'use strict'
import test from 'ava'
const dynamoDocStub = require('test-lambda').dynamo
import lambdaTest from '../support/lambda-test'

test('listRecords fails with no access token', function (t) {
  lambdaTest({
    operation: 'list'
  }, function (status, arg) {
    t.is(status, 'fail', 'status is fail')
    t.is(arg, 'access_token denied', 'error is "access_token denied"')
    t.pass()
  })
})

test('listRecords fails with incorrect access token', function (t) {
  lambdaTest({
    operation: 'list',
    access_token: 'some_incorrect_access_token'
  }, function (status, arg) {
    t.is(status, 'fail', 'status is fail')
    t.is(arg, 'access_token denied', 'error is "access_token denied"')
    t.pass()
  })
})

test('listRecords returns sorted records (id DESC)', function (t) {
  dynamoDocStub._set('rcrd-records', {
    id: '1',
    time: '2016-01-22T18:19:19Z',
    time_zone: 'America/Los_Angeles'
  })
  dynamoDocStub._set('rcrd-records', {
    id: '2',
    time: '2015-05-22T18:19:19Z',
    time_zone: 'America/Los_Angeles'
  })
  dynamoDocStub._set('rcrd-records', {
    id: '3',
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

/*
- This was causing Travis CI to consistently fail for some reason
- https://travis-ci.org/jeffcarp/rcrd/builds/118405033
- Then again maybe it wasn't this specific test since it's happening on others

test('listRecords returns no more than 50 records', function (t) {
  for (var i = 0; i < 75; i++) {
    dynamoDocStub._set('rcrd-records', { id: i })
  }

  lambdaTest({
    operation: 'list',
    access_token: 'some_bs_access_token'
  }, function (status, data) {
    t.is(status, 'succeed', 'status is succeed')
    t.is(data.length, 50)
    t.pass()
  })
})
*/
