var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	// TODO: Include some rad attributes that your app will hold for your users (restaurants visited, reviews, etc.)
	fb: {
		id: String,
		access_token: String,
		firstName: String,
		lastName: String,
		email: String
	}
});
