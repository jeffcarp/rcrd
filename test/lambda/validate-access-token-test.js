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

test('expired tokens are rejected', function (t) {
  testLambda({
    operation: 'record.get',
    id: 'a-record-id',
    access_token: 'expired_access_token',
  }, function (status, arg) {
    t.equal(status, 'fail', 'status is fail');
    t.equal(arg, 'access_token expired', 'error is "access_token denied"');
    t.end();
  });
});
