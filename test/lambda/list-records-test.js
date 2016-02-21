var proxyquire = require('proxyquire').noCallThru()
var test = require('tape')

var dynamoDocStub = require('./dynamodb-doc-stub')
const testLambda = require('./test-lambda')

var lambda = proxyquire('../../lambda/index', {
  'dynamodb-doc': dynamoDocStub
});

var listRecords = require('../../lambda/list-records');

test('listRecords fails with no access token', function (t) {
  testLambda({
    operation: 'list'
  }, lambda.handler, function (status, arg) {
    t.equal(status, 'fail', 'status is fail');
    t.equal(arg, 'access_token denied', 'error is "access_token denied"');
    t.end();
  });
});

test('listRecords fails with incorrect access token', function (t) {
  testLambda({
    operation: 'list',
    access_token: 'some_incorrect_access_token'
  }, lambda.handler, function (status, arg) {
    t.equal(status, 'fail', 'status is fail');
    t.equal(arg, 'access_token denied', 'error is "access_token denied"');
    t.end();
  });
});

test('listRecords returns sorted records (id DESC)', function (t) {
  dynamoDocStub._setRecord({ id: 123 });
  dynamoDocStub._setRecord({ id: 321 });
  dynamoDocStub._setRecord({ id: 456 });

  testLambda({
    operation: 'list',
    access_token: 'some_bs_access_token'
  }, lambda.handler, function (status, data) {
    t.equal(status, 'succeed', 'status is succeed')

    t.equal(data.length, 3)
    t.equal(data[0].id, 456)
    t.equal(data[1].id, 321)
    t.equal(data[2].id, 123)

    t.end();
  });
});

test('listRecords returns no more than 50 records', function (t) {
  for (var i = 0; i < 75; i++) {
    dynamoDocStub._setRecord({ id: i });
  }

  testLambda({
    operation: 'list',
    access_token: 'some_bs_access_token'
  }, lambda.handler, function (status, data) {
    t.equal(status, 'succeed', 'status is succeed')

    t.equal(data.length, 50)

    t.end();
  });
});
