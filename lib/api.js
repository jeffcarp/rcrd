var api = {}

// Devise a better way...
const LOCAL_MODE = true

function apiURL () {
  if (LOCAL_MODE) {
    return 'http://localhost:8000/api/'
  } else {
    return 'https://08j98anr5k.execute-api.us-east-1.amazonaws.com/Production/'
  }
}

function APIRequest (body) {
  return window.fetch(`${apiURL()}records`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then((response) => response.json())
  .then((data) => {
    if (data.errorMessage === 'access_token denied') {
      // bus.emit('notification', 'Your access token is no longer valid, please log in again.')
      throw new Error(data.errorMessage)
    } else if (data.errorMessage === 'access_token expired') {
      // bus.emit('notification', 'Your access token has expired, please log in again.')
      throw new Error(data.errorMessage)
    } else {
      return data
    }
  })
}

api.fetchLatestRecords = function (access_token) {
  return APIRequest({
    operation: 'list',
    access_token
  })
}

api.login = function (options) {
  return APIRequest({
    operation: 'get-access-token',
    email: options.email,
    secret_key: options.password
  })
}

module.exports = api
