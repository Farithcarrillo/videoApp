const auth = require('../../auth');

module.exports = function checkAuth() {
  function middleware(req, res, next) {
    auth.checkToken.confirmToken(req, process.env.USERID, "create");
    next();
  }

  return middleware;
}