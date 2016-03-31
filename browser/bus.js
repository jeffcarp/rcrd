'use strict'

var EventEmitter = require('event-emitter')
var _bus

function bus () {
  if (!_bus) {
    _bus = EventEmitter()
  }

  return _bus
}

module.exports = bus
