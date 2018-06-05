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

//-------old create controller --------
// User
//   .findById(req.params.id)
//   .then( user =>{
//     user
//       .country
//       .push(req.body);
//
//     user.save(() =>{
//       return res.redirect(`/user/${user.id}/countries`);
//     });
//   });
// }




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

module.exports = {
  new: newRoute,
  create: createRoute,
  show: showRoute,
  index: indexRoute
};
