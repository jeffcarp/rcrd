'use strict'

function standardHandler (context) {
  return function (err) {
    if (err) {
      context.fail(err)
    } else {
      context.succeed()
    }
  }
}

function deleteRecord (dynamo, params, context, userID) {
  if (!params.id) return context.fail('Missing param.id')

  dynamo.getItem({
    'TableName': 'rcrd-records',
    'Key': {id: params.id}
  }, function (err, data) {
    if (err) return context.fail(err)
    var record = data.Item
    if (!record) return context.fail('Record not found')

    if (record.user_id !== userID) {
      return context.fail('Insufficient privileges')
    }

    dynamo.deleteItem({
      'TableName': 'rcrd-records',
      'Key': {id: params.id}
    }, standardHandler(context))
  })
}

module.exports = deleteRecord
