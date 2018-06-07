const express  = require('express');
const router   = express.Router();
const upload = require('../lib/s3-upload');

const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const users = require('../controllers/users');
const recommendations = require('../controllers/recommendations');
const countries = require('../controllers/countries');

function secureRoute(req, res, next) {
  // if the user is not logged in
  if(!res.locals.currentUser) {
    // clear the session cookie and redirect them to the login page
    return req.session.regenerate(() => res.redirect('/login'));
  }
  next();
}


router.get('/', (req, res) => res.render('home', {
  isHomepage: true
}));

router.route('/register')
  .get(registrations.new)
  .post(upload.single('file'), registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/users/:id')
  .get(users.show)
  .post(upload.single('file'), users.update);

router.route('/users')
  .get(secureRoute,users.index);

router.route('/users/:id/edit')
  .get(users.edit);

router.route('/logout')
  .get(sessions.delete);

router.route('/countries/:id/recommendations/new')
  .get(secureRoute, recommendations.new);

router.route('/countries/:id/recommendations')
  .post(upload.single('file'), recommendations.create);

router.route('/countries/:country_id/recommendations/:recommendation_id')
  .get(secureRoute,recommendations.show)
  .post(upload.single('file'), recommendations.update)
  .delete(recommendations.delete);

router.route('/countries/:country_id/recommendations/:recommendation_id/edit')
  .get(secureRoute,recommendations.edit);

router.route('/countries/new')
  .get(secureRoute,countries.new);

router.route('/users/:id/countries')
  .get(secureRoute,countries.index);

router.route('/countries')
  .post(countries.create);

router.route('/countries/:id')
  .get(secureRoute,countries.show)
  .delete(countries.delete);

module.exports = router;
