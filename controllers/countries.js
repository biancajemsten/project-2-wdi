const Country = require('../models/country');

function newRoute(req, res) {
  res.render('recommendations/new');
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



module.exports = {
  new: newRoute,
  create: createRoute
};
