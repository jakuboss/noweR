const User = require('../models/User')
function authenticationRole(role) {
  return (req, res, next) => {

    if (!
      role.some(x => x == req.user.permission)) {
      console.info(req.user.permission)
      res.status(401)
      return res.redirect(req.url)

    }
    next()
  }
}
module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Zaloguj się, by zobaczyć zawartość');
    res.redirect('/users/login');
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('mainpage');
  },
  authenticationRole


};