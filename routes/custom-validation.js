var express = require('express');
const { body, validationResult } = require('express-validator');
var router = express.Router();

let validators = [
  body('email').custom(value => {
    if (!value) {
      return Promise.reject('Email cannot be empty.');
    }
    if (typeof value !== 'string') {
      return Promise.reject('Email only can be a string.');
    }
    if (!value.endsWith('company-a.com')) {
      return Promise.reject('Your email is not comply with our organization.');
    }
  }),
  body('password').custom(value => {
    if (!value) {
      return Promise.reject('Password cannot be empty.');
    }
    if (typeof value !== 'string') {
      return Promise.reject('Password only can be a string.');
    }
    if (value.length < 5) {
      return Promise.reject('Minimum password length is 5.');
    }
    if (value.length > 10) {
      return Promise.reject('Maximum password length is 10.');
    }
  })
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