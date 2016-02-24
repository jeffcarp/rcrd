const dynamoDocStub = require('./dynamodb-doc-stub')
const proxyquire = require('proxyquire').noCallThru()
const test = require('tape')
const testLambda = require('./test-lambda')

const lambda = proxyquire('../../lambda/index', {
  'dynamodb-doc': dynamoDocStub
});

test('expired tokens are rejected', function (t) {
  testLambda({
    operation: 'record.get',
    id: 'a-record-id',
    access_token: 'expired_access_token',
  }, lambda.handler, function (status, arg) {
    t.equal(status, 'fail', 'status is fail');
    t.equal(arg, 'access_token expired', 'error is "access_token denied"');
    t.end();
  });
});
