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

test('listRecords fails with no access token', function (t) {
  testLambda({
    operation: 'list'
  }, function (status, arg) {
    t.equal(status, 'fail', 'status is fail');
    t.equal(arg, 'access_token denied', 'error is "access_token denied"');
    t.end();
  });
});

test('listRecords fails with incorrect access token', function (t) {
  testLambda({
    operation: 'list',
    access_token: 'some_incorrect_access_token'
  }, function (status, arg) {
    t.equal(status, 'fail', 'status is fail');
    t.equal(arg, 'access_token denied', 'error is "access_token denied"');
    t.end();
  });
});

test('listRecords returns sorted records (id DESC)', function (t) {
  dynamoDocStub._set('rcrd-records', { 
    id: '1',
    time: '2016-01-22T18:19:19Z', 
    time_zone: 'America/Los_Angeles' ,
  })
  dynamoDocStub._set('rcrd-records', { 
    id: '2',
    time: '2015-05-22T18:19:19Z', 
    time_zone: 'America/Los_Angeles', 
  })
  dynamoDocStub._set('rcrd-records', { 
    id: '3',
    time: '2016-02-22T18:19:19Z', 
    time_zone: 'America/Los_Angeles' ,
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

    t.end();
  });
});

test('listRecords returns no more than 50 records', function (t) {
  for (var i = 0; i < 75; i++) {
    dynamoDocStub._set('rcrd-records', { id: i });
  }

  testLambda({
    operation: 'list',
    access_token: 'some_bs_access_token'
  }, function (status, data) {
    t.equal(status, 'succeed', 'status is succeed')

    t.equal(data.length, 50)

    t.end();
  });
});
