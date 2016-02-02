'use strict';

function deleteRecord(dynamo, params, context) {
  var params = {
    Key: params.id,
    AttributeUpdates: {
      Action: 'PUT',
      Value: {deleted: true}
    },
    TableName: 'test-for-rcrd',
    ReturnValues: 'ALL_NEW'
  };

  dynamo.updateItem(params, function(err, data) {
    if (err) { return console.log(err); }
    context.success(data);
  });
}

module.exports = deleteRecord;
