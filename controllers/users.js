const User = require('../models/user');


//changed some of this but it still somehow works..? why can't I link user info ?
function showRoute(req, res){
  if(!res.locals.isLoggedIn) return res.redirect('/');
  console.log(req.params);
  User
    .findById(req.params.id)
    .populate('countries')
    .exec()
    .then( user =>{
      res.render('users/show', {user});
    });
}

function indexRoute(req, res){
  User
    .find()
    .populate('user')
    .exec()
    .then( users =>{
      res.render('users/index', {users});
    });
}

function editRoute(req, res){
  User
    .findById(req.params.id)
    .exec()
    .then( user =>{
      res.render('users/edit', {user});
    });
}
function updateRoute(req, res){
  User
    .findById(req.params.id)
    .update(req.body)
    .then( user =>{
      return res.redirect(`/users/${req.params.id}`);
    });
}


module.exports = {
  show: showRoute,
  index: indexRoute,
  edit: editRoute,
  update: updateRoute
};
