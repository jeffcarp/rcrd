'use strict'

const AWS = require('aws-sdk')
const moment = require('moment')
const util = require('../browser/util')

AWS.config.update({
  region: 'us-east-1'
})
const dynamo = new AWS.DynamoDB.DocumentClient()

const WEEKS = [4, 8, 16]
const WEEK_KEYS = ['fourWeeks', 'eightWeeks', 'sixteenWeeks']

dynamo.scan({
  'TableName': 'rcrd-records'
}, function (err, data) {
  if (err) return console.error(err)
  const records = data.Items

  let chartData = { charts: [], id: '2|quick-charts' }
  const keyCats = ['floss']

  keyCats.forEach((keyCat) => {
    let chart = { catName: keyCat }

    WEEK_KEYS.forEach((weekKey, index) => {
      const NUM_WEEKS = WEEKS[index]
      const startDate = moment.utc().subtract(NUM_WEEKS, 'weeks')
      const endDate = moment.utc()

      let total = 0
      records.forEach((record) => {
        const cats = util.baseCatsFromRaw(record.raw)
        if (cats.indexOf(keyCat) !== -1) {
          const time = util.timeFromRecord(record)
          if (time.isAfter(startDate) && time.isBefore(endDate)) {
            total += 1
          }
        }
      })

      const average = total / NUM_WEEKS
      console.log(keyCat, 'over', NUM_WEEKS, 'weeks:', average)
      chart[weekKey] = average
    })
    chartData.charts.push(chart)
  })

  console.log(JSON.stringify(chartData))
})
