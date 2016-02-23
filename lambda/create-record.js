'use strict';

var crypto = require('crypto')
var util = require('./util')

function createRecord(dynamo, params, context) {

  if (params.id) {
    // Updating

    var newRecord = {
      id: params.id
    }

    if (params.raw) newRecord.raw = params.raw
    if (params.time) newRecord.time = params.time
    if (params.time_zone) newRecord.time_zone = params.time_zone
  } else {
    // Creating

    if (!params.raw || !params.time || !params.time_zone) {
      context.fail('Missing param');
    }

    // Add user_id to this
    var hashThis = params.time + params.raw
    var id = crypto.createHash('sha256').update(hashThis).digest('hex')

    var newRecord = {
      id: id,
      raw: params.raw,
      time: params.time,
      time_zone: params.time_zone
    }
  }

  var cats = util.catsFromRaw(params.raw); 
  if (util.hasDupes(cats.map(util.sansMagnitude))) {
    context.fail('Records cannot have duplicate cats.');
    return;
  }

  dynamo.putItem({
    "TableName": "rcrd-records",
    "Item": newRecord
  }, function () {
    context.succeed(newRecord);
  });
}

module.exports = createRecord;
