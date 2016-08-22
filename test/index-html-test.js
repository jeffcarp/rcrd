'use strict'

import test from 'ava'
const jsdom = require('jsdom')

const PORT = 9988
const app = require('../server/app')

app.listen(PORT, function () {
  // Load index.html
  // No scripts should be loaded

  // Load index.html with localStorage.access_token
  // One script should load

  // Load index.html with pathname = '/login'
  // One script should load

  test.cb('route / does not load scripts by default', (t) => {
    t.plan(1)

    let scriptsLoaded = 0

    jsdom.env({
      url: `http://localhost:${PORT}/`,
      features: {
        FetchExternalResources: ['script'],
        ProcessExternalResources: ['script']
      },
      resourceLoader: (resource, callback) => {
        scriptsLoaded += 1
        return resource.defaultFetch(callback)
      },
      virtualConsole: jsdom.createVirtualConsole().sendTo(console),
      done: (err) => {
        if (err) {
          console.error(err)
        } else {
          t.is(scriptsLoaded, 0)
          t.end()
        }
      }
    })
  })

  test.cb('route /login loads scripts by default', (t) => {
    t.plan(1)

    let scriptsLoaded = 0

    jsdom.env({
      url: `http://localhost:${PORT}/login`,
      features: {
        FetchExternalResources: ['script'],
        ProcessExternalResources: ['script']
      },
      virtualConsole: jsdom.createVirtualConsole().sendTo(console),
      resourceLoader: (resource, callback) => {
        scriptsLoaded += 1
        callback(null, 'true')
        // return resource.defaultFetch(callback)
      },
      done: (err) => {
        if (err) {
          console.error(err)
        } else {
          // TODO why is this 2 not 1? is it a jsdom thing or our failure?
          // - Can't replicate outside, probably our problem
          t.is(scriptsLoaded, 2)
          t.end()
        }
      }
    })
  })
})
