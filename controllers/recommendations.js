const Recommendation = require('../models/recommendation');
const Country = require('../models/country');

function newRoute(req, res) {
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
  const recommendationId = req.params.recommendation_id.toString();
  Country
    .findById(req.params.country_id)
    .exec()
    .then( country =>{
      // res.render('recommendations/show', {recommendation});
      // console.log(recommendation);
      const wantedRecommendation = country.recommendation.filter(recommendation => recommendation._id.toString() === recommendationId);
      res.render('recommendations/show', {wantedRecommendation});
    });
}

function editRoute(req, res){
  // const recommendationId = req.params.recommendation_id.toString();
  // Country
  //   .findById(req.params.country_id)
  //   .exec()
  //   .then( country =>{
  //     // res.render('recommendations/show', {recommendation});
  //     // console.log(recommendation);
  //     const wantedRecommendation = country.recommendation.filter(recommendation => recommendation._id.toString() === recommendationId);
  //     res.render('recommendations/show', {wantedRecommendation});
  //   });

  Recommendation
    .findById(req.params.id)
    .exec()
    .then( recommendation =>{
      console.log(recommendation);
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
