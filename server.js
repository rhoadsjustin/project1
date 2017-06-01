var express        = require('express');
var app            = express();
var path           = require('path');
var bodyParser     = require('body-parser');
var ejsLayouts     = require("express-ejs-layouts");
var logger         = require('morgan');
var flash          = require('connect-flash');


var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/eatbetter');

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


require("./config/passport")(passport)
var routes = require('./config/routes');

app.use(routes);

// home page
app.get('/', function home (req, res) {
  res.render('index', { user: req.user });
});


app.listen(3000, function(){
  console.log('server 3000 is on!');
});


app.get('/menu', function menu (req, res) {
  res.render('menu', { user: req.user });
});
