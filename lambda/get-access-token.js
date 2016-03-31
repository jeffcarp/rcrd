'use strict'

var crypto = require('crypto')

module.exports = function getAccessToken (dynamo, params, context) {
  if (!params.email) return context.fail('email param required')
  if (!params.secret_key) return context.fail('secret_key param required')

  dynamo.getItem({
    TableName: 'rcrd-users',
    Key: { id: params.email }
  }, function (err, data) {
    if (err) return context.fail(err)

    var user = data.Item

    if (!user) return context.fail('User not found')

    var suppliedPassHash = crypto.createHash('sha256').update(params.secret_key).digest('base64')
    if (suppliedPassHash === user.hash) {
      var now = new Date()

      var accessTokenID = crypto.createHash('sha256').update(user.email + now.toISOString()).digest('base64')

      var newAccessToken = {
        id: accessTokenID,
        expiration: (new Date('2016-04-01T00:00:00Z')).toISOString(),
      }

      dynamo.putItem({
        TableName: 'rcrd-access-tokens',
        Item: newAccessToken,
      }, function (err, data) {
        if (err) return context.fail(err)

        context.succeed({
          user: {
            id: user.id,
            time_zone: user.time_zone
          },
          access_token: newAccessToken,
        })
      })
    } else {
      context.fail('authentication failed')
    }
  })
}
