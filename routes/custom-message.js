var express = require('express');
const { body, validationResult } = require('express-validator');
var router = express.Router();

let validators = [
  body('email')
    .isEmail()
    .withMessage('Email format is invalid. Please check again.'),
  body('password')
    .isLength({ min: 5, max: 10 })
    .withMessage('Minimum length for password is 5, Maximum length for password is 10.')
];

/* GET home page. */
router.post('/', validators, function(req, res) {
  // validate data
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const body = req.body;

  let user = {
    email: body.email,
    password: body.password
  }

  return res.json(user);
});

module.exports = router;