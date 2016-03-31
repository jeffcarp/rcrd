'use strict'

function viewData (dynamo, params, context) {
  if (!params.id) return context.fail('Missing param.id')

  dynamo.getItem({
    'TableName': 'rcrd-view-data',
    'Key': {id: params.id}
  }, function (err, record) {
    if (err) {
      context.fail(err)
    } else {
      context.succeed(record)
    }
  })
}

module.exports = viewData
