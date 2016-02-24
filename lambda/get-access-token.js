'use strict'

var crypto = require('crypto')

module.exports = function getAccessToken(dynamo, params, context) {
  if (!params.email) return context.fail('email param required')
  if (!params.secret_key) return context.fail('secret_key param required')

  dynamo.getItem({
    TableName:  'rcrd-users',
    Key: { id: params.email }
  }, function (err, data) {
    if (err) return context.fail(err)

    var user = data.Item;
   
    var suppliedPassHash = crypto.createHash('sha256').update(params.secret_key).digest('base64');
    if (suppliedPassHash === user.hash) {
       
      // TODO: generate and store an access token
      dynamo.putItem({
        TableName:  'rcrd-access-tokens',
        Item: {
          id: 'bogus_access_token_id',
          expiration: '2017-02-23T22:49:05+00:00',
        },
      }, function (err, data) {
        if (err) return context.fail(err)
      
        context.succeed({
          user: {
            id: user.id,
            time_zone: user.time_zone
          },
          access_token: {
            id: 'bogus_access_token_id',
          },
        })
      })
    } else {
      context.fail('authentication failed');                        
    }
  });
}
