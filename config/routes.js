const express  = require("express");
const router   = express.Router();

const static = require('../controllers/static');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');

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

module.exports = router;
