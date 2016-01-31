var AdmZip = require('adm-zip');
var AWS = require('aws-sdk');
var fs = require('fs');

require('./confirm-correct-directory')();

AWS.config.region = 'us-east-1';

var lambda = new AWS.Lambda({
  apiVersion: '2015-03-31'
});

// Idea: run unit tests before deploying?

var zip = new AdmZip();
zip.addLocalFile('./lambda/index.js');
var zipBuffer = zip.toBuffer();

lambda.updateFunctionCode({
  FunctionName: 'test-write-to-dynamo',
  ZipFile: zipBuffer,
  Publish: true
}, function(err, data) {
  if (err) {
    console.error(err, err.stack);
  } else {
    console.log(data);
  }
});
