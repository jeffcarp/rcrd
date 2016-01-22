console.log('Loading function');

var doc = require('dynamodb-doc');
var dynamo = new doc.DynamoDB();

exports.handler = function(params, context) {
    if (params.operation === 'list') {
        dynamo.scan({
            "TableName": "test-for-rcrd"
        }, context.done);
        return;
    } else if (params.operation === 'create') {
        console.log('params', params);
        
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
        return;
    } else if (params.operation === 'list-records-with-cat') {
        if (!params.catName) {
            context.fail('Missing param');
        }
        
        var opts = {};
        opts.TableName = "test-for-rcrd";
        opts.ScanFilter = dynamo.Condition("raw", "CONTAINS", params.catName);
        dynamo.scan(opts, context.done);
    }
};
