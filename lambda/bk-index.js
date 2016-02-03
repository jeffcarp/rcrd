var crypto = require('crypto');
var doc = require('dynamodb-doc');
var dynamo = new doc.DynamoDB();

exports.handler = function(params, context) {
    if (params.operation === 'get-access-token') {
        getAccessToken(params, context);
    } else {
        validateAccessToken(params.access_token, context, function () {
            // Protected routes 
            if (params.operation === 'list') {
                listRecords(params, context);
            } else if (params.operation === 'create') {
                createRecord(params, context);
            } else if (params.operation === 'list-records-with-cat') {
                listRecordsWithCat(params, context);
            } else {
                context.fail('operation not found');
            }
        });
    }
};

function validateAccessToken(access_token, context, callback) {
    dbParams = {};
    dbParams.TableName = "rcrd-access-tokens";
    dbParams.Key = {access_token : access_token};
    
    dynamo.getItem(dbParams, function (err, data) {
        if (err) {
            return context.fail('access_token denied');
        }
        
        // TODO: This also needs to return a user context to support access control
        
        callback();
    });
}

function listRecords(params, context) {
    dynamo.scan({
        "TableName": "test-for-rcrd"
    }, context.done);
}

function listRecordsWithCat(params, context) {
    if (!params.catName) {
        context.fail('Missing param');
    }
    
    var opts = {};
    opts.TableName = "test-for-rcrd";
    opts.ScanFilter = dynamo.Condition("raw", "CONTAINS", params.catName);
    dynamo.scan(opts, context.done);
}

function createRecord(params, context) {
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
}

function getAccessToken(params, context) {
    if (!params.email) {
        return context.fail('email param required');
    }
    if (!params.secret_key) {
        return context.fail('secret_key param required');
    }

    dbParams = {};
    dbParams.TableName = "rcrd-users";
    dbParams.Key = {email : params.email};
    
    dynamo.getItem(dbParams, function (err, data) {
        if (err) {
            context.fail(err);
            return;
        }
        var user = data.Item;
        console.log(user);
       
        var suppliedPassHash = crypto.createHash('sha256').update(params.secret_key).digest('base64');
        console.log(suppliedPassHash);
        if (suppliedPassHash === user.hash) {
            
            // TODO: generate and store an access token
            
            context.succeed({
                email: user.email,
                access_token: 'some_bs_access_token'
            });                
        } else {
            context.fail('authentication failed');                        
        }
        

    });
}