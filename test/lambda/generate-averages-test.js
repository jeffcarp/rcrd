'use strict'

const path = require('path')
const test = require('tape')
const tl = require('test-lambda')

const dynamoDocStub = tl.dynamo
const testLambda = tl.test(path.resolve('./lambda/index'), {
  before: require('./before'),
  after: require('./after')
})

test('generateGraphs generates... graphs', (t) => {
  const viewDatumID = '2|quick-charts'

  dynamoDocStub._set('rcrd-records', {
    id: '1',
    raw: 'yas, nas',
    time: '2016-04-19T19:15:54+00:00',
    time_zone: 'America/Los_Angeles'
  })

  testLambda({
    operation: 'generate-graphs'
  }, (status, arg) => {
    t.equal(status, 'succeed')

    const viewDatum = dynamoDocStub._get('rcrd-view-data', viewDatumID)
    t.ok(viewDatum, 'a view datum exists')
    t.equal(viewDatum.id, viewDatumID)
    /*
    t.deepEqual(viewDatum.charts, [
      { catName: 'yas', fourWeeks: 0.25, eightWeeks: 0.125, sixteenWeeks: 0.0625 }
    ])
    */

    t.end()
  })
})
