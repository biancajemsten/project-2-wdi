const express  = require("express");
const router   = express.Router();

const static = require('../controllers/static');
const registrations = require('../controllers/registrations');

// handle a request
router.get('/', (req, res) => res.render('home', {
  isHomepage: true
}));

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);



module.exports = router;
