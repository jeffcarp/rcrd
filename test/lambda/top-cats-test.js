'use strict'

const path = require('path')
const test = require('tape')
const tl = require('test-lambda')

const dynamoDocStub = tl.dynamo
const testLambda = tl.test(path.resolve('./lambda/index'), {
  before: require('./before'),
  after: require('./after')
})

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

  testLambda({
    operation: 'list',
    access_token: 'some_bs_access_token'
  }, function (status, data) {
    t.equal(status, 'succeed', 'status is succeed')

    t.equal(data.length, 3)
    t.equal(data[0].id, '3')
    t.equal(data[1].id, '1')
    t.equal(data[2].id, '2')

    t.end()
  })
})
