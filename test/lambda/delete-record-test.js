'use strict';

const path = require('path')
const test = require('tape')
const tl = require('test-lambda')

const dynamoDocStub = tl.dynamo
const testLambda = tl.test(path.resolve('./lambda/index'), {
  before: require('./before'),
  after: require('./after'),
})
const expectedID = '7056e94d4dd347c0408f8f6b661397af029363c54cf81af465c1d469f435f1b0'

test('deleteRecord fails with no access token', function (t) {
  testLambda({
    operation: 'record.delete',
    id: expectedID,
  }, (status, arg) => {
    t.equal(status, 'fail', 'status is fail');
    t.equal(arg, 'access_token denied', 'error is "access_token denied"');
    t.end()
  })
});

test('deleteRecord actually deletes a record', function (t) {
  t.notOk(dynamoDocStub._get('rcrd-records', expectedID), 'a record does not exist')
  dynamoDocStub._set('rcrd-records', { 
    id: expectedID, 
    raw: 'yas', 
    time: '2016-05-22T18:19:19Z' ,
    time_zone: 'America/Los_Angeles',
  })
  t.ok(dynamoDocStub._get('rcrd-records', expectedID), 'a record now exists')

  testLambda({
    operation: 'record.delete',
    id: expectedID,
    access_token: 'some_bs_access_token'
  }, (status, arg) => {
    t.equal(status, 'succeed')
    t.notOk(dynamoDocStub._get('rcrd-records', expectedID), 'a record was deleted')
    t.end()
  })
});
