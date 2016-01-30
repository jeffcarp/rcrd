var AWS = require('aws-sdk');
var fs = require('fs');

require('./confirm-correct-directory')();

AWS.config.region = 'us-east-1';

var lambda = new AWS.Lambda({
  apiVersion: '2015-03-31'
});

// TODO: Create zipped base64 buffer

var params = {
  FunctionName: 'hello-world',
  Publish: true,
  ZipFile: 'console.log("hey")'
};
lambda.updateFunctionCode(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
