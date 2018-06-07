const Country = require('../models/country');
const User = require('../models/user');

function newRoute(req, res) {
  res.render('countries/new', {userId: req.params.id});
}

function createRoute(req, res){
  const countryData = req.body;
  countryData['countryCreator'] = res.locals.currentUser.id;
  Country
    .create(req.body)
    .then((country)=>{
      console.log(country);
      return res.redirect(`/countries/${country.id}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

function showRoute(req, res){
  Country
    .findById(req.params.id)
    .populate('recommendation')
    .exec()
    .then( country =>{
      res.render('countries/show', {country});
    });
}

function indexRoute(req, res){
  User
    .findById(req.params.id)
    .populate('countries.countryCreator')
    .populate('country');
  Promise.all([Country.find(), User.findById(req.params.id)])
    .then((values) => {
      console.log(values);
      res.render('countries/index', {values});
    });
  // Country
  //   .findById(req.params.id)
  //   // .populate('countries.countryCreator.username')
  //   // .populate('country')
  //   .exec()
  //   .then( user =>{
  //     res.render('countries/index', {users});
  //   });
}

function deleteRoute(req, res){
  Country
    .findById(req.params.id)
    .exec()
    .then(country => {
      country.remove();
      return res.redirect(`/users/${res.locals.currentUser.id}/countries`);
    });
}

module.exports = {
  new: newRoute,
  create: createRoute,
  show: showRoute,
  index: indexRoute,
  delete: deleteRoute
};
