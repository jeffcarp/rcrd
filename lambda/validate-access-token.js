'use strict';

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

module.exports = validateAccessToken;
