const express  = require('express');
const router   = express.Router();
const upload = require('../lib/s3-upload');

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
  .post(upload.single('file'), registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/users/:id')
  .get(users.show)
  .post(upload.single('file'), users.update);

router.route('/users')
  .get(users.index);

router.route('/users/:id/edit')
  .get(users.edit);

router.route('/logout')
  .get(sessions.delete);

router.route('/countries/:id/recommendations/new')
  .get(recommendations.new);

router.route('/countries/:id/recommendations')
  .post(upload.single('file'), recommendations.create);

router.route('/countries/:country_id/recommendations/:recommendation_id')
  .get(recommendations.show)
  .post(upload.single('file'), recommendations.update);

router.route('/countries/:country_id/recommendations/:recommendation_id/edit')
  .get(recommendations.edit);

router.route('/countries/new')
  .get(countries.new);

router.route('/users/:id/countries')
  .get(countries.index);

router.route('/countries')
  .post(countries.create);

router.route('/countries/:id')
  .get(countries.show)
  .delete(countries.delete);

module.exports = router;
