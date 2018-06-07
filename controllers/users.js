const User = require('../models/user');
const Country = require('../models/country');


function showRoute(req, res){
  if(!res.locals.isLoggedIn) return res.redirect('/');
  // console.log(req.params);
  User
    .findById(req.params.id)
    .populate('countries.countryCreator')
    .populate('country');
  Promise.all([Country.find(), User.findById(req.params.id)])
    .then((values) => {
      console.log(values);
      res.render('users/show', {values});
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
  const userData = req.body;
  if(req.file){
    userData['url'] = req.file.location;
  }
  User
    .findById(req.params.id)
    .update(userData)
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
