'use strict'

function getRecord (dynamo, params, context, userID) {
  if (!params.id) return context.fail('Missing param.id')

  // Validate permissions

  dynamo.getItem({
    'TableName': 'rcrd-records',
    'Key': {id: params.id}
  }, function (err, data) {
    if (err) {
      return context.fail(err)
    } else if (data.Item.user_id !== userID) {
      return context.fail('Insufficient privileges')
    } else {
      context.succeed(data)
    }
  })
}

module.exports = getRecord
