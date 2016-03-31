'use strict'

const path = require('path')
const test = require('tape')
const tl = require('test-lambda')

const dynamoDocStub = tl.dynamo
const testLambda = tl.test(path.resolve('./lambda/index'), {
  before: require('./before'),
  after: require('./after')
})

test('listRecordsWithCat fails without params.catName', function (t) {
  dynamoDocStub._set('rcrd-records', {
    id: '1',
    raw: 'some, cat',
    time: '2016-01-22T18:19:19Z',
    time_zone: 'America/Los_Angeles'
  })

  testLambda({
    operation: 'list-records-with-cat',
    access_token: 'some_bs_access_token'
  }, function (status, records) {
    t.equal(status, 'fail', 'status is succeed')
    t.end()
  })
})

test('listRecordsWithCat returns sorted records (id DESC)', function (t) {
  dynamoDocStub._set('rcrd-records', {
    id: '1',
    raw: 'some, cat',
    time: '2016-01-22T18:19:19Z',
    time_zone: 'America/Los_Angeles'
  })
  dynamoDocStub._set('rcrd-records', {
    id: '2',
    raw: 'another, cat',
    time: '2015-05-22T18:19:19Z',
    time_zone: 'America/Los_Angeles'
  })
  dynamoDocStub._set('rcrd-records', {
    id: '3',
    raw: 'yup, a, cat',
    time: '2016-02-22T18:19:19Z',
    time_zone: 'America/Los_Angeles'
  })

  testLambda({
    operation: 'list-records-with-cat',
    catName: 'cat',
    access_token: 'some_bs_access_token'
  }, function (status, records) {
    t.equal(status, 'succeed', 'status is succeed')

    t.equal(records.length, 3)
    t.equal(records[0].id, '3')
    t.equal(records[1].id, '1')
    t.equal(records[2].id, '2')

    t.end()
  })
})
