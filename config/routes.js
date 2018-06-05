const express  = require('express');
const router   = express.Router();

// const static = require('../controllers/static');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const users = require('../controllers/users');
const recommendations = require('../controllers/recommendations');
const countries = require('../controllers/countries');

// handle a request
router.get('/', (req, res) => res.render('home', {
  isHomepage: true
}));

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/users/:id')
  .get(users.show)
  .put(users.update);

router.route('/users')
  .get(users.index);

router.route('/users/:id/edit')
  .get(users.edit);

router.route('/logout')
  .get(sessions.delete);

router.route('/countries/:id/recommendations/new')
  .get(recommendations.new);

router.route('/countries/:id/recommendations')
  .post(recommendations.create);

router.route('countries/:id/recommendations/:id')
  .get(recommendations.show)
  .put(recommendations.update);

router.route('/countries/:id/recommendations/:id/edit')
  .get(recommendations.edit);

router.route('/countries/new')
  .get(countries.new);

router.route('/users/:id/countries')
  .get(countries.index);

router.route('/countries')
  .post(countries.create);

router.route('/countries/:id')
  .get(countries.show);

module.exports = router;
