'use strict'

const path = require('path')
const test = require('tape')
const tl = require('test-lambda')

const dynamoDocStub = tl.dynamo
const testLambda = tl.test(path.resolve('./lambda/index'), {
  before: require('./before'),
  after: require('./after')
})
const expectedID = 'gcarpenterv@gmail.com|top-20-cats'

test('view-data.get fails with no access token', function (t) {
  testLambda({
    operation: 'view-data',
    id: expectedID
  }, (status, arg) => {
    t.equal(status, 'fail', 'status is fail')
    t.equal(arg, 'access_token denied', 'error is "access_token denied"')
    t.end()
  })
})

test('view-data.get gets a view datum', function (t) {
  const expectedViewDatum = {
    id: expectedID,
    cats: ['cat one', 'cat two', 'cat three']
  }
  dynamoDocStub._set('rcrd-view-data', expectedViewDatum)

  testLambda({
    operation: 'view-data',
    id: expectedID,
    access_token: 'some_bs_access_token'
  }, (status, data) => {
    t.equal(status, 'succeed')
    const viewDatum = data.Item
    t.ok(viewDatum, 'returns view datum')
    t.equal(viewDatum.id, expectedViewDatum.id)
    t.deepEqual(viewDatum.cats, expectedViewDatum.cats)
    t.end()
  })
})
