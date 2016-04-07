'use strict'
const app = require('./app')
const seed = require('./seed')

const port = process.env.PORT || 8000

if (process.env.API === 'local') {
  seed(50)
}

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})
