var doc = require('dynamodb-doc')
var createRecord = require('./create-record')
var deleteRecord = require('./delete-record')
var generateGraphs = require('./generate-graphs')
var getAccessToken = require('./get-access-token')
var getRecordsLast90Days = require('./get-records-last-90-days')
var getSessions = require('./get-sessions')
var getRecord = require('./get-record')
var listRecords = require('./list-records')
var listRecordsWithCat = require('./list-records-with-cat')
var updateRecord = require('./update-record')
var validateAccessToken = require('./validate-access-token')
var viewData = require('./view-data')
var registerAccount = require('./register-account')

var dynamo = new doc.DynamoDB()

exports.handler = function (params, context) {
  if (params.operation === 'get-access-token') {
    getAccessToken(dynamo, params, context)
  } else if (params.operation === 'generate-graphs') {
    generateGraphs(dynamo, params, context)
  } else if (params.operation === 'account.register') {
    registerAccount(dynamo, params, context)
  } else {
    validateAccessToken(params.access_token, dynamo, context, function (err, userID) {
      if (err) return context.fail(err)

      // TODO: Move to object { 'list', listRecords }
      if (params.operation === 'list') {
        listRecords(dynamo, params, context)
      } else if (params.operation === 'create') {
        createRecord(dynamo, params, context)
      } else if (params.operation === 'list-records-with-cat') {
        listRecordsWithCat(dynamo, params, context)
      } else if (params.operation === 'record.update') {
        updateRecord(dynamo, params, context)
      } else if (params.operation === 'record.delete') {
        deleteRecord(dynamo, params, context)
      } else if (params.operation === 'record.get') {
        getRecord(dynamo, params, context)
      } else if (params.operation === 'sessions.list') {
        getSessions(dynamo, params, context, userID)
      } else if (params.operation === 'view-data') {
        viewData(dynamo, params, context)
      } else if (params.operation === 'record.get-last-90-days') {
        getRecordsLast90Days(dynamo, params, context)
      } else if (params.operation === 'heartbeat.authenticated') {
        context.succeed()
      } else {
        context.fail('Operation not found')
      }
    })
  }
}
