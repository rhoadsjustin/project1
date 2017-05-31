var Menu = require('../models/menu');

// POST new Menu
function createMenu(req, res) {
  // var newMenu = new db.Menu({
  menu.name = req.body.name
// });

  db.Restaurant.findOne({name: req.body.restaurant}, function (err, restaurant){
    if(err) {
      return console.log(err);
    }
    db.Menu.create({name : req.body.name}, function(err, newMenu){
      if(err) {
        return console.log(err);
      }
      resaturant.menu = newMenu;
      restaurant.save(function(err, finalRestaurant){
        if(error){
          res.json({message: 'Could not create menu:' + error});
        }
        res.redirect('/menu');
      });
    });
    });

  }


function createItem(req, res){
  var findMenu = req.params.name;
  db.Menu.find(findMenu)
  .populate('menu')
  .exec(function(err, foundMenu){
    console.log(foundMenu);
    if(err){res.status(500).json({error: err.message});
  } else if (foundMenu === null) {
    res.status(404).json({error: "No menu found"})
  } else {
    foundMenu.items.push(req.body);
    foundMenu.save();
    res.status(201).json(foundMenu);
  }
});
}

function deleteItem(req, res){
  var menuName = req.body.menu.name;
  var itemId = req.body.item_id;
  db.Menu.findByName(menuName)
    .populate('restaurant')
    .exec(function(err, foundMenu){
      if (err) {
        res.status(500).json({error: err.message});

      } else if(foundMenu === null) {
        res.status(404).json({error: "No menu found by this name"});

      } else {
        var deletedItem = foundMenu.item.id(itemId)
        deletedItem.remove();
        foundMenu.save();
        res.json(foundMenu);
      }
    })
};

function getMenu(req, res){
  db.Menu.findOne({name: req.params.name}, function(err, menu) {
    res.render('restaurant');
  })
}

module.exports = {
  createMenu: createMenu,
  createItem: createItem,
  deleteItem: deleteItem,
  getMenu: getMenu
}
