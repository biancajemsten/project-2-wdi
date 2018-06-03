const express  = require('express');
const router   = express.Router();

// const static = require('../controllers/static');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const users = require('../controllers/users');

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
  .get(users.show);

router.route('/users')
  .get(users.index);

router.route('/logout')
  .get(sessions.delete);

module.exports = router;
