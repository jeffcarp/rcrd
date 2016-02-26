'use strict'

const path = require('path')
const test = require('tape')
const tl = require('test-lambda')

const dynamoDocStub = tl.dynamo
const testLambda = tl.test(path.resolve('./lambda/index'), {
  before: require('./before'),
  after: require('./after'),
})
const expectedID = '7056e94d4dd347c0408f8f6b661397af029363c54cf81af465c1d469f435f1b0'

test('updateRecord fails with no access token', function (t) {
  testLambda({
    operation: 'record.update'
  }, function (status, arg) {
    t.equal(status, 'fail', 'status is fail');
    t.equal(arg, 'access_token denied', 'error is "access_token denied"');
    t.end();
  });
});

test('updateRecord fails with incorrect access token', function (t) {
  testLambda({
    operation: 'record.update',
    access_token: 'some_incorrect_access_token'
  }, function (status, arg) {
    t.equal(status, 'fail', 'status is fail')
    t.equal(arg, 'access_token denied', 'error is "access_token denied"')
    t.end();
  });
});

test('updateRecord updates a record', function (t) {
  dynamoDocStub._set('rcrd-records', { 
    id: expectedID, 
    raw: 'yas', 
    time: '2016-05-22T18:19:19Z' ,
    time_zone: 'America/Los_Angeles',
  })

  testLambda({
    operation: 'record.update',
    access_token: 'some_bs_access_token',
    id: expectedID,
    raw: 'nas'
  }, function (status, data) {
    t.equal(status, 'succeed', 'status is succeed')

    const actual = dynamoDocStub._get('rcrd-records', expectedID);

    t.ok(actual)
    t.equal(actual.id, expectedID)
    t.equal(actual.raw, 'nas')

    t.end()
  })
})
