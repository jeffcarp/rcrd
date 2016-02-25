'use strict';

const context = require('./context-stub')
const dynamoDocStub = require('./dynamodb-doc-stub')
const proxyquire = require('proxyquire').noCallThru()
const test = require('tape')
const testLambda = require('./test-lambda')

const lambda = proxyquire('../../lambda/index', {
  'dynamodb-doc': dynamoDocStub
});

const expectedID = '7056e94d4dd347c0408f8f6b661397af029363c54cf81af465c1d469f435f1b0'

test('getRecord fails with no access token', function (t) {
  testLambda({
    operation: 'record.get',
    id: expectedID,
    raw: 'test, raw'
  }, lambda.handler, (status, arg) => {
    t.equal(status, 'fail', 'status is fail');
    t.equal(arg, 'access_token denied', 'error is "access_token denied"');
    t.end()
  })
})

test('getRecord gets a record', function (t) {
  const expectedRecord = {
    id: expectedID, 
    raw: 'yas', 
    time: '2016-05-22T18:19:19Z' ,
    time_zone: 'America/Los_Angeles',
  }
  dynamoDocStub._set('rcrd-records', expectedRecord)

  testLambda({
    operation: 'record.get',
    id: expectedID,
    access_token: 'some_bs_access_token',
  }, lambda.handler, (status, data) => {
    t.equal(status, 'succeed');
    let record = data.Item
    t.ok(record);
    t.equal(record.id, expectedRecord.id);
    t.equal(record.raw, expectedRecord.raw);
    t.equal(record.time, expectedRecord.time);
    t.equal(record.time_zone, expectedRecord.time_zone);
    t.end()
  })
});
