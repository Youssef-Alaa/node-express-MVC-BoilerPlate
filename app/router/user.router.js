const router = require('express-promise-router')();

const { jwt } = require('../../utils/passport-strategies');
const { validate } = require('../middleware/validator');

const { registerUserSchema } = require('./requestSchema/registerUser');
const { loginSchema } = require('./requestSchema/login');
const { updateUserSchema } = require('./requestSchema/updateUser');
const { getUserSchema } = require('./requestSchema/getUser');

const {
  registerUser,
  login,
  updateUser,
  getUser
} = require('../controller/User');

router.post('/', validate(registerUserSchema), registerUser);
router.post('/login', validate(loginSchema), login);

router.put('/', jwt(), validate(updateUserSchema), updateUser);

router.get('/', validate(getUserSchema), getUser);

exports.userRouter = router;
