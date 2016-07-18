'use strict'

var createAccessToken = require('./create-access-token')
var crypto = require('crypto')

function registerAccount (dynamo, params, context) {
  if (!params.email) return context.fail('email param required')
  if (!params.password) return context.fail('password param required')

  dynamo.getItem({
    TableName: 'rcrd-users',
    Key: { id: params.email }
  }, function (err, data) {
    if (err) return context.fail(err)

    var user = data.Item
    if (user) return context.fail('Email already exists')

    var passHash = crypto.createHash('sha256').update(params.password).digest('base64')

    dynamo.putItem({
      TableName: 'rcrd-users',
      Item: {
        id: params.email,
        hash: passHash,
        time_zone: 'America/Los_Angeles'
      }
    }, function (err, newUser) {
      if (err) return context.fail(err)
      createAccessToken(dynamo, newUser, context)
    })
  })
}

module.exports = registerAccount
