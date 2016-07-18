'use strict'

var createAccessToken = require('./create-access-token')
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
      createAccessToken(dynamo, user, context)
    } else {
      context.fail('authentication failed')
    }
  })
}
