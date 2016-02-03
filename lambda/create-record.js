'use strict';

function createRecord(dynamo, params, context) {
    if (!params.id || !params.raw) {
        context.fail('Missing param');
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
