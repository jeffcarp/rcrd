const AWS = require('aws-sdk')
const crypto = require('crypto')
const doc = require('dynamodb-doc')
const pg = require('pg')
const moment = require('moment-timezone')

const conString = 'postgres://jeff:password@localhost/rcrd_migration'
AWS.config.update({region: 'us-east-1'})

const dynamo = new doc.DynamoDB()

pg.defaults.poolSize = 1;

pg.connect(conString, function(err, client, done) {
  if (err) {
    return console.error('error fetching client from pool', err);
  }

  client.query('SELECT * from records', [], function(err, result) {
    //call `done()` to release the client back to the pool
    done()

    if (err) {
      return console.error('error running query', err);
    }

    result.rows.forEach(function (record, index) {
      setTimeout(function () {

        var time = moment.parseZone(record.target).utc()
        var hashThis = time + record.raw
        var id = crypto.createHash('sha256').update(hashThis).digest('hex')

        var newRecord = {
          id: id,
          raw: record.raw,
          time: time.format(),
          time_zone: 'America/Los_Angeles'
        }

        dynamo.putItem({
          "TableName": "rcrd-records",
          "Item": newRecord
        }, function (err, data) {
          console.log(err, newRecord)
        })


        if (index === result.rows.length - 1) {
          client.end()
        }
      }, 1e3 * index * 10)  
    })

  });
});
