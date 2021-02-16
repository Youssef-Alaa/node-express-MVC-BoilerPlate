const router = require('express-promise-router')();

const { jwt } = require('../../utils/passport-strategies');
const { validate } = require('../middleware/validator');

const { registerUserSchema } = require('./requestSchema/registerUser');

const {
  registerUser
} = require('../controller/User');

router.post('/', validate(registerUserSchema), registerUser);

exports.userRouter = router;
