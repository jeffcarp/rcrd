var sinon = require('sinon');
var test = require('tape');

var listRecords = require('../../lambda/list-records');

test('listRecords', function (t) {

  var dynamo = {
    scan: sinon.spy(function (opts, cb) {
      cb(['a record']);
    })
  };
  var params = {};
  var context = { done: sinon.spy() };

  listRecords(dynamo, params, context);

  t.true(dynamo.scan.called, 'dynamo.scan called');
  t.true(context.done.called, 'context.done called');

  t.end();
});
