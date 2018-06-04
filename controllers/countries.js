const Country = require('../models/country');

function newRoute(req, res) {
  res.render('countries/new');
}

function createRoute(req, res){
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
      console.log(country);
    });

}

function indexRoute(req, res){
  Country
    .find()
    .exec()
    .then( countries =>{
      res.render('countries/index', {countries});
    });
}

module.exports = {
  new: newRoute,
  create: createRoute,
  show: showRoute,
  index: indexRoute
};
