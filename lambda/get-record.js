'use strict';

function getRecord(dynamo, params, context) {
  if (!params.id) return context.fail('Missing param.id');

  dynamo.getItem({
    'TableName': 'test-for-rcrd',
    'id': params.id
  }, function (err, record) {
    if (err) {
      context.fail(err);
    } else {
      context.succeed(record);
    }
  });
}

module.exports = getRecord;
