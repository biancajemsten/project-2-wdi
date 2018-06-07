const User = require('../models/user');

function newRoute(req, res) {
  res.render('sessions/new',{isAuto: true});
}



function createRoute(req, res) {
  User
    .findOne({email: req.body.email })
    .then( (user)=>{
      console.log(user);
      if(!user || !user.validatePassword(req.body.password)){
        return res.status(401).render('sessions/new', {message: 'Unrecognised Credentials'});
      }
      req.session.userId = user.id;

      return res.redirect(`/users/${user.id}`);
    });
}

function deleteRoute(req, res){
  return req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  new: newRoute,
  create: createRoute,
  delete: deleteRoute
};
