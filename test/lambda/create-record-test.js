'use strict'

const context = require('./context-stub')
const dynamoDocStub = require('./dynamodb-doc-stub')
const proxyquire = require('proxyquire').noCallThru()
const test = require('tape')
const testLambda = require('./test-lambda')


var lambda = proxyquire('../../lambda/index', {
  'dynamodb-doc': dynamoDocStub
});

const expectedID = '102938|a-record-id'

// Validation

test('cannot create a record without an id', function (t) {
  t.notOk(dynamoDocStub._get('rcrd-records', expectedID), 'a record does not exist');

  testLambda({
    operation: 'create',
    raw: 'test, raw, test',
    access_token: 'some_bs_access_token',
  }, lambda.handler, (status, arg) => {
    t.equal(status, 'fail')
    t.notOk(dynamoDocStub._get('rcrd-records', expectedID), 'a record was not created');
    t.end()
  })
})

// Authentication

test('createRecord fails with no access token', function (t) {
  testLambda({
    operation: 'create',
    id: 'a-record-id',
    raw: 'test, raw'
  }, lambda.handler, function (status, arg) {
    t.equal(status, 'fail', 'status is fail')
    t.notOk(dynamoDocStub._get('rcrd-records', expectedID), 'a record does not exist')
    t.end()
  })
})

// Correctness

test('createRecord adds a record', (t) => {
  t.notOk(dynamoDocStub._get('rcrd-records', expectedID), 'a record does not exist');

  testLambda({
    operation: 'create',
    id: 'a-record-id',
    raw: 'test, raw',
    access_token: 'some_bs_access_token',
  }, lambda.handler, (status, arg) => {
    t.equal(status, 'succeed');
    const record = dynamoDocStub._get('rcrd-records', expectedID)
    let record = dynamoDocStub._get('rcrd-records', 'a-record-id');
    t.ok(record, 'a record now exists')
    t.equal(record.id, expectedID)
    t.equal(record.raw, 'test, raw')
    t.end()
  })
})

test('can create a record with UTF-8 characters', (t) => {
  t.notOk(dynamoDocStub._get('rcrd-records', expectedID), 'a record does not exist');

  const raw = 'test, テスト, 你别放屁'

  testLambda({
    operation: 'create',
    id: 'a-record-id',
    raw: raw,
    access_token: 'some_bs_access_token',
  }, lambda.handler, (status, arg) => {
    t.equal(status, 'succeed');
    const record = dynamoDocStub._get('rcrd-records', expectedID)
    t.ok(record, 'a record now exists')
    t.equal(record.id, expectedID)
    t.equal(record.raw, raw)
    t.end()
  })
})

test('cannot create a record with duplicate plain cats', function (t) {
  t.notOk(dynamoDocStub._get('rcrd-records', expectedID), 'a record does not exist');

  testLambda({
    operation: 'create',
    id: 'a-record-id',
    raw: 'test, raw, test',
    access_token: 'some_bs_access_token',
  }, lambda.handler, (status, arg) => {
    t.equal(status, 'fail')
    t.notOk(dynamoDocStub._get(expectedID), 'a record was not created');
    t.end()
  })
})

test('cannot create a record with duplicate cats with mags', (t) => {
  t.notOk(dynamoDocStub._get('rcrd-records', expectedID), 'a record does not exist');

  testLambda({
    operation: 'create',
    id: 'a-record-id',
    raw: 'run, great, 13 miles, phew, 3 miles',
    access_token: 'some_bs_access_token',
  }, lambda.handler, (status, arg) => {
    t.equal(status, 'fail')

    t.notOk(dynamoDocStub._get(expectedID), 'a record was not created');
    t.end()
  })
})
