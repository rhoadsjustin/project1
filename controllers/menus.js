var Menu = require('../models/Menu');

// POST new Menu
function createMenu(req, res) {
  var menu = new Menu();

  menu.name = req.body.name,

  menu.save(function(error){
    if(error) res.json({message: 'Could not create menu:' + error});

    res.redirect('/menu');
  })

}

module.exports = {
  createMenu: createMenu
}
