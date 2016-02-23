var crypto = require('crypto');
var doc = require('dynamodb-doc');
var createRecord = require('./create-record');
var deleteRecord = require('./delete-record');
var getRecord = require('./get-record');
var listRecords = require('./list-records');
var listRecordsWithCat = require('./list-records-with-cat');
var updateRecord = require('./update-record');
var viewData = require('./view-data');

var dynamo = new doc.DynamoDB();

exports.handler = function(params, context) {
    if (params.operation === 'get-access-token') {
        getAccessToken(params, context);
    } else {
        validateAccessToken(params.access_token, context, function () {
            // Protected routes 
            if (params.operation === 'list') {
                listRecords(dynamo, params, context);
            } else if (params.operation === 'create') {
                createRecord(dynamo, params, context);
            } else if (params.operation === 'list-records-with-cat') {
                listRecordsWithCat(dynamo, params, context);
            } else if (params.operation === 'record.update') {
                updateRecord(dynamo, params, context);
            } else if (params.operation === 'record.delete') {
                deleteRecord(dynamo, params, context);
            } else if (params.operation === 'record.get') {
                getRecord(dynamo, params, context);
            } else if (params.operation === 'view-data') {
                viewData(dynamo, params, context);
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
            console.log(err);
            return context.fail('access_token denied');
        }
        
        // TODO: This also needs to return a user context to support access control
        
        callback();
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
     
      var suppliedPassHash = crypto.createHash('sha256').update(params.secret_key).digest('base64');
      if (suppliedPassHash === user.hash) {
          
        // TODO: generate and store an access token
        
        context.succeed({
          email: user.email,
          access_token: 'some_bs_access_token',
          time_zone: user.time_zone
        });                
      } else {
          context.fail('authentication failed');                        
      }
        

    });
}
