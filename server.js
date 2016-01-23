const express = require('express');
const app = express();
const fs = require('fs');

const index = fs.readFileSync('index.html', 'utf-8');

app.use(express.static('.'));

app.get('*', function (req, res) {
  res.send(index);
});

app.listen(8000, function () {
  console.log('Listening on port 8000');
});

