'use strict';

var util = require('./util');

function createRecord(dynamo, params, context) {
    if (!params.id || !params.raw) {
        context.fail('Missing param');
    }

    var cats = util.catsFromRaw(params.raw); 
    if (util.hasDupes(cats.map(util.sansMagnitude))) {
      context.fail('Records cannot have duplicate cats.');
      return;
    }
    
    var newRecord = {
        "id": String(params.id),
        "raw": params.raw
    };

    dynamo.putItem({
        "TableName": "test-for-rcrd",
        "Item": newRecord
    }, function () {
        context.succeed(newRecord);
    });
}

module.exports = createRecord;
