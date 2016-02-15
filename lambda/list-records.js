'use strict';

function listRecords(dynamo, params, context) {
  dynamo.scan({
    'TableName': 'test-for-rcrd',
    'Limit': 50
  }, context.done);
}

module.exports = listRecords;
