const dynamoDocStub = require('./dynamodb-doc-stub')
const proxyquire = require('proxyquire').noCallThru()
const test = require('tape')
const testLambda = require('./test-lambda')

const lambda = proxyquire('../../lambda/index', {
  'dynamodb-doc': dynamoDocStub
});

const updateRecord = require('../../lambda/update-record')

test('updateRecord fails with no access token', function (t) {
  testLambda({
    operation: 'record.update'
  }, lambda.handler, function (status, arg) {
    t.equal(status, 'fail', 'status is fail');
    t.equal(arg, 'access_token denied', 'error is "access_token denied"');
    t.end();
  });
});

test('updateRecord fails with incorrect access token', function (t) {
  testLambda({
    operation: 'record.update',
    access_token: 'some_incorrect_access_token'
  }, lambda.handler, function (status, arg) {
    t.equal(status, 'fail', 'status is fail');
    t.equal(arg, 'access_token denied', 'error is "access_token denied"');
    t.end();
  });
});

test('updateRecord updates a record', function (t) {
  dynamoDocStub._setRecord({ id: 'some-id', raw: 'yas' });

  testLambda({
    operation: 'record.update',
    access_token: 'some_bs_access_token',
    id: 'some-id',
    raw: 'nas'
  }, lambda.handler, function (status, data) {
    t.equal(status, 'succeed', 'status is succeed')

    const actual = dynamoDocStub._getRecord('some-id');

    t.ok(actual)
    t.equal(actual.id, 'some-id')
    t.equal(actual.raw, 'nas')

    t.end()
  })
})
