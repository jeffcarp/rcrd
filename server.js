const bodyParser = require('body-parser')
const context = require('./test/lambda/context-stub')
const cors = require('cors')
const express = require('express')
const dynamoDocStub = require('./test/lambda/dynamodb-doc-stub')
const fs = require('fs')
const proxyquire = require('proxyquire').noCallThru()

const app = express()
const index = fs.readFileSync('index.html', 'utf-8');
const lambda = proxyquire('./lambda/index', {
  'dynamodb-doc': dynamoDocStub
})

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('.'))

seed()

app.post('/api/*', function (req, res) {

  context.callback = function (status, arg) {
    console.log(status, arg)
    res.json(arg);
  };

  lambda.handler(req.body, context);
})

app.get('*', function (req, res) {
  res.send(index);
});

app.listen(8000, function () {
  console.log('Listening on port 8000');
});

function seed() {
  dynamoDocStub._setRecord({
    id: '32423423',
    raw: 'yas, yaaas'
  })
}
