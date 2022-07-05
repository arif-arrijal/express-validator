var express = require('express');
const { validationResult, checkSchema } = require('express-validator');
var router = express.Router();

let validators = [
  checkSchema({
    email: {
      in: ['body'], // if we omitted in operator, then all request location will be checked 
      isEmail: {
        errorMessage: 'Email is not valid.'
      },
      isLength: {
        errorMessage: 'Minimum length for email is 7',
        options: {
          min: 7
        }
      },
      custom: {
        options: (value, { req, location, path}) => {
          if (!value.endsWith('company-a.com')) {
            return Promise.reject('Your email is not comply with our organization.');
          }
        }
      }
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