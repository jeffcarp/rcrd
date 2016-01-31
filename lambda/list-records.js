'use strict';

function listRecords(dynamo, params, context) {
  dynamo.scan({
    'TableName': 'test-for-rcrd'
  }, context.done);
}

module.exports = listRecords;
