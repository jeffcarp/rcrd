'use strict';

var util = require('./util');

function createRecord(dynamo, params, context) {
    if (!params.id || !params.raw || !params.time_zone) {
        context.fail('Missing param');
    }

    var cats = util.catsFromRaw(params.raw); 
    if (util.hasDupes(cats.map(util.sansMagnitude))) {
      context.fail('Records cannot have duplicate cats.');
      return;
    }
    
    var newRecord = {
        "id": String(params.id),
        "raw": params.raw,
        "time_zone": params.time_zone
    };

    dynamo.putItem({
        "TableName": "rcrd-records",
        "Item": newRecord
    }, function () {
        context.succeed(newRecord);
    });
}

module.exports = createRecord;
