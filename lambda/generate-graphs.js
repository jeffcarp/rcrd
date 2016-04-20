'use strict'

function generateGraphs (dynamo, params, context) {
  // var trackedCats = ['yas']
  var charts = []

  dynamo.putItem({
    TableName: 'rcrd-view-data',
    Item: {
      id: '2|quick-charts',
      charts: charts
    }
  }, function (err) {
    if (err) return context.fail(err)

    context.succeed()
  })
}

module.exports = generateGraphs
