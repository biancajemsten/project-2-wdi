const User = require('../models/user');


//changed some of this but it still somehow works..? why can't I link user info ?
function showRoute(req, res){
  if(!res.locals.isLoggedIn) return res.redirect('/');
  User
    .findById(req.session.userId)
    .populate({path: 'users'})
    .exec()
    .then( users =>{
      res.render('users/show', {users});
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


module.exports = {
  show: showRoute,
  index: indexRoute
};
