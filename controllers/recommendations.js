const Recommendation = require('../models/recommendation');
const Country = require('../models/country');

function newRoute(req, res) {
  res.render('recommendations/new',{countryId: req.params.id});
}

function createRoute(req, res){
  const recommendationData = req.body;
  req.body.user = res.locals.currentUser.id;
  recommendationData['url'] = req.file.location;
  recommendationData['fileMetadata'] = req.file;
  Country
    .findById(req.params.id)
    .then( country =>{
      country
        .recommendation
        .push(req.body);

      country.save(() =>{
        return res.redirect(`/countries/${country.id}`);
      });
    });
}

function showRoute(req, res){
  const recommendationId = req.params.recommendation_id.toString();
  const countryId = req.params.country_id;
  Country
    .findById(countryId)
    .exec()
    .then( country =>{
      // res.render('recommendations/show', {recommendation});
      // console.log(recommendation);
      const wantedRecommendation = country.recommendation.filter(recommendation => recommendation._id.toString() === recommendationId);
      res.render('recommendations/show', {wantedRecommendation, countryId});
    });
}

function editRoute(req, res){
  Country
    .findById(req.params.country_id)
    .exec()
    .then( country =>{
      const recommendation = country.recommendation.id(req.params.recommendation_id);

      res.render('recommendations/edit', {country, recommendation});
    });
}


function updateRoute(req, res){
  const recommendationData = req.body;
  if(req.file){
    recommendationData['url'] = req.file.location;
  }
  console.log(req.body);
  Country
    .findById(req.params.country_id)
    .exec()
    .then( country =>{
      const recommendation = country.recommendation.id(req.params.recommendation_id);
      recommendation.set(req.body);
      country
        .save()
        .then(()=> res.redirect(`/countries/${req.params.country_id}/recommendations/${req.params.recommendation_id}`));
    });
}

function deleteRoute(req,res){
  Country
    .findById(req.params.country_id)
    .exec()
    .then( country =>{
      const recommendation = country.recommendation.id(req.params.recommendation_id);
      recommendation.remove();
      country
        .save()
        .then(()=> res.redirect(`/countries/${req.params.country_id}`));
    });
}

module.exports = {
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
};
