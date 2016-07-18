'use strict'

var crypto = require('crypto')

function _createRecord (dynamo, newRecord, context) {
  dynamo.putItem({
    'TableName': 'rcrd-records',
    'Item': newRecord
  }, function (err) {
    if (err) return context.fail(err)
    context.succeed(newRecord)
  })
}

function createRecord (dynamo, params, context, userID) {
  var newRecord

  if (params.id) { // Updating
    newRecord = {
      id: params.id,
      user_id: userID
    }

    if (params.user_id) return context.fail('Cannot update user_id')

    if (params.raw) newRecord.raw = params.raw
    if (params.time) newRecord.time = params.time
    if (params.time_zone) newRecord.time_zone = params.time_zone

    dynamo.getItem({
      'TableName': 'rcrd-records',
      'Key': {id: params.id}
    }, function (err, data) {
      if (err) {
        return context.fail(err)
      } else if (data.Item.user_id !== userID) {
        return context.fail('Insufficient privileges')
      } else {
        _createRecord(dynamo, newRecord, context)
      }
    })
  } else { // Creating
    if (!params.raw || !params.time || !params.time_zone) {
      return context.fail('Missing param')
    }

    // Add user_id to this
    var hashThis = params.time + params.raw
    var id = crypto.createHash('sha256').update(hashThis).digest('hex')

    newRecord = {
      id: id,
      user_id: userID,
      raw: params.raw,
      time: params.time,
      time_zone: params.time_zone
    }

    _createRecord(dynamo, newRecord, context)
  }
}

module.exports = createRecord
