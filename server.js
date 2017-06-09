var express        = require('express');
var app            = express();
var path           = require('path');
var bodyParser     = require('body-parser');
var ejsLayouts     = require("express-ejs-layouts");
var logger         = require('morgan');
var flash          = require('connect-flash');


var mongoose = require('mongoose');

//TODO: You're also still connecting to a locally hosted database in your models/index.js folder. Be careful.
mongoose.connect('mongodb://heroku_611f71fk:gutenlqb9n5nr4ih2ct745cum3@ds161551.mlab.com:61551/heroku_611f71fk');

//TODO: Move these requirements up with their friends and match the spacing convention
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'Secret food'}));
app.use(passport.initialize());
app.use(passport.session());

// middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));

app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');


// Add static middleware
app.use(express.static(__dirname + '/public'));

// Routes

//TODO: Move these requirements up with their friends and match the spacing convention
require("./config/passport")(passport)
var routes = require('./config/routes');

app.use(routes);

// home page
app.get('/', function home (req, res) {
  res.render('index', { user: req.user });
});


app.listen(process.env.PORT || 3000, function(){
  console.log('server 3000 is on!');
});
