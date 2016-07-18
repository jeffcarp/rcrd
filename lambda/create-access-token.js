'use strict'

var crypto = require('crypto')

function createAccessToken (dynamo, user, context) {
  var buffer = crypto.randomBytes(24)

  var expirationDate = new Date()
  expirationDate.setDate(expirationDate.getDate() + 30)

  var newAccessToken = {
    id: buffer.toString('hex'),
    expiration: expirationDate.toISOString(),
    user_id: user.id
  }

  dynamo.putItem({
    TableName: 'rcrd-access-tokens',
    Item: newAccessToken
  }, function (err, data) {
    if (err) return context.fail(err)

    context.succeed({
      user: {
        id: user.id,
        time_zone: user.time_zone
      },
      access_token: newAccessToken
    })
  })
}

module.exports = createAccessToken
