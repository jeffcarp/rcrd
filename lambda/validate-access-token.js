'use strict'

function validateAccessToken (access_token, dynamo, context, callback) {
  dynamo.getItem({
    TableName: 'rcrd-access-tokens',
    Key: { id: access_token }
  }, function (err, data) {
    if (err) return context.fail('access_token denied')
    if (!data || !data.Item) return context.fail('access_token denied')

    var accessToken = data.Item

    var now = new Date()
    if (now > new Date(accessToken.expiration)) {
      context.fail('access_token expired')
      return
    }

    // TODO: This also needs to return a user context to support access control

    callback()
  })
}

module.exports = validateAccessToken
