'use strict'

import test from 'ava'
const dynamoDocStub = require('test-lambda').dynamo
import lambdaTest from '../support/lambda-test'

const expectedID = '7056e94d4dd347c0408f8f6b661397af029363c54cf81af465c1d469f435f1b0'

// Validation

test('cannot create a record without an id', function (t) {
  lambdaTest({
    operation: 'create',
    raw: 'test, raw, test',
    access_token: 'some_bs_access_token'
  }, (status, arg) => {
    t.is(status, 'fail')
    t.falsy(dynamoDocStub._get('rcrd-records', expectedID), 'a record was not created')
    t.pass()
  })
})

// Authentication

test('createRecord fails with no access token', function (t) {
  lambdaTest({
    operation: 'create',
    id: expectedID,
    raw: 'test, raw'
  }, function (status, arg) {
    t.is(status, 'fail', 'status is fail')
    t.falsy(dynamoDocStub._get('rcrd-records', expectedID), 'a record does not exist')
    t.pass()
  })
})

// Correctness

test('createRecord adds a record', (t) => {
  lambdaTest({
    operation: 'create',
    id: expectedID,
    raw: 'test, raw',
    access_token: 'some_bs_access_token'
  }, (status, arg) => {
    t.is(status, 'succeed')
    let record = dynamoDocStub._get('rcrd-records', expectedID)
    t.truthy(record, 'a record now exists')
    t.is(record.id, expectedID)
    t.is(record.raw, 'test, raw')
    t.pass()
  })
})

test('createRecord creates "top-20-cats" view data if not exists', (t) => {
  const viewDatumID = '2|top-20-cats'

  t.falsy(dynamoDocStub._get('rcrd-view-data', viewDatumID))

  lambdaTest({
    operation: 'create',
    id: expectedID,
    raw: 'test, raw',
    access_token: 'some_bs_access_token'
  }, (status, arg) => {
    t.is(status, 'succeed')

    const viewDatum = dynamoDocStub._get('rcrd-view-data', viewDatumID)
    t.truthy(viewDatum, 'a view datum exists')
    t.is(viewDatum.id, viewDatumID)
    t.deepEqual(viewDatum.cats, [ 'test', 'raw' ])

    t.pass()
  })
})

test('createRecord updates "top-20-cats" view data if exists', (t) => {
  const viewDatumID = '2|top-20-cats'

  dynamoDocStub._set('rcrd-records', {
    id: '1',
    raw: 'yas, nas'
  })
  dynamoDocStub._set('rcrd-records', {
    id: '2',
    raw: 'yas'
  })
  dynamoDocStub._set('rcrd-view-data', {
    id: viewDatumID,
    cats: ['yas', 'nas']
  })

  lambdaTest({
    operation: 'create',
    id: expectedID,
    raw: 'test, raw',
    access_token: 'some_bs_access_token'
  }, (status, arg) => {
    t.is(status, 'succeed')

    const viewDatum = dynamoDocStub._get('rcrd-view-data', viewDatumID)
    t.truthy(viewDatum, 'a view datum exists')
    t.is(viewDatum.id, viewDatumID)
    t.deepEqual(viewDatum.cats, [ 'yas', 'nas', 'test', 'raw' ])

    t.pass()
  })
})

test('can create a record with UTF-8 characters', (t) => {
  const raw = 'test, テスト, 你别放屁'

  lambdaTest({
    operation: 'create',
    id: expectedID,
    raw: raw,
    access_token: 'some_bs_access_token'
  }, (status, arg) => {
    t.is(status, 'succeed')
    const record = dynamoDocStub._get('rcrd-records', expectedID)
    t.truthy(record, 'a record now exists')
    t.is(record.id, expectedID)
    t.is(record.raw, raw)
    t.pass()
  })
})

test('cannot create a record with duplicate plain cats', function (t) {
  lambdaTest({
    operation: 'create',
    id: expectedID,
    raw: 'test, raw, test',
    access_token: 'some_bs_access_token'
  }, (status, arg) => {
    t.is(status, 'fail')
    t.falsy(dynamoDocStub._get(expectedID), 'a record was not created')
    t.pass()
  })
})

test('cannot create a record with duplicate cats with mags', (t) => {
  lambdaTest({
    operation: 'create',
    id: expectedID,
    raw: 'run, great, 13 miles, phew, 3 miles',
    access_token: 'some_bs_access_token'
  }, (status, arg) => {
    t.is(status, 'fail')

    t.falsy(dynamoDocStub._get(expectedID), 'a record was not created')
    t.pass()
  })
})
