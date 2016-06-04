const React = require('react')
const ReactDOMServer = require('react-dom/server')
const Records = require('./records')
require('babel-register')

const Embed = React.createFactory(require('./embed'))

const records = Records.withCat('book')

const embed = Embed({
  records: records
})

console.log('<?xml version="1.0" encoding="utf-8"?>')
console.log('<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">')
console.log(ReactDOMServer.renderToStaticMarkup(embed))
