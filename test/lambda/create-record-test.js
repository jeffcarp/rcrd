'use strict'

const path = require('path')
const test = require('tape')
const tl = require('test-lambda')

const dynamoDocStub = tl.dynamo
const testLambda = tl.test(path.resolve('./lambda/index'), {
  before: require('./before'),
  after: require('./after')
})
const expectedID = '7056e94d4dd347c0408f8f6b661397af029363c54cf81af465c1d469f435f1b0'

// Validation

test('cannot create a record without an id', function (t) {
  testLambda({
    operation: 'create',
    raw: 'test, raw, test',
    access_token: 'some_bs_access_token'
  }, (status, arg) => {
    t.equal(status, 'fail')
    t.notOk(dynamoDocStub._get('rcrd-records', expectedID), 'a record was not created')
    t.end()
  })
})

// Authentication

test('createRecord fails with no access token', function (t) {
  testLambda({
    operation: 'create',
    id: expectedID,
    raw: 'test, raw'
  }, function (status, arg) {
    t.equal(status, 'fail', 'status is fail')
    t.notOk(dynamoDocStub._get('rcrd-records', expectedID), 'a record does not exist')
    t.end()
  })
})

// Correctness

test('createRecord adds a record', (t) => {
  testLambda({
    operation: 'create',
    id: expectedID,
    raw: 'test, raw',
    access_token: 'some_bs_access_token'
  }, (status, arg) => {
    t.equal(status, 'succeed')
    let record = dynamoDocStub._get('rcrd-records', expectedID)
    t.ok(record, 'a record now exists')
    t.equal(record.id, expectedID)
    t.equal(record.raw, 'test, raw')
    t.end()
  })
})

test('createRecord creates "top-20-cats" view data if not exists', (t) => {
  const viewDatumID = '2|top-20-cats'

  t.notOk(dynamoDocStub._get('rcrd-view-data', viewDatumID))

  testLambda({
    operation: 'create',
    id: expectedID,
    raw: 'test, raw',
    access_token: 'some_bs_access_token'
  }, (status, arg) => {
    t.equal(status, 'succeed')

    const viewDatum = dynamoDocStub._get('rcrd-view-data', viewDatumID)
    t.ok(viewDatum, 'a view datum exists')
    t.equal(viewDatum.id, viewDatumID)
    t.deepEqual(viewDatum.cats, [ 'test', 'raw' ])

    t.end()
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

  testLambda({
    operation: 'create',
    id: expectedID,
    raw: 'test, raw',
    access_token: 'some_bs_access_token'
  }, (status, arg) => {
    t.equal(status, 'succeed')

    const viewDatum = dynamoDocStub._get('rcrd-view-data', viewDatumID)
    t.ok(viewDatum, 'a view datum exists')
    t.equal(viewDatum.id, viewDatumID)
    t.deepEqual(viewDatum.cats, [ 'yas', 'nas', 'test', 'raw' ])

    t.end()
  })
})

test('can create a record with UTF-8 characters', (t) => {
  const raw = 'test, テスト, 你别放屁'

  testLambda({
    operation: 'create',
    id: expectedID,
    raw: raw,
    access_token: 'some_bs_access_token'
  }, (status, arg) => {
    t.equal(status, 'succeed')
    const record = dynamoDocStub._get('rcrd-records', expectedID)
    t.ok(record, 'a record now exists')
    t.equal(record.id, expectedID)
    t.equal(record.raw, raw)
    t.end()
  })
})

test('cannot create a record with duplicate plain cats', function (t) {
  testLambda({
    operation: 'create',
    id: expectedID,
    raw: 'test, raw, test',
    access_token: 'some_bs_access_token'
  }, (status, arg) => {
    t.equal(status, 'fail')
    t.notOk(dynamoDocStub._get(expectedID), 'a record was not created')
    t.end()
  })
})

test('cannot create a record with duplicate cats with mags', (t) => {
  testLambda({
    operation: 'create',
    id: expectedID,
    raw: 'run, great, 13 miles, phew, 3 miles',
    access_token: 'some_bs_access_token'
  }, (status, arg) => {
    t.equal(status, 'fail')

    t.notOk(dynamoDocStub._get(expectedID), 'a record was not created')
    t.end()
  })
})
