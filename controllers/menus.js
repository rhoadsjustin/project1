var db = require('../models');

function createItem(req, res){
    var restaurantid = req.params.id;
    console.log("this is the " + restaurantid);
    db.Restaurant.findOne({_id: restaurantid}, function(err, foundRestaurant){
      if(err){
        res.status(404).json({error: "No restaurant found"})
              }
        console.log("THIS IS THE :" + foundRestaurant);
        console.log(req.body.name);
        var itemName = req.body.name;
          foundRestaurant.menuItems.push(itemName);
          foundRestaurant.save(function(err, succ){
              if(err){console.log("ERR, ", err );}
              res.render('menu', {restaurant: foundRestaurant, user: req.user});
              console.log(succ);

            });
          });

}


function deleteItem(req, res){
  var restaurantId = req.params.id;
  var itemId = req.body.id;
  db.Restaurant.findById(restaurantId, function(err, foundRestaurant){
    if(err){
      return console.log('there was an error finding the restaurant');
    }
    foundRestaurant.menuItems(itemId).remove();
    foundRestaurant.save();
    res.render('menu', {restaurant: foundRestaurant, user: req.user});
  })
}



module.exports = {
  createItem: createItem,
  deleteItem: deleteItem,
}
