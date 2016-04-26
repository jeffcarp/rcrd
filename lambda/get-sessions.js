'use strict'

function getSessions (dynamo, params, context, userID) {
  dynamo.scan({
    'TableName': 'rcrd-access-tokens'
  }, function (err, data) {
    if (err) return context.fail(err)

    var sessions = data.Items
    var userSessions = sessions.filter(function (session) {
      return session.user_id === userID
    })

    context.succeed(userSessions)
  })
}

module.exports = getSessions
