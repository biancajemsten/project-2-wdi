const express  = require('express');
const router   = express.Router();

// const static = require('../controllers/static');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const users = require('../controllers/users');
const recommendations = require('../controllers/recommendations');

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

router.route('/recommendations/new')
  .get(recommendations.new);

router.route('/recommendations')
  .post(recommendations.create);

router.route('/recommendations/:id')
  .get(recommendations.show)
  .put(recommendations.update);

router.route('/recommendations/:id/edit')
  .get(recommendations.edit);

module.exports = router;
