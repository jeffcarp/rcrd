var AccountService = {}

AccountService.isLoggedIn = function () {
  return window.localStorage.email && window.localStorage.access_token
}

AccountService.logout = function () {}

module.exports = AccountService
