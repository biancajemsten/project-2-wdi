const Recommendation = require('../models/recommendation');
const Country = require('../models/country');

function newRoute(req, res) {
  //how do I make sure that :id is from the country I'm in?
  res.render('recommendations/new',{countryId: req.params.id});
}

function createRoute(req, res){
  console.log(req.params);
  Country
    .findById(req.params.id)
    .then( country =>{

      country
        .recommendation
        .push(req.body);

      country.save(() =>{
        console.log(country);
        return res.redirect(`/countries/${country.id}`);
      });
    });
}

function showRoute(req, res){
  Recommendation
    .findById(req.params.id)
    .exec()
    .then( recommendation =>{
      res.render('recommendations/show', {recommendation});
    });
}

function editRoute(req, res){
  Recommendation
    .findById(req.params.id)
    .exec()
    .then( recommendation =>{
      res.render('recommendations/edit', {recommendation});
    });
}
function updateRoute(req, res){
  Recommendation
    .findById(req.params.id)
    .update(req.body)
    .then( recommendation =>{
      return res.redirect(`/recommendations/${recommendation.id}`);
    });
}

module.exports = {
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute
};
