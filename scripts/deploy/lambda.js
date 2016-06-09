var AdmZip = require('adm-zip')
var AWS = require('aws-sdk')

require('./confirm-correct-directory')()

AWS.config.region = 'us-east-1'

var lambda = new AWS.Lambda({
  apiVersion: '2015-03-31'
})

var zip = new AdmZip()
zip.addLocalFile('./lambda/index-dist.js')
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
