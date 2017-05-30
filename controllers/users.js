var passport = require('passport');
require("../config/passport")(passport)

function getLogin(req, res){
  var loginStrategy = passport.authenticate('facebook');
  return loginStrategy(req, res)
}

function getCallback(req, res){
  console.log("GOT CALL BACK");
  var callback = passport.authenticate('facebook', {
    successRedirect : '/',
    failureRedirect : '/',
    failureFlash: true
  });
  return callback(req,res);
}

function logout(req, res) {
  req.logout();
  res.render('index.ejs');
}
module.exports = {
  getLogin: getLogin,
  getCallback: getCallback,
  logout: logout
}
