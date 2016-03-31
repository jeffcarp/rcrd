var AccountService = {}

AccountService.isLoggedIn = function () {
  return localStorage.email && localStorage.access_token
}

AccountService.logout = function () {}

module.exports = AccountService
