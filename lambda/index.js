var doc = require('dynamodb-doc')
var createRecord = require('./create-record')
var deleteRecord = require('./delete-record')
var getAccessToken = require('./get-access-token')
var getRecord = require('./get-record')
var listRecords = require('./list-records')
var listRecordsWithCat = require('./list-records-with-cat')
var updateRecord = require('./update-record')
var validateAccessToken = require('./validate-access-token')
var viewData = require('./view-data')

var dynamo = new doc.DynamoDB()

exports.handler = function (params, context) {
  if (params.operation === 'get-access-token') {
    getAccessToken(dynamo, params, context)
  } else {
    validateAccessToken(params.access_token, dynamo, context, function () {
      // Move to object { 'list', listRecords }
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
      } else if (params.operation === 'view-data') {
        viewData(dynamo, params, context)
      } else if (params.operation === 'heartbeat.authenticated') {
        context.succeed()
      } else {
        context.fail('Operation not found')
      }
    })
  }
}
