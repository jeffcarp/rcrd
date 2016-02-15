var AWS = require('aws-sdk')
var doc = require("dynamodb-doc");
var moment = require('moment')
var records = require('../records.json')

AWS.config.update({region: "us-east-1"});
var dynamo = new doc.DynamoDB();

var counter = 0;

var inter = setInterval(function () {
  if (counter === records.length) {
    return clearInterval(inter);
  }

  var record = records[counter]
  counter++

  var newRecord = {
        id: moment(record.target).format('x'),
        raw: record.raw
  }
  console.log(newRecord)

  dynamo.putItem({
    "TableName": "test-for-rcrd",
    "Item": newRecord
  }, function (err, rec) {
    console.log(err, rec)
  });


}, 1e4);

