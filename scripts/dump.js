const fetching = require('./fetching')

fetching.getLocalCopy((err, records) => {
  if (err) return console.error(err)
  console.log(JSON.stringify(records))
})

