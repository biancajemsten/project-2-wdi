const Recommendation = require('../models/recommendation');
const Country = require('../models/country');

function newRoute(req, res) {
  res.render('recommendations/new',{countryId: req.params.id});
}

function createRoute(req, res){
  console.log(req.params);
  const recommendationData = req.body;
  recommendationData['url'] = req.file.location;
  recommendationData['fileMetadata'] = req.file;
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
  const recommendationId = req.params.recommendation_id.toString();
  Country
    .findById(req.params.country_id)
    .exec()
    .then( country =>{
      // res.render('recommendations/show', {recommendation});
      // console.log(recommendation);
      const wantedRecommendation = country.recommendation.filter(recommendation => recommendation._id.toString() === recommendationId);
      console.log(wantedRecommendation);
      res.render('recommendations/show', {wantedRecommendation});
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

module.exports = {
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute
};
