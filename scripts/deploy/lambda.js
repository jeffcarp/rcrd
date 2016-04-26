var AdmZip = require('adm-zip')
var AWS = require('aws-sdk')

require('./confirm-correct-directory')()

AWS.config.region = 'us-east-1'

var lambda = new AWS.Lambda({
  apiVersion: '2015-03-31'
})

var zip = new AdmZip()
zip.addLocalFile('./lambda/index.js')
zip.addLocalFile('./lambda/create-record.js')
zip.addLocalFile('./lambda/delete-record.js')
zip.addLocalFile('./lambda/generate-graphs.js')
zip.addLocalFile('./lambda/get-access-token.js')
zip.addLocalFile('./lambda/get-sessions.js')
zip.addLocalFile('./lambda/get-record.js')
zip.addLocalFile('./lambda/list-records.js')
zip.addLocalFile('./lambda/list-records-with-cat.js')
zip.addLocalFile('./lambda/update-record.js')
zip.addLocalFile('./lambda/validate-access-token.js')
zip.addLocalFile('./lambda/view-data.js')
zip.addLocalFile('./lambda/util.js')
var zipBuffer = zip.toBuffer()

lambda.updateFunctionCode({
  FunctionName: 'test-write-to-dynamo',
  ZipFile: zipBuffer,
  Publish: true
}, function (err, data) {
  if (err) {
    console.error(err, err.stack)
  } else {
    console.log(data)
  }
})
