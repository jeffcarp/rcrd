var AWS = require('aws-sdk');
var fs = require('fs');

require('./confirm-correct-directory')();

AWS.config.region = 'us-east-1';
const BUCKET_NAME = 'www.rcrd.org';
var s3bucket = new AWS.S3({params: {Bucket: BUCKET_NAME}});

const files = [
  ['www/index.html', 'text/html'],
];

files.forEach(function (file) {
  var filePath = file[0];
  var contentType = file[1];

  var str = fs.readFileSync(filePath, 'utf-8');
  var params = {
    Key: filePath, 
    Body: str,
    ContentType: contentType
  };

  s3bucket.upload(params, function(err, data) {
    if (err) {
      console.log("Error uploading data: ", err);
    } else {
      console.log(`Successfully uploaded data to ${BUCKET_NAME}/${filePath}`);
    }
  })
})
