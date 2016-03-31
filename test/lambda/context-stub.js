'use strict'

var context = {}

context.callback = null

context.done = function (err, arg) {
  err ? context.fail(arg) : context.succeed(arg)
}

context.succeed = function (arg) {
  context.callback('succeed', arg)
}

context.fail = function (arg) {
  context.callback('fail', arg)
}

module.exports = context
