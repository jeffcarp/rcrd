'use strict'

var util = require('./util')

function updateRecord (dynamo, params, context) {
  if (!params.id || !params.raw) {
    return context.fail('Missing param')
  }

  // Currently unused!
  // createRecord is doing double duty as create+update

  if (!params.id || !params.raw) {
    context.fail('Missing param')
  }

  var cats = util.catsFromRaw(params.raw)
  if (util.hasDupes(cats.map(util.sansMagnitude))) {
    context.fail('Records cannot have duplicate cats.')
    return
  }

  var newRecord = {
    'id': String(params.id),
    'raw': params.raw
  }

  dynamo.putItem({
    'TableName': 'rcrd-records',
    'Item': newRecord
  }, function () {
    context.succeed(newRecord)
  })
}

module.exports = updateRecord
