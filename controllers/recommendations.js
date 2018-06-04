const Recommendation = require('../models/recommendation');

function newRoute(req, res) {
  res.render('recommendations/new');
}

function createRoute(req, res){
  Recommendation
    .create(req.body)
    .then((recommendation)=>{
      console.log(recommendation);
      return res.redirect(`/recommendations/${recommendation.id}`);
    })
    .catch((err) => {
      console.log(err);
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
