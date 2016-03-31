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

function deleteRecord (dynamo, params, context) {
  if (!params.id) return context.fail('Missing param.id')

  dynamo.deleteItem({
    'TableName': 'rcrd-records',
    'Key': {id: params.id}
  }, standardHandler(context))
}

module.exports = deleteRecord
