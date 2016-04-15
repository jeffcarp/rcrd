'use strict'
const bodyParser = require('body-parser')
const context = require('../test/lambda/context-stub')
const cors = require('cors')
const express = require('express')
const dynamoDocStub = require('test-lambda').dynamo
const fs = require('fs')
const proxyquire = require('proxyquire').noCallThru()

const app = express()
let index = fs.readFileSync('index.html', 'utf-8')
const lambda = proxyquire('../lambda/index', {
  'dynamodb-doc': dynamoDocStub
})

if (process.env.API === 'local') {
  let tmpIndex = index.split('\n')
  const JSindex = tmpIndex.reduce((acc, cur, i) => {
    return cur.indexOf('index.js') !== -1 ? i : acc
  })
  const localAPIJS = '<script>window.localAPI = true</script>'
  tmpIndex.splice(JSindex, 0, localAPIJS)
  index = tmpIndex.join('\n')
}

app.get('/', (req, res) => res.send(index))

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('.'))

app.post('/api/*', function (req, res) {
  context.callback = function (status, data) {
    if (status !== 'fail') {
      setTimeout(() => {
        res.json(data)
      }, 1e3)
    } else {
      setTimeout(() => {
        res.json({ errorMessage: data })
      }, 1e3)
    }
  }

  lambda.handler(req.body, context)
})

app.get('*', (req, res) => res.send(index))

module.exports = app
