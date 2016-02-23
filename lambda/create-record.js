'use strict';

var crypto = require('crypto')
var util = require('./util')

function createRecord(dynamo, params, context) {
  if (!params.raw || !params.time || !params.time_zone) {
      context.fail('Missing param');
  }

  if (params.id) {
    var id = params.id
  } else {
    // Add user_id to this
    var hashThis = params.time + params.raw
    var id = crypto.createHash('sha256').update(hashThis).digest('base64')
  }

  var cats = util.catsFromRaw(params.raw); 
  if (util.hasDupes(cats.map(util.sansMagnitude))) {
    context.fail('Records cannot have duplicate cats.');
    return;
  }
  
  var newRecord = {
    id: id,
    raw: params.raw,
    time: params.time,
    time_zone: params.time_zone
  };

  dynamo.putItem({
    "TableName": "rcrd-records",
    "Item": newRecord
  }, function () {
    context.succeed(newRecord);
  });
}

module.exports = createRecord;
