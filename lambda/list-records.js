'use strict';

function listRecords(dynamo, params, context) {
  dynamo.scan({
    'TableName': 'test-for-rcrd'
  }, function (err, data) {
    if (err) {
      context.fail(err);
      return;
    }

    var records = data.Items;

    records.sort(function (a, b) {
      return Number(b.id) - Number(a.id);
    });

    context.succeed(records.slice(0, 50));
  });
}

module.exports = listRecords;
