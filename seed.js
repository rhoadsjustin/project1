var db = require('./models');


db.Restaurant.remove({}, function(err, succ){
  console.log("Removed all entries");

    process.exit(1);
});
