'use strict'
import test from 'ava'
const dynamoDocStub = require('test-lambda').dynamo
import lambdaTest from '../support/lambda-test'

const expectedID = 'gcarpenterv@gmail.com|top-20-cats'

test('view-data.get fails with no access token', function (t) {
  lambdaTest({
    operation: 'view-data',
    id: expectedID
  }, (status, arg) => {
    t.is(status, 'fail', 'status is fail')
    t.is(arg, 'access_token denied', 'error is "access_token denied"')
    t.pass()
  })
})

test('view-data.get gets a view datum', function (t) {
  const expectedViewDatum = {
    id: expectedID,
    cats: ['cat one', 'cat two', 'cat three']
  }
  dynamoDocStub._set('rcrd-view-data', expectedViewDatum)

  lambdaTest({
    operation: 'view-data',
    id: expectedID,
    access_token: 'some_bs_access_token'
  }, (status, data) => {
    t.is(status, 'succeed')
    const viewDatum = data.Item
    t.truthy(viewDatum, 'returns view datum')
    t.is(viewDatum.id, expectedViewDatum.id)
    t.deepEqual(viewDatum.cats, expectedViewDatum.cats)
    t.pass()
  })
})
