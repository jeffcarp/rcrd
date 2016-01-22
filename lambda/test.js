var test = require('tape');
var sinon = require('sinon');
var proxyquire = require('proxyquire').noCallThru();

var scanStub = sinon.stub().returns(['a record']);
var contextStub = {
  done: sinon.spy()
};

var DynamoDBStub = function () {};
DynamoDBStub.prototype.scan = scanStub;

var dynamoDocStub = {
  DynamoDB: DynamoDBStub
};

var lambda = proxyquire('.', {
  'dynamodb-doc': dynamoDocStub
});
var handler = lambda.handler;

test('list records', function (t) {
  handler({
    operation: 'list'
  }, contextStub);

  console.log('AAHH', contextStub.done.called);
});
