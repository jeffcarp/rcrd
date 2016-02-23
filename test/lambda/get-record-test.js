'use strict';

const context = require('./context-stub')
const dynamoDocStub = require('./dynamodb-doc-stub')
const proxyquire = require('proxyquire').noCallThru()
const test = require('tape')
const testLambda = require('./test-lambda')

const lambda = proxyquire('../../lambda/index', {
  'dynamodb-doc': dynamoDocStub
});

const id = 'a-record-id'
const expectedID = '102938|a-record-id'

test('getRecord fails with no access token', function (t) {
  testLambda({
    operation: 'record.get',
    id: 'a-record-id',
    raw: 'test, raw'
  }, lambda.handler, (status, arg) => {
    t.equal(status, 'fail', 'status is fail');
    t.equal(arg, 'access_token denied', 'error is "access_token denied"');
    t.end()
  })
})

test('getRecord gets a record', function (t) {
  const expectedRecord = {id: id, raw: 'test, raw'};
  dynamoDocStub._set('rcrd-records', expectedRecord)

  testLambda({
    operation: 'record.get',
    id: 'a-record-id',
    access_token: 'some_bs_access_token',
  }, lambda.handler, (status, record) => {
    t.equal(status, 'succeed');
    t.ok(record);
    t.equal(record.id, expectedRecord.id);
    t.equal(record.raw, expectedRecord.raw);
    t.end()
  })
});
