var passport = require('passport');
require("../config/passport")(passport)


// FACEBOOK FUNCTIONS
function getLogin(req, res){
  var loginStrategy = passport.authenticate('facebook');
  return loginStrategy(req, res)
}

function getCallback(req, res){
  console.log("GOT CALL BACK");
  var callback = passport.authenticate('facebook', {
    successRedirect : '/',
    failureRedirect : '/',
  });
  return callback(req, res);
}

function logout(req, res) {
  req.logout();
  res.redirect('/');
}
module.exports = {
  getLogin: getLogin,
  getCallback: getCallback,
  logout: logout
}
