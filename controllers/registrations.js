const User = require('../models/user');

function newRoute(req, res) {
  res.render('registrations/new');
}

function createRoute(req, res){
  const userData = req.body;
  userData['url'] = req.file.location;
  userData['fileMetadata'] = req.file;
  User
    .create(userData)
    .then((user)=>{
      console.log(user);
      res.redirect('/users');
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  new: newRoute,
  create: createRoute
};
