var User = require('../models/user');
var FacebookStrategy = require('passport-facebook').Strategy;
module.exports = function(passport){
	passport.serializeUser(function(user, done) {
      done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          console.log('deserializing user:',user);
          done(err, user);
      });
  });


  // facebook authentication
  passport.use('facebook', new FacebookStrategy({
      clientID        : process.env.FACEBOOK_API_KEY,
      clientSecret    : process.env.FACEBOOK_API_SECRET,
      callbackURL     : 'http://localhost:3000/login/facebook/callback',
      enableProof			: true,
      profileFields   : ['name']
  },

  // facebook will send back the tokens and profile
  function(access_token, refresh_token, profile, done) {
		// asynchronous
		process.nextTick(function() {
	    User.findOne({ 'id' : profile.id }, function(err, user) {
	      if (err)
	          return done(err);
				// if the user is found, then log them in
	      if (user) {
	          return done(null, user);
	      } else {
	        // if there is no user found with that facebook id, create them
	        var newUser = new User();

		      newUser.fb.id    				= profile.id;
		      newUser.fb.access_token = access_token;
		      newUser.fb.firstName  	= profile.name.givenName;
		      newUser.fb.lastName 		= profile.name.familyName;

					// save user to database
	        newUser.save(function(err) {
	            if (err)
	                throw err;
	            // if successful, return the new user
	            return done(null, newUser);
	        });
		    }
	    });
	  });
  }));

}
